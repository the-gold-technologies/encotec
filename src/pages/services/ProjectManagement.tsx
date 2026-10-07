import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/Navigation";
import { Footer } from "../../components/Footer";
import { motion, useInView } from "framer-motion";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  TargetIcon,
  FileCheckIcon,
  UsersIcon,
  ShieldCheckIcon,
  MapIcon,
  BriefcaseIcon,
  FileTextIcon,
} from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";
import { useSEO } from "../../hooks/useSEO";

const pmOfferingIconMap = [MapIcon, FileTextIcon, BriefcaseIcon];

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
function ProjectHero() {
  const { data } = useSectionData<any>("project-management", "ProjectHero");
  return (
    <section className="relative min-h-[90vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center pt-20">
      {/* Strategic Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated Strategic Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 0,200 Q 400,300 800,100 T 1600,200"
          fill="none"
          stroke="#B6005E"
          strokeWidth="2"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        />

        <motion.path
          d="M 0,400 Q 600,200 1000,500 T 1600,400"
          fill="none"
          stroke="#D4006F"
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 0.5,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-transparent to-neutral-900" />

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
            {data.description || ""}
          </p>

          <div className="flex flex-wrap gap-6">
            {(data.floatingBadges || []).map((badge: any, i: number) => {
              const badgeIconMap: Record<string, any> = {
                Map: MapIcon,
                FileText: FileTextIcon,
                Briefcase: BriefcaseIcon,
              };
              const IconComponent = badgeIconMap[badge.icon] || MapIcon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4"
                >
                  <IconComponent className="text-brand-pink" size={24} />
                  <span className="font-bold tracking-wider uppercase text-sm">
                    {badge.text}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
function PhilosophySection() {
  const { data } = useSectionData<any>("project-management", "PhilosophySection");
  return (
    <section className="py-28 bg-white relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight mb-8">
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
            <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
              <p>{data.para1}</p>
              <p>{data.para2}</p>
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
            {[
              {
                icon: TargetIcon,
                title: "Strategic Alignment",
                desc: "Aligning technical specs with business goals",
              },
              {
                icon: FileCheckIcon,
                title: "Financial Viability",
                desc: "Rigorous financial and resource assessments",
              },
              {
                icon: UsersIcon,
                title: "Partner Selection",
                desc: "Finalising the right EPC contractors",
              },
              {
                icon: ShieldCheckIcon,
                title: "Risk Mitigation",
                desc: "Identifying challenges before they arise",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-neutral-50 border border-neutral-200 hover:border-brand-pink/30 transition-colors duration-300"
              >
                <feature.icon
                  className="text-brand-pink mb-4"
                  size={32}
                  strokeWidth={1.5}
                />

                <h3 className="font-bold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function CoreOfferings() {
  const { data } = useSectionData<any>("project-management", "CoreOfferings");
  const offerings = (data.offeringsList || []).map((o: any, i: number) => ({
    ...o,
    icon: pmOfferingIconMap[i] || FileTextIcon,
  }));
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
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Our Development Services
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            End-to-end conceptualisation to ensure your project starts strong.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((offering: any, i: number) => (
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-brand-pink/20 rounded-xl flex items-center justify-center text-brand-pink mb-8">
                <offering.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black mb-4">{offering.title}</h3>
              <p className="text-neutral-400 leading-relaxed">
                {offering.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function StatsSection() {
  const { data } = useSectionData<any>("project-management", "StatsSection");
  const stats = data.stats || [];
  return (
    <section className="py-20 bg-brand-pink text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat: any, i: number) => (
            <motion.div
              key={i}
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
                delay: i * 0.2,
              }}
            >
              <div className="text-5xl md:text-6xl font-black mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-90">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function CTASection() {
  const { data } = useSectionData<any>("project-management", "CTASection");
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
export function ProjectManagement() {
  useSEO("service/project-management");

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation variant="dark" />

      <ProjectHero />
      <PhilosophySection />
      <CoreOfferings />
      <StatsSection />
      <CTASection />

      <Footer />
    </main>
  );
}
