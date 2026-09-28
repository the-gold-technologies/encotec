import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";

export function ProjectShowcase() {
  const { data } = useSectionData<any>("home", "ProjectShowcaseSection");
  const projects = data.projects || [];
  const viewAllLabel = data.viewAllLabel || "View All Case Studies";
  const viewAllUrl = data.viewAllUrl || "/insights";

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-neutral-900 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="text-brand-pink font-bold tracking-wider uppercase text-sm">
              {data.tagline}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mt-2 selection:bg-brand-pink selection:text-white select-text cursor-text">
              {data.heading}
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 max-w-md">
            <p className="text-neutral-400 text-lg md:text-right">
              {data.description}
            </p>
            {viewAllLabel && (
              <Link
                to={viewAllUrl}
                className="inline-flex items-center gap-2 text-brand-pink hover:text-white font-semibold text-sm tracking-wide transition-colors group"
              >
                <span>{viewAllLabel}</span>
                <ArrowUpRightIcon
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        {projects.map((project: any, index: number) => {
          const destination =
            project.ctaUrl ||
            project.link ||
            (project.title?.toLowerCase().includes("rajpura")
              ? "/insights/ensuring-reliability-rajpura"
              : project.title?.toLowerCase().includes("dial") ||
                  project.title?.toLowerCase().includes("gateway")
                ? "/insights/powering-gateway-india-airport"
                : "/insights");

          return (
            <Link key={index} to={destination}>
              <div className="group relative h-[60vh] w-full overflow-hidden border-t border-white/10">
                <motion.div
                  style={{
                    y,
                  }}
                  className="absolute inset-0 w-full h-[120%]"
                >
                  <img
                    src={project.backgroundImage || project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-end">
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
                      delay: 0.2,
                    }}
                    className="max-w-2xl"
                  >
                    <span className="text-brand-pink font-medium mb-2 block text-sm tracking-wide">
                      {project.category}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-bold mb-3">
                      {project.title}
                    </h3>
                    <p className="text-neutral-300 text-base md:text-lg mb-2 leading-relaxed">
                      {project.description}
                    </p>
                    <p className="text-neutral-500 text-sm">
                      {project.location}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      scale: 1.1,
                    }}
                    className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 cursor-pointer mt-6 md:mt-0 group-hover:bg-brand-pink group-hover:border-brand-pink transition-colors duration-300"
                  >
                    <ArrowUpRightIcon size={32} />
                  </motion.div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
