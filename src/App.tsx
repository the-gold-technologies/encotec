import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCMSStore } from "./store/useCMSStore";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { EngineeringServices } from "./pages/services/EngineeringServices";
import { ProjectManagement } from "./pages/services/ProjectManagement";
import { PowerGeneration } from "./pages/services/PowerGeneration";
import { TransmissionDistribution } from "./pages/services/TransmissionDistribution";
import { RenewableEnergy } from "./pages/services/RenewableEnergy";
import { AirportServices } from "./pages/services/AirportServices";
import { ValueAddedServices } from "./pages/services/ValueAddedServices";
import { Insights } from "./pages/Insights";
import { InsightDetail } from "./pages/insights/InsightDetail";
import { Contact } from "./pages/Contact";
import { Careers } from "./pages/Careers";
import { Certifications } from "./pages/Certifications";
import { Leadership } from "./pages/Leadership";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { CookiePolicy } from "./pages/CookiePolicy";
import { ScrollToTop } from "./components/ScrollToTop";

export function App() {
  const fetchGlobalSEO = useCMSStore((state) => state.fetchGlobalSEO);
  const globalSEO = useCMSStore((state) => state.globalSEO);

  useEffect(() => {
    fetchGlobalSEO();
  }, [fetchGlobalSEO]);

  useEffect(() => {
    if (!globalSEO) return;

    // 1. Apply Favicon
    let faviconLink = document.querySelector("link[rel*='icon']");
    if (globalSEO.favicon) {
      if (!faviconLink) {
        faviconLink = document.createElement("link");
        faviconLink.setAttribute("rel", "shortcut icon");
        document.head.appendChild(faviconLink);
      }
      faviconLink.setAttribute("href", globalSEO.favicon);
    } else if (faviconLink) {
      faviconLink.remove();
    }

    // 2. Apply Google Site Verification
    if (globalSEO.searchConsoleId) {
      let metaVerification = document.querySelector(
        'meta[name="google-site-verification"]',
      );
      if (!metaVerification) {
        metaVerification = document.createElement("meta");
        metaVerification.setAttribute("name", "google-site-verification");
        document.head.appendChild(metaVerification);
      }
      metaVerification.setAttribute("content", globalSEO.searchConsoleId);
    }

    // 3. Apply Google Analytics (GA4)
    if (globalSEO.googleAnalyticsId) {
      if (!document.getElementById("ga-script")) {
        const script1 = document.createElement("script");
        script1.id = "ga-script";
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${globalSEO.googleAnalyticsId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement("script");
        script2.id = "ga-init-script";
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${globalSEO.googleAnalyticsId}');
        `;
        document.head.appendChild(script2);
      }
    }

    // 4. Apply Google Tag Manager (GTM)
    if (globalSEO.gtmId) {
      if (!document.getElementById("gtm-script")) {
        const script = document.createElement("script");
        script.id = "gtm-script";
        script.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${globalSEO.gtmId}');
        `;
        document.head.appendChild(script);
      }
    }

    // Helper for custom HTML injection (script/style tags support)
    const injectHTML = (html: string, target: HTMLElement, prefix: string) => {
      if (!html) return;
      const injectionContainerId = `custom-injection-${prefix}`;
      let container = document.getElementById(injectionContainerId);
      if (container) {
        container.innerHTML = "";
      } else {
        container = document.createElement("div");
        container.id = injectionContainerId;
        container.style.display = "none";
        target.appendChild(container);
      }

      const temp = document.createElement("div");
      temp.innerHTML = html;
      Array.from(temp.childNodes).forEach((node) => {
        if (node.nodeName === "SCRIPT") {
          const script = document.createElement("script");
          Array.from((node as HTMLScriptElement).attributes).forEach((attr) => {
            script.setAttribute(attr.name, attr.value);
          });
          script.innerHTML = (node as HTMLScriptElement).innerHTML;
          container!.appendChild(script);
        } else {
          container!.appendChild(node.cloneNode(true));
        }
      });
    };

    // 5. Custom Header Scripts
    if (globalSEO.customHeaderScripts) {
      injectHTML(globalSEO.customHeaderScripts, document.head, "head");
    }

    // 6. Custom Footer Scripts
    if (globalSEO.customFooterScripts) {
      injectHTML(globalSEO.customFooterScripts, document.body, "body");
    }

    // 7. Global Schema JSON-LD
    const globalSchemaScriptId = "global-schema-jsonld";
    let globalSchemaScript = document.getElementById(globalSchemaScriptId);
    if (globalSEO.schema) {
      if (!globalSchemaScript) {
        globalSchemaScript = document.createElement("script");
        globalSchemaScript.id = globalSchemaScriptId;
        globalSchemaScript.setAttribute("type", "application/ld+json");
        document.head.appendChild(globalSchemaScript);
      }
      globalSchemaScript.innerHTML = globalSEO.schema;
    } else if (globalSchemaScript) {
      globalSchemaScript.remove();
    }
  }, [globalSEO]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/engineering" element={<EngineeringServices />} />
        <Route
          path="/services/project-management"
          element={<ProjectManagement />}
        />

        <Route
          path="/services/power-generation"
          element={<PowerGeneration />}
        />

        <Route
          path="/services/transmission-distribution"
          element={<TransmissionDistribution />}
        />

        <Route
          path="/services/renewable-energy"
          element={<RenewableEnergy />}
        />

        <Route
          path="/services/airport-services"
          element={<AirportServices />}
        />

        <Route path="/services/value-added" element={<ValueAddedServices />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
