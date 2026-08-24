import React, { useCallback, useEffect, useState, useRef } from "react";
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
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import {
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  BuildingIcon,
} from "lucide-react";
import { useSectionData } from "../store/useCMSStore";
import { useSEO } from "../hooks/useSEO";

// --- Map Data & Configuration ---
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
interface Location {
  name: string;
  coordinates: [number, number];
  region: string;
  address: string;
  suite: string;
  phone: string;
}
// Locations and connections will be computed dynamically from CMS data inside the component.

// --- Components ---
function ContactHero() {
  const { data } = useSectionData<any>("contact", "ContactHero", {
    tagline: "Get in Touch",
    headingPart1: "Let's Build the Future of",
    headingItalicHighlight: "Energy Together",
    heroSubtitle:
      "Reach out to our team of experts for project inquiries, strategic partnerships, or to learn more about our engineering capabilities.",
    backgroundImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400",
  });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  return (
    <section className="relative min-h-[70vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center">
      {/* Parallax Background */}
      <motion.div
        style={{
          y,
        }}
        className="absolute inset-0"
      >
        <img
          src={data.backgroundImage}
          alt="Modern office building"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/70 to-neutral-900" />
      </motion.div>

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
              {data.tagline || ""}
            </span>
          </motion.div>

          {/* Headline */}
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
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 uppercase select-text selection:bg-brand-pink selection:text-white"
          >
            {data.headingPart1 || ""} {data.headingItalicHighlight || ""}
          </motion.h1>

          {/* Subtitle */}
          {data.heroSubtitle && (
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
              {data.heroSubtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
function ContactFormSection() {
  const { data } = useSectionData<any>("contact", "ContactInfo", {
    formHeading: "Send us a message",
    fullNameLabel: "Full Name *",
    fullNamePlaceholder: "John Doe",
    emailAddressLabel: "Email Address *",
    emailAddressPlaceholder: "john@company.com",
    phoneNumberLabel: "Phone Number",
    phoneNumberPlaceholder: "+1 (555) 000-0000",
    companyNameLabel: "Company Name",
    companyNamePlaceholder: "Company Ltd.",
    subjectLabel: "Subject *",
    selectSubjectDefault: "Select a subject",
    messageLabel: "Message *",
    messagePlaceholder: "How can we help you?",
    submitButtonLabel: "Send Message",
    locationTitle: "Headquarters",
    addressLine1: "Bandra Kurla Complex, BKC",
    addressLine2: "Mumbai 400051, India",
    phoneNumber: "+91 22 6655 0178",
    emailAddress: "info@encotec.com",
    businessHoursTitle: "Business Hours",
    openingHours: [
      { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM IST" },
      { days: "Saturday", hours: "9:00 AM - 1:00 PM IST" },
      { days: "Sunday", hours: "Closed" },
    ],
    quickContactTitle: "Quick Contact",
    generalInquiriesLabel: "General Inquiries",
    careersLabel: "Careers",
    careersEmailAddress: "careers@encotec.com",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const fullName = (form.querySelector("#fullName") as HTMLInputElement)
      .value;
    const email = (form.querySelector("#email") as HTMLInputElement).value;
    const phone = (form.querySelector("#phone") as HTMLInputElement).value;
    const company = (form.querySelector("#company") as HTMLInputElement).value;
    const subject = (form.querySelector("#subject") as HTMLSelectElement).value;
    const message = (form.querySelector("#message") as HTMLTextAreaElement)
      .value;

    const API_BASE_URL = import.meta.env.VITE_CMS_API_URL || "";

    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          interestedIn: subject,
          budget: company,
          projectGoals: `Phone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\nMessage:\n${message}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setSubmitStatus("success");
      form.reset();
    } catch (err) {
      console.error("Enquiry submit error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openingHours = data.openingHours || [];
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="lg:col-span-7"
          >
            <h2 className="text-3xl font-black text-neutral-900 mb-8 uppercase tracking-tight">
              {data.formHeading || ""}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                  >
                    {data.fullNameLabel || ""}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
                    placeholder={data.fullNamePlaceholder || ""}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                  >
                    {data.emailAddressLabel || ""}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
                    placeholder={data.emailAddressPlaceholder || ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                  >
                    {data.phoneNumberLabel || ""}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
                    placeholder={data.phoneNumberPlaceholder || ""}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                  >
                    {data.companyNameLabel || ""}
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
                    placeholder={data.companyNamePlaceholder || ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                >
                  {data.subjectLabel || ""}
                </label>
                <select
                  id="subject"
                  required
                  defaultValue=""
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300 appearance-none rounded-none"
                >
                  <option value="" disabled>
                    {data.selectSubjectDefault || ""}
                  </option>
                  <option value="general">General Inquiry</option>
                  <option value="project">Project Discussion</option>
                  <option value="partnership">Partnership</option>
                  <option value="career">Career Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                >
                  {data.messageLabel || ""}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300 resize-none"
                  placeholder={data.messagePlaceholder || ""}
                ></textarea>
              </div>

              {submitStatus === "success" && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-lg flex items-center gap-2 animate-in fade-in duration-300">
                  <svg
                    className="w-5 h-5 text-emerald-600 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Your message has been sent successfully! We will get back to
                    you shortly.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold rounded-lg flex items-center gap-2 animate-in fade-in duration-300">
                  <svg
                    className="w-5 h-5 text-rose-600 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Something went wrong. Please try again later.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-5 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Sending..."
                  : data.submitButtonLabel || "Send Message"}
                {!isSubmitting && <ArrowRightIcon size={16} />}
              </button>
            </form>
          </motion.div>

          {/* Right: Info Cards */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Card 1: HQ */}
            <div className="p-8 bg-neutral-900 text-white border border-white/10 hover:border-brand-pink/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-brand-pink/20 rounded-xl flex items-center justify-center text-brand-pink mb-6">
                <BuildingIcon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">
                {data.locationTitle || ""}
              </h3>
              <div className="space-y-3 text-neutral-400">
                <p className="flex items-start gap-3">
                  <MapPinIcon
                    size={18}
                    className="text-brand-pink flex-shrink-0 mt-0.5"
                  />

                  <span>
                    {data.addressLine1 || ""}
                    {data.addressLine2 && (
                      <>
                        <br />
                        {data.addressLine2}
                      </>
                    )}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <PhoneIcon
                    size={18}
                    className="text-brand-pink flex-shrink-0"
                  />

                  <span>{data.phoneNumber || ""}</span>
                </p>
                <p className="flex items-center gap-3">
                  <MailIcon
                    size={18}
                    className="text-brand-pink flex-shrink-0"
                  />

                  <span>{data.emailAddress || ""}</span>
                </p>
              </div>
            </div>

            {/* Card 2: Hours */}
            <div className="p-8 bg-neutral-900 text-white border border-white/10 hover:border-brand-pink/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-brand-pink/20 rounded-xl flex items-center justify-center text-brand-pink mb-6">
                <ClockIcon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">
                {data.businessHoursTitle || ""}
              </h3>
              <div className="space-y-3 text-neutral-400">
                {openingHours.map((item: any, i: number) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center ${i < openingHours.length - 1 ? "border-b border-white/10 pb-2" : "pt-1"}`}
                  >
                    <span>{item.days}</span>
                    <span
                      className={`font-medium ${item.hours?.toLowerCase() === "closed" ? "text-brand-pink" : "text-white"}`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Quick Contact */}
            <div className="p-8 bg-neutral-900 text-white border border-white/10 hover:border-brand-pink/30 transition-colors duration-300">
              <div className="w-12 h-12 bg-brand-pink/20 rounded-xl flex items-center justify-center text-brand-pink mb-6">
                <MailIcon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">
                {data.quickContactTitle || ""}
              </h3>
              <div className="space-y-4 text-neutral-400">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    {data.generalInquiriesLabel || ""}
                  </div>
                  <a
                    href={`mailto:${data.emailAddress || ""}`}
                    className="text-white hover:text-brand-pink transition-colors"
                  >
                    {data.emailAddress || ""}
                  </a>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    {data.careersLabel || ""}
                  </div>
                  <a
                    href={`mailto:${data.careersEmailAddress || ""}`}
                    className="text-white hover:text-brand-pink transition-colors"
                  >
                    {data.careersEmailAddress || ""}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function GlobalOfficesMap() {
  const { data: footprintData } = useSectionData<any>(
    "home",
    "GlobalFootprintSection",
    {
      tagline: "Global Presence",
      heading: "Connected Intelligence",
      description:
        "A live network of energy systems operating in synchronization across continents.",
      locations: [
        {
          name: "Noida (HQ)",
          coordinates: [77.39, 28.58],
          region: "India",
          address: "Corporate Headquarters",
          suite: "Noida, Uttar Pradesh",
          phone: "+91 120 555 0100",
        },
        {
          name: "New Delhi",
          coordinates: [77.21, 28.61],
          region: "India",
          address: "Regional Office",
          suite: "New Delhi, India",
          phone: "+91 11 555 0200",
        },
        {
          name: "Jamshedpur",
          coordinates: [86.18, 22.8],
          region: "India",
          address: "Project Site",
          suite: "Jamshedpur, Jharkhand",
          phone: "+91 657 555 0300",
        },
        {
          name: "Jhajjar",
          coordinates: [76.66, 28.61],
          region: "India",
          address: "Power Plant O&M",
          suite: "Jhajjar, Haryana",
          phone: "+91 1251 555 0400",
        },
        {
          name: "Haldia",
          coordinates: [88.06, 22.03],
          region: "India",
          address: "Project Site",
          suite: "Haldia, West Bengal",
          phone: "+91 3224 555 0500",
        },
        {
          name: "Khandwa",
          coordinates: [76.35, 21.82],
          region: "India",
          address: "Project Site",
          suite: "Khandwa, Madhya Pradesh",
          phone: "+91 733 555 0600",
        },
        {
          name: "Rajpura",
          coordinates: [76.59, 30.48],
          region: "India",
          address: "2x700 MW Supercritical Plant",
          suite: "Rajpura, Punjab",
          phone: "+91 1762 555 0700",
        },
        {
          name: "Obra",
          coordinates: [82.98, 24.42],
          region: "India",
          address: "2x660 MW Thermal Project",
          suite: "Obra, Uttar Pradesh",
          phone: "+91 5446 555 0800",
        },
        {
          name: "Singrauli",
          coordinates: [82.67, 24.2],
          region: "India",
          address: "Power Plant Operations",
          suite: "Singrauli, Madhya Pradesh",
          phone: "+91 7805 555 0900",
        },
        {
          name: "Vizag",
          coordinates: [83.3, 17.69],
          region: "India",
          address: "Project Site",
          suite: "Visakhapatnam, Andhra Pradesh",
          phone: "+91 891 555 1000",
        },
        {
          name: "Panki",
          coordinates: [80.3, 26.47],
          region: "India",
          address: "Power Plant",
          suite: "Panki, Uttar Pradesh",
          phone: "+91 512 555 1100",
        },
        {
          name: "Jewar",
          coordinates: [77.55, 28.13],
          region: "India",
          address: "Airport MEP Services",
          suite: "Jewar, Uttar Pradesh",
          phone: "+91 120 555 1200",
        },
        {
          name: "Shahjahanpur",
          coordinates: [79.91, 27.88],
          region: "India",
          address: "Project Site",
          suite: "Shahjahanpur, Uttar Pradesh",
          phone: "+91 5842 555 1300",
        },
        {
          name: "Bela",
          coordinates: [83.95, 24.65],
          region: "India",
          address: "Project Site",
          suite: "Bela, Uttar Pradesh",
          phone: "+91 5446 555 1400",
        },
        {
          name: "Turkey",
          coordinates: [32.86, 39.93],
          region: "International",
          address: "Celikler Energy Project",
          suite: "Ankara, Turkey",
          phone: "+90 312 555 0100",
        },
        {
          name: "Bahrain",
          coordinates: [50.58, 26.07],
          region: "International",
          address: "Energy Infrastructure",
          suite: "Manama, Bahrain",
          phone: "+973 1755 0200",
        },
      ],
    },
  );
  const locations: Location[] = footprintData.locations || [];
  const hqLocation =
    locations.find(
      (loc) =>
        loc.name.toLowerCase().includes("noida") ||
        loc.name.toLowerCase().includes("hq"),
    ) || locations[0];
  const hqCoords = hqLocation?.coordinates || [77.39, 28.58];

  const connections = locations
    .filter((loc) => loc.name !== hqLocation?.name)
    .map(
      (loc) =>
        [hqCoords, loc.coordinates] as [[number, number], [number, number]],
    );

  const sectionRef = useRef<HTMLElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
  });
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const getTooltipStyle = () => {
    if (!mapContainerRef.current) {
      return { left: tooltipPos.x + 16, top: tooltipPos.y - 80 };
    }
    const containerWidth = mapContainerRef.current.clientWidth;
    const containerHeight = mapContainerRef.current.clientHeight;
    const tooltipWidth = 240;
    const tooltipHeight = 150;

    let left = tooltipPos.x + 16;
    if (left + tooltipWidth > containerWidth - 12) {
      left = tooltipPos.x - tooltipWidth - 16;
    }
    if (left < 12) {
      left = 12;
    }

    let top = tooltipPos.y - 80;
    if (top < 12) {
      top = tooltipPos.y + 20;
    } else if (top + tooltipHeight > containerHeight - 12) {
      top = containerHeight - tooltipHeight - 12;
    }

    return { left, top };
  };
  return (
    <section
      ref={sectionRef}
      className="py-32 text-white relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0D0D0D 0%, #111111 50%, #0D0D0D 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,30,140,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(233,30,140,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(233,30,140,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[2px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {footprintData.tagline || "Global Presence"}
            </span>
            <div className="w-8 h-[2px] bg-brand-pink" />
          </motion.div>
          <motion.h2
            initial={{
              opacity: 0,
              y: 20,
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
              delay: 0.1,
            }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase"
          >
            {footprintData.heading || "Connected Intelligence"}
          </motion.h2>
          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg"
          >
            {footprintData.description ||
              "A live network of energy systems operating in synchronization across continents."}
          </motion.p>
        </div>

        {/* Map Container */}
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
            duration: 1,
            delay: 0.3,
          }}
          className="relative rounded-3xl overflow-hidden border"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(233,30,140,0.12)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl z-0"
            style={{
              boxShadow: "inset 0 0 80px rgba(233,30,140,0.04)",
            }}
          />

          {/* Mouse-tracking wrapper for tooltip positioning */}
          <div
            ref={mapContainerRef}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 350,
                center: [65, 25],
              }}
              style={{
                width: "100%",
                height: "auto",
              }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: any) =>
                  geographies.map((geo: any) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "#1C1C1E",
                          stroke: "rgba(233,30,140,0.18)",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#252528",
                          stroke: "rgba(233,30,140,0.35)",
                          strokeWidth: 0.6,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#1C1C1E",
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Connection Lines */}
              {connections.map((conn, i) => (
                <Line
                  key={i}
                  from={conn[0]}
                  to={conn[1]}
                  stroke="rgba(233,30,140,0.22)"
                  strokeWidth={0.8}
                  strokeLinecap="round"
                  strokeDasharray="4 6"
                />
              ))}

              {/* Location Markers */}
              {locations.map((loc, i) => (
                <Marker
                  key={i}
                  coordinates={loc.coordinates}
                  onMouseEnter={() => setHoveredLocation(loc)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  {/* Large invisible hit area */}
                  <circle
                    r={14}
                    fill="transparent"
                    style={{
                      cursor: "pointer",
                    }}
                  />

                  {/* Outer pulse ring */}
                  <motion.circle
                    r={8}
                    fill="rgba(233,30,140,0.08)"
                    stroke={
                      hoveredLocation?.name === loc.name
                        ? "rgba(233,30,140,0.7)"
                        : "rgba(233,30,140,0.3)"
                    }
                    strokeWidth={hoveredLocation?.name === loc.name ? 1.5 : 0.8}
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={
                      isInView
                        ? {
                            scale: [1, 1.8, 1],
                            opacity: [0.6, 0, 0.6],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2.5,
                      delay: i * 0.15 + 0.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    style={{
                      pointerEvents: "none",
                    }}
                  />

                  {/* Inner dot */}
                  <motion.circle
                    r={hoveredLocation?.name === loc.name ? 5 : 3.5}
                    fill={
                      hoveredLocation?.name === loc.name ? "#D4006F" : "#B6005E"
                    }
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={
                      isInView
                        ? {
                            scale: 1,
                            opacity: 1,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.4,
                      delay: i * 0.15 + 0.3,
                    }}
                    style={{
                      filter:
                        hoveredLocation?.name === loc.name
                          ? "drop-shadow(0 0 10px rgba(233,30,140,1))"
                          : "drop-shadow(0 0 6px rgba(233,30,140,0.8))",
                      pointerEvents: "none",
                      transition: "r 0.2s ease, filter 0.2s ease",
                    }}
                  />

                  {/* Label */}
                  <motion.text
                    textAnchor="middle"
                    y={-10}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "5px",
                      fill:
                        hoveredLocation?.name === loc.name
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.55)",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      pointerEvents: "none",
                      transition: "fill 0.2s ease",
                    }}
                    initial={{
                      opacity: 0,
                    }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.4,
                      delay: i * 0.15 + 0.6,
                    }}
                  >
                    {loc.name.toUpperCase()}
                  </motion.text>
                </Marker>
              ))}
            </ComposableMap>

            {/* Hover Tooltip */}
            <AnimatePresence>
              {hoveredLocation && (
                <motion.div
                  key={hoveredLocation.name}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    y: 6,
                  }}
                  transition={{
                    duration: 0.18,
                    ease: "easeOut",
                  }}
                  className="absolute z-50 pointer-events-none"
                  style={getTooltipStyle()}
                >
                  <div
                    className="rounded-2xl px-4 py-4 min-w-[200px] max-w-[260px]"
                    style={{
                      background: "rgba(15, 15, 15, 0.95)",
                      border: "1px solid rgba(233,30,140,0.3)",
                      backdropFilter: "blur(20px)",
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(233,30,140,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background: "#B6005E",
                          boxShadow: "0 0 8px rgba(182,0,94,0.8)",
                        }}
                      />

                      <span
                        className="text-xs font-bold tracking-[0.2em] uppercase"
                        style={{
                          color: "#B6005E",
                        }}
                      >
                        {hoveredLocation.region}
                      </span>
                    </div>

                    <div
                      className="text-base font-black tracking-tight mb-3"
                      style={{
                        color: "#FFFFFF",
                      }}
                    >
                      {hoveredLocation.name}
                    </div>

                    {/* Divider */}
                    <div
                      className="w-full h-px mb-3"
                      style={{
                        background: "rgba(233,30,140,0.15)",
                      }}
                    />

                    {/* Address */}
                    <div className="flex items-start gap-2 mb-2">
                      <MapPinIcon
                        size={12}
                        className="flex-shrink-0 mt-0.5"
                        style={{
                          color: "#B6005E",
                        }}
                      />

                      <div>
                        <div className="text-xs text-white/80 leading-relaxed">
                          {hoveredLocation.address}
                        </div>
                        <div className="text-xs text-white/50">
                          {hoveredLocation.suite}
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2">
                      <PhoneIcon
                        size={12}
                        className="flex-shrink-0"
                        style={{
                          color: "#B6005E",
                        }}
                      />

                      <span className="text-xs text-white/50 font-mono">
                        {hoveredLocation.phone}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export function Contact() {
  useSEO("contact");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation />

      <ContactHero />
      <ContactFormSection />
      <GlobalOfficesMap />

      {/* Footer */}
      <Footer />
    </main>
  );
}
