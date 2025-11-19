"use client";

import React, { useEffect, useState } from "react";

interface GodPhotoSelectorProps {
  onSelect: (photoPath: string) => void;
  onClose: () => void;
}

export default function GodPhotoSelector({ onSelect, onClose }: GodPhotoSelectorProps) {
  const [godPhotos, setGodPhotos] = useState<string[]>([]);

  useEffect(() => {
    const images: string[] = [];
    for (let i = 0; i <= 18; i++) {
      images.push(`/gods/${i}.png`);
    }
    setGodPhotos(images);
  }, []);

  const handleGallerySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    onSelect(imageURL);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select God Photo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>

        {/* Choose from Gallery */}
        <div className="mb-4">
          <label className="w-full block bg-pink-800 text-white text-center py-2 rounded-lg cursor-pointer hover:bg-pink-700">
            Choose from Gallery
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleGallerySelect}
            />
          </label>
          <h3 className="text-center w-full">Or</h3>
        </div>

        {/* Scrollable Grid */}
        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {godPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(photo);
                onClose();
              }}
              className="border-2 border-gray-200 rounded-lg p-2 hover:border-pink-500 transition"
            >
                 <img src={photo} alt={`God ${index + 1}`} className="w-full h-20 object-contain" />
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
