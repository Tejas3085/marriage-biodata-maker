"use client";

import React from "react";

interface GodPhotoSelectorProps {
  onSelect: (photoPath: string) => void;
  onClose: () => void;
}

const godPhotos = [
  "/gods/1.png",
  "/gods/2.png",
  "/gods/3.png",
  "/gods/4.png",
];

export default function GodPhotoSelector({
  onSelect,
  onClose,
}: GodPhotoSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select God Photo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {godPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(photo);
                onClose();
              }}
              className="border-2 border-gray-200 rounded-lg p-2 hover:border-pink-500 transition"
            >
              <img
                src={photo}
                alt={`God ${index + 1}`}
                className="w-full h-24 object-contain"
              />
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

