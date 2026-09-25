import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useSectionData, useCMSStore } from "../../store/useCMSStore";
import { LinkText } from "../ui/LinkText";

export function Hero() {
  const { data } = useSectionData<any>("home", "HeroSection");
  const globalSEO = useCMSStore((state) => state.globalSEO);
  const headingTag = globalSEO?.headingOptions?.heroHeadingTag || "h1";
  const HeadingTag = (headingTag || "h1") as
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
  const MotionHeading = (motion as any)[HeadingTag] || motion.h1;

  const serviceTags = data.serviceTags || [];
  const heroStats = (
    Array.isArray(data.stats) && data.stats.length > 0
      ? data.stats
      : Array.isArray(data.statsList) && data.statsList.length > 0
        ? data.statsList
        : [
            { value: data.stat1Value, label: data.stat1Label },
            { value: data.stat2Value, label: data.stat2Label },
            { value: data.stat3Value, label: data.stat3Label },
            { value: data.stat4Value, label: data.stat4Label },
            { value: data.stat5Value, label: data.stat5Label },
            { value: data.stat6Value, label: data.stat6Label },
            { value: data.stat7Value, label: data.stat7Label },
            { value: data.stat8Value, label: data.stat8Label },
          ]
  ).filter((s: any) => s && s.value && s.label);

  return (
    <section className="relative w-full bg-white pt-28 pb-16 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Content — spans 6 cols */}
          <div className="lg:col-span-6 pt-4 lg:pt-8">
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
              }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-[2px] bg-brand-pink" />
              <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                {data.tagline}
              </span>
            </motion.div>

            {/* Headline */}
            <MotionHeading
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
                delay: 0.1,
              }}
              className="text-[2.6rem] md:text-[3.6rem]  font-black text-neutral-900 leading-[1.05] tracking-tight uppercase mb-8 select-text selection:bg-brand-pink selection:text-white cursor-text"
            >
              {data?.headlineLine1}{" "}
              <span className="text-brand-pink">{data?.headlineHighlight}</span>{" "}
              {data?.headlineLine2}
            </MotionHeading>

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
                duration: 0.7,
                delay: 0.25,
              }}
              className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-lg mb-8"
            >
              <LinkText text={data.description} />
            </motion.p>

            {/* Service Tags */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.35,
              }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {serviceTags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 border border-neutral-300 text-[11px] font-bold tracking-wider text-neutral-700 uppercase hover:border-brand-pink hover:text-brand-pink transition-colors duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.45,
              }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Link
                to={data?.primaryBtnUrl}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-pink text-white text-xs font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300"
              >
                {data?.primaryBtnLabel}
                <ArrowRightIcon size={14} />
              </Link>
              <Link
                to={data?.secondaryBtnUrl}
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-neutral-900 text-neutral-900 text-xs font-bold tracking-wider uppercase hover:bg-neutral-900 hover:text-white transition-all duration-300"
              >
                {data?.secondaryBtnLabel}
              </Link>
            </motion.div>

            {/* Stats Row */}
          </div>

          {/* Right Image Area — spans 6 cols */}
          <div className="lg:col-span-6 relative mt-10  max-[650px]:mt-0">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative overflow-hidden shadow-2xl shadow-black/20">
                <img
                  src={data.backgroundImage}
                  alt="Wind turbines at sunset"
                  className="w-full h-[420px] md:h-[520px] lg:h-[580px] object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Projects Delivered Badge */}
              {data?.projectsBadgeNumber && data?.projectsBadgeLabel && (
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
                    duration: 0.5,
                    delay: 1,
                  }}
                  className="absolute -bottom-6 left-4 md:left-8 z-20"
                  style={{
                    transform: "rotate(-3deg)",
                  }}
                >
                  <div className="bg-white px-6 py-4 shadow-xl border border-neutral-100">
                    <div className="text-3xl font-black text-neutral-900 leading-none">
                      {data.projectsBadgeNumber}
                    </div>
                    <div className="text-[10px] font-bold text-neutral-400 tracking-[0.15em] uppercase mt-1">
                      {data.projectsBadgeLabel}
                    </div>
                    <div className="w-10 h-[3px] bg-brand-pink mt-2" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
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
            duration: 0.7,
            delay: 0.55,
          }}
          className={`grid grid-cols-2 min-[500px]:grid-cols-3 md:grid-cols-6 gap-8 pt-8 border-t border-neutral-200`}
        >
          {heroStats.map((stat: any, i: number) => (
            <div key={i}>
              <div className="text-3xl md:text-3xl font-black text-neutral-900 tracking-tight leading-none">
                {stat.value}
              </div>
              <div className="text-[9px] font-bold text-neutral-400 tracking-[0.15em] uppercase mt-2 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
