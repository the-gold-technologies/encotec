import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  FlameIcon,
  NetworkIcon,
  ClipboardCheckIcon,
  WrenchIcon,
  SearchIcon,
  ShieldCheckIcon,
  ActivityIcon,
} from "lucide-react";
import { useSectionData } from "../../store/useCMSStore";

const iconMap: Record<string, any> = {
  Flame: FlameIcon,
  ClipboardCheck: ClipboardCheckIcon,
  Network: NetworkIcon,
  Search: SearchIcon,
  Wrench: WrenchIcon,
  ShieldCheck: ShieldCheckIcon,
  Activity: ActivityIcon,
};

const servicesIcons = [
  FlameIcon,
  ClipboardCheckIcon,
  ShieldCheckIcon,
  SearchIcon,
  WrenchIcon,
];

export function Services() {
  const { data } = useSectionData<any>("home", "ServicesSection");
  const rawList = data.services || [];
  const services = rawList.map((service: any, i: number) => ({
    ...service,
    icon:
      (service.icon && iconMap[service.icon]) ||
      servicesIcons[i % servicesIcons.length] ||
      ClipboardCheckIcon,
  }));

  return (
    <section className="py-28 bg-neutral-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <span className="text-brand-pink font-bold tracking-wider uppercase text-sm">
            {data.tagline}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 mt-2">
            {data.heading}
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            {data.description}
          </p>
        </motion.div>

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {services.slice(0, 3).map((service: any, index: number) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.slice(3).map((service: any, index: number) => (
            <ServiceCard key={index + 3} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: any }) {
  const ctaUrl = service.ctaUrl;
  const ctaLabel = service.ctaLabel;

  const cardContent = (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.8,
        delay: service.delay,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
      }}
      className="relative h-[340px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />

      {/* Pink accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-7 flex flex-col justify-end relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-4 group-hover:bg-brand-pink/80 group-hover:border-brand-pink transition-all duration-300">
          <service.icon size={24} />
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-light transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-white/90 transition-colors duration-300">
          {service.description}
        </p>

        <div className="flex items-center text-sm font-bold text-white/80 group-hover:text-brand-light transition-colors duration-300">
          {ctaLabel}
          <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>
    </motion.div>
  );

  return <Link to={ctaUrl}>{cardContent}</Link>;
}
