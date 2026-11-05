import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { CtaLink } from '../CtaLink';
import { motion } from 'framer-motion';
import { useSectionData } from '../../store/useCMSStore';


export function WhyEncotec() {
  const { data } = useSectionData<any>("home", "WhyEncotecSection");
  const wordsList = [data.revealWord1, data.revealWord2, data.revealWord3].filter(Boolean);
  const ctaBlocks = data.ctaBlocks || [];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big Typography Reveal */}
        <div className="mb-24">
          <div className="space-y-6 md:space-y-10">
            {wordsList.map((word: string, index: number) =>
              <motion.h2
                key={index}
                initial={{
                  opacity: 0,
                  x: -50
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                viewport={{
                  once: true,
                  margin: '-80px'
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.25,
                  ease: 'easeOut'
                }}
                className="text-4xl md:text-7xl lg:text-8xl font-black text-neutral-900 tracking-tighter">
                {word}
              </motion.h2>
            )}
          </div>
        </div>

        {/* CTA Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ctaBlocks.map((block: any, index: number) =>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.15
              }}
              className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-brand-pink/20 transition-colors duration-300 group">
              
              <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-brand-pink transition-colors">
                {block.headline}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm mb-6">
                {block.text}
              </p>
              <CtaLink
                to=""
                className="group inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full text-sm px-4 py-2 bg-transparent text-neutral-900 hover:text-brand-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink"
              >
                Get in Touch
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CtaLink>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}