import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  GlobeIcon,
  UsersIcon,
  ZapIcon,
  ShieldCheckIcon,
  AwardIcon,
  TrendingUpIcon,
  BriefcaseIcon,
  ClockIcon,
  ActivityIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
} from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";
import { LinkText } from "../ui/LinkText";

const iconMap: Record<string, any> = {
  Calendar: CalendarIcon,
  Globe: GlobeIcon,
  Users: UsersIcon,
  Zap: ZapIcon,
  Shield: ShieldCheckIcon,
  Award: AwardIcon,
  TrendingUp: TrendingUpIcon,
  Briefcase: BriefcaseIcon,
  Clock: ClockIcon,
  Activity: ActivityIcon,
  CheckCircle: CheckCircle2Icon,
};

const defaultIcons = [CalendarIcon, GlobeIcon, UsersIcon, ZapIcon];

export function AboutSection() {
  const { data } = useSectionData<any>("home", "AboutUs");
  const stats = (data.stats || []).map((stat: any, i: number) => ({
    ...stat,
    icon:
      (stat.icon && iconMap[stat.icon]) ||
      defaultIcons[i % defaultIcons.length] ||
      ZapIcon,
  }));

  return (
    <section className="py-24 bg-white relative overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            {/* Label */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
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
              }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[2px] bg-brand-pink" />
              <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                {data.upperTag}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
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
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-neutral-900 leading-[1.08] tracking-tight uppercase mb-8"
            >
              {data.headingLabel}{" "}
              <span className="text-brand-pink">
                {data.headingItalicHighlight}
              </span>
            </motion.h2>

            {/* Body Text */}
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
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="space-y-5 mb-8"
            >
              {(Array.isArray(data.paragraphs) && data.paragraphs.length > 0
                ? data.paragraphs
                : [data.paragraphs?.[0], data.paragraphs?.[1]]
              )
                .filter(Boolean)
                .map((para: string, idx: number) => (
                  <p key={idx} className="text-neutral-500 leading-relaxed">
                    <LinkText text={para} />
                  </p>
                ))}
            </motion.div>

            {/* Learn More Link */}
            <motion.a
              href={data?.ctaUrl}
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
                duration: 0.5,
                delay: 0.3,
              }}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-brand-pink uppercase hover:gap-3 transition-all duration-300 mb-12"
            >
              {data?.ctaLabel}
              <ArrowRightIcon size={14} />
            </motion.a>

            {/* Stats Grid */}
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
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat: any, i: number) => (
                <div
                  key={i}
                  className="p-5 border border-neutral-200 hover:border-brand-pink/30 transition-colors duration-300 group"
                >
                  <div className="mb-4">
                    <stat.icon
                      size={22}
                      className="text-brand-pink/60 group-hover:text-brand-pink transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold text-neutral-400 tracking-[0.15em] uppercase mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
            }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={data.image}
                alt={data.imageAlt || "Engineer working on advanced equipment"}
                className="w-full h-[500px] lg:h-[620px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Est. 2011 Badge */}
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
              transition={{
                duration: 0.5,
                delay: 0.7,
              }}
              className="absolute -bottom-5 left-6 z-20"
            >
              <div className="flex items-center gap-3 bg-neutral-800 text-white pl-3 pr-6 py-3 shadow-xl">
                <div className="w-10 h-10 rounded-full bg-brand-pink/20 flex items-center justify-center">
                  <ZapIcon size={18} className="text-brand-pink" />
                </div>
                <div>
                  <div className="text-sm font-black leading-none">
                    {data.badgeValue}
                  </div>
                  <div className="text-[9px] font-bold text-neutral-400 tracking-[0.15em] uppercase mt-0.5">
                    {data.badgeLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Global Excellence CTA Banner */}
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
            duration: 0.7,
          }}
          className="mt-28 py-20 bg-neutral-50 -mx-6 lg:-mx-10 px-6 lg:px-10 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            {data.bannerHeading}
          </h3>
          <p className="text-neutral-500 max-w-lg mx-auto mb-8">
            {data.bannerDescription}
          </p>
          <Link
            to={data?.bannerButtonUrl}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-pink text-white text-xs font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300"
          >
            {data?.bannerButtonLabel}
            <ArrowRightIcon size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Keep backward-compatible export
export { AboutSection as TrustStrip };
