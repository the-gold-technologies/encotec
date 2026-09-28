import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  ShieldCheckIcon,
  AwardIcon,
  UsersIcon,
  ZapIcon,
  GlobeIcon,
  TrendingUpIcon,
  HeartHandshakeIcon,
  LeafIcon,
  BriefcaseIcon,
  ChevronDownIcon,
} from "lucide-react";
import { useSectionData } from "../store/useCMSStore";
import { useSEO } from "../hooks/useSEO";

const mvvIconMap = [
  HeartHandshakeIcon,
  AwardIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UsersIcon,
  LeafIcon,
];

// Hero Section
function AboutHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { data } = useSectionData<any>("about", "AboutHero");
  const heroSubtitle = data.description;
  return (
    <section className="relative min-h-[90vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center">
      {/* Background Image with Parallax */}
      <motion.div
        style={{
          y,
        }}
        className="absolute inset-0"
      >
        <img
          src={data.backgroundImage}
          alt="Energy infrastructure"
          className="w-full h-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-900" />
      </motion.div>

      {/* Animated Grid Overlay */}
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
          className="max-w-4xl"
        >
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
              {data.tagline}
            </span>
          </motion.div>

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
              delay: 0.3,
            }}
            className="text-4xl md:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8"
          >
            {data.headingPart1 || ""}
            <br />
            <span className="text-[#C50066]">
              {data.headingItalicHighlight || ""}
            </span>
          </motion.h1>

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
              delay: 0.5,
            }}
            className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light"
          >
            {heroSubtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.5,
          duration: 1,
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-brand-pink rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
// Who We Are Section
function WhoWeAre() {
  const { data } = useSectionData<any>("about", "WhoWeAre");
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[3px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {data.tagline}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 leading-tight mb-8">
            {data.headingPart1 || ""} <br />
            <span className="text-brand-pink">
              {data.headingHighlight || ""}
            </span>
          </h2>

          <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
            <p>{data.paragraphs?.[0]}</p>
            <p className="text-neutral-900 font-semibold">
              {data.paragraphs?.[1]}
            </p>
          </div>

          {/* Our Heritage Sub-Block */}
          <div className="mt-10 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-brand-pink" />
              <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                {data.heritageTagline || ""}
              </span>
            </div>
            <p className="text-lg text-neutral-800 leading-relaxed font-normal">
              <i>{data.heritageDescription || ""} </i>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// Mission, Vision & Values
function MissionVisionValues() {
  const { data } = useSectionData<any>("about", "MissionVisionValues");
  const missionText = data.missionDesc;
  const visionText = data.visionDesc;
  const values = (data.valuesList || []).map((v: any, i: number) => ({
    ...v,
    icon: mvvIconMap[i] || AwardIcon,
  }));
  return (
    <section className="py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[3px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {data.tagline}
            </span>
            <div className="w-10 h-[3px] bg-brand-pink" />
          </div>
          <p className="text-2xl md:text-3xl font-light text-neutral-900 max-w-4xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
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
            className="p-10 bg-white border-l-4 border-brand-pink"
          >
            <h3 className="text-2xl font-black text-neutral-900 mb-4 uppercase tracking-tight">
              {data.visionTitle}
            </h3>
            <p className="text-neutral-700 leading-relaxed">{visionText}</p>
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
            className="p-10 bg-white border-l-4 border-brand-pink"
          >
            <h3 className="text-2xl font-black text-neutral-900 mb-4 uppercase tracking-tight">
              {data.missionTitle}
            </h3>
            <p className="text-neutral-700 leading-relaxed">{missionText}</p>
          </motion.div>
        </div>

        {/* Core Values */}
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
          className="mb-12 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6">
            {data.valuesTitle}
          </h3>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            {data.valuesDesc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value: any, i: number) => (
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
                margin: "-50px",
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="p-8 bg-white border border-neutral-200 hover:border-brand-pink/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-brand-panel rounded-xl flex items-center justify-center text-brand-pink mb-6 group-hover:scale-110 transition-transform duration-300">
                <value.icon size={26} strokeWidth={1.5} />
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-3">
                {value.title}
              </h4>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// Scale & Impact (KPIs)
function ScaleImpact() {
  const { data } = useSectionData<any>("about", "ScaleImpact");
  const statsIcons = [
    UsersIcon,
    BriefcaseIcon,
    ZapIcon,
    ShieldCheckIcon,
    GlobeIcon,
  ];
  const stats = (data.stats || []).map((s: any, idx: number) => ({
    value: s.value,
    label: s.label,
    description: s.description,
    icon: statsIcons[idx] || UsersIcon,
  }));

  return (
    <section className="py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-pink rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-light rounded-full blur-3xl animate-pulse-slow"
          style={{
            animationDelay: "1s",
          }}
        />
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
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {data.heading}
          </h2>
          <p className="text-neutral-400 text-lg max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {stats.map((stat: any, i: number) => (
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
                duration: 0.5,
                delay: i * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-pink/50 transition-all duration-300 group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-20px)]"
            >
              <div className="w-14 h-14 bg-brand-pink/20 rounded-xl flex items-center justify-center text-brand-pink mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon size={26} strokeWidth={1.5} />
              </div>
              <div className="text-4xl font-black mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-brand-pink uppercase tracking-wider mb-2">
                {stat.label}
              </div>
              <p className="text-neutral-400 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

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
            delay: 0.5,
          }}
          className="text-center text-neutral-400 italic max-w-4xl mx-auto"
        >
          {data.footerNote}
        </motion.p>
      </div>
    </section>
  );
}
// Timeline
function Timeline() {
  const { data } = useSectionData<any>("about", "Timeline");
  const phases: Array<{ title: string; description: string }> =
    data.phases || data.phasesList || [];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
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
            <div className="w-10 h-[3px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {data.tagline}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
            {data.heading}
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-200 hidden md:block" />

          <div className="space-y-12">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: -30,
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
                className="relative flex gap-8 items-start"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 hidden md:flex">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-brand-pink flex items-center justify-center shadow-lg">
                    <span className="text-brand-pink font-black text-lg">
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <h3 className="text-2xl font-black text-neutral-900 mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
// Sustainability Section
function Sustainability() {
  const { data } = useSectionData<any>("about", "Sustainability");
  const focuses: string[] = data.focuses || data.focusList || [];

  return (
    <section className="py-28 bg-neutral-50">
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[3px] bg-brand-pink" />
              <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                {data.tagline}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight mb-8">
              {data.heading}
            </h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>{data.paragraphs?.[0]}</p>
              <p>{data.paragraphs?.[1]}</p>
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
              delay: 0.2,
            }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-neutral-900 mb-6">
              Key Focus Areas:
            </h3>
            {focuses.map((focus, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="flex gap-4 items-start p-4 bg-white border border-neutral-200 hover:border-brand-pink/30 transition-colors duration-300"
              >
                <CheckCircle2Icon
                  size={24}
                  className="text-brand-pink flex-shrink-0 mt-0.5"
                  strokeWidth={2}
                />

                <span className="text-neutral-700">{focus}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

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
            delay: 0.5,
          }}
          className="text-center text-neutral-600 italic max-w-4xl mx-auto mt-16 text-lg"
        >
          {data.footerNote}
        </motion.p>
      </div>
    </section>
  );
}
// Global Presence
function GlobalPresence() {
  const { data } = useSectionData<any>("about", "GlobalPresence");
  const areas: Array<{ title: string; desc: string }> = data.areas || [];
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[3px] bg-brand-pink" />
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
              {data.tagline}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 leading-tight mb-8">
            {data.headingPart1 || ""}
            <br />
            <span className="text-brand-pink">
              {data.headingHighlight || ""}
            </span>
          </h2>

          <div className="space-y-6 text-lg text-neutral-700 leading-relaxed mb-12">
            <p>{data.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {areas.map((area, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -20 : 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="flex gap-4 items-center p-5 bg-neutral-50 border border-neutral-200"
              >
                <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
                  <GlobeIcon size={20} className="text-brand-pink" />
                </div>
                <div>
                  <div className="text-neutral-900 font-bold">{area.title}</div>
                  <div className="text-neutral-500 text-sm">{area.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

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
              delay: 0.3,
            }}
            className="p-8 bg-brand-panel border-l-4 border-brand-pink"
          >
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              {data.calloutTitle}
            </h3>
            <p className="text-neutral-700 leading-relaxed">
              {data.calloutDesc}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
// Leadership Section
function Leadership() {
  const { data } = useSectionData<any>("about", "Leadership");
  const leaders = data.leaders || [];
  const [expandedLeaderIndex, setExpandedLeaderIndex] = React.useState<
    number | null
  >(null);

  const toggleLeader = (idx: number) => {
    setExpandedLeaderIndex((prev) => (prev === idx ? null : idx));
  };

  if (!data.heading && leaders.length === 0) return null;

  return (
    <section className="py-28 bg-neutral-900 text-white">
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
          className="text-center mb-16"
        >
          {data.heading && (
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {data.heading}
            </h2>
          )}
          {data.description && (
            <p className="text-neutral-400 text-lg max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leaders.map((leader: any, i: number) => {
            const isExpanded = expandedLeaderIndex === i;
            return (
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
                className="relative p-10 bg-neutral-900 border border-white/10 hover:border-brand-pink/40 transition-all duration-300 overflow-hidden group min-h-[600px] flex flex-col justify-end"
              >
                {/* Background Image from CMS */}
                {leader.image && (
                  <>
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 pointer-events-none ${
                        isExpanded
                          ? "opacity-35 group-hover:opacity-45 scale-105"
                          : "opacity-100 brightness-110 contrast-[1.03] group-hover:scale-105"
                      }`}
                    />
                    {/* Face side ambient highlight to keep the face bright & clear */}
                    {!isExpanded && (
                      <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
                    )}
                    {/* Dark Overlay: Full dark previous-way gradient when expanded; lower-only gradient (42%) when collapsed so face stays completely bright */}
                    {isExpanded ? (
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-neutral-950/80 pointer-events-none transition-all duration-500" />
                    ) : (
                      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent pointer-events-none transition-all duration-500" />
                    )}
                  </>
                )}

                {/* Content Area */}
                <div className="relative z-10">
                  {leader.role && (
                    <div className="text-brand-pink text-xs md:text-sm font-bold tracking-wider uppercase mb-2">
                      {leader.role}
                    </div>
                  )}
                  {leader.name && (
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                      {leader.name}
                    </h3>
                  )}
                  {leader.bio && (
                    <div>
                      <p
                        className={`text-neutral-300 leading-relaxed text-sm md:text-base ${
                          isExpanded
                            ? "whitespace-pre-line"
                            : "line-clamp-2 md:line-clamp-3"
                        }`}
                      >
                        {leader.bio}
                      </p>
                      {leader.bio.length > 90 && (
                        <button
                          type="button"
                          onClick={() => toggleLeader(i)}
                          className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-brand-pink uppercase tracking-widest hover:text-white transition-colors cursor-pointer group/btn"
                        >
                          <span className="border-b border-brand-pink/50 group-hover/btn:border-white pb-0.5 transition-colors">
                            {isExpanded ? "Close Profile" : "View Profile"}
                          </span>
                          <ChevronDownIcon
                            className={`w-3.5 h-3.5 text-brand-pink group-hover/btn:text-white transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
// Closing Statement
function ClosingStatement() {
  const { data } = useSectionData<any>("about", "ClosingStatement");

  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
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
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 leading-tight mb-8">
            {data.headingPart1 || ""}
            <span className="text-transparent bg-clip-text bg-gradient-brand">
              {data.headingHighlight || ""}
            </span>
            {data.headingPart2 || ""}
          </h2>
          <p className="text-2xl text-neutral-600 leading-relaxed font-light">
            {data.description}
          </p>

          <Link
            to={data.ctaUrl || "/contact"}
            className="inline-flex items-center gap-3 px-10 py-5 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300 shadow-2xl shadow-brand-pink/30 mt-12"
          >
            {data.ctaLabel}
            <ArrowRightIcon size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
// Main About Page Component
export function About() {
  useSEO("about");

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation />

      <AboutHero />
      <WhoWeAre />
      <MissionVisionValues />
      <ScaleImpact />
      <Timeline />
      <Sustainability />
      <GlobalPresence />
      <Leadership />
      <ClosingStatement />

      {/* Footer */}
      <Footer />
    </main>
  );
}
