import React, { useState } from "react";
import { useSectionData } from "../../store/useCMSStore";

const isImageUrl = (val: any): boolean => {
  if (typeof val !== "string") return false;
  return (
    val.startsWith("http://") ||
    val.startsWith("https://") ||
    val.startsWith("/") ||
    val.startsWith("data:image/") ||
    /\.(png|jpe?g|svg|webp|gif)$/i.test(val)
  );
};

export function LogoStrip() {
  const [isHovered, setIsHovered] = useState(false);
  const { data } = useSectionData<any>("home", "LogoStripSection");

  if (!data || !data.logos || !Array.isArray(data.logos)) return null;

  // Strictly filter for valid image logo items only (no text fallbacks)
  const validLogos = data.logos
    .map((logo: any) => {
      if (typeof logo === "object" && logo !== null && logo.image) {
        return { name: logo.name || "Client Logo", image: logo.image };
      }
      if (typeof logo === "string" && isImageUrl(logo)) {
        return { name: "Client Logo", image: logo };
      }
      return null;
    })
    .filter(Boolean) as Array<{ name: string; image: string }>;

  if (validLogos.length === 0) return null;

  const displayList = [
    ...validLogos,
    ...validLogos,
    ...validLogos,
    ...validLogos,
  ];
  const duration = Math.max(25, validLogos.length * 2.5);

  return (
    <section className="py-16 bg-neutral-50 border-y border-neutral-200 overflow-hidden">
      {data.tagline && (
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest select-text cursor-text">
            {data.tagline}
          </p>
        </div>
      )}

      <div className="flex relative overflow-hidden group">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-16 items-center whitespace-nowrap px-8 cursor-pointer"
          style={{
            width: "max-content",
            animation: `marquee ${duration}s linear infinite`,
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {displayList.map((logo, i) => (
            <img
              key={i}
              src={logo.image}
              alt={logo.name}
              className="h-10 md:h-14 max-w-[160px] object-contain transition-all duration-300 flex-shrink-0 cursor-pointer"
            />
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
