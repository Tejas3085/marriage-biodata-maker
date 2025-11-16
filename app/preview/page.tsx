"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

interface Field { label: string; value: string; }
interface Section { title?: string; fields: Field[]; }
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

export default function PreviewPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const templates: Template[] = [
    { id: 1, name: "Classic", img: "/templates/template1.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.15, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#872341", sectionTitleColor: "#184578" },
    { id: 2, name: "Elegant 1", img: "/templates/template2.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#6C3483", sectionTitleColor: "#197278" },
    { id: 3, name: "Elegant 2", img: "/templates/template3.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#B71C1C", sectionTitleColor: "#3366AA" },
    { id: 4, name: "Elegant 3", img: "/templates/template4.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#B3541A", sectionTitleColor: "#38725E" },
    { id: 5, name: "Elegant 4", img: "/templates/template6.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
  ];

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = String(text).split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + (n === words.length - 1 ? "" : " ");
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        ctx.fillText(line.trim(), x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else line = testLine;
    }
    ctx.fillText(line.trim(), x, y);
    return y + lineHeight;
  }

  const sanitizeFileName = (name: string) => name.replace(/[^a-z0-9]/gi, "_");

  const drawBiodata = async (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!formData || !selectedTemplate) return;
    ctx.fillStyle = selectedTemplate.backgroundColor || "#fff";
    ctx.fillRect(0, 0, width, height);

    // Frame
    const frameImg = await loadImage(selectedTemplate.img);
    if (frameImg.src) ctx.drawImage(frameImg, 0, 0, width, height);

    let y = height * 0.05;

    // God Photo
    if (formData.godPhoto) {
      const godImg = await loadImage(formData.godPhoto);
      const godPhotoHeight = width * 0.10;
      ctx.drawImage(godImg, (width - godPhotoHeight) / 2, y, godPhotoHeight, godPhotoHeight);
      y += godPhotoHeight + 10;
    }

    // User Photo
    let photoWidth = 0, photoHeight = 0, photoX = 0, photoY = 0;
    if (formData.photo) {
      const userImg = await loadImage(formData.photo);
      photoWidth = width * 0.18;
      photoHeight = photoWidth * 1.2;
      photoX = width - photoWidth - width * 0.06;
      photoY = height * 0.19;
      ctx.fillStyle = "#fff";
      ctx.fillRect(photoX - 4, photoY - 4, photoWidth + 5, photoHeight + 5);
      ctx.drawImage(userImg, photoX, photoY, photoWidth, photoHeight);
    }

    // Sections
    const sections = [formData.personalInfo, formData.familyInfo, formData.contactInfo].filter(Boolean);
    const totalFields = sections.reduce((sum, sec) => sum + (sec?.fields.length || 0), 0);
    const sectionCount = sections.length || 1;
    const remainingHeight = height - y - 60;
    const lineHeight = totalFields > 0 ? Math.max(18, remainingHeight / (totalFields + sectionCount * 2 + 1)) : 22;

    const godTitleFontSize = Math.max(12, lineHeight * 0.9);
    const sectionTitleFontSize = Math.max(12, lineHeight * 0.8);
    const labelFontSize = Math.max(10, lineHeight * 0.75);
    const valueFontSize = Math.max(10, lineHeight * 0.7);

    const labelX = width * (selectedTemplate.labelsLeftPadding ?? 0.12);
    const colonX = width * 0.38;
    const valueX = colonX + 12;

    if (formData.godTitle) {
      ctx.fillStyle = selectedTemplate.godTitleColor || "#000";
      ctx.font = `600 ${godTitleFontSize}px "Noto Sans Devanagari", Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(formData.godTitle, width / 2, y);
      y += godTitleFontSize + 10;
    }

    sections.forEach((sec) => {
      if (!sec) return;

      ctx.fillStyle = selectedTemplate.sectionTitleColor || "#000";
      ctx.font = `600 ${sectionTitleFontSize}px "Noto Sans Devanagari", Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(sec.title || "", width / 2, y);
      y += sectionTitleFontSize + lineHeight * 0.2;

      ctx.textAlign = "left";
      sec.fields.forEach((f) => {
        ctx.fillStyle = selectedTemplate.textColor || "#000";
        ctx.font = `600 ${labelFontSize}px "Noto Sans Devanagari", Arial, sans-serif`;
        const safeRightForLabel = photoWidth ? photoX - 10 : width - 40;
        let labelToDraw = f.label || "";
        while (ctx.measureText(labelToDraw + "…").width > Math.max(60, safeRightForLabel - labelX - 6)) labelToDraw = labelToDraw.slice(0, -1);
        if (labelToDraw.length < (f.label || "").length) labelToDraw += "…";
        ctx.fillText(labelToDraw, labelX, y);

        ctx.fillText(":", colonX, y);

        ctx.fillStyle = selectedTemplate.textColor || "#000";
        ctx.font = `400 ${valueFontSize}px "Noto Sans Devanagari", Arial, sans-serif`;
        const rightLimit = photoWidth ? photoX - 16 : width - 40;
        const maxValueWidth = Math.max(60, rightLimit - valueX);
        y = wrapText(ctx, f.value || "", valueX, y, maxValueWidth, lineHeight);
      });

      y += lineHeight * 0.5;
    });
  };

  const updateCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedTemplate) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = 600;
    const height = 800;
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);
    await drawBiodata(ctx, width, height);
  };

  useEffect(() => {
    updateCanvas();
  }, [formData, selectedTemplate]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!formData)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p>No data found. Please fill the form first.</p>
        <button onClick={() => router.push("/form")} className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">Go to Form</button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Canvas */}
        <div className="flex-1 flex flex-col items-center relative">
          <div className="bg-white rounded-xl shadow-md p-4 w-full flex justify-center">
            <canvas
              ref={canvasRef}
              className="border rounded-md shadow-inner bg-white w-full"
              style={{ height: isMobile ? "50vh" : "auto", maxHeight: "1100px", maxWidth: "400px" }}
            />
          </div>

          {/* Sticky Download Button */}
          <div className="fixed bottom-6 left-0 w-full px-4 flex gap-4 z-50">
            <button
              onClick={() => {
                const firstName = formData?.personalInfo?.fields?.[0]?.value?.split(" ")[0] || "biodata";
                const safeName = sanitizeFileName(firstName);
                const canvas = canvasRef.current;
                if (!canvas) return;
                const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
                pdf.addImage(canvas.toDataURL(), "PNG", 0, 0, canvas.width, canvas.height);
                pdf.save(`${safeName}_biodata.pdf`);
              }}
              className="flex-1 px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Templates */}
        <div className="flex-1 bg-white shadow-sm rounded-xl p-4 border overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">Choose Template</h2>

          {/* Mobile slider */}
          <div className="flex md:hidden gap-2 overflow-x-auto scroll-smooth py-2">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl)}
                className={`w-28 cursor-pointer border rounded-lg overflow-hidden flex-shrink-0 transition-transform hover:scale-105 ${tpl.id === selectedTemplate?.id ? "border-pink-600 ring-1 ring-pink-300" : "border-none"}`}
              >
                <img src={tpl.img} alt={tpl.name} className="w-full h-20 object-contain bg-gray-100" />
              </div>
            ))}
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl)}
                className={`cursor-pointer border rounded-lg overflow-hidden transition-transform hover:scale-105 ${tpl.id === selectedTemplate?.id ? "border-pink-600 ring-2 ring-pink-300" : "border-gray-300"}`}
              >
                <img src={tpl.img} alt={tpl.name} className="w-full h-32 object-contain bg-gray-100" />
                <p className="text-center text-sm font-medium py-2 bg-gray-50">{tpl.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
