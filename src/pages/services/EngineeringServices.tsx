import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircle2Icon,
  ClipboardCheckIcon,
  TargetIcon,
  TrendingUpIcon,
  LayoutIcon,
  ZapIcon,
  NetworkIcon,
  FileTextIcon,
  SearchIcon,
  PencilRulerIcon,
  SettingsIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";
import { useSEO } from "../../hooks/useSEO";

const capabilityIcons = [
  TargetIcon,
  TrendingUpIcon,
  FileTextIcon,
  LayoutIcon,
  ZapIcon,
  NetworkIcon,
];
const processIcons = [
  SearchIcon,
  TrendingUpIcon,
  PencilRulerIcon,
  SettingsIcon,
  ShieldCheckIcon,
];
const valueIcons = [
  ShieldCheckIcon,
  TargetIcon,
  ClipboardCheckIcon,
  CheckCircle2Icon,
];

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
// Immersive Hero Section
function EngineeringHero() {
  const { data } = useSectionData<any>("engineering-services", "EngineeringHero");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  return (
    <section className="relative min-h-screen w-full bg-neutral-900 text-white overflow-hidden flex items-center">
      {/* Parallax Background */}
      <motion.div
        style={{
          y,
        }}
        className="absolute inset-0"
      >
        <img
          src={data.backgroundImage}
          alt="Power engineering facility"
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 py-20">
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
        >
          {/* Breadcrumb */}
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
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-pink hover:gap-3 transition-all duration-300 mb-12"
            >
              <ArrowLeftIcon size={16} />
              Back to Services
            </Link>
          </motion.div>

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
              delay: 0.3,
            }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-[3px] bg-brand-pink" />
            <span className="text-sm font-bold tracking-[0.25em] text-brand-pink uppercase">
              Service 01
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
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 max-w-5xl text-white select-text cursor-text selection:bg-brand-pink selection:text-white"
          >
            {data.heroTitle}
          </motion.h1>

          {/* Subtitle */}
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
            className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light max-w-3xl mb-12"
          >
            {data.heroSubtitle}
          </motion.p>

          {/* Floating Stat Badges */}
          <div className="flex flex-wrap gap-4">
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
              className="px-6 py-3 bg-brand-pink/90 backdrop-blur-sm text-white font-bold text-sm tracking-wider uppercase"
            >
              {data.stat1}
            </motion.div>
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
                delay: 0.9,
              }}
              className="px-6 py-3 bg-white/90 backdrop-blur-sm text-neutral-900 font-bold text-sm tracking-wider uppercase"
            >
              {data.stat2}
            </motion.div>
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
                delay: 1.0,
              }}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm tracking-wider uppercase"
            >
              {data.stat3}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// Overview Section
function OverviewSection() {
  const { data } = useSectionData<any>("engineering-services", "OverviewSection");
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
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
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-brand-pink" />
              <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                {data.tagline}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 leading-tight selection:bg-brand-pink selection:text-white select-text cursor-text">
              {data.heading}
            </h2>

            <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
              <p>{data.para1}</p>
              <p>{data.para2}</p>

              {/* Callout */}
              <div className="mt-8 p-6 bg-brand-panel border-l-4 border-brand-pink">
                <p className="text-neutral-900 font-medium italic">
                  "{data.quote}"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
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
            className="relative"
          >
            <div
              className="relative"
              style={{
                transform: "rotate(2deg)",
              }}
            >
              <img
                src={data.image}
                alt="Engineers reviewing blueprints"
                className="w-full h-[600px] object-cover shadow-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
              }}
              className="absolute -bottom-6 -left-6 px-6 py-4 bg-white shadow-xl border border-neutral-200"
            >
              <div className="text-xs font-bold text-brand-pink uppercase tracking-wider mb-1">
                {data.badgeTitle}
              </div>
              <div className="text-2xl font-black text-neutral-900">
                {data.badgeValue}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
