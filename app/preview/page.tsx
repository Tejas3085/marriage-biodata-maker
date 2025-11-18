"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
    { id: 1, name: "Classic", img: "/templates/template1.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.15, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#872341", sectionTitleColor: "#184578" },
    { id: 2, name: "Elegant 1", img: "/templates/template2.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#6C3483", sectionTitleColor: "#197278" },
    { id: 3, name: "Elegant 2", img: "/templates/template3.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#B71C1C", sectionTitleColor: "#3366AA" },
    { id: 4, name: "Elegant 3", img: "/templates/template4.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#B3541A", sectionTitleColor: "#38725E" },
    { id: 5, name: "Elegant 4", img: "/templates/template5.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },

    { id: 6, name: "Elegant 5", img: "/templates/template6.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 7, name: "Elegant 6", img: "/templates/template7.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 8, name: "Elegant 7", img: "/templates/template8.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 9, name: "Elegant 8", img: "/templates/template9.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 10, name: "Elegant 9", img: "/templates/template10.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 11, name: "Elegant 10", img: "/templates/template11.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 12, name: "Elegant 11", img: "/templates/template12.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 13, name: "Elegant 12", img: "/templates/template13.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 14, name: "Elegant 13", img: "/templates/template14.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 15, name: "Elegant 14", img: "/templates/template15.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 16, name: "Elegant 15", img: "/templates/template16.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 17, name: "Elegant 16", img: "/templates/template17.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 18, name: "Elegant 17", img: "/templates/template18.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 19, name: "Elegant 18", img: "/templates/template19.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
    { id: 20, name: "Elegant 19", img: "/templates/template20.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.05, labelsLeftPadding: 0.10, labelFontSize: 0.015, godTitleColor: "#1a237e", sectionTitleColor: "#9c3147" },
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

  function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = String(text).split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + (n === words.length - 1 ? "" : " ");
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        ctx.fillText(line.trim(), x, y);
        line = words[n] + " ";
        y += lineHeight * 1.1; // slightly bigger spacing
      } else line = testLine;
    }
    ctx.fillText(line.trim(), x, y);
    return y + lineHeight * 1.1;
  }

  const sanitizeFileName = (name: string) => name.replace(/[^a-z0-9]/gi, "_");

  const drawBiodata = async (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!formData || !selectedTemplate) return;
    // Background
    ctx.fillStyle = selectedTemplate.backgroundColor || "#fff";
    ctx.fillRect(0, 0, width, height);

    // Template frame
    const frameImg = await loadImage(selectedTemplate.img);
    if (frameImg.src) ctx.drawImage(frameImg, 0, 0, width, height);

    let y = height * 0.05;

    // God Photo
    if (formData.godPhoto) {
      const godImg = await loadImage(formData.godPhoto);
      const godPhotoHeight = width * 0.10;
      ctx.drawImage(godImg, (width - godPhotoHeight) / 2, y, godPhotoHeight, godPhotoHeight);
      y += godPhotoHeight + 20;
    } else y += 10;

    // God Title
    if (formData.godTitle) {
      const godTitleFontSize = 18;
      ctx.font = `700 ${godTitleFontSize}px "Playfair Display", serif`;
      ctx.fillStyle = selectedTemplate.godTitleColor || "#872341";
      ctx.textAlign = "center";
      ctx.fillText(formData.godTitle, width / 2, y);
      y += godTitleFontSize + 5;
    }

    // User Photo
    let photoWidth = 0, photoHeight = 0, photoX = 0, photoY = 0;
    if (formData.photo) {
      const userImg = await loadImage(formData.photo);
      console.log('userImg: ', userImg);
      photoWidth = width * 0.18;
      photoHeight = photoWidth * 1.2;
      photoX = width - photoWidth - width * 0.06;
      photoY = y;
      ctx.fillStyle = "#fff";
      ctx.fillRect(photoX - 4, photoY - 4, photoWidth + 5, photoHeight + 5);
      ctx.drawImage(userImg, photoX, photoY, photoWidth, photoHeight);
    }

    // Sections
    const sections = [formData.personalInfo, formData.familyInfo, formData.contactInfo].filter(Boolean);
    const totalFields = sections.reduce((sum, sec) => sum + (sec?.fields.length || 0), 0);
    const sectionCount = sections.length || 1;
    const paddingBottom = 40;
    let lineHeight = totalFields > 0 ? (height - y - paddingBottom) / (totalFields + sectionCount * 2 + 1) : 22;
    lineHeight = Math.max(12, Math.min(22, lineHeight));

    const sectionTitleFontSize = Math.max(12, lineHeight * 0.9);
    const labelFontSize = Math.max(10, lineHeight * 0.75);
    const valueFontSize = Math.max(10, lineHeight * 0.75);

    const labelX = width * (selectedTemplate.labelsLeftPadding ?? 0.12);
    const colonX = width * 0.30;
    const valueX = colonX + 12;

    sections.forEach((sec, idx) => {
      if (!sec) return;

      // Check if ANY field has BOTH label + value
      const validFields = sec.fields.filter(f =>
        f.label?.trim() !== "" &&
        f.value?.trim() !== ""
      );

      // If no field has both label & value -> skip whole section
      if (validFields.length === 0) return;

      // --- Section Title ---
      ctx.fillStyle = selectedTemplate.sectionTitleColor || "#000";
      ctx.font = `600 ${sectionTitleFontSize}px "Merriweather", serif`;
      ctx.textAlign = "center";
      ctx.fillText(sec.title || "", width / 2, y);

      y += sectionTitleFontSize + lineHeight * 0.2;

      // --- Fields ---
      ctx.textAlign = "left";
      validFields.forEach(f => {
        // LABEL (bold)
        ctx.fillStyle = selectedTemplate.textColor || "#000";
        ctx.font = `600 ${labelFontSize}px "Poppins", sans-serif`;

        const safeRight = photoWidth ? photoX - 16 : width - 40;
        ctx.fillText(f.label, labelX, y);

        // colon
        ctx.fillText(":", colonX, y);

        // VALUE (semi-bold)
        ctx.font = `600 ${labelFontSize}px "Poppins", sans-serif`;
        y = wrapText(ctx, f.value, valueX, y, safeRight - valueX, lineHeight);
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
                style={{ height: isMobile ? "50vh" : "auto", maxHeight: "1100px", maxWidth: "400px" }}
              />
            </div>

            <div
              className="
    fixed bottom-1 left-1/2 -translate-x-1/2 
    w-[95%] md:w-auto 
    px-4 py-3 
    bg-white/80 backdrop-blur-md 
    rounded-2xl shadow-xl border border-gray-200
    flex gap-4 items-center justify-center
    z-50
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
    bg-pink-600 text-white font-semibold 
    rounded-xl shadow-md 
    hover:bg-pink-700 hover:shadow-lg 
    transition-all duration-200
    text-sm sm:text-base md:text-lg
  "
              >
                Download PNG
              </button>

            </div>

          </div>

          <div className="flex-1 bg-white shadow-sm rounded-xl p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-700 text-center">Choose Template</h2>
            <div className="flex md:hidden gap-2 py-2 overflow-x-auto scroll-smooth scrollbar-hide">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`w-20 cursor-pointer border rounded-lg overflow-hidden flex-shrink-0 transition-transform hover:scale-105 ${tpl.id === selectedTemplate?.id ? "border-pink-600 ring-1 ring-pink-300" : "border-none"}`}
                >
                  <img src={tpl.img} alt={tpl.name} className="w-full h-20 object-contain bg-gray-100" />
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
        hover:shadow-lg hover:-translate-y-1 hover:border-pink-400 
        ${tpl.id === selectedTemplate?.id ? "border-pink-500 ring-2 ring-pink-300" : "border-gray-200"}
      `}
                >
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 px-3 py-3">
                    <img
                      src={tpl.img}
                      alt={tpl.name}
                      className="w-full h-full object-contain rounded-md"
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
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800 text-center">
            Why Choose Our Biodata Maker?
          </h3>

          <p className="text-center text-gray-500 mt-2 max-w-md mx-auto">
            We provide beautiful, customizable and fully editable biodata templates for FREE.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* Card 1 */}
            <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100">
              <div className="text-pink-600 text-3xl mb-2">🎁</div>
              <h4 className="text-lg font-semibold text-gray-800">100% Free Templates</h4>
              <p className="text-sm text-gray-600 mt-1">
                All biodata templates are completely free to use—no signup required.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100">
              <div className="text-blue-600 text-3xl mb-2">✨</div>
              <h4 className="text-lg font-semibold text-gray-800">Modern & Clean Designs</h4>
              <p className="text-sm text-gray-600 mt-1">
                Professionally crafted templates that look elegant and beautiful.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100">
              <div className="text-green-600 text-3xl mb-2">⚡</div>
              <h4 className="text-lg font-semibold text-gray-800">Fast PNG Download</h4>
              <p className="text-sm text-gray-600 mt-1">
                Download your biodata instantly in high-quality PNG format.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100">
              <div className="text-purple-600 text-3xl mb-2">📱</div>
              <h4 className="text-lg font-semibold text-gray-800">Mobile Friendly</h4>
              <p className="text-sm text-gray-600 mt-1">
                Create biodata easily on any mobile device without app installation.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100">
              <div className="text-orange-600 text-3xl mb-2">🎨</div>
              <h4 className="text-lg font-semibold text-gray-800">Fully Customizable</h4>
              <p className="text-sm text-gray-600 mt-1">
                Edit every section — personal info, family details, photos & more.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all mb-[20%] border border-gray-100">
              <div className="text-red-600 text-3xl mb-2">⭐</div>
              <h4 className="text-lg font-semibold text-gray-800">Premium Look</h4>
              <p className="text-sm text-gray-600 mt-1">
                Stand out with premium designs that impress everyone instantly.
              </p>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
