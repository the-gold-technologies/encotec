import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import {
  JobApplicationModal,
  JobOpening,
} from "../components/JobApplicationModal";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRightIcon,
  GlobeIcon,
  TrendingUpIcon,
  DollarSignIcon,
  HeartIcon,
  ClockIcon,
  AwardIcon,
  MapPinIcon,
  BriefcaseIcon,
  CheckCircle2Icon,
  SearchIcon,
  UsersIcon,
  FileTextIcon,
} from "lucide-react";
import { useSectionData } from "../store/useCMSStore";
import { useSEO } from "../hooks/useSEO";

// Benefit icon map (by index)
const benefitIcons = [
  GlobeIcon,
  TrendingUpIcon,
  DollarSignIcon,
  HeartIcon,
  ClockIcon,
  AwardIcon,
];
// Process step icon map (by index)
const processIcons = [FileTextIcon, SearchIcon, UsersIcon, CheckCircle2Icon];

// --- Components ---
function CareersHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const { data } = useSectionData<any>("careers", "CareersHero");

  const heroTagline = data.heroTagline || data.tagline;
  const heroTitle = data.heroTitle || data.title;
  const heroSubtitle = data.heroSubtitle || data.subtitle || data.description;
  const bgImage = data.backgroundImage || data.heroImage || data.image;
  const badge1Text = data.badge1Text || data.badge1;
  const badge2Text = data.badge2Text || data.badge2;

  return (
    <section className="relative min-h-[80vh] w-full bg-neutral-900 text-white overflow-hidden flex items-center">
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
            alt={heroTitle || "Careers"}
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 py-32">
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
          {/* Label */}
          {heroTagline && (
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
                {heroTagline}
              </span>
            </motion.div>
          )}

          {/* Headline */}
          {heroTitle && (
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
              className="text-4xl md:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8"
            >
              {heroTitle}
            </motion.h1>
          )}

          {/* Subtitle */}
          {heroSubtitle && (
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
              className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light mb-12 max-w-3xl"
            >
              {heroSubtitle}
            </motion.p>
          )}

          {/* Floating Badges */}
          {(badge1Text || badge2Text) && (
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
                duration: 0.6,
                delay: 0.8,
              }}
              className="flex flex-wrap gap-4"
            >
              {badge1Text && (
                <div className="px-6 py-3 bg-brand-pink/90 backdrop-blur-sm text-white font-bold text-sm tracking-wider uppercase">
                  {badge1Text}
                </div>
              )}
              {badge2Text && (
                <div className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm tracking-wider uppercase">
                  {badge2Text}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function WhyEncotecSection() {
  const { data } = useSectionData<any>("careers", "CareersCulture");

  const cultureTagline = data.cultureTagline || data.tagline;
  const cultureHeading = data.cultureHeading || data.heading;
  const culturePara1 = data.culturePara1 || data.para1 || data.description;
  const culturePara2 = data.culturePara2 || data.para2;
  const cultureQuote = data.cultureQuote || data.quote;
  const cultureImage = data.cultureImage || data.image;

  if (!cultureHeading && !culturePara1 && !cultureImage) return null;

  return (
    <section className="py-32 bg-white">
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
            {cultureTagline && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-brand-pink" />
                <span className="text-xs font-bold tracking-[0.2em] text-brand-pink uppercase">
                  {cultureTagline}
                </span>
              </div>
            )}

            {cultureHeading && (
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8 leading-tight">
                {cultureHeading}
              </h2>
            )}

            <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
              {culturePara1 && <p>{culturePara1}</p>}
              {culturePara2 && <p>{culturePara2}</p>}

              {cultureQuote && (
                <div className="mt-8 p-8 bg-brand-panel border-l-4 border-brand-pink">
                  <p className="text-xl text-neutral-900 font-medium italic">
                    "{cultureQuote}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Image */}
          {cultureImage && (
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
                className="relative"
                style={{
                  transform: "rotate(2deg)",
                }}
              >
                <img
                  src={cultureImage}
                  alt={cultureHeading || "Why Join Us"}
                  className="w-full h-[600px] object-cover shadow-2xl"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const { data } = useSectionData<any>("careers", "CareersBenefits");

  const tagline = data.tagline;
  const heading = data.heading;
  const rawBenefits = Array.isArray(data.benefitsList)
    ? data.benefitsList
    : Array.isArray(data.benefits)
      ? data.benefits
      : [];

  const benefits = rawBenefits.map((b: any, i: number) => ({
    ...b,
    icon: benefitIcons[i % benefitIcons.length] || AwardIcon,
  }));

  if (!heading && benefits.length === 0) return null;

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
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900">
                {heading}
              </h2>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit: any, i: number) => (
            <motion.div
              key={i}
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
                margin: "-50px",
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="p-8 bg-white border border-neutral-200 hover:border-brand-pink/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-brand-panel rounded-xl flex items-center justify-center text-brand-pink mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 uppercase tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenPositionsSection({ onApply }: { onApply: (job: any) => void }) {
  const { data } = useSectionData<any>("careers", "CareersOpenPositions");

  const heading = data.heading || data.title;
  const rawJobs = Array.isArray(data.jobsList)
    ? data.jobsList
    : Array.isArray(data.jobs)
      ? data.jobs
      : Array.isArray(data.openings)
        ? data.openings
        : [];

  const jobs = rawJobs.map((job: any, index: number) => ({
    ...job,
    id: job.id || index + 1,
    title: job.title || "",
    dept: job.dept || job.department || "General",
    location: job.location || "",
    type: job.type || "Full-time",
    desc: job.desc || job.description || "",
  }));

  const [activeFilter, setActiveFilter] = useState("All");

  // Dynamically extract department list from actual jobs returned from CMS
  const dynamicDepts = Array.from(
    new Set<string>(jobs.map((j: any) => String(j.dept)).filter(Boolean)),
  );
  const filters: string[] = ["All", ...dynamicDepts];

  const filteredJobs = jobs.filter((job: any) => {
    if (activeFilter === "All") return true;
    return job.dept === activeFilter;
  });

  const getDeptColor = (dept: string) => {
    switch (dept) {
      case "Engineering":
        return "bg-blue-500 text-white";
      case "Project Management":
        return "bg-purple-500 text-white";
      case "Operations":
        return "bg-green-500 text-white";
      case "Corporate":
        return "bg-orange-500 text-white";
      default:
        return "bg-neutral-800 text-white";
    }
  };

  if (!heading && jobs.length === 0) return null;

  return (
    <section id="open-positions" className="py-32 bg-white min-h-screen">
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
          className="mb-16"
        >
          {heading && (
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-8">
              {heading}
            </h2>
          )}

          {/* Filter Tabs */}
          {filters.length > 1 && (
            <div className="flex flex-wrap items-center gap-8 border-b border-neutral-200">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative pb-4 text-sm font-bold tracking-wider uppercase transition-colors duration-300 ${activeFilter === filter ? "text-brand-pink" : "text-neutral-500 hover:text-neutral-900"}`}
                >
                  {filter}
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="jobTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Job List */}
        <motion.div layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job: any, index: number) => (
              <motion.div
                key={job.id || index}
                layout
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: {
                    duration: 0.2,
                  },
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -4,
                }}
                className="group p-8 bg-white border border-neutral-200 hover:border-brand-pink/50 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {job.dept && (
                      <span
                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${getDeptColor(job.dept)}`}
                      >
                        {job.dept}
                      </span>
                    )}
                    {job.location && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                        <MapPinIcon size={14} />
                        {job.location}
                      </span>
                    )}
                    {job.type && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                        <BriefcaseIcon size={14} />
                        {job.type}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 mb-2 group-hover:text-brand-pink transition-colors">
                    {job.title}
                  </h3>
                  {job.desc && <p className="text-neutral-600">{job.desc}</p>}
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => onApply(job)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-bold tracking-wider uppercase hover:bg-brand-pink transition-colors duration-300 cursor-pointer"
                  >
                    Apply Now
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredJobs.length === 0 && (
          <div className="py-20 text-center text-neutral-500">
            No open positions found for this department.
          </div>
        )}
      </div>
    </section>
  );
}

function CultureGallery() {
  const { data } = useSectionData<any>("careers", "CareersGallery");

  const tagline = data.tagline;
  const heading = data.heading;
  const gallery: Array<{ image: string; caption: string }> = Array.isArray(
    data.galleryList,
  )
    ? data.galleryList
    : Array.isArray(data.gallery)
      ? data.gallery
      : [];

  if (!heading && gallery.length === 0) return null;

  return (
    <section className="py-32 bg-neutral-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-16">
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
          {tagline && (
            <span className="text-xs font-black uppercase tracking-widest text-brand-pink mb-4 block">
              {tagline}
            </span>
          )}
          {heading && (
            <h2 className="text-4xl md:text-5xl font-black text-white">
              {heading}
            </h2>
          )}
        </motion.div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 px-6 lg:px-10 no-scrollbar">
        {gallery.map((item, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            className="flex-shrink-0 w-80 md:w-96 group relative overflow-hidden aspect-[4/3] bg-neutral-800"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.caption || `Culture ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-600">
                <UsersIcon size={48} />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              {item.caption && (
                <p className="text-white font-medium text-sm">{item.caption}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ApplicationProcess() {
  const { data } = useSectionData<any>("careers", "CareersProcess");

  const tagline = data.tagline;
  const heading = data.heading;
  const subtitle = data.subtitle;
  const steps: Array<{ step: string; title: string; desc: string }> =
    Array.isArray(data.processSteps)
      ? data.processSteps
      : Array.isArray(data.processSteps)
        ? data.processSteps
        : [];

  if (!heading && steps.length === 0) return null;
  console.log(data);
  return (
    <section className="py-32 bg-neutral-50 border-t border-neutral-200">
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
          className="text-center max-w-3xl mx-auto mb-20"
        >
          {tagline && (
            <span className="text-xs font-black uppercase tracking-widest text-brand-pink mb-4 block">
              {tagline}
            </span>
          )}
          {heading && (
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
              {heading}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-neutral-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = processIcons[index % processIcons.length];
            return (
              <motion.div
                key={index}
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
                  delay: index * 0.1,
                }}
                className="relative bg-white p-8 border border-neutral-200"
              >
                <div className="text-5xl font-black text-neutral-200 mb-6">
                  {item.step || `0${index + 1}`}
                </div>
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-neutral-900 mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                {item.desc && (
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onApplyGeneral }: { onApplyGeneral: () => void }) {
  const { data } = useSectionData<any>("careers", "CareersCTA");

  const ctaHeading = data.ctaHeading || data.heading;
  const ctaSubtitle = data.ctaSubtitle || data.subtitle;
  const hrEmail = data.hrEmail || data.email;

  const scrollToJobs = () => {
    const element = document.getElementById("open-positions");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  if (!ctaHeading) return null;

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
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {ctaHeading}
          </h2>
          {ctaSubtitle && (
            <p className="text-xl text-neutral-300 mb-12 leading-relaxed">
              {ctaSubtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={onApplyGeneral}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300 cursor-pointer"
            >
              Send Your Resume
              <ArrowRightIcon size={16} />
            </button>
            <button
              type="button"
              onClick={scrollToJobs}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-bold tracking-wider uppercase hover:bg-white hover:text-neutral-900 transition-all duration-300 cursor-pointer"
            >
              View Open Positions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Careers() {
  useSEO("careers");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  const handleApply = (job: JobOpening) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApplyGeneral = () => {
    setSelectedJob({
      title: "General Application",
      dept: "General",
      location: "India / Remote",
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden selection:bg-brand-pink selection:text-white">
      {/* Navigation */}
      <Navigation />

      <CareersHero />
      <WhyEncotecSection />
      <BenefitsSection />
      <OpenPositionsSection onApply={handleApply} />
      <CultureGallery />
      <ApplicationProcess />
      <CTASection onApplyGeneral={handleApplyGeneral} />

      {/* Footer */}
      <Footer />

      {/* Application Form Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />
    </main>
  );
}
