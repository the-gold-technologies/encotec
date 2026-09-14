import React from "react";
import { Link } from "react-router-dom";
import { useSectionData } from "../store/useCMSStore";

interface FooterProps {
  className?: string;
  variant?: "standalone" | "embedded";
}

interface FooterCertificate {
  src: string;
  alt: string;
  description: string;
}

interface FooterCMSData {
  certificates: FooterCertificate[];
}

export function Footer({
  className = "",
  variant = "standalone",
}: FooterProps) {
  const { data: footerData } = useSectionData<FooterCMSData>(
    "home",
    "FooterCMS",
    { certificates: [] },
  );

  const certificates = footerData.certificates || [];

  const content = (
    <>
      <div className="mb-10 border-b border-neutral-200/70 pb-8 text-center">
        <div className="grid grid-cols-1 items-start gap-8 px-6 pb-5 pt-0 md:grid-cols-3 md:gap-5 md:px-12">
          {certificates.map((certificate) => (
            <div
              key={certificate.src}
              className="flex min-w-0 flex-col items-center justify-self-center text-center"
            >
              <img
                src={certificate.src}
                alt={certificate.alt}
                className="h-24 w-24 shrink-0 object-contain mix-blend-multiply md:h-28 md:w-28"
              />
              <span className="mt-[10px] text-center text-[10px] font-medium tracking-wide text-[#333333] md:text-xs">
                {certificate.description}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/encotec-logo.png"
            alt="Encotec"
            className="h-8 w-auto object-contain"
          />
        </Link>
        <div className="flex flex-wrap gap-6 md:gap-8">
          <Link
            to="/privacy"
            className="hover:text-brand-pink transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/cookies"
            className="hover:text-brand-pink transition-colors"
          >
            Cookie Policy
          </Link>
          <Link
            to="/contact"
            className="hover:text-brand-pink transition-colors"
          >
            Contact
          </Link>
        </div>
        <div>© 2026 Encotec Energy (India) Pvt. Ltd.</div>
      </div>
    </>
  );

  if (variant === "embedded") {
    return (
      <footer className={"mt-12 pt-6 text-neutral-500 text-sm " + className}>
        {content}
      </footer>
    );
  }

  return (
    <footer className={"py-12 bg-white " + className}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-neutral-500 text-sm">
        {content}
      </div>
    </footer>
  );
}
