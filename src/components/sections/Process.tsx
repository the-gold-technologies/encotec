import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  SearchIcon,
  PenToolIcon,
  HardHatIcon,
  CheckCircle2Icon,
  ActivityIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";

const processStepIcons = [
  SearchIcon,
  PenToolIcon,
  HardHatIcon,
  CheckCircle2Icon,
  ActivityIcon,
];

export function Process() {
  const { data } = useSectionData<any>("home", "ProcessSection");
  const rawSteps = data.steps || [];
  const steps = rawSteps.map((step: any, i: number) => ({
    ...step,
    icon: processStepIcons[i % processStepIcons.length] || SearchIcon,
  }));

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<any>(null);

  const updateScrollState = () => {
    if (
      !scrollRef.current ||
      steps.length === 0 ||
      isProgrammaticScrollRef.current
    )
      return;
    const container = scrollRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < steps.length; i++) {
      const card = container.children[i] as HTMLElement;
      if (card) {
        const cardCenter =
          card.offsetLeft - container.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
    }

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [steps.length]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current || steps.length === 0) return;
    const clampedIndex = Math.max(0, Math.min(index, steps.length - 1));
    setActiveIndex(clampedIndex);

    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 600);

    const targetCard = scrollRef.current.children[clampedIndex] as HTMLElement;
    if (targetCard) {
      const container = scrollRef.current;
      const targetLeft =
        targetCard.offsetLeft -
        container.offsetLeft -
        (container.clientWidth - targetCard.offsetWidth) / 2;

      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      scrollToIndex(Math.max(0, activeIndex - 1));
    } else {
      scrollToIndex(Math.min(steps.length - 1, activeIndex + 1));
    }
  };

  const progressPercentage =
    steps.length > 1 ? (activeIndex / (steps.length - 1)) * 100 : 100;

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
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
          >
            <span className="text-brand-pink font-bold tracking-wider uppercase text-sm">
              {data.tagline}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-2 selection:bg-brand-pink selection:text-white select-text cursor-text">
              {data.heading?.includes("Workflow Followed") ? (
                <>
                  Workflow Followed <br className="hidden md:block" />
                  for Each Project
                </>
              ) : (
                data.heading || ""
              )}
            </h2>
          </motion.div>

          {/* Navigation Arrows */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-brand-pink hover:text-brand-pink disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={activeIndex >= steps.length - 1}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-brand-pink hover:text-brand-pink disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              <ChevronRightIcon size={20} />
            </button>
          </motion.div>
        </div>

        {/* Progress Line */}
        <div className="mb-10 relative">
          <div className="h-px w-full bg-neutral-100" />
          <motion.div
            className="absolute top-0 left-0 h-px bg-gradient-brand origin-left"
            style={{
              width: `${progressPercentage}%`,
            }}
            initial={{
              width: "0%",
            }}
            animate={{
              width: `${progressPercentage}%`,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          />

          {/* Step indicators on the line */}
          <div className="absolute top-0 left-0 w-full flex justify-between -translate-y-1/2">
            {steps.map((step: any, i: number) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className="relative group cursor-pointer"
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${i <= activeIndex ? "bg-brand-pink border-brand-pink scale-125" : "bg-white border-neutral-300 hover:border-brand-pink/50"}`}
                />

                <span
                  className={`absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${i <= activeIndex ? "text-brand-pink font-extrabold" : "text-neutral-400"}`}
                >
                  0{step.id || i + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div className="relative mt-14">
          {/* Fade edges */}
          {activeIndex > 0 && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          )}
          {activeIndex < steps.length - 1 && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 no-scrollbar scroll-smooth"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {steps.map((step: any, index: number) => (
              <motion.div
                key={step.id || index}
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
                  delay: index * 0.1,
                }}
                className="flex-shrink-0 w-[320px] md:w-[360px] scroll-snap-align-start"
                style={{
                  scrollSnapAlign: "start",
                }}
              >
                <div
                  onClick={() => scrollToIndex(index)}
                  className={`h-full p-8 rounded-2xl border transition-all duration-500 group cursor-pointer ${index === activeIndex ? "bg-neutral-900 border-brand-pink/30 shadow-2xl shadow-brand-pink/10" : "bg-neutral-50 border-neutral-100 hover:border-brand-pink/20 hover:shadow-lg"}`}
                >
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`text-5xl font-black tracking-tighter transition-colors duration-500 ${index === activeIndex ? "text-brand-pink" : "text-neutral-200"}`}
                    >
                      0{step.id || index + 1}
                    </span>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${index === activeIndex ? "bg-brand-pink/20 text-brand-pink" : "bg-brand-panel text-brand-pink"}`}
                    >
                      <step.icon size={26} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-bold mb-4 transition-colors duration-500 ${index === activeIndex ? "text-white" : "text-neutral-900"}`}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-500 ${index === activeIndex ? "text-neutral-400" : "text-neutral-600"}`}
                  >
                    {step.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className={`mt-8 h-1 rounded-full transition-all duration-500 ${index === activeIndex ? "w-full bg-gradient-brand" : "w-8 bg-neutral-200 group-hover:w-16 group-hover:bg-brand-pink/40"}`}
                  />
                </div>
              </motion.div>
            ))}

            {/* Spacer at end for scroll padding */}
            <div className="flex-shrink-0 w-[40vw] max-w-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
