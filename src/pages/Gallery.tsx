import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRightIcon,
  MapPinIcon,
  XIcon,
  FlameIcon,
  ZapIcon,
  LayersIcon,
  GlobeIcon,
  ShieldCheckIcon,
  CameraIcon,
  FilterIcon,
  PlaneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useSectionData } from "../store/useCMSStore";
import { useSEO } from "../hooks/useSEO";

// Category Icon Helper
function getCategoryIcon(cat: string) {
  switch (cat) {
    case "Thermal Power":
      return <FlameIcon size={14} className="text-amber-500" />;
    case "Renewables":
      return <ZapIcon size={14} className="text-emerald-500" />;
    case "Transmission & Grid":
      return <LayersIcon size={14} className="text-blue-500" />;
    case "O&M & Field Engineering":
      return <ShieldCheckIcon size={14} className="text-pink-500" />;
    case "Aviation & Industrial":
      return <PlaneIcon size={14} className="text-sky-400" />;
    case "Global Sourcing":
      return <GlobeIcon size={14} className="text-purple-500" />;
    default:
      return <CameraIcon size={14} className="text-brand-pink" />;
  }
}

// --- Hero Section ---
function GalleryHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const { data } = useSectionData<any>("gallery", "GalleryHero");

  const tagline = data?.tagline || "";
  const heroTitle = data?.heroTitle || "";
  const heroSubtitle = data?.heroSubtitle || "";
  const bgImage = data?.backgroundImage || "";
  const tab1Label = data?.tab1Label || "";
  const tab2Label = data?.tab2Label || "";
  const tab3Label = data?.tab3Label || "";

  return (
    <section className="relative min-h-[80vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center">
      {/* Parallax Background */}
      {bgImage && (
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src={bgImage}
            alt={heroTitle}
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
          style={{ opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Label */}
          {tagline && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8"
            >
              {heroTitle}
            </motion.h1>
          )}

          {/* Subtitle */}
          {heroSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light mb-12"
            >
              {heroSubtitle}
            </motion.p>
          )}

          {/* Category Pills */}
          {(tab1Label || tab2Label || tab3Label) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
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

// --- Gallery Grid with Filter & Lightbox (Image-Centric Photography Showcase) ---
function GalleryGrid() {
  const { data } = useSectionData<any>("gallery", "GalleryGrid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tagline = data?.tagline || "";
  const heading = data?.heading || "";
  const sectionSubtitle = data?.sectionSubtitle || "";
  const categories: string[] = Array.isArray(data?.categories)
    ? data.categories
    : [];
  const items: any[] = Array.isArray(data?.items) ? data.items : [];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item: any) => item?.category === activeCategory);

  const currentLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0,
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section className="py-24 bg-neutral-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header with Prominent Title */}
        {(tagline || heading || sectionSubtitle) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              {tagline && (
                <div className="flex items-center gap-2 mb-3">
                  <CameraIcon size={16} className="text-brand-pink" />
                  <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                    {tagline}
                  </span>
                </div>
              )}
              {heading && (
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">
                  {heading}
                </h2>
              )}
            </div>
            {sectionSubtitle && (
              <p className="text-neutral-500 text-sm max-w-md font-light leading-relaxed">
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        {/* Filter Pills */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
            <div className="flex items-center gap-2 shrink-0 pr-2 border-r border-neutral-200 mr-2 text-neutral-400 text-xs font-medium">
              <FilterIcon size={14} />
              <span>Filter:</span>
            </div>
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? "bg-brand-pink text-white shadow-md shadow-brand-pink/20"
                    : "bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                {cat !== "All" && getCategoryIcon(cat)}
                <span>{cat}</span>
                {activeCategory === cat && (
                  <span className="ml-1 text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">
                    {filteredItems.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Visual Photography Grid - Pure Image-Centric Showcase */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item: any, idx: number) => (
              <motion.div
                layout
                key={item?.id ?? idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-brand-pink/10 transition-all duration-500"
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Full-bleed Photo */}
                {item?.image && (
                  <img
                    src={item.image}
                    alt={item?.title || ""}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                )}

                {/* Vignette Gradient Overlay (only if text exists) */}
                {(item?.title || item?.location) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
                )}

                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  {item?.category && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5 shadow-sm">
                      {getCategoryIcon(item.category)}
                      {item.category}
                    </span>
                  )}

                  {item?.tag && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-pink text-white backdrop-blur-md shadow-sm">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Bottom Information (Title and Location only - description is reserved for modal) */}
                {(item?.title || item?.location) && (
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end">
                    {item?.title && (
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-brand-pink transition-colors leading-snug line-clamp-2 drop-shadow-md">
                        {item.title}
                      </h3>
                    )}

                    {item?.location && (
                      <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium mt-1.5 drop-shadow">
                        <MapPinIcon
                          size={12}
                          className="text-brand-pink shrink-0"
                        />
                        <span className="truncate">{item.location}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-neutral-400 text-sm">
            No projects found in this category.
          </div>
        )}
      </div>

      {/* Premium Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto p-4 md:p-6 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar: Floating Glass Header (Matched to max-w-4xl) */}
            <div
              className="w-full max-w-4xl mx-auto px-1 pt-2 pb-2 flex items-center justify-between z-30 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-neutral-300 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-sm">
                  <span>Photo</span>
                  <span className="text-white font-bold">
                    {(lightboxIndex ?? 0) + 1}
                  </span>
                  <span className="text-neutral-500 font-normal">/</span>
                  <span className="text-neutral-400 font-normal">
                    {filteredItems.length}
                  </span>
                </span>

                {currentLightboxItem?.category && (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-pink/20 text-brand-pink border border-brand-pink/30 flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                    {getCategoryIcon(currentLightboxItem.category)}
                    <span>{currentLightboxItem.category}</span>
                  </span>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-brand-pink text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/15 hover:rotate-90 shadow-xl active:scale-95"
                aria-label="Close photo viewer"
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Central Column: Photo Frame and Info Card with EXACT IDENTICAL WIDTH */}
            <div
              className="relative max-w-4xl w-full mx-auto my-auto flex flex-col gap-3 md:gap-4 z-20 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Frame */}
              <div className="relative w-full aspect-[16/10] max-h-[56vh] rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl flex items-center justify-center group/viewer">
                {currentLightboxItem?.image && (
                  <motion.img
                    key={currentLightboxItem?.id || currentLightboxItem?.image}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    src={currentLightboxItem.image}
                    alt={currentLightboxItem?.title || ""}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Prev Button */}
                {filteredItems.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) =>
                        prev !== null && prev > 0
                          ? prev - 1
                          : filteredItems.length - 1,
                      );
                    }}
                    className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-brand-pink text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl hover:scale-105 active:scale-95 group"
                    aria-label="Previous photo"
                  >
                    <ChevronLeftIcon
                      size={24}
                      className="group-hover:-translate-x-0.5 transition-transform"
                    />
                  </button>
                )}

                {/* Next Button */}
                {filteredItems.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) =>
                        prev !== null && prev < filteredItems.length - 1
                          ? prev + 1
                          : 0,
                      );
                    }}
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-brand-pink text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl hover:scale-105 active:scale-95 group"
                    aria-label="Next photo"
                  >
                    <ChevronRightIcon
                      size={24}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                )}
              </div>

              {/* Bottom Information Card - 100% MATCHING WIDTH TO PHOTO FRAME */}
              {(currentLightboxItem?.title ||
                currentLightboxItem?.description ||
                currentLightboxItem?.location ||
                currentLightboxItem?.tag) && (
                <div className="w-full bg-neutral-900/85 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl">
                  {/* Top Meta: Tag & Location */}
                  {(currentLightboxItem?.tag ||
                    currentLightboxItem?.location) && (
                    <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                      {currentLightboxItem?.tag && (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-brand-pink text-white shadow-sm">
                          {currentLightboxItem.tag}
                        </span>
                      )}
                      {currentLightboxItem?.location && (
                        <span className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
                          <MapPinIcon
                            size={13}
                            className="text-brand-pink shrink-0"
                          />
                          <span>{currentLightboxItem.location}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  {currentLightboxItem?.title && (
                    <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight leading-snug">
                      {currentLightboxItem.title}
                    </h3>
                  )}

                  {/* Detailed Description */}
                  {currentLightboxItem?.description && (
                    <p className="text-xs md:text-sm text-neutral-300 font-normal leading-relaxed mt-2 max-w-3xl">
                      {currentLightboxItem.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// --- CTA Section ---
function GalleryCTA() {
  const { data } = useSectionData<any>("gallery", "GalleryCTA");
  const heading = data?.heading || "";
  const description = data?.description || "";
  const buttonText = data?.buttonText || "";
  const buttonLink = data?.buttonLink || "";

  if (!heading && !description) return null;

  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-light/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {heading && (
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            {heading}
          </h2>
        )}
        {description && (
          <p className="text-base md:text-lg text-neutral-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>
        )}
        {buttonText && (
          <Link
            to={buttonLink || "#"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] hover:gap-3 transition-all duration-300 shadow-xl shadow-brand-pink/20"
          >
            <span>{buttonText}</span>
            <ArrowRightIcon size={16} />
          </Link>
        )}
      </div>
    </section>
  );
}

// --- Main Gallery Page Component ---
export function Gallery() {
  useSEO("gallery");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <GalleryHero />

      {/* Photography Portfolio Grid */}
      <GalleryGrid />

      {/* CTA */}
      <GalleryCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
