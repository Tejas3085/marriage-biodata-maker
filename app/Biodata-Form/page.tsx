"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguageContext } from "../hooks/useLanguage";
import ImageCropper from "../components/ImageCropper";
import GodPhotoSelector from "../components/GodPhotoSelector";
import TitleEditModal from "../components/TitleEditModal";
import { IoCaretUpOutline, IoCaretDownOutline, IoCloseOutline, IoAddOutline, IoCreateOutline, IoCheckmarkOutline, IoCameraOutline } from "react-icons/io5";

type Field = {
  label: string;
  key: string;
  type: string;
  placeholder?: string;
  value?: any;
  options?: string[];
};

export default function BiodataForm() {
  const router = useRouter();
  const { translationsForm, setFolder, language, setLanguage } =
    useLanguageContext();
  const [formData, setFormData] = useState<any>(null);
  const [godPhoto, setGodPhoto] = useState<string>("/gods/1.png");
  const [godTitle, setGodTitle] = useState<string>(
    "|| श्री गणेशाय नमः ||"
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [enablegodTitle, setEnablegodTitle] = useState(true);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [showGodPhotoSelector, setShowGodPhotoSelector] = useState(false);
  const [showTitleEditModal, setShowTitleEditModal] = useState(false);
  const [editingSectionIndex, setEditingSectionIndex] = useState<number>(-1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isInitialized = useRef(false);

  const titleOptions = [
    "|| श्री गणेशाय नम: ||",
    "|| ॐ नमः शिवाय ||",
    "|| जय श्रीराम ||",
    "|| ॐ ||",
  ];

  // Initialize form and load from localStorage
  useEffect(() => {
    setFolder("formLang");
  }, [setFolder]);

  // Initialize form data only once when translationsForm is first loaded
  useEffect(() => {
    if (!translationsForm || isInitialized.current) return;

    const clone = structuredClone(translationsForm);
    if (clone.godTitle) setGodTitle(clone.godTitle);

    // Patch values from localStorage before setting form data
    const saved = localStorage.getItem("formData");
    if (saved) {
      try {
        const groupedData = JSON.parse(saved);
        
        // Create key-value lookup
        const keyValueLookup: Record<string, any> = {};
        for (const sectionKey of Object.keys(groupedData)) {
          const section = groupedData[sectionKey];
          if (section?.fields && Array.isArray(section.fields)) {
            section.fields.forEach((field: any) => {
              keyValueLookup[field.key] = field.value;
            });
          }
        }

        // Update form data with saved values
        if (clone.fieldSections) {
          clone.fieldSections.forEach((section: any) => {
            if (section.fields) {
              section.fields.forEach((field: any) => {
                if (keyValueLookup.hasOwnProperty(field.key)) {
                  field.value = keyValueLookup[field.key];
                }
              });
            }
          });
        }

        // Restore photo, god photo, and god title
        if (groupedData.photo) setPhotoPreview(groupedData.photo);
        if (groupedData.godPhoto) setGodPhoto(groupedData.godPhoto);
        if (groupedData.godTitle) setGodTitle(groupedData.godTitle);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }

    setFormData(clone);
    isInitialized.current = true;
  }, [translationsForm]);


  const moveFieldUp = (sIndex: number, fIndex: number) => {
    if (!formData || fIndex === 0) return;
    const updated = structuredClone(formData);
    const fields = updated.fieldSections[sIndex].fields;
    [fields[fIndex - 1], fields[fIndex]] = [fields[fIndex], fields[fIndex - 1]];
    setFormData(updated);
  };

  const moveFieldDown = (sIndex: number, fIndex: number) => {
    if (!formData) return;
    const updated = structuredClone(formData);
    const fields = updated.fieldSections[sIndex].fields;
    if (fIndex >= fields.length - 1) return;
    [fields[fIndex + 1], fields[fIndex]] = [fields[fIndex], fields[fIndex + 1]];
    setFormData(updated);
  };

  const deleteField = (sIndex: number, fIndex: number) => {
    if (!formData) return;
    const updated = structuredClone(formData);
    updated.fieldSections[sIndex].fields.splice(fIndex, 1);
    setFormData(updated);
  };

  const addNewField = (sIndex: number, section: any) => {
    if (!formData) return;
    const updated = structuredClone(formData);
    updated.fieldSections[sIndex].fields.push({
      label: "",
      value: "",
      key: `field_${Date.now()}`,
      type: "text",
      placeholder: section.NewFieldValue || "",
      options: [],
    });
    setFormData(updated);
  };

  const updateField = (
    sIndex: number,
    fIndex: number,
    key: "label" | "value",
    value: any
  ) => {
    if (!formData) return;
    
    // Use functional update to ensure we're working with the latest state
    setFormData((prevFormData: any) => {
      if (!prevFormData) return prevFormData;
      const updated = structuredClone(prevFormData);
      
      // Validate indices
      if (
        updated.fieldSections &&
        updated.fieldSections[sIndex] &&
        updated.fieldSections[sIndex].fields &&
        updated.fieldSections[sIndex].fields[fIndex]
      ) {
        updated.fieldSections[sIndex].fields[fIndex][key] = value;
      }
      
      return updated;
    });
  };

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
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const changeGodPhoto = () => {
    setShowGodPhotoSelector(true);
  };

  const handleGodPhotoSelect = (photoPath: string) => {
    setGodPhoto(photoPath);
    setShowGodPhotoSelector(false);
  };

  const removeGodPhoto = () => {
    setGodPhoto("");
  };

  const toggleEdit = () => {
    if (!enablegodTitle) {
      // Save title when toggling from edit to view mode
      // Title is already saved in state via the input onChange
    }
    setEnablegodTitle(!enablegodTitle);
  };

  const removeIcon = () => {
    setGodTitle("");
  };

  const openTitleEdit = (sectionIndex: number) => {
    setEditingSectionIndex(sectionIndex);
    setShowTitleEditModal(true);
  };

  const handleTitleSave = (title: string) => {
    if (!formData || editingSectionIndex === -1) return;
    const updated = structuredClone(formData);
    updated.fieldSections[editingSectionIndex].title = title;
    setFormData(updated);
    setShowTitleEditModal(false);
    setEditingSectionIndex(-1);
  };

  const openDatePicker = (event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    if (input && "showPicker" in input && typeof input.showPicker === "function") {
      input.showPicker();
    }
  };

  const resetForm = () => {
    if (!translationsForm) return;
    const reset = structuredClone(translationsForm);
    // Reset all field values to empty
    if (reset.fieldSections) {
      reset.fieldSections.forEach((section: any) => {
        if (section.fields) {
          section.fields.forEach((field: any) => {
            field.value = "";
          });
        }
      });
    }
    setFormData(reset);
    setPhotoPreview(null);
    setGodPhoto("/gods/1.png");
    setGodTitle(translationsForm?.godTitle || "|| श्री गणेशाय नमः ||");
    setEnablegodTitle(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const generateBiodata = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!formData) return;

    const groupedData: any = {};

    // Loop through sections in sequence
    formData.fieldSections.forEach((section: any) => {
      // Maintain the order of fields as they appear in section.fields
      const sectionFields = section.fields.map((sf: Field) => ({
        label: sf.label || "",
        key: sf.key,
        type: sf.type || "text",
        value: sf.value ?? "",
        placeholder: sf.placeholder ?? "",
        options: sf.options ?? [],
      }));

      groupedData[section.key] = {
        title: section.title,
        fields: sectionFields,
      };
    });

    // Add photo & god info
    groupedData.photo = photoPreview || null;
    groupedData.godTitle = godTitle || null;
    groupedData.godPhoto = godPhoto || null;

    // Save to localStorage
    localStorage.setItem("formData", JSON.stringify(groupedData));

    // Navigate to preview page
    router.push("/preview");
  };

  if (!formData)
    return (
      <div className="text-center mt-8 text-gray-500">Loading form...</div>
    );

  return (
    <div className="biodata-card max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
      {/* Header Section */}
      <div className="biodata-header text-center mb-6">
        <h1 className="biodata-highlight text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
          Create Your Biodata Now
        </h1>
        <p className="biodata-subtitle text-gray-600 text-sm">
          Build your professional or marriage biodata in just a few clicks.
          <br />
          Simple. Elegant. Ready to share.
        </p>
      </div>

      {/* Form Wrapper */}
      <div className="form-wrapper">
        <form onSubmit={generateBiodata}>
          <div className="form-section-container">
            {/* Form Fields */}
            <div className="form-fields">
              {/* Top Section - God Photo + Title */}
              <div className="top-section mb-6">
                {/* God Photo Section */}
                <div className="god-photo-section text-center mb-4">
                  <div className="god-photo relative inline-block">
                    {godPhoto ? (
                      <img
                        src={godPhoto}
                        alt="God Photo"
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow-md"
                      />
                    ) : (
                      <div
                        className="addGodPhoto w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400"
                        onClick={changeGodPhoto}
                      >
                        <span className="text-xs text-gray-500">Add God Photo +</span>
                      </div>
                    )}
                  </div>

                  <div className="god-photo-buttons flex justify-center gap-4 mt-3">
                    <button
                      type="button"
                      className="addGodPhoto text-sm text-blue-600 hover:text-blue-700 underline"
                      onClick={changeGodPhoto}
                    >
                      Change Photo
                    </button>
                    {godPhoto && (
                      <button
                        type="button"
                        className="addGodPhoto text-sm text-red-600 hover:text-red-700 underline"
                        onClick={removeGodPhoto}
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>

                {/* God Name Edit Section */}
                <div className="godName-edit-container flex items-center justify-center gap-2 mb-4">
                  {enablegodTitle ? (
                    <span className="god-title text-lg font-semibold text-gray-800">
                      {godTitle || "Click to add title"}
                    </span>
                  ) : (
                    <input
                      type="text"
                      value={godTitle}
                      onChange={(e) => setGodTitle(e.target.value)}
                      placeholder="Enter God Name"
                      className="border border-gray-300 rounded-md px-3 py-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      autoFocus
                    />
                  )}
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className={`p-1 ${enablegodTitle ? "text-blue-600" : "text-green-500"} hover:opacity-70`}
                  >
                    {enablegodTitle ? (
                      <IoCreateOutline size={20} />
                    ) : (
                      <IoCheckmarkOutline size={20} />
                    )}
                  </button>
                  {godTitle && (
                    <button
                      type="button"
                      onClick={removeIcon}
                      className="p-1 text-gray-600 hover:text-red-600"
                    >
                      <IoCloseOutline size={20} />
                    </button>
                  )}
                </div>
              </div>

              {/* Form Sections */}
              {formData.fieldSections.map((section: any, sIndex: number) => (
                <div key={sIndex} className="mb-6">
                  {/* Section Title */}
                  <h3
                    className="section-divider text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200 cursor-pointer flex items-center gap-2 hover:text-blue-600"
                    onClick={() => openTitleEdit(sIndex)}
                  >
                    {section.title}
                    <IoCreateOutline className="text-blue-600" size={18} />
                  </h3>

                  {/* Section Fields */}
                  <div className="space-y-3">
                    {section.fields.map((field: Field, fIndex: number) => (
                      <div key={field.key} className="form-row flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                        {/* Input Fields */}
                        <div className="inputDiv flex-1 flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            value={field.label || ""}
                            onChange={(e) =>
                              updateField(sIndex, fIndex, "label", e.target.value)
                            }
                            placeholder={section.NewFieldLabel || "Label"}
                            className="input border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none flex-1"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                          />
                          <div className="input flex-1">
                            {field.type === "text" && (
                              <input
                                type="text"
                                value={field.value || ""}
                                onChange={(e) =>
                                  updateField(sIndex, fIndex, "value", e.target.value)
                                }
                                placeholder={field.placeholder || section.NewFieldValue || "Enter value"}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                            )}

                            {field.type === "date" && (
                              <input
                                type="date"
                                value={field.value || ""}
                                onChange={(e) =>
                                  updateField(sIndex, fIndex, "value", e.target.value)
                                }
                                onClick={openDatePicker}
                                placeholder="Select Date"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                            )}

                            {field.type === "time" && (
                              <input
                                type="time"
                                value={field.value || ""}
                                onChange={(e) =>
                                  updateField(sIndex, fIndex, "value", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                            )}

                            {field.type === "tel" && (
                              <input
                                type="tel"
                                value={field.value || ""}
                                onChange={(e) =>
                                  updateField(sIndex, fIndex, "value", e.target.value)
                                }
                                placeholder={field.placeholder || section.NewFieldValue || "Enter value"}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                            )}

                            {field.type === "email" && (
                              <input
                                type="email"
                                value={field.value || ""}
                                onChange={(e) =>
                                  updateField(sIndex, fIndex, "value", e.target.value)
                                }
                                placeholder={field.placeholder || section.NewFieldValue || "Enter value"}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              />
                            )}

                            {field.type === "select" && (
                              <select
                                value={field.value || ""}
                                onChange={(e) =>
                                  updateField(sIndex, fIndex, "value", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              >
                                <option value="">
                                  {field.placeholder || section.NewFieldValue || "Select an option"}
                                </option>
                                {field.options?.map((option, idx) => (
                                  <option key={idx} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            )}

                            {field.type === "textarea" && (
                              <textarea
                                value={field.value || ""}
                                onChange={(e) =>
                                  updateField(sIndex, fIndex, "value", e.target.value)
                                }
                                placeholder={field.placeholder || section.NewFieldValue || "Enter value"}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                rows={3}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                              />
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="upDownsection flex items-center gap-2">
                          <span className="actions flex flex-col gap-1">
                            <button
                              type="button"
                              onClick={() => moveFieldUp(sIndex, fIndex)}
                              disabled={fIndex === 0}
                              className={`p-1 ${fIndex === 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-700"}`}
                            >
                              <IoCaretUpOutline size={20} />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveFieldDown(sIndex, fIndex)}
                              disabled={fIndex === section.fields.length - 1}
                              className={`p-1 ${fIndex === section.fields.length - 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-700"}`}
                            >
                              <IoCaretDownOutline size={20} />
                            </button>
                          </span>
                          <button
                            type="button"
                            onClick={() => deleteField(sIndex, fIndex)}
                            className="p-1 text-gray-600 hover:text-red-600"
                          >
                            <IoCloseOutline size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Field Button */}
                  <div
                    className="addNewField mt-3 text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1 text-sm font-medium"
                    onClick={() => addNewField(sIndex, section)}
                  >
                    <IoAddOutline size={18} />
                    <span>{section.addExtraFiels || "Add New Field"}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo Upload Section */}
            <div className="photo-section mt-8">
              {/* Promo Banner */}
              <div className="banner-container mb-4">
                <div className="promo-banner bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 px-4 rounded-lg shadow-md">
                  🎉 Create Your Free Marriage Biodata in 2 Minutes — 100% Free!
                </div>
              </div>

              {/* Upload Section */}
              <div className="photo-card bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                <h3 className="photo-title text-lg font-semibold text-gray-800 mb-4 text-center">
                  {formData.uploadPhotoLabel || "Upload Photo"}
                </h3>

                <div
                  className="photo-upload-box cursor-pointer mb-4 flex flex-col items-center justify-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile Photo"
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md"
                    />
                  ) : (
                    <div className="placeholder text-center">
                      <IoCameraOutline size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600 text-sm">Click to upload your photo</p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onPhotoSelected}
                  className="hidden"
                />

                {photoPreview && (
                  <div className="photo-buttons flex gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="submit-buttons mt-6 space-y-3">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-md shadow-md"
                >
                  {formData.generateBiodataBtnLabel ||
                    (language === "mr"
                      ? "बायोडाटा तयार करा"
                      : "Generate Biodata")}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded-md shadow-md"
                >
                  {language === "mr" ? "फॉर्म रीसेट करा" : "Reset Form"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Modals */}
      {showImageCropper && selectedFile && (
        <ImageCropper
          file={selectedFile}
          onCropComplete={handleCropComplete}
          onClose={() => {
            setShowImageCropper(false);
            setSelectedFile(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      )}

      {showGodPhotoSelector && (
        <GodPhotoSelector
          onSelect={handleGodPhotoSelect}
          onClose={() => setShowGodPhotoSelector(false)}
        />
      )}

      {showTitleEditModal && editingSectionIndex !== -1 && formData && (
        <TitleEditModal
          initialTitle={formData.fieldSections[editingSectionIndex].title}
          selectedLang={language}
          onSave={handleTitleSave}
          onClose={() => {
            setShowTitleEditModal(false);
            setEditingSectionIndex(-1);
          }}
        />
      )}
    </div>
  );
}
