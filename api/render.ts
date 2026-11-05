import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

// Must match the CMS (encotech-cms/src/lib/seoSlug.ts) and the routes in src/App.tsx.
const SERVICE_SUBPAGES = [
  "project-management",
  "power-generation",
  "construction-commissioning",
  "technical-advisory",
  "due-diligence",
  "value-added",
];

const INSIGHTS_SUBPAGES = ["case-studies", "news-updates", "blogs-articles"];

function getSlugFromPath(urlPath: string): string {
  const pathPart = urlPath.split("?")[0] || "/";
  let cleanPath = pathPart.replace(/\/+$/, ""); // Remove trailing slashes

  if (cleanPath === "" || cleanPath === "/") {
    return "home";
  }

  // Exact mappings
  if (cleanPath === "/about") return "about";
  if (cleanPath === "/services") return "services";
  if (cleanPath === "/insights") return "insights";
  if (cleanPath === "/contact") return "contact";
  if (cleanPath === "/careers") return "careers";
  if (cleanPath === "/certifications") return "certifications";
  if (cleanPath === "/leadership") return "leadership";

  // Sub-services: /services/<id> -> "service/<id>"
  const serviceMatch = cleanPath.match(/^\/services\/([^/]+)$/);
  if (serviceMatch && SERVICE_SUBPAGES.includes(serviceMatch[1])) {
    return `service/${serviceMatch[1]}`;
  }

  // Insights listing sub-pages: /insights/<id> -> "insights/<id>"
  const insightsMatch = cleanPath.match(/^\/insights\/([^/]+)$/);
  if (insightsMatch && INSIGHTS_SUBPAGES.includes(insightsMatch[1])) {
    return `insights/${insightsMatch[1]}`;
  }

  if (cleanPath === "/privacy" || cleanPath === "/privacy-policy")
    return "privacy-policy";
  if (cleanPath === "/cookies" || cleanPath === "/cookie-policy")
    return "cookie-policy";

  // Dynamic blog / insights
  if (cleanPath.startsWith("/insights/")) {
    const blogSlug = cleanPath
      .replace(/^\/insights\//, "")
      .split("/")[0]
      .trim();
    if (blogSlug) return `insight-${blogSlug}`;
  }

  return "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Read template HTML file
  const templatePath = path.join(process.cwd(), "api", "template.html");
  if (!fs.existsSync(templatePath)) {
    console.error("Template HTML not found at:", templatePath);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(500).send("Server Error: Template not found.");
  }
  const template = fs.readFileSync(templatePath, "utf8");

  const cmsApiUrl = process.env.VITE_CMS_API_URL || "";
  const urlPath = req.url || "/";
  const slug = getSlugFromPath(urlPath);

  let globalSEO: any = {
    siteTitle: "encotec",
    siteDescription: "Engineering & Project Management Services",
    favicon: null,
    googleAnalyticsId: "G-CT894VPLS1",
    gtmId: "GTM-59DCSVDV",
    searchConsoleId: "4kD9H2fqRgqKEk",
    customHeaderScripts: null,
    customFooterScripts: null,
    schema: null,
  };

  let pageSEO: any = null;

  // 1. Fetch Global SEO
  try {
    const globalResponse = await fetch(`${cmsApiUrl}/api/seo/global`);
    if (globalResponse.ok) {
      const globalJson = await globalResponse.json();
      if (globalJson.success && globalJson.data) {
        globalSEO = { ...globalSEO, ...globalJson.data };
      }
    }
  } catch (error) {
    console.error("Error fetching global SEO from CMS for SSR:", error);
  }

  // 2. Fetch Page SEO if slug is valid
  if (slug) {
    try {
      const pageResponse = await fetch(`${cmsApiUrl}/api/seo/pages/${slug}`);
      if (pageResponse.ok) {
        const pageJson = await pageResponse.json();
        if (pageJson.success && pageJson.data) {
          pageSEO = pageJson.data;
        }
      }
    } catch (error) {
      console.error(
        `Error fetching page SEO for ${slug} from CMS for SSR:`,
        error,
      );
    }
  }

  // Determine Title & Description
  let title = "";
  let description = "";

  if (slug === "home") {
    title = globalSEO.siteTitle || pageSEO?.metaTitle || "encotec";
    description =
      globalSEO.siteDescription ||
      pageSEO?.metaDescription ||
      "encotec | Asset Stewardship & Engineering";
  } else {
    title = pageSEO?.metaTitle || globalSEO.siteTitle || "encotec";
    description =
      pageSEO?.metaDescription ||
      globalSEO.siteDescription ||
      "encotec | Asset Stewardship & Engineering";
  }

  if (
    slug &&
    slug !== "home" &&
    !title.includes("encotec") &&
    !title.includes("Encotec")
  ) {
    title = `${title} | Encotec`;
  }

  // Build head injections
  let headInjections = "\n    <!-- Server-Side SEO & Schema Injection -->\n";
  headInjections += `    <title>${title}</title>\n`;
  headInjections += `    <meta name="description" content="${description}" />\n`;

  const canonical =
    pageSEO?.canonicalUrl ||
    `https://encotec-six.vercel.app${urlPath.split("?")[0]}`;
  headInjections += `    <link rel="canonical" href="${canonical}" />\n`;

  if (pageSEO?.noIndex) {
    headInjections += `    <meta name="robots" content="noindex, nofollow" />\n`;
  }

  if (globalSEO.searchConsoleId) {
    headInjections += `    <meta name="google-site-verification" content="${globalSEO.searchConsoleId}" />\n`;
  }

  const favicon = globalSEO.favicon || "/febIcon.png";
  headInjections += `    <link rel="icon" href="${favicon}" />\n`;
  headInjections += `    <link rel="apple-touch-icon" href="${favicon}" />\n`;

  const ogTitle = pageSEO?.ogTitle || title;
  headInjections += `    <meta property="og:title" content="${ogTitle}" />\n`;

  const ogDescription = pageSEO?.ogDescription || description;
  headInjections += `    <meta property="og:description" content="${ogDescription}" />\n`;

  const ogImage =
    pageSEO?.ogImage || pageSEO?.featuredImage || globalSEO.favicon || "";
  if (ogImage) {
    headInjections += `    <meta property="og:image" content="${ogImage}" />\n`;
  }

  if (globalSEO.googleAnalyticsId) {
    headInjections += `    <script async src="https://www.googletagmanager.com/gtag/js?id=${globalSEO.googleAnalyticsId}"></script>\n`;
    headInjections += `    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${globalSEO.googleAnalyticsId}');
    </script>\n`;
  }

  if (globalSEO.gtmId) {
    headInjections += `    <script>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${globalSEO.gtmId}');
    </script>\n`;
  }

  if (globalSEO.schema) {
    headInjections += `    <script type="application/ld+json" id="global-schema-jsonld">${globalSEO.schema}</script>\n`;
  }

  if (pageSEO?.schema) {
    const schemaScriptId = `page-schema-${slug.replace(/\//g, "-")}`;
    headInjections += `    <script type="application/ld+json" id="${schemaScriptId}">${pageSEO.schema}</script>\n`;
  }

  if (globalSEO.customHeaderScripts) {
    headInjections += `    ${globalSEO.customHeaderScripts}\n`;
  }

  let bodyInjections = "";
  if (globalSEO.customFooterScripts) {
    bodyInjections += `\n    ${globalSEO.customFooterScripts}\n`;
  }

  let html = template;
  html = html.replace(/<title>[^]*?<\/title>/gi, "");
  if (globalSEO.favicon) {
    html = html.replace(
      /<link[^>]*rel=["'](icon|apple-touch-icon|shortcut icon)["'][^>]*>\s*/gi,
      "",
    );
  }
  html = html.replace(/<head>/i, `<head>${headInjections}`);

  if (bodyInjections) {
    html = html.replace(/<\/body>/i, `${bodyInjections}</body>`);
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(200).send(html);
}
