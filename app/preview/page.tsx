"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { useLanguageContext } from "../hooks/useLanguage";

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
  userPhotomarginLeft: number;
  godMarginTop: number;
  marginBottom?: number;
  labelMarginBottom?: number;
}

export default function PreviewPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { language, setLanguage } = useLanguageContext();

  const templates: Template[] = [
    { id: 1, name: "Classic", img: "/templates/template1.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.15, godMarginTop: 0.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#800000", sectionTitleColor: "#B8860B", userPhotomarginLeft: 0.06, labelMarginBottom: 0 },

    { id: 2, name: "Elegant 1", img: "/templates/template2.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#000080", sectionTitleColor: "#DAA520", userPhotomarginLeft: 0.06, labelMarginBottom: 0 },

    { id: 3, name: "Elegant 2", img: "/templates/template3.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.12, labelFontSize: 0.015, godTitleColor: "#4B0082", sectionTitleColor: "#CD853F", userPhotomarginLeft: 0.08, labelMarginBottom: 0 },

    { id: 4, name: "Elegant 3", img: "/templates/template4.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#006400", sectionTitleColor: "#D2691E", userPhotomarginLeft: 0.06, labelMarginBottom: 0 },

    { id: 5, name: "Elegant 4", img: "/templates/template5.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#2F4F4F", sectionTitleColor: "#A0522D", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    { id: 6, name: "Elegant 5", img: "/templates/template6.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.15, labelFontSize: 0.015, godTitleColor: "#191970", sectionTitleColor: "#C0C0C0", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    { id: 7, name: "Elegant 6", img: "/templates/template7.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.10, labelsLeftPadding: 0.16, labelFontSize: 0.015, godTitleColor: "#8B0000", sectionTitleColor: "#DAA520", userPhotomarginLeft: 0.13, marginBottom: 0, labelMarginBottom: -3.9 },

    { id: 8, name: "Elegant 7", img: "/templates/template8.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.10, labelsLeftPadding: 0.15, labelFontSize: 0.015, godTitleColor: "#00008B", sectionTitleColor: "#B8860B", userPhotomarginLeft: 0.12, marginBottom: 250, labelMarginBottom: -2 },

    { id: 9, name: "Elegant 8", img: "/templates/template9.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#483D8B", sectionTitleColor: "#DAA520", userPhotomarginLeft: 0.06, labelMarginBottom: 0 },

    { id: 10, name: "Elegant 9", img: "/templates/template10.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.10, labelsLeftPadding: 0.15, labelFontSize: 0.015, godTitleColor: "#004D40", sectionTitleColor: "#D2691E", userPhotomarginLeft: 0.14, labelMarginBottom: -1 },

    { id: 11, name: "Elegant 10", img: "/templates/template11.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.07, labelsLeftPadding: 0.15, labelFontSize: 0.015, godTitleColor: "#3E2723", sectionTitleColor: "#8D6E63", userPhotomarginLeft: 0.12, labelMarginBottom: -1 },

    { id: 12, name: "Elegant 11", img: "/templates/template12.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.10, labelsLeftPadding: 0.15, labelFontSize: 0.015, godTitleColor: "#212121", sectionTitleColor: "#757575", userPhotomarginLeft: 0.12, labelMarginBottom: -3.8 },

    { id: 13, name: "Elegant 12", img: "/templates/template13.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.06, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#880E4F", sectionTitleColor: "#FF6F00", userPhotomarginLeft: 0.12, labelMarginBottom: 0 },

    { id: 14, name: "Elegant 13", img: "/templates/template14.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.10, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1A237E", sectionTitleColor: "#FBC02D", userPhotomarginLeft: 0.06, labelMarginBottom: -3 },

    { id: 15, name: "Elegant 14", img: "/templates/template15.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.07, labelsLeftPadding: 0.15, labelFontSize: 0.015, godTitleColor: "#311B92", sectionTitleColor: "#F57F17", userPhotomarginLeft: 0.12, labelMarginBottom: 1 },

    { id: 16, name: "Elegant 15", img: "/templates/template16.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.15, labelFontSize: 0.015, godTitleColor: "#006064", sectionTitleColor: "#E65100", userPhotomarginLeft: 0.06, labelMarginBottom: 0 },

    { id: 17, name: "Elegant 16", img: "/templates/template17.jpg", textColor: "#f0ebebff", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.15, labelFontSize: 0.015, godTitleColor: "#B71C1C", sectionTitleColor: "#F9A825", userPhotomarginLeft: 0.06, labelMarginBottom: -1.5 },

    { id: 18, name: "Elegant 17", img: "/templates/template18.jpg", textColor: "#f3f1f1ff", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.11, labelFontSize: 0.015, godTitleColor: "#1B5E20", sectionTitleColor: "#827717", userPhotomarginLeft: 0.08, labelMarginBottom: 1 },

    { id: 19, name: "Elegant 18", img: "/templates/template19.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.12, labelFontSize: 0.015, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.06, labelMarginBottom: 0 },

    { id: 20, name: "Elegant 19", img: "/templates/template20.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.14, labelFontSize: 0.015, godTitleColor: "#004D40", sectionTitleColor: "#BF360C", userPhotomarginLeft: 0.06, labelMarginBottom: 0 },

    { id: 22, name: "Elegant 22", img: "/templates/template22.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, godMarginTop: 0.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#33691E", sectionTitleColor: "#F57F17", userPhotomarginLeft: 0.12, labelMarginBottom: 0 },
  ];

  // Detect mobile
  useEffect(() => { 
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(language);
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

  function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, draw: boolean = true) {
    const words = String(text).split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + (n === words.length - 1 ? "" : " ");
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        if (draw) ctx.fillText(line.trim(), x, y);
        line = words[n] + " ";
        y += lineHeight * 1.1; // slightly bigger spacing
      } else line = testLine;
    }
    if (draw) ctx.fillText(line.trim(), x, y);
    return y + lineHeight * 1.1;
  }

  const sanitizeFileName = (name: string) => name.replace(/[^a-z0-9]/gi, "_");

  const drawBiodata = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    config: { fontSize: number; godPhotoSize: number; godTitleSize: number },
    images: { frameImg: HTMLImageElement; godImg: HTMLImageElement | null; userImg: HTMLImageElement | null },
    dryRun: boolean = false
  ) => {
    if (!formData || !selectedTemplate) return 0;

    const { fontSize, godPhotoSize, godTitleSize } = config;
    const { frameImg, godImg, userImg } = images;

    // Background
    if (!dryRun) {
      ctx.fillStyle = selectedTemplate.backgroundColor || "#fff";
      ctx.fillRect(0, 0, width, height);

      // Template frame
      if (frameImg.src) ctx.drawImage(frameImg, 0, 0, width, height);
    }

    let y = height * selectedTemplate.godMarginTop;

    // God Photo
    if (godImg) {
      if (!dryRun) {
        ctx.drawImage(godImg, (width - godPhotoSize) / 2, y, godPhotoSize, godPhotoSize);
      }
      y += godPhotoSize + 20;
    } else {
      y += 10;
    }

    // God Title
    if (formData.godTitle) {
      if (!dryRun) {
        ctx.font = `700 ${godTitleSize}px "Playfair Display", serif`;
        ctx.fillStyle = selectedTemplate.godTitleColor || "#872341";
        ctx.textAlign = "center";
        ctx.fillText(formData.godTitle, width / 2, y);
      }
      y += godTitleSize + 5;
    }

    // User Photo
    let photoWidth = 0, photoHeight = 0, photoX = 0, photoY = 0;
    if (userImg) {
      photoWidth = width * 0.18;
      photoHeight = photoWidth * 1.2;
      photoX = width - photoWidth - width * selectedTemplate.userPhotomarginLeft; // more right space
      photoY = y;

      if (!dryRun) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(photoX - 4, photoY - 4, photoWidth + 5, photoHeight + 5);
        ctx.drawImage(userImg, photoX, photoY, photoWidth, photoHeight);
      }
    }

    // Sections
    const sections = [formData.personalInfo, formData.familyInfo, formData.contactInfo].filter(Boolean);

    // Calculate line height based on fontSize
    let lineHeight = fontSize * 1.5;

    const sectionTitleFontSize = Math.max(12, lineHeight * 0.9);

    const labelX = width * (selectedTemplate.labelsLeftPadding ?? 0.12);
    const colonX = width * 0.38;
    const valueX = colonX + 12;

    sections.forEach((sec: any) => {
      if (!sec) return;

      // Check if ANY field has BOTH label + value
      const validFields = sec.fields.filter((f: any) =>
        f.label?.trim() !== "" &&
        f.value?.trim() !== ""
      );

      // If no field has both label & value -> skip whole section
      if (validFields.length === 0) return;

      // --- Section Title ---
      if (!dryRun) {
        ctx.fillStyle = selectedTemplate.sectionTitleColor || "#000";
        ctx.font = `600 ${fontSize}px "Merriweather", serif`;
        ctx.textAlign = "center";
        ctx.fillText(sec.title || "", width / 2, y);
      }

      y += sectionTitleFontSize + lineHeight * 0.2;

      // --- Fields ---
      if (!dryRun) ctx.textAlign = "left";

      validFields.forEach((f: any) => {
        const safeRight = photoWidth && y < (photoY + photoHeight + 20) ? photoX - 16 : width - 40;
        const labelMaxWidth = colonX - labelX - 5;
        const valueMaxWidth = safeRight - valueX;

        if (!dryRun) {
          // LABEL (bold)
          ctx.fillStyle = selectedTemplate.textColor || "#000";
          ctx.font = `600 ${fontSize}px "Poppins", sans-serif`;
        }

        // Calculate height for Label
        if (dryRun) ctx.font = `600 ${fontSize}px "Poppins", sans-serif`;
        const nextYLabel = wrapText(ctx, f.label, labelX, y, labelMaxWidth, lineHeight, !dryRun);

        if (!dryRun) {
          // colon
          ctx.fillText(":", colonX, y);
          // VALUE (semi-bold)
          ctx.font = `600 ${fontSize}px "Poppins", sans-serif`;
        }

        if (dryRun) ctx.font = `600 ${fontSize}px "Poppins", sans-serif`;
        const nextYValue = wrapText(ctx, f.value, valueX, y, valueMaxWidth, lineHeight, !dryRun);

        y = Math.max(nextYLabel, nextYValue) + (selectedTemplate.labelMarginBottom || 0);
      });

      y += lineHeight * 0.1;
    });

    return y;
  };

  const updateCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedTemplate || !formData) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 600;
    const FIXED_HEIGHT = 950;  // your template height

    // Load images once
    const [frameImg, godImg, userImg] = await Promise.all([
      loadImage(selectedTemplate.img),
      formData.godPhoto ? loadImage(formData.godPhoto) : Promise.resolve(null),
      formData.photo ? loadImage(formData.photo) : Promise.resolve(null),
    ]);

    const images = { frameImg, godImg, userImg };

    // Iterative sizing
    let fontSize = 18;
    let godPhotoSize = width * 0.10;
    let godTitleSize = 18;

    // Try to fit
    let contentHeight = 0;
    let attempts = 0;

    while (attempts < 20) {
      const config = { fontSize, godPhotoSize, godTitleSize };
      // We need to set context font for measureText to work in dryRun
      // But drawBiodata sets it before calling wrapText, so it's fine.
      contentHeight = drawBiodata(ctx, width, FIXED_HEIGHT, config, images, true);

      if (contentHeight <= FIXED_HEIGHT - 40) { // 40px buffer
        break;
      }

      // Reduce sizes
      if (fontSize > 10) fontSize -= 0.5;
      if (godPhotoSize > width * 0.06) godPhotoSize *= 0.95;
      if (godTitleSize > 12) godTitleSize -= 0.5;

      if (fontSize <= 10 && godPhotoSize <= width * 0.06 && godTitleSize <= 12) break; // Minimums reached

      attempts++;
    }

    // Final Draw
    const scale = devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = FIXED_HEIGHT * scale;
    ctx.scale(scale, scale);

    drawBiodata(ctx, width, FIXED_HEIGHT, { fontSize, godPhotoSize, godTitleSize }, images, false);
  };


  useEffect(() => {
    updateCanvas();
  }, [formData, selectedTemplate]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!formData)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p>No data found. Please fill the form first.</p>
        <button onClick={() => router.push("/")} className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">Go to Form</button>
      </div>
    );

  return (
    <>
      <header className="top-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

          <div className="flex flex-col items-center justify-center text-center">

            {/* MAIN HEADING */}
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 
        tracking-wide drop-shadow-sm"
            >
              Choose Your Biodata Template
            </h1>

            {/* SUB TEXT */}
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              100% Free • Instant Download • High-Quality PNG Output
            </p>

          </div>

        </div>
      </header>

      <div className="min-h-screen bg-gray-50 pl-4 pr-4 md:p-8">
        {/* <div className="max-w-7xl mx-auto text-center"> */}

        {/* </div> */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex-1 flex flex-col items-center relative">
            <div className="bg-white rounded-xl shadow-md p-4 w-full flex justify-center">
              <canvas
                ref={canvasRef}
                className="shadow-inner bg-white w-full"
                style={{ height: isMobile ? "50vh" : "auto", maxHeight: "800px", maxWidth: "250px" }}
              />
            </div>

            <div
              className="
    fixed bottom-1 left-1/2 -translate-x-1/2 
    md:static md:translate-x-0
    w-[95%] md:w-auto 
    px-4 py-3 
    bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none
    rounded-2xl shadow-xl md:shadow-none border border-gray-200 md:border-none
    flex gap-4 items-center justify-center
    z-50 md:z-auto md:mt-6
  "
            >
              {/* Edit Button */}
              <button
                onClick={() => {
                  localStorage.setItem('page', 'true');
                  router.push("/")
                }}
                className="
    w-full sm:w-auto
    px-4 py-2 
    sm:px-5 sm:py-3 
    md:px-6 md:py-3
    bg-gray-700 text-white font-semibold 
    rounded-xl shadow-md 
    hover:bg-gray-800 hover:shadow-lg 
    transition-all duration-200
    text-sm sm:text-base md:text-lg
  "
              >
                Edit Biodata
              </button>

              {/* Download Button */}
              <button
                onClick={() => {
                  const firstName =
                    formData?.personalInfo?.fields?.[0]?.value?.split(' ')[0] || "biodata";
                  const safeName = sanitizeFileName(firstName);
                  const canvas = canvasRef.current;
                  if (!canvas) return;

                  const link = document.createElement("a");
                  link.href = canvas.toDataURL("image/png");
                  link.download = `${safeName}_biodata.png`;
                  link.click();
                }}
                className="
    w-full sm:w-auto
    px-4 py-2 
    sm:px-5 sm:py-3 
    md:px-6 md:py-3
    bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold 
    rounded-xl shadow-md 
    hover:from-pink-600 hover:to-rose-700 hover:shadow-lg hover:-translate-y-0.5
    transition-all duration-200
    text-sm sm:text-base md:text-lg
  "
              >
                Download PNG
              </button>

            </div>

          </div>

          <div className="flex-1 bg-white shadow-sm rounded-xl p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Choose Template</h2>
            <div className="flex md:hidden gap-2 py-2 overflow-x-auto scroll-smooth scrollbar-hide">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`w-20 cursor-pointer border rounded-lg overflow-hidden flex-shrink-0 transition-transform hover:scale-105 ${tpl.id === selectedTemplate?.id ? "border-pink-600 ring-1 ring-pink-300" : "border-none"}`}
                >
                  <div className="relative w-full h-20 bg-gray-100">
                    <NextImage
                      src={tpl.img}
                      alt={tpl.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Web: Vertical Scroll Grid */}
            <div className="hidden md:grid max-h-[75vh] overflow-y-auto grid-cols-2 lg:grid-cols-3 gap-6 mt-4 pr-2">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`
        cursor-pointer rounded-xl overflow-hidden bg-white shadow-sm border transition-all 
        hover:shadow-lg hover:-translate-y-1 hover:border-pink-400 group
        ${tpl.id === selectedTemplate?.id ? "border-pink-500 ring-2 ring-pink-300" : "border-gray-200"}
      `}
                >
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 px-3 py-3 relative">
                    <NextImage
                      src={tpl.img}
                      alt={tpl.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="px-3 py-3 text-center bg-gray-50 border-t">
                    <p
                      className={`text-sm font-semibold tracking-wide ${tpl.id === selectedTemplate?.id ? "text-pink-600" : "text-gray-700"
                        }`}
                    >
                      {tpl.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>

        {/* Extra Info Section */}
        <div className="mt-12 mb-24">
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Why Choose Our Biodata Maker?
          </h3>

          <p className="text-center text-gray-500 mt-2 max-w-md mx-auto">
            We provide beautiful, customizable and fully editable biodata templates for FREE.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="text-pink-600 text-4xl mb-3">🎁</div>
              <h4 className="text-lg font-bold text-gray-800">100% Free Templates</h4>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                All biodata templates are completely free to use—no signup required.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="text-blue-600 text-4xl mb-3">✨</div>
              <h4 className="text-lg font-bold text-gray-800">Modern & Clean Designs</h4>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Professionally crafted templates that look elegant and beautiful.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="text-green-600 text-4xl mb-3">⚡</div>
              <h4 className="text-lg font-bold text-gray-800">Fast PNG Download</h4>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Download your biodata instantly in high-quality PNG format.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="text-purple-600 text-4xl mb-3">📱</div>
              <h4 className="text-lg font-bold text-gray-800">Mobile Friendly</h4>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Create biodata easily on any mobile device without app installation.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="text-orange-600 text-4xl mb-3">🎨</div>
              <h4 className="text-lg font-bold text-gray-800">Fully Customizable</h4>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Edit every section — personal info, family details, photos & more.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="text-red-600 text-4xl mb-3">⭐</div>
              <h4 className="text-lg font-bold text-gray-800">Premium Look</h4>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Stand out with premium designs that impress everyone instantly.
              </p>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
