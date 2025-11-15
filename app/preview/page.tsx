"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Field {
  label: string;
  value: string;
}

interface Section {
  title?: string;
  fields: Field[];
}

interface FormData {
  personalInfo?: Section;
  familyInfo?: Section;
  contactInfo?: Section;
  godPhoto?: string;
  godTitle?: string;
  photo?: string;
}

interface Template {
  id: number;
  name: string;
  img: string;
  textColor?: string;
  backgroundColor?: string;
  lineHeightFactor?: number;
  labelsLeftPadding?: number;
  labelFontSize?: number;
  godTitleColor?: string;
  sectionTitleColor?: string;
}

// ...rest of imports and interfaces remain same

export default function PreviewPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  const templates: Template[] = [
    { id: 1, name: "Classic", img: "/templates/template1.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.15, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#872341", sectionTitleColor: "#184578" },
    { id: 2, name: "Elegant 1", img: "/templates/template2.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#6C3483", sectionTitleColor: "#197278" },
    { id: 3, name: "Elegant 2", img: "/templates/template3.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#B71C1C", sectionTitleColor: "#3366AA" },
    { id: 4, name: "Elegant 3", img: "/templates/template4.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#B3541A", sectionTitleColor: "#38725E" },
    { id: 5, name: "Elegant 4", img: "/templates/template6.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    // ...rest of templates with slight color changes
  ];

  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) setFormData(JSON.parse(saved));
    setSelectedTemplate(templates[0]);
    setLoading(false);
  }, []);

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(document.createElement("img"));
      img.src = src;
    });

const drawBiodata = async (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  if (!formData || !selectedTemplate) return;

  // Background
  ctx.fillStyle = selectedTemplate.backgroundColor || "#fff";
  ctx.fillRect(0, 0, width, height);

  // Template Frame
  const frameImg = await loadImage(selectedTemplate.img);
  ctx.drawImage(frameImg, 0, 0, width, height);

  let y = height * 0.05; // top padding

  // GOD PHOTO
  if (formData.godPhoto) {
    const godImg = await loadImage(formData.godPhoto);
    const godPhotoHeight = width * 0.10;
    ctx.drawImage(godImg, (width - godPhotoHeight) / 2, y, godPhotoHeight, godPhotoHeight);
    y += godPhotoHeight + 25;
  }

  // SECTIONS and GOD TITLE together for dynamic spacing
  const sections = [formData.personalInfo, formData.familyInfo, formData.contactInfo].filter(Boolean);
  const totalFields = sections.reduce((sum, sec) => sum + (sec?.fields.length || 0), 0);
  const sectionCount = sections.length || 1;
  const remainingHeight = height - y - 25;

  const lineHeight = totalFields > 0 ? remainingHeight / (totalFields + sectionCount * 2 + 1) : 22;

  // Dynamic font sizes
  const godTitleFontSize = lineHeight * 0.9; // slightly bigger than section title
  const sectionTitleFontSize = lineHeight * 0.8;
  const labelFontSize = lineHeight * 0.7;

  const labelX = width * (selectedTemplate.labelsLeftPadding || 0.12);
  const valueX = width * 0.5;

  // GOD TITLE (dynamic)
  if (formData.godTitle) {
    ctx.fillStyle = selectedTemplate.godTitleColor || "#000";
    ctx.font = `600 ${labelFontSize}px "Noto Sans Devanagari", "Noto Sans", Arial, sans-serif`;

    ctx.textAlign = "center";
    ctx.fillText(formData.godTitle, width / 2, y);
    y += godTitleFontSize + 12;
  }

  // SECTIONS
 sections.forEach((sec) => {
  if (!sec) return;

  // Section title
  ctx.fillStyle = selectedTemplate.sectionTitleColor || "#000";
  ctx.font = `600 ${sectionTitleFontSize}px "Noto Sans Devanagari", "Noto Sans", Arial, sans-serif`;

  ctx.textAlign = "center";
  ctx.fillText(sec.title || "", width / 2, y);
  y += lineHeight;

  // Fields
  ctx.textAlign = "left";
  ctx.fillStyle = selectedTemplate.textColor || "#000";
  ctx.font = `600 ${labelFontSize}px "Noto Sans Devanagari", "Noto Sans", Arial, sans-serif`;
  

 // Set fixed positions
const labelX = width * (selectedTemplate.labelsLeftPadding || 0.12);
const colonX = width * 0.4; // colon fixed at 40% of canvas width
const valueX = colonX + 20; // value starts 10px after colon

sec.fields.forEach((f) => {
  // Draw label
  ctx.font = `600 ${labelFontSize}px "Noto Sans Devanagari", "Noto Sans", Arial, sans-serif`;
  ctx.fillText(f.label, labelX, y);

  // Draw colon at fixed position
  ctx.fillText(":", colonX, y);

  // Draw value after colon
  ctx.fillText(f.value, valueX, y);

  y += lineHeight;
});


  y += lineHeight * 0.5; // spacing between sections
});

};




  const updateCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedTemplate) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 800;
    const height = 1100;
    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    await drawBiodata(ctx, width, height);
  };

  useEffect(() => {
    updateCanvas();
    window.addEventListener("resize", updateCanvas);
    return () => window.removeEventListener("resize", updateCanvas);
  }, [formData, selectedTemplate]);

  if (loading)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (!formData)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p>No data found. Please go back and fill the form.</p>
        <button
          onClick={() => router.push("/form")}
          className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Go to Form
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col items-center">
          <div className="bg-white rounded-xl shadow-md p-4 w-full flex justify-center">
            <canvas
              ref={canvasRef}
              className="border rounded-md shadow-inner bg-white"
              style={{ width: "100%", maxWidth: "400px", height: "auto" }}
            />
          </div>
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.download = "biodata.png";
              link.href = canvasRef.current?.toDataURL() || "";
              link.click();
            }}
            className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
          >
            Download Biodata
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-4 border">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
            Choose Template
          </h2>
       <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
  {templates.map((tpl) => (
    <div
      key={tpl.id}
      onClick={() => setSelectedTemplate(tpl)}
      className={`cursor-pointer border rounded-lg overflow-hidden transition transform hover:scale-105 ${
        tpl.id === selectedTemplate?.id
          ? "border-pink-600 ring-2 ring-pink-300"
          : "border-gray-300"
      }`}
    >
      <img
        src={tpl.img}
        alt={tpl.name}
        className="w-full h-32 object-contain bg-gray-100"
      />
      <p className="text-center text-sm font-medium py-2 bg-gray-50">
        {tpl.name}
      </p>
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
}

