import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "../../components/Navigation";
import { Footer } from "../../components/Footer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
  ActivityIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";
import { useSEO } from "../../hooks/useSEO";

const reFeatureIconMap = [SearchIcon, ActivityIcon, TrendingUpIcon];

function AdvisoryHero() {
  const { data } = useSectionData<any>("technical-advisory", "AdvisoryHero");
  return (
    <section className="relative min-h-[90vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center pt-20">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(233, 30, 140, 0.2) 0%, transparent 50%)",
            backgroundSize: "100% 100%",
          }}
        />
      </div>

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
            {data.headingPart1 || ""}
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
        </motion.div>
      </div>
    </section>
  );
}
function AdvisoryFeatures() {
  const { data } = useSectionData<any>("technical-advisory", "AdvisoryFeatures");
  const features = (data.features || data.featuresList || []).map(
    (f: any, i: number) => ({ ...f, icon: reFeatureIconMap[i] || SearchIcon }),
  );

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
function DiagnosticProcess() {
  const { data } = useSectionData<any>("technical-advisory", "DiagnosticProcess");
  const steps = data.steps || [];

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
            {data.heading}
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((item: any, i: number) => (
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
                delay: i * 0.1,
              }}
              className="bg-white/5 border border-white/10 p-8 relative overflow-hidden group hover:bg-white/10 transition-colors"
            >
              <div className="text-6xl font-black text-white/5 absolute -top-4 -right-4 group-hover:text-brand-pink/10 transition-colors">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">
                {item.title}
              </h3>
              <p className="text-neutral-400 text-sm relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function AdvisoryCTA() {
  const { data } = useSectionData<any>("technical-advisory", "CTASection");
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
export function RenewableEnergy() {
  useSEO("service/technical-advisory");

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation variant="dark" />

      <AdvisoryHero />
      <AdvisoryFeatures />
      <DiagnosticProcess />
      <AdvisoryCTA />

      <Footer />
    </main>
  );
}
