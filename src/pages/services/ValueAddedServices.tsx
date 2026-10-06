import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GlobeIcon,
  PackageIcon,
  WrenchIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";
import { useSEO } from "../../hooks/useSEO";

const vasFeatureIconMap = [GlobeIcon, PackageIcon, WrenchIcon];

function SourcingHero() {
  const { data } = useSectionData<any>("value-added", "SourcingHero");
  return (
    <section className="relative min-h-[90vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center pt-20">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-neutral-900" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
        <motion.div
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
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-pink hover:gap-3 transition-all duration-300 mb-12"
          >
            <ArrowLeftIcon size={16} />
            Back to Services
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-[3px] bg-brand-pink" />
            <span className="text-sm font-bold tracking-[0.25em] text-brand-pink uppercase">
              {data.label || ""}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
            {data.headingPart1 || ""}
            {data.headingHighlight && (
              <>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-light">
                  {data.headingHighlight}
                </span>
              </>
            )}
          </h1>

          <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light mb-12 max-w-3xl">
            {data.description || ""}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
function SourcingFeatures() {
  const { data } = useSectionData<any>("value-added", "SourcingFeatures");
  const features = (data.features || data.featuresList || []).map(
    (f: any, i: number) => ({ ...f, icon: vasFeatureIconMap[i] || GlobeIcon }),
  );

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature: any, i: number) => (
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
                delay: i * 0.2,
              }}
              className="p-10 bg-neutral-50 border border-neutral-200 hover:border-brand-pink/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-brand-pink mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function SourcingAdvantage() {
  const { data } = useSectionData<any>("value-added", "SourcingAdvantage");
  const paragraphs = data.paragraphs || [];
  const cards = data.cards || [];

  return (
    <section className="py-28 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              {data.headingPart1 || ""}
              <span className="text-brand-pink">
                {data.headingHighlight || ""}
              </span>
            </h2>
            <div className="space-y-6 text-lg text-neutral-400 leading-relaxed">
              <p>{data.description}</p>
              {paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

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
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {cards.map((item: any, i: number) => {
              const Icon =
                item.icon === "ShieldCheck"
                  ? ShieldCheckIcon
                  : item.icon === "Globe"
                    ? GlobeIcon
                    : item.icon === "Truck"
                      ? TruckIcon
                      : WrenchIcon;
              return (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300"
                >
                  <Icon className="text-brand-pink mb-4" size={32} />
                  <div className="font-bold">{item.title}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function CTASection() {
  const { data } = useSectionData<any>("value-added", "CTASection");
  return (
    <section className="py-32 bg-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8">
          {data.heading}
        </h2>
        <p className="text-xl text-neutral-600 mb-10">{data.description}</p>
        <Link
          to={data.ctaUrl || "/contact"}
          className="inline-flex items-center gap-3 px-8 py-4 bg-brand-pink text-white font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300"
        >
          {data.ctaLabel}
          <ArrowRightIcon size={20} />
        </Link>
      </div>
    </section>
  );
}
export function ValueAddedServices() {
  useSEO("service/value-added");

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation variant="dark" />

      <SourcingHero />
      <SourcingFeatures />
      <SourcingAdvantage />
      <CTASection />

      <Footer />
    </main>
  );
}
