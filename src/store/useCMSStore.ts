import { create } from "zustand";
import { useEffect } from "react";
import { defaultPagesMeta, defaultPageSections } from "./defaultData";

const API_BASE_URL = import.meta.env.VITE_CMS_API_URL || "";

interface PageState {
  loading: boolean;
  error: string | null;
  sections: Record<string, any>;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    targetKeywords?: string | null;
    canonicalUrl?: string | null;
    noIndex?: boolean;
    featuredImage?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: string | null;
    schema?: string | null;
    headingOptions?: any;
  } | null;
  fetched: boolean;
}

interface GlobalSEOData {
  siteTitle?: string | null;
  siteDescription?: string | null;
  favicon?: string | null;
  googleAnalyticsId?: string | null;
  gtmId?: string | null;
  searchConsoleId?: string | null;
  customHeaderScripts?: string | null;
  customFooterScripts?: string | null;
  socialLinks?: any[];
  canonicalOrdering?: string | null;
  schema?: string | null;
  headingOptions?: any;
}

interface CMSState {
  pages: Record<string, PageState>;
  globalSEO: GlobalSEOData | null;
  globalSEOFetched: boolean;
  fetchPage: (slug: string) => Promise<void>;
  fetchGlobalSEO: () => Promise<void>;
}

const slugMap: Record<string, string> = {
  "service/engineering": "engineering-services",
  "service/project-management": "project-management",
  "service/power-generation": "power-generation",
  "service/transmission-distribution": "transmission-distribution",
  "service/renewable-energy": "renewable-energy",
  "service/airport-services": "airport-services",
  "service/value-added": "value-added",
};

const reverseSlugMap: Record<string, string> = {};
for (const [key, value] of Object.entries(slugMap)) {
  reverseSlugMap[value] = key;
}

const getRelatedSlugs = (slug: string): string[] => {
  const list = [slug];
  if (slugMap[slug]) list.push(slugMap[slug]);
  if (reverseSlugMap[slug]) list.push(reverseSlugMap[slug]);
  return list;
};

