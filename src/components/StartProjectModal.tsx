import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2 } from "lucide-react";
import { useSectionData } from "../store/useCMSStore";

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StartProjectModal({ isOpen, onClose }: StartProjectModalProps) {
  const { data } = useSectionData<any>("contact", "ContactInfo", {
    formHeading: "Send us a message",
    fullNameLabel: "Full Name *",
    fullNamePlaceholder: "John Doe",
    emailAddressLabel: "Email Address *",
    emailAddressPlaceholder: "john@company.com",
    phoneNumberLabel: "Phone Number",
    phoneNumberPlaceholder: "+1 (555) 000-0000",
    companyNameLabel: "Company Name",
    companyNamePlaceholder: "Company Ltd.",
    subjectLabel: "Subject *",
    selectSubjectDefault: "Select a subject",
    messageLabel: "Message *",
    messagePlaceholder: "How can we help you?",
    submitButtonLabel: "Send Message",
  });

  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitStatus("idle");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const form = e.currentTarget;
    const fullName = (form.querySelector("#modal-fullName") as HTMLInputElement)
      .value;
    const email = (form.querySelector("#modal-email") as HTMLInputElement)
      .value;
    const phone = (form.querySelector("#modal-phone") as HTMLInputElement)
      .value;
    const company = (form.querySelector("#modal-company") as HTMLInputElement)
      .value;
    const location =
      (form.querySelector("#modal-location") as HTMLInputElement)?.value || "";
    const subject = (form.querySelector("#modal-subject") as HTMLSelectElement)
      .value;
    const otherService = (
      form.querySelector("#modal-other-service") as HTMLInputElement
    )?.value;
    const finalSubject =
      subject === "Other / Not sure" && otherService
        ? `Other / Not sure: ${otherService.trim()}`
        : subject;
    const message = (
      form.querySelector("#modal-message") as HTMLTextAreaElement
    ).value;

    const API_BASE_URL = import.meta.env.VITE_CMS_API_URL || "";

    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          interestedIn: finalSubject,
          budget: company,
          phone: phone,
          companyName: company,
          location: location,
          projectGoals: `Phone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\nLocation: ${location || "N/A"}\nService Required: ${finalSubject}\nMessage:\n${message}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setSubmitStatus("success");
      setSelectedService("");
      form.reset();
    } catch (err) {
      console.error("Enquiry submit error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (!isSubmitting) onClose();
            }}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-2xl bg-white shadow-2xl border border-neutral-100 overflow-hidden my-8 z-10"
          >
            {/* Top Accent Line */}
            <div className="h-1.5 w-full bg-brand-pink" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-6 uppercase tracking-tight pr-8">
                {data.formHeading || "Send us a message"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="modal-fullName"
                      className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                    >
                      {data.fullNameLabel || "Full Name *"}
                    </label>
                    <input
                      type="text"
                      id="modal-fullName"
                      required
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
                      placeholder={data.fullNamePlaceholder || "John Doe"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="modal-email"
                      className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                    >
                      {data.emailAddressLabel || "Email Address *"}
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      required
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
                      placeholder={
                        data.emailAddressPlaceholder || "john@company.com"
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="modal-phone"
                      className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                    >
                      {data.phoneNumberLabel || "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
                      placeholder={
                        data.phoneNumberPlaceholder || "+1 (555) 000-0000"
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="modal-company"
                      className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                    >
                      {data.companyNameLabel || "Company Name"}
                    </label>
                    <input
                      type="text"
                      id="modal-company"
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
                      placeholder={
                        data.companyNamePlaceholder || "Company Ltd."
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="modal-subject"
                      className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                    >
                      Service Required *
                    </label>
                    <select
                      id="modal-subject"
                      required
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300 appearance-none rounded-none cursor-pointer text-sm"
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option value="Asset Stewardship (O&M)">
                        Asset Stewardship (O&M)
                      </option>
                      <option value="Project Conceptualisation & Development">
                        Project Conceptualisation & Development
                      </option>
                      <option value="Construction, Commissioning & Relocation">
                        Construction, Commissioning & Relocation
                      </option>
                      <option value="Expert Advisory & Performance Audits">
                        Expert Advisory & Performance Audits
                      </option>
                      <option value="Due Diligence & Asset Health">
                        Due Diligence & Asset Health
                      </option>
                      <option value="Strategic Global Sourcing (Spare Parts)">
                        Strategic Global Sourcing (Spare Parts)
                      </option>
                      <option value="Airport Utility Management">
                        Airport Utility Management
                      </option>
                      <option value="General Business Enquiry">
                        General Business Enquiry
                      </option>
                      <option value="Other / Not sure">Other / Not sure</option>
                    </select>
                    <p className="text-xs text-neutral-400 mt-1">
                      Seeking a job?{" "}
                      <a
                        href="/careers"
                        onClick={onClose}
                        className="text-brand-pink hover:underline font-medium"
                      >
                        Visit our Careers page
                      </a>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="modal-location"
                      className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                    >
                      Project Location (Optional)
                    </label>
                    <input
                      type="text"
                      id="modal-location"
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300"
                      placeholder="e.g. Gujarat, India / International"
                    />
                  </div>
                </div>

                {selectedService === "Other / Not sure" && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <label
                      htmlFor="modal-other-service"
                      className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                    >
                      Please Specify Requirement *
                    </label>
                    <input
                      type="text"
                      id="modal-other-service"
                      required
                      className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300 text-sm"
                      placeholder="e.g. Specialized plant audit, solar engineering, custom equipment..."
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="modal-message"
                    className="text-sm font-bold text-neutral-700 uppercase tracking-wider"
                  >
                    {data.messageLabel || "Message *"}
                  </label>
                  <textarea
                    id="modal-message"
                    required
                    rows={4}
                    className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all duration-300 resize-none"
                    placeholder={
                      data.messagePlaceholder || "How can we help you?"
                    }
                  ></textarea>
                </div>

                {submitStatus === "success" && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-lg flex items-center gap-2 animate-in fade-in duration-300">
                    <svg
                      className="w-5 h-5 text-emerald-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Your message has been sent successfully! We will get back
                      to you shortly.
                    </span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold rounded-lg flex items-center gap-2 animate-in fade-in duration-300">
                    <svg
                      className="w-5 h-5 text-rose-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Something went wrong. Please try again later.</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-pink text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a0004f] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>{data.submitButtonLabel || "Send Message"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-6 py-4 border border-neutral-300 text-neutral-700 text-sm font-bold tracking-wider uppercase hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
