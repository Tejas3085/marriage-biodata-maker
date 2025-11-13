"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing form data:", error);
      }
    }
  }, []);

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No biodata data found.</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Go Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <button
            onClick={() => router.push("/")}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            ← Back to Form
          </button>
          
          {formData.godPhoto && (
            <img
              src={formData.godPhoto}
              alt="God"
              className="mx-auto h-24 w-24 rounded-full border-4 border-pink-100 shadow-sm object-cover mb-4"
            />
          )}
          {formData.godTitle && (
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {formData.godTitle}
            </h2>
          )}
          {formData.photo && (
            <img
              src={formData.photo}
              alt="Profile"
              className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-pink-200 shadow-md mb-6"
            />
          )}
        </div>

        <div className="space-y-8">
          {Object.keys(formData).map((key) => {
            if (key === "photo" || key === "godPhoto" || key === "godTitle")
              return null;

            const section = formData[key];
            if (!section || !section.fields) return null;

            return (
              <section key={key} className="border-b pb-6 last:border-b-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-semibold text-gray-600 mb-1">
                        {field.label}
                      </div>
                      <div className="text-gray-800">
                        {field.value || (
                          <span className="text-gray-400">Not specified</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Print / Download
          </button>
        </div>
      </div>
    </div>
  );
}