export const useCMSStore = create<CMSState>((set, get) => ({
  pages: {},
  globalSEO: null,
  globalSEOFetched: false,
  fetchPage: async (slug: string) => {
    const relatedSlugs = getRelatedSlugs(slug);
    const alreadyFetchedOrLoading = relatedSlugs.some((s) => {
      const page = get().pages[s];
      return page?.loading || page?.fetched;
    });

    if (alreadyFetchedOrLoading) {
      const existingPage = relatedSlugs
        .map((s) => get().pages[s])
        .find((p) => p !== undefined);
      if (existingPage) {
        set((state) => {
          const newPages = { ...state.pages };
          relatedSlugs.forEach((s) => {
            if (!newPages[s]) {
              newPages[s] = existingPage;
            }
          });
          return { pages: newPages };
        });
      }
      return;
    }

    set((state) => {
      const newPages = { ...state.pages };
      relatedSlugs.forEach((s) => {
        newPages[s] = {
          loading: true,
          error: null,
          sections: state.pages[s]?.sections || {},
          seo: state.pages[s]?.seo || null,
          fetched: false,
        };
      });
      return { pages: newPages };
    });

    const mappedSlug = slugMap[slug] || slug;
    const apiSlug =
      mappedSlug === "value-added-services" ? "value-added" : mappedSlug;

    // Define defaults for fallback
    const defaultSections = defaultPageSections[apiSlug] || {};
    const defaultSeo = defaultPagesMeta[apiSlug]
      ? {
          metaTitle: defaultPagesMeta[apiSlug].metaTitle,
          metaDescription: defaultPagesMeta[apiSlug].metaDescription,
          targetKeywords: "",
          canonicalUrl: "",
          noIndex: false,
          featuredImage: "",
          ogTitle: "",
          ogDescription: "",
          ogImage: "",
          schema: "",
          headingOptions: {},
        }
      : null;

    try {
      const response = await fetch(`${API_BASE_URL}/api/pages/${apiSlug}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch page data: ${response.statusText}`);
      }
      const json = await response.json();
      if (!json.success || !json.data) {
        throw new Error(json.error || "Invalid API response format");
      }

      // Merge local default sections first, then override with CMS sections
      const sectionsMap: Record<string, any> = { ...defaultSections };
      if (Array.isArray(json.data.sections)) {
        for (const section of json.data.sections) {
          sectionsMap[section.type] = section.content;
        }
      }

      const mergedSeo = json.data.seo
        ? { ...defaultSeo, ...json.data.seo }
        : defaultSeo;

      set((state) => {
        const newPages = { ...state.pages };
        relatedSlugs.forEach((s) => {
          newPages[s] = {
            loading: false,
            error: null,
            sections: sectionsMap,
            seo: mergedSeo,
            fetched: true,
          };
        });
        return { pages: newPages };
      });
    } catch (err: any) {
      console.warn(
        `CMS Fetch Error for "${slug}":`,
        err.message,
        "- Falling back to mock/default data",
      );
      set((state) => {
        const newPages = { ...state.pages };
        relatedSlugs.forEach((s) => {
          newPages[s] = {
            loading: false,
            error: err.message || "Unknown error",
            sections:
              Object.keys(defaultSections).length > 0
                ? defaultSections
                : state.pages[s]?.sections || {},
            seo: defaultSeo || state.pages[s]?.seo || null,
            fetched: true,
          };
        });
        return { pages: newPages };
      });
    }
  },
  fetchGlobalSEO: async () => {
    if (get().globalSEOFetched) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/seo/global`);
      if (!response.ok) {
        throw new Error(`Failed to fetch global SEO: ${response.statusText}`);
      }
      const json = await response.json();
      if (json.success && json.data) {
        set({
          globalSEO: json.data,
          globalSEOFetched: true,
        });
      }
    } catch (err: any) {
      console.warn("CMS Global SEO Fetch Error:", err.message);
      set({
        globalSEO: {
          siteTitle: "encotec",
          siteDescription:
            "Engineering & Project Management Services - Member of Dornier Group",
          favicon: null,
          googleAnalyticsId: "G-CT894VPLS1",
          gtmId: "GTM-59DCSVDV",
          searchConsoleId: "4kD9H2fqRgqKEk",
          customHeaderScripts: null,
          customFooterScripts: null,
          socialLinks: [],
          canonicalOrdering: "default",
        },
        globalSEOFetched: true,
      });
    }
  },
}));

export function useSectionData<T>(
  pageSlug: string,
  sectionType: string,
  defaultData?: T,
): { data: T; loading: boolean; error: string | null } {
  const pageState = useCMSStore((state) => state.pages[pageSlug]);
  const fetchPage = useCMSStore((state) => state.fetchPage);

  useEffect(() => {
    if (!pageState) {
      fetchPage(pageSlug);
    }
  }, [pageSlug, pageState, fetchPage]);

  const loading = pageState?.loading ?? true;
  const error = pageState?.error ?? null;
  const sectionContent = pageState?.sections?.[sectionType];

  // Merge default data with CMS content if content is found, otherwise return defaultData
  // If defaultData is not provided, return sectionContent or a safe fallback empty object.
  const data = (
    sectionContent
      ? defaultData
        ? { ...defaultData, ...sectionContent }
        : sectionContent
      : defaultData || {}
  ) as T;

  return { data, loading, error };
}

export function usePageLoading(pageSlug: string): {
  loading: boolean;
  error: string | null;
} {
  const pageState = useCMSStore((state) => state.pages[pageSlug]);
  const fetchPage = useCMSStore((state) => state.fetchPage);

  useEffect(() => {
    if (!pageState) {
      fetchPage(pageSlug);
    }
  }, [pageSlug, pageState, fetchPage]);

  const loading = pageState?.loading ?? true;
  const error = pageState?.error ?? null;

  return { loading, error };
}