// Key Capabilities Section
function CapabilitiesSection() {
  const { data } = useSectionData<any>("engineering-services", "CapabilitiesSection");
  const capabilities = (data.capabilitiesList || []).map(
    (cap: any, i: number) => ({
      ...cap,
      icon: capabilityIcons[i % capabilityIcons.length] || TargetIcon,
    }),
  );

  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {data.tagline}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-6">
            {data.heading}
          </h2>
          <p className="text-neutral-600 text-xl max-w-3xl">
            {data.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap: any, i: number) => (
            <motion.div
              key={i}
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
                margin: "-50px",
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="group relative overflow-hidden bg-white border border-neutral-200 hover:border-brand-pink/50 transition-all duration-500"
            >
              {/* Background Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  src={cap.image}
                  alt={cap.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

                {/* Icon */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-brand-pink/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <cap.icon size={24} strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// Engineering Process Section
function ProcessSection() {
  const { data } = useSectionData<any>("engineering-services", "ProcessSection");
  const steps = (data.stepsList || []).map((step: any, i: number) => ({
    ...step,
    icon: processIcons[i % processIcons.length] || SearchIcon,
  }));

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {data.tagline}
            </span>
            <div className="w-8 h-[2px] bg-brand-pink" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-6">
            {data.heading}
          </h2>
          <p className="text-neutral-600 text-xl max-w-3xl mx-auto">
            {data.subheading}
          </p>
        </motion.div>

        <div className="space-y-24 relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-pink via-brand-pink/50 to-transparent hidden lg:block" />

          {steps.map((step: any, i: number) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -60 : 60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
              }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Content */}
              <div
                className={`${i % 2 === 1 ? "lg:col-start-2 lg:text-left" : "lg:text-right"}`}
              >
                <div
                  className={`inline-flex items-center gap-3 mb-4 ${i % 2 === 1 ? "" : "lg:flex-row-reverse"}`}
                >
                  <div className="w-14 h-14 bg-brand-panel rounded-xl flex items-center justify-center text-brand-pink">
                    <step.icon size={28} strokeWidth={1.5} />
                  </div>
                  <span className="text-6xl font-black text-neutral-100">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-neutral-900 mb-4 uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-lg leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Image */}
              <div
                className={`${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
              >
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="relative overflow-hidden shadow-2xl"
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-80 object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// Stats Section
function StatsSection() {
  const { data } = useSectionData<any>("engineering-services", "StatsSection");
  const stats = [
    {
      value: data.stat1Value,
      suffix: data.stat1Suffix,
      label: data.stat1Label,
    },
    {
      value: data.stat2Value,
      suffix: data.stat2Suffix,
      label: data.stat2Label,
    },
    {
      value: data.stat3Value,
      suffix: data.stat3Suffix,
      label: data.stat3Label,
    },
    {
      value: data.stat4Value,
      suffix: data.stat4Suffix,
      label: data.stat4Label,
    },
  ];

  return (
    <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-pink rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-light rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            {data.heading}
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            {data.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
              className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-pink/50 transition-colors duration-300"
            >
              <div className="text-5xl md:text-6xl font-black text-brand-pink mb-3">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-neutral-300 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// Featured Project Section
function FeaturedProjectSection() {
  const { data } = useSectionData<any>("engineering-services", "FeaturedProjectSection");
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -100]);
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {data.tagline}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900">
            {data.heading}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Image */}
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
            className="lg:col-span-3 relative overflow-hidden"
          >
            <motion.div
              style={{
                y,
              }}
              className="relative"
            >
              <img
                src={data.projectImage}
                alt="Obra C Thermal Power Plant"
                className="w-full h-[600px] object-cover shadow-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          {/* Details */}
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
            className="lg:col-span-2"
          >
            <h3 className="text-3xl font-black text-neutral-900 mb-4 uppercase tracking-tight">
              {data.projectTitle}
            </h3>
            <p className="text-neutral-600 text-lg leading-relaxed mb-8">
              {data.description}
            </p>

            {/* Metrics */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-panel rounded-xl flex items-center justify-center text-brand-pink">
                  <ZapIcon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-2xl font-black text-neutral-900">
                    {data.metric1Value}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {data.metric1Label}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-panel rounded-xl flex items-center justify-center text-brand-pink">
                  <TargetIcon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-2xl font-black text-neutral-900">
                    {data.metric2Value}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {data.metric2Label}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-panel rounded-xl flex items-center justify-center text-brand-pink">
                  <CheckCircle2Icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-2xl font-black text-neutral-900">
                    {data.metric3Value}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {data.metric3Label}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
// Value Delivered Section
function ValueSection() {
  const { data } = useSectionData<any>("engineering-services", "ValueSection");
  const values = (data.valuesList || []).map((value: any, i: number) => ({
    ...value,
    icon: valueIcons[i % valueIcons.length] || ShieldCheckIcon,
  }));

  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {data.tagline}
            </span>
            <div className="w-8 h-[2px] bg-brand-pink" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-6">
            {data.heading}
          </h2>
          <p className="text-neutral-600 text-xl max-w-3xl mx-auto">
            {data.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value: any, i: number) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -40 : 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
              whileHover={{
                y: -4,
              }}
              className="flex gap-6 p-8 bg-white border border-neutral-200 hover:border-brand-pink/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-brand-panel rounded-xl flex items-center justify-center text-brand-pink flex-shrink-0">
                <value.icon size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-tight">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// Related Services Section
function RelatedServicesSection() {
  const { data } = useSectionData<any>("engineering-services", "RelatedServicesSection");
  const services = data.services || [];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {data.tagline}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900">
            {data.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service: any, i: number) => (
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
              whileHover={{
                y: -8,
              }}
              className="group relative overflow-hidden bg-white border border-neutral-200 hover:border-brand-pink/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-pink hover:gap-3 transition-all duration-300"
                >
                  Explore Service
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// CTA Section
function CTASection() {
  const { data } = useSectionData<any>("engineering-services", "CTASection");
  return (
    <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Glow */}
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
            {data.heading}
          </h2>
          <p className="text-xl text-neutral-300 mb-12 leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={data.primaryBtnUrl || "/contact"}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300"
            >
              {data.primaryBtnLabel}
              <ArrowRightIcon size={16} />
            </Link>
            <Link
              to={data.secondaryBtnUrl || "/services"}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-bold tracking-wider uppercase hover:bg-white hover:text-neutral-900 transition-all duration-300"
            >
              {data.secondaryBtnLabel}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// Main Component
export function EngineeringServices() {
  useSEO("service/engineering");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation />

      <EngineeringHero />
      <OverviewSection />
      <CapabilitiesSection />
      <ProcessSection />
      <StatsSection />
      <FeaturedProjectSection />
      <ValueSection />
      <RelatedServicesSection />
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
