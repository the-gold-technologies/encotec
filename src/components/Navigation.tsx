import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Compass,
  HardHat,
  Zap,
  TrendingUp,
  ShieldCheck,
  Globe,
  Settings,
  ClipboardCheck,
  Package,
  Layers,
  Wrench,
  Activity,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionData } from "../store/useCMSStore";

interface NavigationProps {
  variant?: "light" | "dark";
}

const SERVICE_PATH_ICON_MAP: Record<string, any> = {
  "/services/project-management": Compass,
  "/services/construction-commissioning": HardHat,
  "/services/power-generation": Zap,
  "/services/technical-advisory": TrendingUp,
  "/services/due-diligence": ShieldCheck,
  "/services/value-added": Globe,
};

const ICON_MAP: Record<string, any> = {
  Compass,
  HardHat,
  Zap,
  TrendingUp,
  ShieldCheck,
  Globe,
  Settings,
  ClipboardCheck,
  Package,
  Layers,
  Wrench,
  Activity,
  Target,
};

const BADGE_COLOR_PALETTE = [
  "bg-rose-50 text-rose-600",
  "bg-amber-50 text-amber-600",
  "bg-blue-50 text-blue-600",
  "bg-emerald-50 text-emerald-600",
  "bg-teal-50 text-teal-600",
  "bg-purple-50 text-purple-600",
];

