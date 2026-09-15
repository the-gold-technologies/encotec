import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";
import { Footer } from "../Footer";
import { useSectionData } from "../../store/useCMSStore";
import { StartProjectModal } from "../StartProjectModal";

export function CTA() {
  const { data } = useSectionData<any>("home", "CTASection");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Format phone URL directly from CMS data
  const phone = data?.secondaryBtnUrl || "";
  const phoneHref = phone.startsWith("tel:")
    ? phone
    : `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <>
      <section className="pt-32 pb-12 relative overflow-hidden flex items-center justify-center">
        {/* Background Gradient Animation */}
        <div className="absolute inset-0 bg-gradient-brand opacity-10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-pink/20 rounded-full blur-[100px]"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mb-4"
          >
            <span className="text-brand-pink font-bold tracking-wider uppercase text-sm">
              {data.tagline}
            </span>
          </motion.div>

          <motion.h2
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
            className="text-4xl md:text-6xl lg:text-7xl font-black text-neutral-900 mb-6 tracking-tight leading-[1.1] selection:bg-brand-pink selection:text-white select-text cursor-text"
          >
            {data.headingPart1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-brand">
              {data.headingHighlight}
            </span>
          </motion.h2>

          <motion.p
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
              delay: 0.1,
            }}
            className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto"
          >
            {data.description}
          </motion.p>

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
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* First button: Opens Start Project popup modal */}
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 text-lg px-10 py-5 bg-gradient-brand text-white shadow-2xl shadow-brand-pink/30 hover:shadow-brand-pink/40 hover:scale-[1.02] active:scale-[0.98] font-medium transition-all duration-300 rounded-full cursor-pointer"
            >
              {data.primaryBtnLabel || "Start Your Project"}
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            {/* Second button: Directly dials expert on mobile */}
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 text-lg px-10 py-5 bg-white text-neutral-900 border border-neutral-200 hover:border-brand-pink/30 hover:bg-brand-panel hover:scale-[1.02] active:scale-[0.98] font-medium transition-all duration-300 rounded-full cursor-pointer shadow-sm"
            >
              <PhoneIcon className="h-4 w-4 text-brand-pink" />
              {data.secondaryBtnLabel || "Talk to an Expert"}
            </a>
          </motion.div>

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
              delay: 0.4,
            }}
            className="mt-8 text-sm text-neutral-400"
          >
            {data.footerNote}
          </motion.p>

          <Footer variant="embedded" showCertificates />
        </div>
      </section>

      {/* Start Project Popup Form Modal */}
      <StartProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </>
  );
}
