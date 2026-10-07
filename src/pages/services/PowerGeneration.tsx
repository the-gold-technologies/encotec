import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SettingsIcon,
  ShieldCheckIcon,
  ZapIcon,
  PlaneIcon,
  DatabaseIcon,
  ActivityIcon,
} from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";
import { useSEO } from "../../hooks/useSEO";

const pgFeatureIconMap = [ZapIcon, PlaneIcon, DatabaseIcon];

function StewardshipHero() {
  const { data } = useSectionData<any>("power-generation", "StewardshipHero");
  return (
    <section className="relative min-h-[90vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center pt-20">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink rounded-full blur-[100px] animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-light rounded-full blur-[100px] animate-pulse-slow"
          style={{
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-transparent to-neutral-900" />

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
              {data.label}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8">
            {data.headingPart1 || ""}{" "}
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
            {data.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
const pgIconMap: Record<string, any> = {
  Zap: ZapIcon,
  Plane: PlaneIcon,
  Database: DatabaseIcon,
  ShieldCheck: ShieldCheckIcon,
  Settings: SettingsIcon,
  Activity: ActivityIcon,
};

function StewardshipFeatures() {
  const { data } = useSectionData<any>(
    "power-generation",
    "StewardshipFeatures",
  );
  const featureList = data.features || data.featuresList || [];
  const features = featureList.map((f: any, i: number) => ({
    ...f,
    icon: pgIconMap[f.icon] || pgFeatureIconMap[i] || ZapIcon,
  }));

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
function StewardshipPhilosophy() {
  const { data } = useSectionData<any>(
    "power-generation",
    "StewardshipPhilosophy",
  );
  const paragraphs = Array.isArray(data.paragraphs)
    ? data.paragraphs
    : [data.para1, data.para2].filter(Boolean);

  const items =
    Array.isArray(data.items) && data.items.length > 0
      ? data.items
      : [
          { title: "Zero-Error Focus", icon: "ShieldCheck" },
          { title: "Predictive Diagnostics", icon: "Activity" },
          { title: "Centralized ERP", icon: "Database" },
          { title: "24/7 Monitoring", icon: "Settings" },
        ];

  const philosophyIconMap: Record<string, any> = {
    ShieldCheck: ShieldCheckIcon,
    Activity: ActivityIcon,
    Database: DatabaseIcon,
    Settings: SettingsIcon,
  };

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
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              {data.headingPart1 || ""}{" "}
              {data.headingHighlight && (
                <>
                  <br />
                  <span className="text-brand-pink">
                    {data.headingHighlight}
                  </span>
                </>
              )}
            </h2>
            <div className="space-y-6 text-lg text-neutral-400 leading-relaxed">
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
            {items.map((item: any, i: number) => {
              const Icon = philosophyIconMap[item.icon] || ShieldCheckIcon;
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
function StewardshipCTA() {
  const { data } = useSectionData<any>("power-generation", "CTASection");
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
export function PowerGeneration() {
  useSEO("service/power-generation");

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation variant="dark" />

      <StewardshipHero />
      <StewardshipFeatures />
      <StewardshipPhilosophy />
      <StewardshipCTA />

      <Footer />
    </main>
  );
}
