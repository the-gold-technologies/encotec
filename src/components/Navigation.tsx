import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  variant?: "light" | "dark";
}

export function Navigation({ variant = "light" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
            alt="Encotec - Member of Dornier Group"
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
            SINCE 2011
          </div>
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/about" className={getLinkClass("/about")}>
            About
          </Link>
          <Link to="/services" className={getLinkClass("/services")}>
            Services
          </Link>
          <Link to="/insights" className={getLinkClass("/insights")}>
            Insights
          </Link>
          <Link to="/careers" className={getLinkClass("/careers")}>
            Careers
          </Link>
          {/* <Link
            to="/certifications"
            className={getLinkClass("/certifications")}
          >
            Certifications
          </Link> */}
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
              className="fixed top-0 right-0 bottom-0 w-[70%] bg-white z-[110] lg:hidden flex flex-col"
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
              <div className="flex-1 flex flex-col px-8 pt-8 pb-8 overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/about", label: "About" },
                    { to: "/services", label: "Services" },
                    { to: "/insights", label: "Insights" },
                    { to: "/careers", label: "Careers" },
                    // { to: "/certifications", label: "Certifications" },
                    { to: "/leadership", label: "Leadership" },
                  ].map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={getMobileLinkClass(to)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-10 pt-8 border-t border-neutral-200">
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-6 py-3.5 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Since badge */}
                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-neutral-200 text-xs font-medium text-neutral-600 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    SINCE 2011
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
