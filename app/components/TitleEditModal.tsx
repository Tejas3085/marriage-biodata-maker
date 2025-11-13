"use client";

import React, { useState, useEffect } from "react";

interface TitleEditModalProps {
  initialTitle: string;
  selectedLang: string;
  onSave: (title: string) => void;
  onClose: () => void;
}

export default function TitleEditModal({
  initialTitle,
  selectedLang,
  onSave,
  onClose,
}: TitleEditModalProps) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleSave = () => {
    if (title?.trim()) {
      onSave(title.trim());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {selectedLang === "mr" ? "शीर्षक संपादित करा" : "Edit Title"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-pink-400"
          placeholder="Enter title"
          autoFocus
        />

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {selectedLang === "mr" ? "रद्द करा" : "Cancel"}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            {selectedLang === "mr" ? "सेव्ह करा" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

