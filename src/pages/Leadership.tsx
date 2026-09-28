import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  AwardIcon,
  UsersIcon,
  GlobeIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useSectionData } from "../store/useCMSStore";
import { useSEO } from "../hooks/useSEO";

// --- Animated Counter Component ---
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

// Fallback images (used only when CMS does not specify an image)
const fallbackExecImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
];
const fallbackSeniorImages = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800",
];
const cultureIcons = [AwardIcon, UsersIcon, GlobeIcon, TrendingUpIcon];
const cultureIconsMap: Record<string, any> = {
  AwardIcon,
  Award: AwardIcon,
  UsersIcon,
  Users: UsersIcon,
  GlobeIcon,
  Globe: GlobeIcon,
  TrendingUpIcon,
  TrendingUp: TrendingUpIcon,
};

// --- Sections ---
function LeadershipHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const { data } = useSectionData<any>("leadership", "LeadershipHero");

  const tagline = data.tagline || data.heroTagline;
  const title = data.heroTitle || data.title;
  const subtitle = data.heroSubtitle || data.subtitle || data.description;
  const bgImage = data.backgroundImage || data.heroImage || data.image;

  const badgeList: string[] =
    data.badges && Array.isArray(data.badges) && data.badges.length > 0
      ? data.badges
      : data.badgeList &&
          Array.isArray(data.badgeList) &&
          data.badgeList.length > 0
        ? data.badgeList
        : [
            data.heroBadge1,
            data.heroBadge2,
            data.heroBadge3,
            data.heroBadge4,
            data.heroBadge5,
          ].filter(Boolean);

  return (
    <section className="relative min-h-screen w-full bg-neutral-900 text-white overflow-hidden flex items-center">
      {/* Parallax Background */}
      {bgImage && (
        <motion.div
          style={{
            y,
          }}
          className="absolute inset-0"
        >
          <img
            src={bgImage}
            alt={title || "Leadership"}
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
          {/* Label */}
          {tagline && (
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
                {tagline}
              </span>
            </motion.div>
          )}

          {/* Headline */}
          {title && (
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
              className="text-4xl md:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8 max-w-5xl"
            >
              {title}
            </motion.h1>
          )}

          {/* Subtitle */}
          {subtitle && (
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
              {subtitle}
            </motion.p>
          )}

          {/* Floating Stat Badges */}
          {badgeList.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {badgeList.map((badge: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + idx * 0.1 }}
                  className={`px-6 py-3 font-bold text-sm tracking-wider uppercase backdrop-blur-sm ${
                    idx === 0
                      ? "bg-brand-pink/90 text-white"
                      : idx % 2 === 1
                        ? "bg-white/90 text-neutral-900"
                        : "bg-white/10 border border-white/20 text-white"
                  }`}
                >
                  {badge}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function LeadershipPhilosophy() {
  const { data } = useSectionData<any>("leadership", "LeadershipPhilosophy");

  const tagline = data.philosophyTagline || data.tagline;
  const heading = data.philosophyHeading || data.heading;
  const para1 = data.philosophyPara1 || data.para1 || data.description;
  const para2 = data.philosophyPara2 || data.para2;
  const quote = data.philosophyQuote || data.quote;
  const image = data.philosophyImage || data.image;

  if (!heading && !para1 && !image) return null;

  return (
    <section className="py-32 bg-white overflow-hidden">
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
            {tagline && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-brand-pink" />
                <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                  {tagline}
                </span>
              </div>
            )}

            {heading && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-8 leading-tight tracking-tight uppercase">
                {heading}
              </h2>
            )}

            <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
              {para1 && <p>{para1}</p>}
              {para2 && <p>{para2}</p>}
            </div>
          </motion.div>

          {/* Right: Image & Callout */}
          {image && (
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
                className="relative shadow-2xl"
                style={{
                  transform: "rotate(2deg)",
                }}
              >
                <img
                  src={image}
                  alt={heading || "Philosophy"}
                  className="w-full h-[500px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
              </div>

              {/* Callout Quote */}
              {quote && (
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
                    duration: 0.6,
                    delay: 0.6,
                  }}
                  className="absolute -bottom-10 -left-6 md:-left-12 bg-brand-panel p-8 shadow-xl max-w-sm border-l-4 border-brand-pink"
                  style={{
                    transform: "rotate(-2deg)",
                  }}
                >
                  <p className="text-lg font-bold text-neutral-900 italic leading-snug">
                    "{quote}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function ExecutiveTeam() {
  const { data } = useSectionData<any>("leadership", "ExecutiveTeam");
  const [expandedExecIndex, setExpandedExecIndex] = useState<number | null>(
    null,
  );

  const toggleExec = (idx: number) => {
    setExpandedExecIndex((prev) => (prev === idx ? null : idx));
  };

  const tagline = data.tagline;
  const heading = data.heading;

  // Build executives list either from array in CMS data or from exec1, exec2, etc. properties
  const cmsExecutivesArray = data.executives || data.execList || data.members;
  let executives: Array<{
    name: string;
    role: string;
    bio: string;
    image: string;
    tags: string[];
  }> = [];

  if (Array.isArray(cmsExecutivesArray) && cmsExecutivesArray.length > 0) {
    executives = cmsExecutivesArray.map((exec: any, idx: number) => {
      const tags = Array.isArray(exec.tags)
        ? exec.tags
        : typeof exec.tags === "string"
          ? exec.tags.split(", ").filter(Boolean)
          : [];
      return {
        name: exec.name || "",
        role: exec.role || "",
        bio: exec.bio || exec.description || "",
        image:
          exec.image ||
          exec.photo ||
          fallbackExecImages[idx % fallbackExecImages.length],
        tags,
      };
    });
  } else {
    for (let i = 1; i <= 6; i++) {
      const name = data[`exec${i}Name`];
      if (name) {
        const role = data[`exec${i}Role`] || "";
        const bio = data[`exec${i}Bio`] || "";
        const image =
          data[`exec${i}Image`] ||
          data[`exec${i}Photo`] ||
          fallbackExecImages[(i - 1) % fallbackExecImages.length];
        const rawTags = data[`exec${i}Tags`];
        const tags = Array.isArray(rawTags)
          ? rawTags
          : typeof rawTags === "string"
            ? rawTags.split(", ").filter(Boolean)
            : [];
        executives.push({ name, role, bio, image, tags });
      }
    }
  }

  if (executives.length === 0) return null;

  return (
    <section className="py-32 bg-dark-bg text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {(tagline || heading) && (
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
              duration: 0.8,
            }}
            className="mb-16"
          >
            {tagline && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-brand-pink" />
                <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                  {tagline}
                </span>
              </div>
            )}
            {heading && (
              <h2 className="text-4xl md:text-5xl font-black leading-tight uppercase tracking-tight">
                {heading}
              </h2>
            )}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {executives.map((exec, index) => {
            const isExpanded = expandedExecIndex === index;
            return (
              <motion.div
                key={exec.name || index}
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
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                className="relative min-h-[600px] overflow-hidden group bg-neutral-900 border border-white/10 hover:border-brand-pink/40 transition-all duration-300 flex flex-col justify-end"
              >
                {/* Background Image from CMS - 100% brightness, sharp & clear face */}
                {exec.image && (
                  <img
                    src={exec.image}
                    alt={exec.name}
                    className="absolute inset-0 w-full h-full object-cover object-top brightness-110 contrast-[1.03] transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  />
                )}

                {/* Face side ambient highlight to keep face clear and well-lit */}
                {!isExpanded && (
                  <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Default Bottom Gradient (Only at bottom text area 42%, upper face remains 100% clear & bright) */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent transition-opacity duration-500 pointer-events-none ${
                    isExpanded
                      ? "opacity-0"
                      : "opacity-100 group-hover:opacity-0"
                  }`}
                />

                {/* Hover / Click Glassmorphism Overlay */}
                <div
                  className={`absolute inset-0 bg-neutral-900/95 backdrop-blur-md transition-all duration-500 p-8 md:p-12 flex flex-col justify-start pt-12 z-20 ${
                    isExpanded
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-brand-pink font-bold text-xs uppercase tracking-wider mb-1">
                        {exec.role}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                        {exec.name}
                      </h3>
                    </div>
                    {isExpanded && (
                      <button
                        type="button"
                        onClick={() => toggleExec(index)}
                        className="text-neutral-400 hover:text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 border border-white/20 hover:border-brand-pink transition-colors cursor-pointer"
                      >
                        Close ✕
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6 overflow-y-auto max-h-[340px] pr-2">
                    {exec.bio}
                  </p>
                  {exec.tags && exec.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pb-4">
                      {exec.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 border border-brand-pink/50 text-brand-pink text-xs font-bold uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Always Visible Info: Name, Role, 2-line Bio Preview, and 'View Profile' Indicator */}
                <div
                  className={`relative z-10 p-8 md:p-12 transition-opacity duration-300 ${
                    isExpanded ? "opacity-0" : "group-hover:opacity-0"
                  }`}
                >
                  <p className="text-brand-pink font-bold text-xs tracking-wider uppercase mb-1">
                    {exec.role}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">
                    {exec.name}
                  </h3>
                  {exec.bio && (
                    <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 leading-relaxed max-w-lg mb-3">
                      {exec.bio}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleExec(index)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-pink uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
                  >
                    <span>View Profile</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SeniorLeadership() {
  const { data } = useSectionData<any>("leadership", "SeniorLeadership");

  const tagline = data.tagline;
  const heading = data.heading;

  const cmsLeadersArray =
    data.leaders || data.leaderList || data.members || data.heads;
  let leaders: Array<{
    name: string;
    role: string;
    bio: string;
    image: string;
  }> = [];

  if (Array.isArray(cmsLeadersArray) && cmsLeadersArray.length > 0) {
    leaders = cmsLeadersArray.map((leader: any, idx: number) => ({
      name: leader.name || "",
      role: leader.role || "",
      bio: leader.bio || leader.description || "",
      image:
        leader.image ||
        leader.photo ||
        fallbackSeniorImages[idx % fallbackSeniorImages.length],
    }));
  } else {
    for (let i = 1; i <= 8; i++) {
      const name = data[`leader${i}Name`];
      if (name) {
        const role = data[`leader${i}Role`] || "";
        const bio = data[`leader${i}Bio`] || "";
        const image =
          data[`leader${i}Image`] ||
          data[`leader${i}Photo`] ||
          fallbackSeniorImages[(i - 1) % fallbackSeniorImages.length];
        leaders.push({ name, role, bio, image });
      }
    }
  }

  if (leaders.length === 0) return null;

  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {(tagline || heading) && (
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
              duration: 0.8,
            }}
            className="mb-16 text-center"
          >
            {tagline && (
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-brand-pink" />
                <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                  {tagline}
                </span>
                <div className="w-8 h-[2px] bg-brand-pink" />
              </div>
            )}
            {heading && (
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight">
                {heading}
              </h2>
            )}
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name || index}
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
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="bg-white border border-neutral-200 hover:border-b-4 hover:border-b-brand-pink transition-all duration-300 overflow-hidden group"
            >
              {leader.image && (
                <div className="h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-black text-neutral-900 mb-1 uppercase tracking-tight">
                  {leader.name}
                </h3>
                {leader.role && (
                  <p className="text-brand-pink text-xs font-bold uppercase tracking-wider mb-4">
                    {leader.role}
                  </p>
                )}
                {leader.bio && (
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {leader.bio}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamByNumbers() {
  const { data } = useSectionData<any>("leadership", "TeamByNumbers");

  const rawStats = Array.isArray(data?.stats)
    ? data.stats
    : Array.isArray(data?.statsList)
      ? data.statsList
      : Array.isArray(data?.numbers)
        ? data.numbers
        : null;

  let stats: Array<{ value: string; label: string }> = [];

  if (rawStats && rawStats.length > 0) {
    stats = rawStats.map((s: any) => ({
      value: String(s.value || ""),
      label: String(s.label || ""),
    }));
  } else if (data) {
    const legacyStats: any[] = [];
    for (let i = 1; i <= 6; i++) {
      if (data[`stats${i}Value`] || data[`stats${i}Label`]) {
        const val = String(data[`stats${i}Value`] || "");
        const suf = String(data[`stats${i}Suffix`] || "");
        legacyStats.push({
          value: val.includes("+") || !suf ? val : `${val}${suf}`,
          label: String(data[`stats${i}Label`] || ""),
        });
      }
    }
    if (legacyStats.length > 0) stats = legacyStats;
  }

  if (stats.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div
          className={`grid grid-cols-2 ${
            stats.length >= 5
              ? "md:grid-cols-3 lg:grid-cols-5"
              : "md:grid-cols-4"
          } gap-8 md:gap-6 divide-x divide-white/10`}
        >
          {stats.map((stat, i) => {
            const match = String(stat.value).match(/^([\d,]+)(.*)$/);
            const num = match ? parseInt(match[1].replace(/,/g, ""), 10) : NaN;
            const suffix = match ? match[2] : "";

            return (
              <div
                key={i}
                className="flex flex-col items-center text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-black text-brand-pink mb-2">
                  {!isNaN(num) ? (
                    <AnimatedCounter target={num} suffix={suffix} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-xs md:text-sm font-bold tracking-wider uppercase text-neutral-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CultureValues() {
  const { data } = useSectionData<any>("leadership", "CultureValues");

  const tagline = data.tagline || data.cultureTagline;
  const heading = data.heading || data.cultureHeading;

  const rawValues = Array.isArray(data.values)
    ? data.values
    : Array.isArray(data.valuesList)
      ? data.valuesList
      : null;

  let values: Array<{ title: string; desc: string; icon: any }> = [];

  if (rawValues && rawValues.length > 0) {
    values = rawValues.map((v: any, index: number) => {
      let icon = cultureIcons[index % cultureIcons.length];
      if (typeof v.icon === "string" && cultureIconsMap[v.icon]) {
        icon = cultureIconsMap[v.icon];
      } else if (v.icon && typeof v.icon === "function") {
        icon = v.icon;
      }
      return {
        title: v.title || v.heading || "",
        desc: v.desc || v.description || "",
        icon,
      };
    });
  } else if (data) {
    for (let i = 1; i <= 6; i++) {
      const title = data[`value${i}Title`];
      if (title) {
        const desc =
          data[`value${i}Desc`] || data[`value${i}Description`] || "";
        const rawIcon = data[`value${i}Icon`];
        let icon = cultureIcons[(i - 1) % cultureIcons.length];
        if (typeof rawIcon === "string" && cultureIconsMap[rawIcon]) {
          icon = cultureIconsMap[rawIcon];
        }
        values.push({ title, desc, icon });
      }
    }
  }

  if (!heading && values.length === 0) return null;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {(tagline || heading) && (
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
              duration: 0.8,
            }}
            className="mb-16"
          >
            {tagline && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-brand-pink" />
                <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                  {tagline}
                </span>
              </div>
            )}
            {heading && (
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight">
                {heading}
              </h2>
            )}
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComp = value.icon;
            return (
              <motion.div
                key={value.title || index}
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
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="p-8 bg-neutral-50 border border-neutral-200 hover:border-brand-pink/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-brand-panel rounded-xl flex items-center justify-center text-brand-pink mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComp size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-black text-neutral-900 mb-3 uppercase tracking-tight">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  {value.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JoinCTA() {
  const { data } = useSectionData<any>("leadership", "JoinCTA");

  const heading = data.joinHeading || data.heading;
  const subtitle = data.joinSubtitle || data.subtitle;
  const ctaLabel1 = data.ctaLabel1 || data.ctaLabel;
  const ctaUrl1 = data.ctaUrl1 || data.ctaUrl || "/careers";
  const ctaLabel2 = data.ctaLabel2;
  const ctaUrl2 = data.ctaUrl2 || "/contact";

  if (!heading) return null;

  return (
    <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
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
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-tight">
            {heading}
          </h2>
          {subtitle && (
            <p className="text-xl text-neutral-300 mb-12 leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaLabel1 && (
              <Link
                to={ctaUrl1}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300"
              >
                {ctaLabel1}
                <ArrowRightIcon size={16} />
              </Link>
            )}
            {ctaLabel2 && (
              <Link
                to={ctaUrl2}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-bold tracking-wider uppercase hover:bg-white hover:text-neutral-900 transition-all duration-300"
              >
                {ctaLabel2}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Leadership() {
  useSEO("leadership");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation />

      <LeadershipHero />
      <LeadershipPhilosophy />
      <ExecutiveTeam />
      {/* <SeniorLeadership /> */}
      <TeamByNumbers />
      <CultureValues />
      <JoinCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
