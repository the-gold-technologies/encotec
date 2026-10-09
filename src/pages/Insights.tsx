import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ChevronRightIcon,
  MailIcon,
} from "lucide-react";
import { useSectionData } from "../store/useCMSStore";
import { useSEO } from "../hooks/useSEO";

// Animated Counter Component
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Hero Section
function InsightsHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const { data } = useSectionData<any>("insights", "InsightsHero");

  const tagline = data.tagline || data.heroTagline;
  const heroTitle = data.heroTitle || data.title;
  const heroSubtitle = data.heroSubtitle || data.subtitle || data.description;
  const bgImage = data.backgroundImage || data.heroImage || data.image;
  const tab1Label = data.tab1Label;
  const tab2Label = data.tab2Label;
  const tab3Label = data.tab3Label;

  return (
    <section className="relative min-h-[80vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center">
      {/* Parallax Background */}
      {bgImage && (
        <motion.div
          style={{
            y,
          }}
          className="absolute inset-0"
        >
          <img
            src={bgImage}
            alt={heroTitle || ""}
            className="w-full h-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/70 to-neutral-900" />
        </motion.div>
      )}

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,30,140,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(233,30,140,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 py-32">
        <motion.div
          style={{
            opacity,
          }}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="max-w-4xl"
        >
          {/* Label */}
          {tagline && (
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-[3px] bg-brand-pink" />
              <span className="text-sm font-bold tracking-[0.25em] text-brand-pink uppercase">
                {tagline}
              </span>
            </motion.div>
          )}

          {/* Headline */}
          {heroTitle && (
            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8"
            >
              {heroTitle}
            </motion.h1>
          )}

          {/* Subtitle */}
          {heroSubtitle && (
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.6,
              }}
              className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light mb-12"
            >
              {heroSubtitle}
            </motion.p>
          )}

          {/* Category Pills */}
          {(tab1Label || tab2Label || tab3Label) && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.8,
              }}
              className="flex flex-wrap gap-4"
            >
              {tab1Label && (
                <div className="px-6 py-2.5 bg-brand-pink/20 border border-brand-pink/30 text-brand-pink font-bold text-sm tracking-wider uppercase rounded-full">
                  {tab1Label}
                </div>
              )}
              {tab2Label && (
                <div className="px-6 py-2.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold text-sm tracking-wider uppercase rounded-full">
                  {tab2Label}
                </div>
              )}
              {tab3Label && (
                <div className="px-6 py-2.5 bg-green-500/20 border border-green-500/30 text-green-400 font-bold text-sm tracking-wider uppercase rounded-full">
                  {tab3Label}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Featured Insight Section
function FeaturedInsight() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]);
  const { data } = useSectionData<any>("insights", "FeaturedInsight");
  const { data: articlesData } = useSectionData<any>(
    "insights",
    "ArticlesList",
  );

  const articlesList = Array.isArray(articlesData?.articles)
    ? articlesData.articles
    : Array.isArray(articlesData?.items)
      ? articlesData.items
      : [];
  const firstArticle = articlesList[0];

  const badgeLabel = data.badgeLabel;
  const btnLabel = data.btnLabel || data.ctaLabel;
  const title = data.latestArticleTitle || data.title || firstArticle?.title;
  const summary =
    data.latestArticleSummary ||
    data.summary ||
    data.description ||
    firstArticle?.description;
  const slug = data.latestArticleSlug || data.slug || firstArticle?.slug;
  const image = data.latestArticleImage || data.image || firstArticle?.image;
  const date = data.latestArticleDate || data.date || firstArticle?.date;
  const location =
    data.latestArticleLocation || data.location || firstArticle?.location;

  if (!title) return null;

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="group relative w-full h-[600px] overflow-hidden bg-neutral-900 cursor-pointer"
        >
          {/* Parallax Image */}
          {image && (
            <motion.div
              style={{
                y,
              }}
              className="absolute inset-0 h-[120%] -top-[10%]"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
            </motion.div>
          )}

          {/* Content */}
          <Link
            to={slug ? `/insights/${slug}` : "/insights"}
            className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end"
          >
            <div className="max-w-3xl">
              {badgeLabel && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-pink text-white text-xs font-bold tracking-wider uppercase mb-6">
                  {badgeLabel}
                </div>
              )}
              <h2 className="text-4xl md:text-6xl font-black text-brand-pink mb-6 leading-tight tracking-tight group-hover:opacity-90 transition-opacity duration-300">
                {title}
              </h2>
              {summary && (
                <p className="text-xl text-neutral-300 mb-8 leading-relaxed max-w-2xl">
                  {summary}
                </p>
              )}

              <div className="flex items-center gap-6 text-sm font-medium text-neutral-400 mb-8">
                {date && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} />
                    {date}
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2">
                    <MapPinIcon size={16} />
                    {location}
                  </div>
                )}
              </div>

              {btnLabel && (
                <button className="inline-flex items-center gap-2 text-sm font-bold text-white hover:gap-4 transition-all duration-300 uppercase tracking-wider">
                  {btnLabel}
                  <ArrowRightIcon size={16} className="text-brand-pink" />
                </button>
              )}
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Reusable Insight Card (matches Image 2 style)
function InsightCardItem({ item }: { item: any }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Case Study":
        return "bg-brand-pink text-white";
      case "News":
        return "bg-blue-500 text-white";
      case "Blog":
        return "bg-emerald-600 text-white";
      default:
        return "bg-neutral-800 text-white";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group bg-white border border-neutral-200 hover:border-brand-pink/40 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl"
    >
      <Link to={`/insights/${item.slug}`} className="flex flex-col h-full">
        {/* Photo with top-left badge */}
        {item.image && (
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
            <img
              src={item.image}
              alt={item.title || ""}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {item.category && (
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(
                    item.category,
                  )}`}
                >
                  {item.category}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-7 flex flex-col flex-grow">
          {/* Meta icons */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500 mb-4">
            {item.date && (
              <div className="flex items-center gap-1.5">
                <CalendarIcon size={14} className="text-neutral-400" />
                <span>{item.date}</span>
              </div>
            )}
            {item.location && (
              <div className="flex items-center gap-1.5">
                <MapPinIcon size={14} className="text-neutral-400" />
                <span>{item.location}</span>
              </div>
            )}
            {item.readTime && (
              <div className="flex items-center gap-1.5">
                <ClockIcon size={14} className="text-neutral-400" />
                <span>{item.readTime}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-black text-brand-pink mb-3 text-lg md:text-xl uppercase tracking-tight group-hover:opacity-90 transition-opacity duration-300 line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {/* Description */}
          {item.description && (
            <p className="text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
              {item.description}
            </p>
          )}

          {/* Read More button */}
          <div className="mt-auto pt-4 border-t border-neutral-100">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-pink group-hover:gap-2.5 transition-all duration-300 uppercase tracking-wider">
              <span>Read More</span>
              <ChevronRightIcon size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Content Grid Section - Displays Categorized Sections with "View All" links
function ContentGrid() {
  const { data: articlesData } = useSectionData<any>(
    "insights",
    "ArticlesList",
  );

  const displayArticles: any[] = Array.isArray(articlesData?.articles)
    ? articlesData.articles
    : Array.isArray(articlesData?.items)
      ? articlesData.items
      : [];

  const caseStudies = displayArticles.filter(
    (item: any) => item?.category === "Case Study",
  );

  const newsItems = displayArticles.filter(
    (item: any) => item?.category === "News",
  );

  const blogItems = displayArticles.filter(
    (item: any) => item?.category === "Blog",
  );

  const caseTagline = articlesData?.caseStudiesTagline || "";
  const caseHeading = articlesData?.caseStudiesHeading || "";
  const caseSubtitle = articlesData?.caseStudiesSubtitle || "";
  const caseViewAll = articlesData?.caseStudiesViewAllText || "";

  const newsTagline = articlesData?.newsTagline || "";
  const newsHeading = articlesData?.newsHeading || "";
  const newsSubtitle = articlesData?.newsSubtitle || "";
  const newsViewAll = articlesData?.newsViewAllText || "";

  const blogTagline = articlesData?.blogsTagline || "";
  const blogHeading = articlesData?.blogsHeading || "";
  const blogSubtitle = articlesData?.blogsSubtitle || "";
  const blogViewAll = articlesData?.blogsViewAllText || "";

  return (
    <section className="py-20 bg-neutral-50 space-y-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* --- 1. CASE STUDIES SECTION --- */}
        {caseStudies.length > 0 && (
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-200">
              <div>
                {caseTagline && (
                  <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase block mb-2">
                    {caseTagline}
                  </span>
                )}
                {caseHeading && (
                  <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
                    {caseHeading}
                  </h2>
                )}
                {caseSubtitle && (
                  <p className="text-neutral-500 text-sm mt-1 max-w-xl">
                    {caseSubtitle}
                  </p>
                )}
              </div>

              <Link
                to="/insights/case-studies"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-pink/10 hover:bg-brand-pink text-brand-pink hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0"
              >
                <span>
                  {caseViewAll} ({caseStudies.length})
                </span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.slice(0, 3).map((item) => (
                <InsightCardItem key={item.id || item.slug} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* --- 2. NEWS & UPDATES SECTION --- */}
        {newsItems.length > 0 && (
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-200">
              <div>
                {newsTagline && (
                  <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase block mb-2">
                    {newsTagline}
                  </span>
                )}
                {newsHeading && (
                  <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
                    {newsHeading}
                  </h2>
                )}
                {newsSubtitle && (
                  <p className="text-neutral-500 text-sm mt-1 max-w-xl">
                    {newsSubtitle}
                  </p>
                )}
              </div>

              <Link
                to="/insights/news-updates"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0"
              >
                <span>
                  {newsViewAll} ({newsItems.length})
                </span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.slice(0, 3).map((item) => (
                <InsightCardItem key={item.id || item.slug} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* --- 3. BLOGS & ARTICLES SECTION --- */}
        {blogItems.length > 0 && (
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-200">
              <div>
                {blogTagline && (
                  <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase block mb-2">
                    {blogTagline}
                  </span>
                )}
                {blogHeading && (
                  <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
                    {blogHeading}
                  </h2>
                )}
                {blogSubtitle && (
                  <p className="text-neutral-500 text-sm mt-1 max-w-xl">
                    {blogSubtitle}
                  </p>
                )}
              </div>

              <Link
                to="/insights/blogs-articles"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0"
              >
                <span>
                  {blogViewAll} ({blogItems.length})
                </span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogItems.slice(0, 3).map((item) => (
                <InsightCardItem key={item.id || item.slug} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Stats Banner
function StatsBanner() {
  const { data } = useSectionData<any>("insights", "InsightsStats");

  const rawStats = Array.isArray(data?.stats)
    ? data.stats
    : Array.isArray(data?.statsList)
      ? data.statsList
      : null;

  let stats: Array<{ value: number | string; suffix: string; label: string }> =
    [];

  if (rawStats && rawStats.length > 0) {
    stats = rawStats.map((s: any) => {
      const match = String(s.value || "").match(/^([\d,]+)(.*)$/);
      const num = match ? parseInt(match[1].replace(/,/g, ""), 10) : NaN;
      const suffix = match ? match[2] : "";
      return {
        value: !isNaN(num) ? num : s.value || "",
        suffix,
        label: String(s.label || ""),
      };
    });
  } else if (data) {
    const legacyKeys = [1, 2, 3, 4];
    legacyKeys.forEach((i) => {
      const valStr = String(
        data[`stat${i}Value`] || data[`stats${i}Value`] || "",
      );
      const sufStr = String(
        data[`stat${i}Suffix`] || data[`stats${i}Suffix`] || "",
      );
      const labelStr = String(
        data[`stat${i}Label`] || data[`stats${i}Label`] || "",
      );
      if (valStr || labelStr) {
        const num = parseInt(valStr.replace(/,/g, ""), 10);
        stats.push({
          value: !isNaN(num) ? num : valStr,
          suffix: sufStr,
          label: labelStr,
        });
      }
    });
  }

  if (stats.length === 0) return null;

  return (
    <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-pink blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-brand-pink mb-2">
                {typeof stat.value === "number" ? (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                ) : (
                  `${stat.value}${stat.suffix}`
                )}
              </div>
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter Section
function NewsletterSection() {
  const { data } = useSectionData<any>("insights", "NewsletterSection");

  const tagline = data.tagline;
  const heading = data.heading || data.title;
  const description = data.description;
  const privacyNote = data.privacyNote;

  if (!heading) return null;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="w-16 h-16 bg-brand-panel rounded-2xl flex items-center justify-center text-brand-pink mx-auto mb-8">
            <MailIcon size={32} strokeWidth={1.5} />
          </div>

          {tagline && (
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-brand-pink" />
              <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                {tagline}
              </span>
              <div className="w-8 h-[2px] bg-brand-pink" />
            </div>
          )}

          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
            {heading}
          </h2>
          {description && (
            <p className="text-xl text-neutral-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}

          <form
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
              required
            />

            <button
              type="submit"
              className="px-8 py-4 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          {privacyNote && (
            <p className="text-xs text-neutral-400 mt-4">{privacyNote}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const { data } = useSectionData<any>("insights", "InsightsCTA");

  const ctaHeading = data.ctaHeading || data.heading;
  const ctaSubtitle = data.ctaSubtitle || data.subtitle;
  const primaryBtnLabel = data.primaryBtnLabel || data.primaryLabel;
  const primaryBtnUrl = data.primaryBtnUrl || data.primaryUrl || "/contact";
  const secondaryBtnLabel = data.secondaryBtnLabel || data.secondaryLabel;
  const secondaryBtnUrl =
    data.secondaryBtnUrl || data.secondaryUrl || "/services";

  if (!ctaHeading) return null;

  return (
    <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-pink rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {ctaHeading}
          </h2>
          {ctaSubtitle && (
            <p className="text-xl text-neutral-300 mb-12 leading-relaxed">
              {ctaSubtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryBtnLabel && (
              <Link
                to={primaryBtnUrl}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300"
              >
                {primaryBtnLabel}
                <ArrowRightIcon size={16} />
              </Link>
            )}
            {secondaryBtnLabel && (
              <Link
                to={secondaryBtnUrl}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-bold tracking-wider uppercase hover:bg-white hover:text-neutral-900 transition-all duration-300"
              >
                {secondaryBtnLabel}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Component
export function Insights() {
  useSEO("insights");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation />

      <InsightsHero />
      <FeaturedInsight />
      <ContentGrid />
      <StatsBanner />
      <NewsletterSection />
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
