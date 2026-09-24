import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UploadCloud,
  FileText,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  MapPin,
  Briefcase,
  Sparkles,
  Building2,
  Clock,
  ArrowRight,
} from "lucide-react";

export interface JobOpening {
  title?: string;
  dept?: string;
  department?: string;
  location?: string;
  type?: string;
  experience?: string;
}

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobOpening | null;
}

export function JobApplicationModal({
  isOpen,
  onClose,
  job,
}: JobApplicationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeBase64, setResumeBase64] = useState<string>("");
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal is opened for a job
  useEffect(() => {
    if (isOpen) {
      setFullName("");
      setEmail("");
      setPhone("");
      setExperience(job?.experience || "");
      setCoverLetter("");
      setResumeFile(null);
      setResumeBase64("");
      setFileError("");
      setIsSubmitting(false);
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen, job]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (file: File | null) => {
    setFileError("");
    if (!file) {
      setResumeFile(null);
      setResumeBase64("");
      return;
    }

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError("File size exceeds 10MB. Please choose a smaller file.");
      return;
    }

    setResumeFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setResumeBase64(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!resumeFile) {
      setFileError("Please attach your resume / CV before submitting.");
      return;
    }

    setIsSubmitting(true);

    let finalBase64 = resumeBase64;
    if (!finalBase64 && resumeFile) {
      try {
        finalBase64 = await readFileAsBase64(resumeFile);
      } catch (readErr) {
        console.warn("Failed to read file as base64:", readErr);
      }
    }

    const API_BASE_URL = import.meta.env.VITE_CMS_API_URL || "";

    const jobTitle = job?.title || "General Application";
    const jobDepartment = job?.dept || job?.department || "General";

    const payload = {
      jobTitle,
      department: jobDepartment,
      jobLocation: job?.location || "India / Global",
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      experience: experience.trim(),
      coverLetter: coverLetter.trim(),
      resumeName: resumeFile.name,
      resumeSize: resumeFile.size,
      resumeType: resumeFile.type,
      resumeBase64: finalBase64,
      recipientEmail: "hr@encotecenergy.com",
      submittedAt: new Date().toISOString(),
    };

    try {
      let response = await fetch(`${API_BASE_URL}/api/job-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok && API_BASE_URL !== "") {
        response = await fetch(`/api/job-applications`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(
          "Unable to submit your application. Please try again or reach out to careers@encotecenergy.com.",
        );
      }

      setSubmitStatus("success");
    } catch (err: any) {
      console.error("Job application submission error:", err);
      setErrorMessage(
        err.message ||
          "Failed to submit application. Please try again or reach out directly to careers@encotecenergy.com.",
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isSubmitting ? undefined : onClose}
            className="fixed inset-0 bg-[#0A0F29]/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 z-10 my-8"
          >
            {/* Modal Header */}
            <div className="bg-[#0A0F29] text-white p-6 sm:p-8 relative overflow-hidden border-b-2 border-brand-pink">
              {/* Subtle background glow */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none" />

              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {submitStatus === "success" ? (
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full mb-3">
                    <Sparkles size={12} />
                    Application Received
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    You're All Set!
                  </h3>
                  <p className="text-neutral-300 text-sm mt-1">
                    Your application for{" "}
                    <span className="text-brand-pink font-semibold">
                      {job?.title || "the open role"}
                    </span>{" "}
                    has been forwarded to our talent acquisition team.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-brand-pink text-white rounded-full shadow-xs">
                      {job?.dept || job?.department || "Careers"}
                    </span>
                    {job?.location && (
                      <span className="flex items-center gap-1 text-xs text-neutral-300 font-medium bg-white/10 px-2.5 py-1 rounded-full">
                        <MapPin size={12} className="text-brand-pink" />
                        {job.location}
                      </span>
                    )}
                    {job?.type && (
                      <span className="flex items-center gap-1 text-xs text-neutral-300 font-medium bg-white/10 px-2.5 py-1 rounded-full">
                        <Briefcase size={12} className="text-brand-pink" />
                        {job.type}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {job?.title
                      ? `Apply for ${job.title}`
                      : "Submit Your Application"}
                  </h3>
                  <p className="text-neutral-300 text-sm mt-1.5">
                    Fill in your details below. Your resume and application will
                    be reviewed by our HR team.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {submitStatus === "success" ? (
                <div className="py-2 space-y-6">
                  {/* Hero Checkmark */}
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center mb-4">
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-lg shadow-emerald-500/10 animate-bounce-short">
                        <CheckCircle2
                          size={42}
                          className="text-emerald-500 stroke-[2.5]"
                        />
                      </div>
                    </div>
                    <h4 className="text-2xl font-black text-neutral-900">
                      Application Submitted Successfully!
                    </h4>
                    <p className="text-neutral-600 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you,{" "}
                      <strong className="text-neutral-900">{fullName}</strong>!
                      We have received your application for{" "}
                      <strong className="text-neutral-900">
                        {job?.title || "the position"}
                      </strong>
                      .
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200/80 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2.5">
                      <span className="text-neutral-500 font-semibold uppercase tracking-wider">
                        Candidate Name
                      </span>
                      <span className="font-bold text-neutral-900">
                        {fullName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2.5">
                      <span className="text-neutral-500 font-semibold uppercase tracking-wider">
                        Email Address
                      </span>
                      <span className="font-medium text-neutral-900">
                        {email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2.5">
                      <span className="text-neutral-500 font-semibold uppercase tracking-wider">
                        Position Applied
                      </span>
                      <span className="font-bold text-brand-pink">
                        {job?.title || "General Application"}
                      </span>
                    </div>
                    {resumeFile && (
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 font-semibold uppercase tracking-wider">
                          Attached Resume
                        </span>
                        <span className="font-mono font-medium text-neutral-800 flex items-center gap-1">
                          <FileText size={13} className="text-brand-pink" />
                          {resumeFile.name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hiring Process Step Timeline */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                      What happens next?
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white rounded-xl p-3.5 border border-emerald-200 shadow-xs bg-emerald-50/20">
                        <div className="text-[11px] font-bold text-emerald-600 uppercase mb-1 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Step 1: Logged
                        </div>
                        <div className="text-xs font-bold text-neutral-900">
                          Application Stored
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          Sent to Encotec HR team
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-xs">
                        <div className="text-[11px] font-bold text-brand-pink uppercase mb-1 flex items-center gap-1">
                          <Clock size={12} /> Step 2: Review
                        </div>
                        <div className="text-xs font-bold text-neutral-900">
                          Profile Screening
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          Evaluated against opening
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-xs">
                        <div className="text-[11px] font-bold text-neutral-400 uppercase mb-1 flex items-center gap-1">
                          <ArrowRight size={12} /> Step 3: Connect
                        </div>
                        <div className="text-xs font-bold text-neutral-900">
                          Interview Schedule
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          If shortlisted by panel
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Close & Action Buttons */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-3.5 px-6 bg-[#0A0F29] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      Done & Return to Careers
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="app-fullName"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2"
                    >
                      Full Name <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      id="app-fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none text-sm text-neutral-900 transition-all"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="app-email"
                        className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2"
                      >
                        Email Address <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        id="app-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none text-sm text-neutral-900 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="app-phone"
                        className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2"
                      >
                        Phone Number <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        id="app-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none text-sm text-neutral-900 transition-all"
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label
                      htmlFor="app-exp"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2"
                    >
                      Total Experience / Current Role
                    </label>
                    <input
                      id="app-exp"
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. 5 Years / Senior Engineer"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none text-sm text-neutral-900 transition-all"
                    />
                  </div>

                  {/* Resume Upload Area */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      Upload Resume / CV{" "}
                      <span className="text-brand-pink">*</span>
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) =>
                        handleFileChange(
                          e.target.files ? e.target.files[0] : null,
                        )
                      }
                      className="hidden"
                    />

                    {!resumeFile ? (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                          isDragging
                            ? "border-brand-pink bg-brand-pink/5"
                            : "border-neutral-300 hover:border-brand-pink hover:bg-neutral-50"
                        }`}
                      >
                        <div className="w-12 h-12 bg-pink-50 text-brand-pink rounded-full flex items-center justify-center mx-auto mb-3">
                          <UploadCloud size={24} />
                        </div>
                        <p className="text-sm font-semibold text-neutral-900 mb-1">
                          Click to upload or drag & drop
                        </p>
                        <p className="text-xs text-neutral-500">
                          Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-200 rounded-2xl">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 bg-pink-50 text-brand-pink rounded-xl flex items-center justify-center shrink-0 border border-pink-100">
                            <FileText size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-neutral-900 truncate">
                              {resumeFile.name}
                            </p>
                            <p className="text-xs text-neutral-500 font-mono">
                              {formatFileSize(resumeFile.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-300 hover:bg-white transition-colors cursor-pointer"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setResumeFile(null);
                              setResumeBase64("");
                              if (fileInputRef.current)
                                fileInputRef.current.value = "";
                            }}
                            className="text-neutral-400 hover:text-red-600 p-1.5 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove file"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}

                    {fileError && (
                      <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {fileError}
                      </p>
                    )}
                  </div>

                  {/* Cover Letter / Message */}
                  <div>
                    <label
                      htmlFor="app-coverLetter"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2"
                    >
                      Cover Letter / Note{" "}
                      <span className="text-neutral-400 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      id="app-coverLetter"
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Share a brief introduction, key achievements, or notice period..."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none text-sm text-neutral-900 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-brand-pink hover:bg-[#80003f] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-brand-pink/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <Send size={15} />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-neutral-500 mt-2.5">
                      By submitting, you agree to the processing of your details
                      for recruitment at Encotec.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
