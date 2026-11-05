import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StartProjectModal } from "./StartProjectModal";

interface CtaLinkProps {
  /** URL from the CMS. Empty, "#" or "/contact" opens the enquiry popup instead of navigating. */
  to?: string | null;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/** True when the CTA should open the enquiry popup rather than redirect. */
export function opensContactPopup(url?: string | null): boolean {
  const u = (url || "").trim().toLowerCase().replace(/\/+$/, "");
  return u === "" || u === "#" || u === "/contact" || u === "contact";
}

/**
 * CTA button driven by a CMS URL.
 * - No URL / "/contact"  → opens the "Start a project" enquiry popup on the current page
 * - Internal path        → React Router <Link>
 * - External / mailto/tel → regular <a>
 */
export function CtaLink({ to, className, children, onClick }: CtaLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const url = (to || "").trim();

  if (opensContactPopup(url)) {
    return (
      <>
        <button
          type="button"
          className={className}
          onClick={() => {
            onClick?.();
            setIsOpen(true);
          }}
        >
          {children}
        </button>
        <StartProjectModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }

  if (/^(https?:|mailto:|tel:|\/\/)/i.test(url)) {
    const external = /^(https?:|\/\/)/i.test(url);
    return (
      <a
        href={url}
        className={className}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={url} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
