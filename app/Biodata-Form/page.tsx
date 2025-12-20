
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguageContext } from "../hooks/useLanguage";
import ImageCropper from "../components/ImageCropper";
import GodPhotoSelector from "../components/GodPhotoSelector";
import TitleEditModal from "../components/TitleEditModal";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Trash2 } from "lucide-react";

import {
  IoAddOutline,
  IoCreateOutline,
  IoCloseOutline,
  IoCameraOutline,
} from "react-icons/io5";
import { FaRegImage } from "react-icons/fa";

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
  const isInitialized = useRef(false);
  const [isGodTitleModalOpen, setGodTitleModalOpen] = useState(false);
  const [tempGodTitle, setTempGodTitle] = useState("");

  // NEW: temp for section title editing (separate from god title)
  const [tempSectionTitle, setTempSectionTitle] = useState("");

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
        console.error("Failed to load saved form data:", err);
        // If localStorage contains a non-JSON value (commonly "[object Object]"), remove it to recover
        try {
          if (typeof window !== "undefined") {
            const raw = localStorage.getItem(language);
            if (raw && (raw.trim() === "[object Object]" || (raw.trim()[0] !== "{" && raw.trim()[0] !== "["))) {
              console.warn(`Stored value for key '${language}' is malformed; removing it.`);
              localStorage.removeItem(language);
            }
          }
        } catch (rmErr) {
          console.warn("Failed to clean malformed saved data:", rmErr);
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
      isGodTitleModalOpen;

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
      console.warn("Could not save to localStorage:", err);
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
      console.warn("Could not save to localStorage:", err);
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
    return <div className="text-center mt-8 text-gray-500">Loading form...</div>;
  }

  // ---------- Render ----------
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8">
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
            url: "https://yourwebsite.com/Biodata-Form",
          }),
        }}
      />
      {/* JSON-LD structured data (helps SEO, lightweight) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Marriage Biodata Maker",
            description:
              "Create a professional marriage biodata with curated templates and easy form inputs.",
            author: { "@type": "Organization", name: "Marriage Biodata Maker" },
          }),
        }}
      />

      <form onSubmit={generateBiodata} aria-label="Marriage biodata form">
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-10">
          {/* LEFT PANEL */}
          <main>
            <header className="text-center mb-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight mb-3">
                Create Your <span className="text-pink-500">Marriage Biodata</span>
              </h1>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Fill in your personal details and design a beautifully formatted biodata.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="h-1 w-20 sm:w-24 bg-blue-600 rounded-full" />
              </div>
            </header>

            {/* God Image + Title */}
            <section
              aria-label="God photo and title"
              className="text-center mb-8 border-b pb-6"
            >
              <div className="flex justify-center mb-3">
                  {godPhoto ? (
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden border-blue-100">
                        <Image
                          src={formData.godPhoto || godPhoto}
                          alt="Selected image"
                          fill
                          loading="eager"
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => setShowGodPhotoSelector(true)}
                    className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 text-sm rounded-full cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all"
                  >
                    Add Photo
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-3 mb-3">
                          <button
                            type="button"
                            onClick={() => setShowGodPhotoSelector(true)}
                  className="px-4 py-1.5 text-xs font-medium
                   rounded-lg bg-pink-100 text-pink-700
                   hover:bg-pink-200 transition border border-pink-300 flex items-center gap-1"
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
                    className="px-4 py-1.5 text-xs font-medium
                     rounded-lg bg-gray-100 text-gray-600
                     hover:bg-gray-200 transition border border-gray-300 flex items-center gap-1"
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
                  className="text-blue-600 hover:text-blue-800 transition"
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
                        className="w-full bg-white border border-gray-300 px-4 py-2.5 rounded-lg text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all"
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
                          className="flex-1 py-2.5 bg-pink-500 text-white rounded-lg font-semibold text-sm hover:bg-pink-600 transition-colors"
                          onClick={() => {
                            setGodTitle(tempGodTitle);
                            setGodTitleModalOpen(false);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="flex-1 py-2.5 bg-white text-gray-600 border border-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
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
            <section aria-label="Form fields">
              {formData.fieldSections.map((section: any, sIndex: number) => (
                <div key={sIndex} className="mb-8">
                  <div
                    className="flex items-center mb-3 pb-1 cursor-pointer hover:text-pink-600 transition-colors"
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
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      {section.title}
                    </h3>
                    <IoCreateOutline className="text-pink-600 mt-[2px] mx-[6px]" aria-hidden />
                  </div>

                  <div className="space-y-3">
                    {section.fields.map((field: Field, fIndex: number) => (
                      <div
                        key={field.key}
                        className="
        flex sm:grid-cols-[1fr_auto] sm:items-center gap-2 sm:gap-3                  /* Mobile: vertical */
        sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-3 /* Tablet: horizontal */
        lg:flex lg:flex-row lg:items-center lg:gap-3                /* Large: horizontal flex */
      "
                      >
                        {/* Input / Textarea / Select */}
                        <div className="w-full flex flex-col lg:flex-row lg:gap-3">
                          <input
                            id={field.key + "_label"}
                            aria-label="Field label"
                            type="text"
                            value={field.label || ""}
                            onChange={(e) => updateField(sIndex, fIndex, "label", e.target.value)}
                            placeholder={section.NewFieldLabel}
                            className="border w-full border-[#abb2b9] px-3 py-2 rounded-md text-sm bg-[#eef1f5] focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all mb-2"
                          />

                          {field.type === "select" ? (
                            <select
                              id={field.key}
                              aria-label={`Select ${field.label || "option"}`}
                              value={field.value || ""}
                              onChange={(e) => updateField(sIndex, fIndex, "value", e.target.value)}
                              className="border border-gray-200 px-3 py-2 mb-2 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all w-full"
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
                              className="border border-gray-200 px-3 py-2 mb-2 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all w-full resize-none overflow-hidden"
                              rows={1}
                            />
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-col lg:flex-row gap-2 justify-start sm:justify-end lg:justify-end">
                          <button
                            type="button"
                            onClick={() => moveFieldUp(sIndex, fIndex)}
                            disabled={fIndex === 0}
                            className="text-gray-500 hover:text-gray-900 disabled:opacity-30 transition"
                          >
                            <ChevronUp size={20} strokeWidth={1.8} />
                          </button>

                          <button
                            type="button"
                            onClick={() => moveFieldDown(sIndex, fIndex)}
                            disabled={fIndex === section.fields.length - 1}
                            className="text-gray-500 hover:text-gray-900 disabled:opacity-30 transition"
                          >
                            <ChevronDown size={20} strokeWidth={1.8} />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteField(sIndex, fIndex)}
                            className="text-pink-400 hover:text-pink-600 transition"
                            aria-label="Delete field"
                          >
                            <Trash2 size={18} />
                          </button>


                        </div>


                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => addNewField(sIndex, section)}
                    className="text-pink-400 text-sm font-medium flex items-center gap-1 mt-1 hover:text-pink-600 transition-colors"
                    aria-label={`Add new field to ${section.title}`}
                  >
                    <IoAddOutline /> {section.addExtraFiels || "Add New Field"}
                  </button>
                </div>
              ))}
            </section>
          </main>

          {/* RIGHT PANEL - sticky */}
          <aside className="sticky top-24 pr-5 self-start">
            <div className="mb-6 flex justify-center px-4">
              <div className="max-w-xl rounded-2xl border border-pink-200 bg-white px-6 py-4 text-center shadow-md">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                  Upload your photo to create a clean and professional marriage biodata.✨
                </p>
              </div>

            </div>




            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">
                {"Profile Photo"}
              </h3>

              <div
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                className="cursor-pointer flex flex-col items-center justify-center"
                aria-label="Upload profile photo"
              >
                {photoPreview ? (
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden border-4 border-blue-100 shadow">
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
    w-24 h-24 sm:w-28 sm:h-28
    flex flex-col items-center justify-center
    bg-white/70 backdrop-blur-md
    border border-gray-200
    rounded-xl
    shadow-sm cursor-pointer
    transition-all
    hover:shadow-md hover:border-pink-400 hover:bg-pink-50
  "
                  >


                    <IoCameraOutline size={34} className="text-gray-600 mb-1" />
                    <p className="text-[11px] font-medium text-gray-600">Click to upload</p>

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
                <div className="flex justify-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-pink-500 text-white px-3 py-1.5 rounded-md text-sm"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}


            </div>
            <div className="mt-8 flex flex-col gap-3">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 rounded-md font-medium"
              >
                {"Generate Biodata"}
              </button>
              <button
                type="button"
                onClick={() => {
                  // reset form & localStorage
                  if (confirm(language === "mr" ? "रिअली रीसेट करायचंय?" : "Reset the form?")) {
                    try {
                      localStorage.removeItem(language);
                    } catch (err) { }
                    // reload page to reinitialize
                    window.location.reload();
                  }
                }}
                className="bg-gray-400 text-white py-2 rounded-md font-medium"
              >
                {"Reset Form"}
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
                className="w-full bg-white border border-gray-300 px-4 py-2.5 rounded-lg text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all"
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
                  className="flex-1 py-2.5 bg-pink-500 text-white rounded-lg font-semibold text-sm hover:bg-pink-600 transition-colors"
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
                  className="flex-1 py-2.5 bg-white text-gray-600 border border-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setShowTitleEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