export function Navigation({ variant = "light" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Fetch services dynamically from CMS CoreServices section
  const { data: cmsServicesData } = useSectionData<any>(
    "services",
    "CoreServices",
  );

  const servicesList: Array<{
    title: string;
    path: string;
    desc: string;
    icon: any;
    lightBg: string;
  }> = Array.isArray(cmsServicesData?.services)
    ? cmsServicesData.services.map((service: any, index: number) => {
        const path = service.link || "/services";
        const Icon =
          SERVICE_PATH_ICON_MAP[path] ||
          (service.icon && ICON_MAP[service.icon]) ||
          Compass;
        return {
          title: service.title || "",
          path: path,
          desc: service.overview || "",
          icon: Icon,
          lightBg: BADGE_COLOR_PALETTE[index % BADGE_COLOR_PALETTE.length],
        };
      })
    : [];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Close desktop dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  const getLinkClass = (path: string) => {
    const isActive =
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path);
    if (isActive) return "text-sm font-medium text-brand-pink";
    return variant === "dark"
      ? "text-sm font-medium text-neutral-300 hover:text-white transition-colors"
      : "text-sm font-medium text-neutral-700 hover:text-brand-pink transition-colors";
  };

  const getMobileLinkClass = (path: string) => {
    const isActive =
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path);
    return isActive
      ? "text-lg font-bold text-brand-pink"
      : "text-lg font-bold text-neutral-900 hover:text-brand-pink transition-colors";
  };

  return (
    <>
      {/* ── Nav bar ───────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-10 py-4 flex justify-between items-center border-b ${
          variant === "dark"
            ? "bg-neutral-900/90 backdrop-blur-md border-white/10"
            : "bg-white border-neutral-100"
        }`}
      >
        <Link to="/" className="flex items-center">
          <img
            src="/encotec-logo.png"
            alt="Encotec home"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${
              variant === "dark"
                ? "border-white/20 text-neutral-300"
                : "border-neutral-200 text-neutral-600"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            SINCE 2009
          </div>
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/about" className={getLinkClass("/about")}>
            About
          </Link>

          {/* Services with Dropdown */}
          <div
            className="relative flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                servicesOpen
                  ? "bg-neutral-100 text-brand-pink"
                  : location.pathname.startsWith("/services")
                    ? "text-brand-pink"
                    : variant === "dark"
                      ? "text-neutral-300 hover:text-white"
                      : "text-neutral-700 hover:text-brand-pink"
              }`}
            >
              <Link
                to="/services"
                className="text-sm font-medium"
                onClick={() => setServicesOpen(false)}
              >
                Services
              </Link>
              <button
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                className={`p-0.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180 text-brand-pink" : ""
                }`}
                aria-label="Toggle Services dropdown"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, x: "-50%", scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                  exit={{ opacity: 0, y: -4, x: "-50%", scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  style={{ backgroundColor: "#ffffff" }}
                  className="absolute top-[calc(100%+36px)] left-1/2 w-[390px] p-3.5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-neutral-100 z-[60]"
                >
                  {/* Invisible bridge over the gap to prevent mouse leave */}
                  <div className="absolute -top-[36px] left-0 right-0 h-[36px]" />

                  {/* Service Items (Single Column with Tinted Icon Badges) */}
                  <div className="flex flex-col space-y-1">
                    {servicesList.map((service) => {
                      const isActive = location.pathname === service.path;
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.path}
                          to={service.path}
                          onClick={() => setServicesOpen(false)}
                          className={`group flex items-center gap-3.5 p-2.5 rounded-2xl transition-all duration-150 ${
                            isActive
                              ? "bg-neutral-100/90 text-brand-pink"
                              : "hover:bg-neutral-50 text-neutral-900"
                          }`}
                        >
                          <div
                            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${service.lightBg}`}
                          >
                            <Icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`text-[13.5px] font-bold leading-snug line-clamp-1 transition-colors ${
                                isActive
                                  ? "text-brand-pink"
                                  : "text-neutral-900 group-hover:text-brand-pink"
                              }`}
                            >
                              {service.title}
                            </h4>
                            <p className="text-[11.5px] text-neutral-500 leading-tight line-clamp-1 mt-0.5 font-normal">
                              {service.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Clean All Services Footer Link */}
                  <div className="mt-2 pt-2 border-t border-neutral-100">
                    <Link
                      to="/services"
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:text-brand-pink hover:bg-neutral-50 transition-colors"
                    >
                      <span>All Services Overview</span>
                      <ArrowRight size={14} className="text-brand-pink" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/insights" className={getLinkClass("/insights")}>
            Insights
          </Link>
          <Link to="/careers" className={getLinkClass("/careers")}>
            Careers
          </Link>
          <Link to="/leadership" className={getLinkClass("/leadership")}>
            Leadership
          </Link>
        </div>

        {/* Desktop contact CTA */}
        <Link
          to="/contact"
          className="hidden lg:inline-flex px-6 py-2.5 bg-brand-pink text-white text-xs font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300"
        >
          Contact Us
        </Link>

        {/* Hamburger — always on top of the overlay */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className={`lg:hidden w-10 h-10 flex items-center justify-center z-[120] relative ${
            variant === "dark" ? "text-white" : "text-neutral-900"
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Mobile overlay — rendered as a SIBLING to <nav> ────────
          This breaks it out of the nav's stacking context so the
          backdrop and panel truly cover all page content.           */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* 70% wide panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[110] lg:hidden flex flex-col"
            >
              {/* Panel header — logo + close in one row */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                <img
                  src="/encotec-logo.png"
                  alt="Encotec"
                  className="h-7 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-brand-pink transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 flex flex-col px-6 pt-6 pb-6 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={getMobileLinkClass("/")}
                  >
                    Home
                  </Link>

                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={getMobileLinkClass("/about")}
                  >
                    About
                  </Link>

                  {/* Services Accordion on Mobile */}
                  <div className="flex flex-col border-b border-neutral-100 pb-3">
                    <div className="flex items-center justify-between">
                      <Link
                        to="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className={getMobileLinkClass("/services")}
                      >
                        Services
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                        className="p-1.5 text-neutral-500 hover:text-brand-pink transition-colors"
                        aria-label="Toggle Services submenu"
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-200 ${
                            mobileServicesOpen
                              ? "rotate-180 text-brand-pink"
                              : ""
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-3 mt-3 border-l-2 border-brand-pink/30 flex flex-col gap-2.5"
                        >
                          <Link
                            to="/services"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-xs font-bold tracking-wider uppercase py-1 ${
                              location.pathname === "/services"
                                ? "text-brand-pink"
                                : "text-neutral-500 hover:text-brand-pink"
                            }`}
                          >
                            All Services Overview →
                          </Link>
                          {servicesList.map((service) => {
                            const isCurrent =
                              location.pathname === service.path;
                            const Icon = service.icon;
                            return (
                              <Link
                                key={service.path}
                                to={service.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-2.5 p-1.5 rounded-xl transition-colors ${
                                  isCurrent
                                    ? "bg-neutral-100 text-brand-pink font-semibold"
                                    : "hover:bg-neutral-50 text-neutral-800"
                                }`}
                              >
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${service.lightBg}`}
                                >
                                  <Icon size={15} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-bold leading-tight line-clamp-1">
                                    {service.title}
                                  </div>
                                  <div className="text-[10.5px] text-neutral-500 leading-tight line-clamp-1 mt-0.5">
                                    {service.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/insights"
                    onClick={() => setMobileMenuOpen(false)}
                    className={getMobileLinkClass("/insights")}
                  >
                    Insights
                  </Link>
                  <Link
                    to="/careers"
                    onClick={() => setMobileMenuOpen(false)}
                    className={getMobileLinkClass("/careers")}
                  >
                    Careers
                  </Link>
                  <Link
                    to="/leadership"
                    onClick={() => setMobileMenuOpen(false)}
                    className={getMobileLinkClass("/leadership")}
                  >
                    Leadership
                  </Link>
                </div>

                {/* Contact CTA */}
                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-6 py-3.5 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Since badge */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-neutral-200 text-xs font-medium text-neutral-600 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    SINCE 2009
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
