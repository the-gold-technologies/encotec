import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation";
import { Footer } from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  NewspaperIcon,
} from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";
import { useSEO } from "../../hooks/useSEO";

export function NewsUpdatesPage() {
  useSEO("insights/news-updates");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const { data: heroData } = useSectionData<any>("insights", "InsightsHero");
  const { data: articlesData } = useSectionData<any>(
    "insights",
    "ArticlesList",
  );

  const allArticles: any[] = Array.isArray(articlesData?.articles)
    ? articlesData.articles
    : Array.isArray(articlesData?.items)
      ? articlesData.items
      : [];

  const newsList = allArticles.filter((item: any) => item?.category === "News");

  const featuredNews = newsList[0];
  const remainingNews = newsList.slice(1);

  const bgImage =
    heroData?.newsBackgroundImage ||
    articlesData?.newsBackgroundImage ||
    heroData?.backgroundImage ||
    "";
  const tagline = articlesData?.newsTagline || "";
  const heading = articlesData?.newsHeading || "";
  const subtitle = articlesData?.newsSubtitle || "";
  const moreHeading = articlesData?.newsMoreHeading || "";
  const moreSubtitle = articlesData?.newsMoreSubtitle || "";

  const ctaTagline = articlesData?.newsCtaTagline || "";
  const ctaHeading = articlesData?.newsCtaHeading || "";
  const ctaDescription = articlesData?.newsCtaDescription || "";
  const ctaButtonText = articlesData?.newsCtaButtonText || "";
  const ctaButtonLink = articlesData?.newsCtaButtonLink || "/contact";

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-brand-pink selection:text-white">
      <Navigation />

      {/* Signature Encotec Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[75vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center">
        {/* Parallax Background */}
        {bgImage && (
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img
              src={bgImage}
              alt={heading || ""}
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/70 to-neutral-900" />
          </motion.div>
        )}

        {/* Pink Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(233,30,140,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(233,30,140,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 py-32 w-full">
          <motion.div
            style={{ opacity: heroOpacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8 font-medium">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRightIcon size={13} className="text-neutral-600" />
              <Link
                to="/insights"
                className="hover:text-white transition-colors"
              >
                Insights
              </Link>
              <ChevronRightIcon size={13} className="text-neutral-600" />
              <span className="text-blue-400 font-semibold">
                News & Updates
              </span>
            </nav>

            {/* Pink Accent Line + Tagline */}
            {tagline && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[3px] bg-brand-pink" />
                <span className="text-sm font-bold tracking-[0.25em] text-brand-pink uppercase">
                  {tagline}
                </span>
              </div>
            )}

            {/* Display Headline */}
            {heading && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                {heading}
              </h1>
            )}

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light mb-10 max-w-3xl">
                {subtitle}
              </p>
            )}

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/insights"
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 border border-white/10 transition-colors"
              >
                All Insights
              </Link>
              <Link
                to="/insights/case-studies"
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 border border-white/10 transition-colors"
              >
                Case Studies
              </Link>
              <Link
                to="/insights/news-updates"
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md transition-colors"
              >
                News & Updates ({newsList.length})
              </Link>
              <Link
                to="/insights/blogs-articles"
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 border border-white/10 transition-colors"
              >
                Blogs & Articles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="bg-neutral-50 py-16 md:py-24 flex-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* 1. TOP FEATURED CARD (Image 1 Style) */}
          {featuredNews && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  <NewspaperIcon size={16} className="text-blue-600" />
                  <span>Featured Announcement</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="group relative w-full min-h-[500px] md:h-[600px] overflow-hidden bg-neutral-900 cursor-pointer shadow-2xl"
              >
                {/* Background Photo with Gradient */}
                {featuredNews.image && (
                  <div className="absolute inset-0 h-[120%] -top-[10%]">
                    <img
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />
                  </div>
                )}

                {/* Content Overlay */}
                <Link
                  to={`/insights/${featuredNews.slug}`}
                  className="absolute inset-0 p-8 md:p-14 lg:p-16 flex flex-col justify-end"
                >
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold tracking-wider uppercase mb-6 shadow-md">
                      News & Updates
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-pink mb-6 leading-tight tracking-tight group-hover:opacity-90 transition-opacity duration-300">
                      {featuredNews.title}
                    </h2>

                    {featuredNews.description && (
                      <p className="text-base md:text-xl text-neutral-300 mb-8 leading-relaxed max-w-2xl font-light">
                        {featuredNews.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-neutral-400 mb-8">
                      {featuredNews.date && (
                        <div className="flex items-center gap-2">
                          <CalendarIcon
                            size={16}
                            className="text-neutral-400"
                          />
                          <span>{featuredNews.date}</span>
                        </div>
                      )}
                      {featuredNews.location && (
                        <div className="flex items-center gap-2">
                          <MapPinIcon size={16} className="text-neutral-400" />
                          <span>{featuredNews.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-4 transition-all duration-300 uppercase tracking-wider">
                      <span>Read Full Story</span>
                      <ArrowRightIcon size={16} className="text-brand-pink" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          )}

          {/* 2. REMAINING CARDS GRID (Image 2 Style) */}
          {remainingNews.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-neutral-200">
                <div>
                  {moreHeading && (
                    <h3 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">
                      {moreHeading}
                    </h3>
                  )}
                  {moreSubtitle && (
                    <p className="text-sm text-neutral-500 mt-1">
                      {moreSubtitle}
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {remainingNews.length}{" "}
                  {remainingNews.length === 1 ? "Story" : "Stories"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingNews.map((news: any, idx: number) => (
                  <motion.div
                    key={news.id || news.slug || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="group bg-white border border-neutral-200 hover:border-brand-pink/40 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
                  >
                    <Link
                      to={`/insights/${news.slug}`}
                      className="flex flex-col h-full"
                    >
                      {/* Photo with top-left badge */}
                      {news.image && (
                        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                          <img
                            src={news.image}
                            alt={news.title || ""}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                              News
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-7 flex flex-col flex-grow">
                        {/* Meta icons */}
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500 mb-4">
                          {news.date && (
                            <div className="flex items-center gap-1.5">
                              <CalendarIcon
                                size={14}
                                className="text-neutral-400"
                              />
                              <span>{news.date}</span>
                            </div>
                          )}
                          {news.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPinIcon
                                size={14}
                                className="text-neutral-400"
                              />
                              <span>{news.location}</span>
                            </div>
                          )}
                          {news.readTime && (
                            <div className="flex items-center gap-1.5">
                              <ClockIcon
                                size={14}
                                className="text-neutral-400"
                              />
                              <span>{news.readTime}</span>
                            </div>
                          )}
                        </div>

                        {/* Bold Uppercase Pink Title */}
                        <h4 className="font-black text-brand-pink mb-3 text-lg md:text-xl uppercase tracking-tight group-hover:opacity-90 transition-opacity duration-300 line-clamp-2 leading-snug">
                          {news.title}
                        </h4>

                        {/* Description */}
                        {news.description && (
                          <p className="text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
                            {news.description}
                          </p>
                        )}

                        {/* Read More Button */}
                        <div className="mt-auto pt-4 border-t border-neutral-100">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-pink group-hover:gap-2.5 transition-all duration-300 uppercase tracking-wider">
                            <span>Read More</span>
                            <ChevronRightIcon size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {newsList.length === 0 && (
            <div className="text-center py-24 bg-white border border-neutral-200">
              <NewspaperIcon
                size={48}
                className="mx-auto mb-4 text-neutral-400"
              />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                No News Articles Found
              </h3>
              <p className="text-sm text-neutral-500">
                Check back shortly for new company announcements.
              </p>
            </div>
          )}

          {/* Media Enquiries Banner */}
          {ctaHeading && (
            <div className="mt-24 p-8 md:p-14 bg-neutral-900 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-blue-600 shadow-xl">
              <div className="max-w-xl">
                {ctaTagline && (
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
                    {ctaTagline}
                  </span>
                )}
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-3">
                  {ctaHeading}
                </h3>
                {ctaDescription && (
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {ctaDescription}
                  </p>
                )}
              </div>

              {ctaButtonText && (
                <Link
                  to={ctaButtonLink}
                  className="px-8 py-4 bg-brand-pink hover:bg-[#a0004f] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-lg shrink-0"
                >
                  {ctaButtonText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
