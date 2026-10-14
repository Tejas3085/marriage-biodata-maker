
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguageContext } from "../hooks/useLanguage";
import ImageCropper from "../components/ImageCropper";
import GodPhotoSelector from "../components/GodPhotoSelector";
import TitleEditModal from "../components/TitleEditModal";
import { ChevronUp, ChevronDown, TriangleAlert } from "lucide-react";
import { Trash2 } from "lucide-react";

import {
  IoAddOutline,
  IoCreateOutline,
  IoCloseOutline,
  IoCameraOutline,
} from "react-icons/io5";

type Field = {
  label: string;
  key: string;
  type: string;
  placeholder?: string;
  value?: any;
  options?: string[];
  NewFieldValue: string
};

export default function BiodataForm() {
  const router = useRouter();
  const { translationsForm, setFolder, language } = useLanguageContext();

  // state
  const [formData, setFormData] = useState<any | null>(null);
  const [godPhoto, setGodPhoto] = useState<string>("/gods/1.jpg");
  const [godTitle, setGodTitle] = useState<string>("|| श्री गणेशाय नमः ||");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [enableGodTitle, setEnableGodTitle] = useState(true);

  const [showImageCropper, setShowImageCropper] = useState(false);
  const [showGodPhotoSelector, setShowGodPhotoSelector] = useState(false);
  const [showTitleEditModal, setShowTitleEditModal] = useState(false);
  const [editingSectionIndex, setEditingSectionIndex] = useState<number>(-1);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const godPhotoRef = useRef<HTMLDivElement | null>(null);
  const isInitialized = useRef(false);
  const [isGodTitleModalOpen, setGodTitleModalOpen] = useState(false);
  const [tempGodTitle, setTempGodTitle] = useState("");
  const [showValidationToast, setShowValidationToast] = useState(false);

  // NEW: temp for section title editing (separate from god title)
  const [tempSectionTitle, setTempSectionTitle] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  // set folder (language resource) on mount / language change
  useEffect(() => {
    setFolder("formLang");
  }, [setFolder, language]);

  // When translations arrive, set base formData
  useEffect(() => {
    if (!translationsForm) return;
    // deep clone safe copy so we can mutate
    const base = structuredClone(translationsForm);
    setFormData(base);

    // Sync standalone godTitle with the fresh JSON template
    if (base.godTitle) {
      setGodTitle(base.godTitle);
    }

    isInitialized.current = false;
  }, [translationsForm]);

  // Hydrate from localStorage (only once after translations loaded)
  useEffect(() => {
    if (!translationsForm || isInitialized.current) return;

    const clone = structuredClone(translationsForm);
    const saved = typeof window !== "undefined"
      ? localStorage.getItem(language)
      : null;

    if (saved) {
      try {
        const groupedData = JSON.parse(saved);

        // Build a map of existing sections by key for quick lookup
        const sectionsByKey = new Map<string, any>();
        if (Array.isArray(clone.fieldSections)) {
          clone.fieldSections.forEach((s: any) => sectionsByKey.set(s.key, s));
        } else {
          clone.fieldSections = [];
        }

        // Iterate saved sections and merge them into the cloned template.
        // This will:
        // - update values of existing fields
        // - append any extra saved fields that aren't present in the template
        // - create a whole new section if the saved data contains a section not in the template
        for (const sectionKey of Object.keys(groupedData)) {
          const savedSection = (groupedData as any)[sectionKey];
          if (!savedSection) continue;

          // Skip the special keys handled separately
          if (sectionKey === "photo" || sectionKey === "godPhoto" || sectionKey === "godTitle") continue;

          const target = sectionsByKey.get(sectionKey);
          if (target) {
            const templateFieldsByKey = new Map<string, any>();
            (target.fields || []).forEach((f: any) => templateFieldsByKey.set(f.key, f));

            // Rebuild the field list based on what was saved
            const rebuiltFields: any[] = [];
            (savedSection.fields || []).forEach((sf: any) => {
              if (!sf || !sf.key) return;

              if (templateFieldsByKey.has(sf.key)) {
                // If it's a template field, use the fresh metadata from JSON but the user's value
                const ef = templateFieldsByKey.get(sf.key);
                ef.value = sf.value;
                rebuiltFields.push(ef);
              } else {
                // If it's a user-added custom field, restore it as is
                rebuiltFields.push({
                  label: sf.label || "",
                  value: sf.value,
                  key: sf.key,
                  type: sf.type || "text",
                  placeholder: sf.placeholder || "",
                  options: sf.options || [],
                });
              }
            });

            // Replace the template fields with the user's specific set of fields
            target.fields = rebuiltFields;
          } else {
            // If the template didn't contain this section, create it from saved data
            clone.fieldSections.push({
              key: sectionKey,
              title: savedSection.title || "",
              fields: (savedSection.fields || []).map((sf: any) => ({
                label: sf.label || "",
                value: sf.value,
                key: sf.key || `field_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                type: sf.type || "text",
                placeholder: sf.placeholder || "",
                options: sf.options || [],
              })),
            });
          }
        }

        // Respect explicit saved values, including empty strings (user removed photo)
        if (Object.prototype.hasOwnProperty.call(groupedData, "photo")) {
          setPhotoPreview(groupedData.photo || null);
          // reflect in the form clone too so UI uses the saved photo status
          clone.photo = groupedData.photo || null;
        }
        if (Object.prototype.hasOwnProperty.call(groupedData, "godPhoto")) {
          // allow empty string to mean removed
          setGodPhoto(groupedData.godPhoto ?? "");
          clone.godPhoto = groupedData.godPhoto ?? "";
        }
        if (Object.prototype.hasOwnProperty.call(groupedData, "godTitle")) {
          setGodTitle(groupedData.godTitle ?? "");
          clone.godTitle = groupedData.godTitle ?? "";
        }
      } catch (err) {
        // If localStorage contains a non-JSON value (commonly "[object Object]"), remove it to recover
        try {
          if (typeof window !== "undefined") {
            const raw = localStorage.getItem(language);
            if (raw && (raw.trim() === "[object Object]" || (raw.trim()[0] !== "{" && raw.trim()[0] !== "["))) {
            }
          }
        } catch (rmErr) {
        }
      }
    }

    setFormData(clone);
    isInitialized.current = true;
  }, [translationsForm]);

  // Prevent background scrolling when any modal is open
  useEffect(() => {
    const isAnyModalOpen =
      showImageCropper ||
      showGodPhotoSelector ||
      showTitleEditModal ||
      isGodTitleModalOpen ||
      showResetModal;

    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showImageCropper, showGodPhotoSelector, showTitleEditModal, isGodTitleModalOpen]);

  // ---------- Callbacks & small helpers ----------
  const updateForm = useCallback((updater: (prev: any) => any) => {
    setFormData((prev: any) => {
      const next = structuredClone(prev);
      updater(next);
      return next;
    });
  }, []);

  const moveFieldUp = useCallback((sIndex: number, fIndex: number) => {
    if (!formData || fIndex === 0) return;
    updateForm((updated) => {
      const fields = updated.fieldSections[sIndex].fields;
      [fields[fIndex - 1], fields[fIndex]] = [fields[fIndex], fields[fIndex - 1]];
    });
  }, [formData, updateForm]);

  const moveFieldDown = useCallback((sIndex: number, fIndex: number) => {
    if (!formData) return;
    updateForm((updated) => {
      const fields = updated.fieldSections[sIndex].fields;
      if (fIndex >= fields.length - 1) return;
      [fields[fIndex + 1], fields[fIndex]] = [fields[fIndex], fields[fIndex + 1]];
    });
  }, [formData, updateForm]);

  const deleteField = useCallback((sIndex: number, fIndex: number) => {
    updateForm((updated) => {
      updated.fieldSections[sIndex].fields.splice(fIndex, 1);
    });
  }, [updateForm]);

  const addNewField = useCallback((sIndex: number, section: any) => {
    updateForm((updated) => {
      updated.fieldSections[sIndex].fields.push({
        label: "",
        value: "",
        key: `field_${Date.now()}`,
        type: "text",
        placeholder: section?.NewFieldValue || "",
        options: [],
      });
    });
  }, [updateForm]);

  const autoResize = (e: any) => {
    e.target.style.height = "auto";       // reset height
    e.target.style.height = e.target.scrollHeight + "px"; // expand
  };

  const updateField = useCallback((sIndex: number, fIndex: number, key: "label" | "value", value: any) => {
    updateForm((updated) => {
      if (!updated.fieldSections?.[sIndex]?.fields?.[fIndex]) return;
      updated.fieldSections[sIndex].fields[fIndex][key] = value;
    });
  }, [updateForm]);

  // file select
  const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setShowImageCropper(true);
  };

  const handleCropComplete = (croppedImage: string) => {
    setPhotoPreview(croppedImage);
    setShowImageCropper(false);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Generate biodata (save and navigate)
  const generateBiodata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    // Validation: Count non-empty fields
    let filledCount = 0;
    formData.fieldSections.forEach((section: any) => {
      section.fields.forEach((field: any) => {
        if (field.value && String(field.value).trim() !== "") {
          filledCount++;
        }
      });
    });

    if (filledCount < 7) {
      setShowValidationToast(true);
      setTimeout(() => setShowValidationToast(false), 4000);

      // Find the first empty field to scroll to
      let firstEmptyFieldKey = null;
      for (const section of formData.fieldSections) {
        const emptyField = section.fields.find((f: any) => !f.value || String(f.value).trim() === "");
        if (emptyField) {
          firstEmptyFieldKey = emptyField.key;
          break;
        }
      }

      if (firstEmptyFieldKey) {
        const element = document.getElementById(`field-container-${firstEmptyFieldKey}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (godPhotoRef.current) {
          godPhotoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (godPhotoRef.current) {
        godPhotoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const groupedData: any = {};
    formData.fieldSections.forEach((section: any) => {
      groupedData[section.key] = {
        title: section.title,
        fields: section.fields.map((sf: Field) => ({
          label: sf.label,
          key: sf.key,
          type: sf.type,
          value: sf.value,
          placeholder: sf.placeholder,
          options: sf.options,
        })),
      };
    });

    groupedData.photo = photoPreview;
    groupedData.godTitle = godTitle;
    groupedData.godPhoto = godPhoto;

    try {
      localStorage.setItem(language, JSON.stringify(groupedData));
    } catch (err) {
    }

    router.push("/preview");
  };

  // Autosave helper: persist the current form state (debounced via effect below)
  const saveGroupedDataToLocalStorage = useCallback(() => {
    if (!formData) return;
    const groupedData: any = {};
    formData.fieldSections.forEach((section: any) => {
      groupedData[section.key] = {
        title: section.title,
        fields: section.fields.map((sf: Field) => ({
          label: sf.label,
          key: sf.key,
          type: sf.type,
          value: sf.value,
          placeholder: sf.placeholder,
          options: sf.options,
        })),
      };
    });

    groupedData.photo = photoPreview;
    groupedData.godTitle = godTitle;
    groupedData.godPhoto = godPhoto;

    try {
      localStorage.setItem(language, JSON.stringify(groupedData));
    } catch (err) {
    }
  }, [formData, photoPreview, godPhoto, godTitle, language]);

  // Debounced save on changes to relevant data and after hydration
  useEffect(() => {
    if (!isInitialized.current) return;
    const handler = setTimeout(() => saveGroupedDataToLocalStorage(), 700);
    return () => clearTimeout(handler);
  }, [formData, photoPreview, godPhoto, godTitle, saveGroupedDataToLocalStorage]);


  // If not initialized or translations missing show loading
  if (!formData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin mb-4" />
        <p className="text-slate-500 text-[14px] font-medium animate-pulse">
          Preparing your form...
        </p>
      </div>
    );
  }

  // ---------- Render ----------
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)] p-5 sm:p-8 md:p-10">
      {/* Validation Toast */}
      {showValidationToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] px-4 w-full flex justify-center animate-in fade-in slide-in-from-top-10 duration-500">
          <div className="bg-gray-900 text-white border border-gray-800 py-4 px-6 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md w-full">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <TriangleAlert className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-wider mb-0.5">
                {language === "mr" ? "माहिती अपूर्ण आहे" : language === "hi" ? "जानकारी अधूरी है" : "Incomplete Details"}
              </p>
              <p className="text-sm font-medium opacity-90">
                {language === "mr"
                  ? "प्रोफेशनल बायोडाटासाठी कृपया अधिक माहिती भरा."
                  : language === "hi"
                    ? "प्रोफेशनल बायोडाटा के लिए कृपया अधिक जानकारी भरें।"
                    : "Please provide more info to create a professional biodata."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page-level structured data for SEO (no PII) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Create Marriage Biodata",
            description:
              "Create a beautiful marriage biodata in English, Hindi, or Marathi by filling a simple form and choosing a template.",
            url: "https://onlinefreebiodata.com/Biodata-Form",
          }),
        }}
      />

      <form onSubmit={generateBiodata} aria-label="Marriage biodata form">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* LEFT PANEL */}
          <main>
            <header className="text-center mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-800">Step 1 — Your details</p>
              <h1 className="mt-2 text-2xl sm:text-[30px] font-semibold text-slate-900 tracking-tight">
                Create Your Marriage Biodata
              </h1>
              <p className="text-slate-600 text-[14px] sm:text-[15px] max-w-xl mx-auto leading-relaxed mt-2">
                Fill in your details below. You can rename sections, reorder fields, and add your own.
              </p>
              <div className="mt-5 flex justify-center">
                <div className="h-[3px] w-16 bg-slate-900 rounded-full" />
              </div>
            </header>

            {/* God Image + Title */}
            <section
              aria-label="God photo and title"
              className="text-center mb-8 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-7"
              ref={godPhotoRef}
            >
              <div className="flex justify-center mb-3">
                {godPhoto ? (
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-full ring-4 ring-white shadow-md border border-slate-200">
                    <Image
                      src={formData.godPhoto || godPhoto}
                      alt="Selected auspicious image"
                      fill
                      loading="eager"
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => setShowGodPhotoSelector(true)}
                    className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-500 text-sm rounded-full cursor-pointer hover:border-slate-900 hover:bg-slate-50 transition-all"
                  >
                    Add Photo
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setShowGodPhotoSelector(true)}
                  className="px-4 py-1.5 text-xs font-semibold
                   rounded-full bg-slate-900 text-white
                   hover:bg-rose-900 transition flex items-center gap-1"
                  aria-label="Add/change god photo"

                >
                  {godPhoto ? "Change" : "Add Photo"}
                </button>


                {godPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      setGodPhoto("");
                      // Also update formData.godPhoto
                      updateForm((updated) => {
                        updated.godPhoto = "";
                      });
                    }}
                    className="px-4 py-1.5 text-xs font-semibold
                     rounded-full bg-white text-slate-600
                     hover:bg-slate-100 transition border border-slate-300 flex items-center gap-1"
                    aria-label="Remove god photo"
                  >
                    Remove
                  </button>
                )}

              </div>

              {/* ---------- GOD TITLE SECTION (Updated with Modal) ---------- */}
              <div className="flex justify-center items-center gap-2 flex-wrap">

                {/* Title Text */}
                <span className="text-base sm:text-lg font-semibold text-gray-800 text-center">
                  {godTitle || "Add Title"}
                </span>


                {/* Edit Button - Opens Modal */}
                <button
                  type="button"
                  onClick={() => {
                    setTempGodTitle(godTitle);
                    setGodTitleModalOpen(true);
                  }}
                  className="text-slate-500 hover:text-slate-900 transition"
                  aria-label="Edit god title"
                >
                  <IoCreateOutline size={20} />
                </button>

                {/* Clear Button */}
                {godTitle && (
                  <button
                    type="button"
                    onClick={() => setGodTitle("")}
                    className="text-gray-500 hover:text-red-600 transition"
                    aria-label="Clear god title"
                  >
                    <IoCloseOutline size={20} />
                  </button>
                )}
              </div>

              {/* GOD TITLE EDIT MODAL - Simple Design */}
              {isGodTitleModalOpen && (
                <div className="fixed inset-0 z-[100] flex justify-center items-start pt-18 sm:pt-24 px-4">
                  <div
                    className="absolute inset-0 bg-black/20"
                    onClick={() => setGodTitleModalOpen(false)}
                  />

                  <div className="relative bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl border border-gray-200 animate-in zoom-in-95 duration-200">
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setGodTitleModalOpen(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                      aria-label="Close modal"
                    >
                      <IoCloseOutline size={24} />
                    </button>

                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IoCreateOutline size={20} />
                      </div>
                      <h2 className="text-lg font-bold text-gray-800">Edit God Title</h2>
                    </div>

                    <div className="space-y-4">
                      <input
                        type="text"
                        value={tempGodTitle}
                        onChange={(e) => setTempGodTitle(e.target.value)}
                        placeholder="e.g. || श्री गणेशाय नमः ||"
                        className="w-full bg-white border border-gray-300 px-4 py-2.5 rounded-lg text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setGodTitle(tempGodTitle);
                            setGodTitleModalOpen(false);
                          }
                        }}
                      />

                      <div className="flex gap-2">
                        <button
                          className="flex-1 py-2.5 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-rose-900 transition-colors"
                          onClick={() => {
                            setGodTitle(tempGodTitle);
                            setGodTitleModalOpen(false);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="flex-1 py-2.5 bg-white text-gray-600 border border-gray-300 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors"
                          onClick={() => setGodTitleModalOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </section>

            {/* Field Sections */}
            <section aria-label="Form fields" className="space-y-6">
              {formData.fieldSections.map((section: any, sIndex: number) => (
                <div key={sIndex} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <div
                    className="flex items-center gap-2 mb-4 cursor-pointer group w-fit"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setEditingSectionIndex(sIndex);
                      setTempSectionTitle(section.title || "");
                      setShowTitleEditModal(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setEditingSectionIndex(sIndex);
                        setTempSectionTitle(section.title || "");
                        setShowTitleEditModal(true);
                      }
                    }}
                    aria-label={`Edit section title ${section.title}`}
                  >
                    <h2 className="text-[15px] font-semibold tracking-tight text-slate-900">
                      {section.title}
                    </h2>
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition">
                      <IoCreateOutline size={13} aria-hidden />
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {section.fields.map((field: Field, fIndex: number) => (
                      <div
                        key={field.key}
                        id={`field-container-${field.key}`}
                        className="flex gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 hover:border-slate-200 transition
        sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-3
        lg:flex lg:flex-row lg:items-center lg:gap-3
      "
                      >
                        {/* Input / Textarea / Select */}
                        <div className="w-full flex flex-col lg:flex-row lg:gap-2.5">
                          <input
                            id={field.key + "_label"}
                            aria-label="Field label"
                            type="text"
                            value={field.label || ""}
                            onChange={(e) => updateField(sIndex, fIndex, "label", e.target.value)}
                            placeholder={section.NewFieldLabel}
                            className="border w-full border-slate-200 px-3 py-2.5 rounded-lg text-[13.5px] bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all mb-2 lg:mb-0 lg:max-w-[220px]"
                          />

                          {field.type === "select" ? (
                            <select
                              id={field.key}
                              aria-label={`Select ${field.label || "option"}`}
                              value={field.value || ""}
                              onChange={(e) => updateField(sIndex, fIndex, "value", e.target.value)}
                              className="border border-slate-200 px-3 py-2.5 mb-2 lg:mb-0 rounded-lg text-[13.5px] bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all w-full"
                            >
                              <option value="">{field.placeholder || "Select"}</option>
                              {field.options?.map((op: string, idx: number) => (
                                <option key={idx} value={op}>
                                  {op}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <textarea
                              id={field.key}
                              aria-label={`Field value for ${field.label || "field"}`}
                              value={field.value || ""}
                              onChange={(e) => {
                                updateField(sIndex, fIndex, "value", e.target.value);
                                autoResize(e);
                              }}
                              placeholder={field.placeholder || "Enter value"}
                              className="border border-slate-200 px-3 py-2.5 mb-2 lg:mb-0 rounded-lg text-[13.5px] bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all w-full resize-none overflow-hidden"
                              rows={1}
                            />
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-col lg:flex-row gap-1.5 justify-start sm:justify-end lg:justify-end">
                          <button
                            type="button"
                            onClick={() => moveFieldUp(sIndex, fIndex)}
                            disabled={fIndex === 0}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white disabled:opacity-30 transition"
                          >
                            <ChevronUp size={16} strokeWidth={2} />
                          </button>

                          <button
                            type="button"
                            onClick={() => moveFieldDown(sIndex, fIndex)}
                            disabled={fIndex === section.fields.length - 1}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white disabled:opacity-30 transition"
                          >
                            <ChevronDown size={16} strokeWidth={2} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteField(sIndex, fIndex)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-700 hover:bg-rose-50 transition"
                            aria-label="Delete field"
                          >
                            <Trash2 size={15} />
                          </button>


                        </div>


                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => addNewField(sIndex, section)}
                    className="text-slate-600 text-[13px] font-semibold flex items-center gap-1.5 mt-3 px-3 py-2 rounded-full border border-dashed border-slate-300 hover:border-slate-900 hover:text-slate-900 transition"
                    aria-label={`Add new field to ${section.title}`}
                  >
                    <IoAddOutline /> {section.addExtraFiels || "Add New Field"}
                  </button>
                </div>
              ))}
            </section>
          </main>

          {/* RIGHT PANEL - sticky */}
          <aside className="lg:sticky lg:top-24 self-start space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center">
                <p className="text-[13.5px] text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900">Tip: </span>a clear, well-lit photo makes your biodata feel personal.
                </p>

            </div>




            <div className="border border-slate-200 rounded-2xl p-6 bg-white">
              <h2 className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-1">
                Profile Photo
              </h2>

              <div
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                className="cursor-pointer flex flex-col items-center justify-center"
                aria-label="Upload profile photo"
              >
                {photoPreview ? (
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <Image
                      src={photoPreview}
                      alt={language === "mr" ? "प्रोफाइल फोटो" : "User profile photo preview"}
                      fill
                      loading="eager"
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="
    w-28 h-28 sm:w-32 sm:h-32
    flex flex-col items-center justify-center
    bg-slate-50
    border border-dashed border-slate-300
    rounded-2xl
    cursor-pointer
    transition-all
    hover:border-slate-900 hover:bg-white
  "
                  >


                    <IoCameraOutline size={28} className="text-slate-500 mb-1.5" />
                    <p className="text-[11px] font-semibold text-slate-600">Click to upload</p>

                  </div>

                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPhotoSelected}
                aria-hidden
              />

              {photoPreview && (
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white border border-slate-300 text-slate-800 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold hover:border-slate-900 transition"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="bg-white border border-slate-200 text-slate-500 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold hover:text-rose-700 hover:border-rose-200 hover:bg-rose-50 transition"
                  >
                    Remove
                  </button>
                </div>
              )}


            </div>
            <div className="flex flex-col gap-2.5">
              <button
                type="submit"
                className="bg-slate-900 text-white py-3.5 rounded-full font-semibold text-[14.5px] hover:bg-rose-900 transition shadow-sm"
              >
                Generate Biodata
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(true);
                }}
                className="flex items-center justify-center gap-2 bg-white text-slate-600 py-3 rounded-full font-semibold text-[13.5px] hover:bg-slate-50 transition-colors border border-slate-200"
              >
                <Trash2 className="w-4 h-4" />
                {language === "mr" ? "रीसेट करा" : language === "hi" ? "रीसेट करें" : "Reset Form"}
              </button>
            </div>
          </aside>
        </div>
      </form>

      {/* MODALS */}
      {showImageCropper && selectedFile && (
        <ImageCropper
          file={selectedFile}
          onCropComplete={handleCropComplete}
          onClose={() => {
            setShowImageCropper(false);
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
        />
      )}

      {showGodPhotoSelector && (
        <GodPhotoSelector
          onSelect={(path) => {
            setGodPhoto(path);
            // Also update formData.godPhoto so the Image component shows the new photo
            updateForm((updated) => {
              updated.godPhoto = path;
            });
            setShowGodPhotoSelector(false);
          }}
          onClose={() => setShowGodPhotoSelector(false)}
        />
      )}

      {/* Simple Section Title Edit Modal */}
      {showTitleEditModal && editingSectionIndex >= 0 && (
        <div className="fixed inset-0 z-[100] flex justify-center items-start pt-16 sm:pt-24 px-4">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowTitleEditModal(false)}
          />

          <div className="relative bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl border border-gray-200 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowTitleEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close modal"
            >
              <IoCloseOutline size={24} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <IoCreateOutline size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Edit Section Title</h2>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={tempSectionTitle}
                onChange={(e) => setTempSectionTitle(e.target.value)}
                className="w-full bg-white border border-gray-300 px-4 py-2.5 rounded-lg text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateForm((updated) => {
                      if (typeof editingSectionIndex === "number" && updated.fieldSections?.[editingSectionIndex]) {
                        updated.fieldSections[editingSectionIndex].title = tempSectionTitle;
                      }
                    });
                    setShowTitleEditModal(false);
                  }
                }}
              />

              <div className="flex gap-2">
                <button
                  className="flex-1 py-2.5 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-rose-900 transition-colors"
                  onClick={() => {
                    updateForm((updated) => {
                      if (typeof editingSectionIndex === "number" && updated.fieldSections?.[editingSectionIndex]) {
                        updated.fieldSections[editingSectionIndex].title = tempSectionTitle;
                      }
                    });
                    setShowTitleEditModal(false);
                  }}
                >
                  Save
                </button>
                <button
                  className="flex-1 py-2.5 bg-white text-gray-600 border border-gray-300 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setShowTitleEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-[200] flex justify-center items-center px-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowResetModal(false)}
          />
          <div className="relative bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-100 text-slate-900 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === "mr" ? "काय तुम्हाला रीसेट करायचं आहे?" : language === "hi" ? "क्या आप रीसेट करना चाहते हैं?" : "Are you sure?"}
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {language === "mr"
                  ? "हे केल्याने तुमची सर्व माहिती कायमची निघून जाईल."
                  : language === "hi"
                    ? "ऐसा करने से आपकी सभी जानकारी स्थायी रूप से हट जाएगी।"
                    : "This will permanently delete all your filled information."}
              </p>

              <div className="flex flex-col w-full gap-2">
                <button
                  onClick={() => {
                    // Scroll to top first for a clean reset feel
                    if (godPhotoRef.current) {
                      godPhotoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    try {
                      localStorage.removeItem(language);
                    } catch (err) { }
                    // Brief delay to allow scroll to start before reload
                    setTimeout(() => {
                      window.location.reload();
                    }, 300);
                  }}
                  className="w-full py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-rose-900 transition-all"
                >
                  {language === "mr" ? "हो, रीसेट करा" : language === "hi" ? "हाँ, रीसेट करें" : "Yes, Reset Everything"}
                </button>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="w-full py-3 bg-white text-slate-600 rounded-full font-semibold border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  {language === "mr" ? "रद्द करा" : language === "hi" ? "रद्द करें" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
