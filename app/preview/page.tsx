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
  userPhotomarginTop?: number;
  godMarginTop: number;
  marginBottom?: number;
  labelMarginBottom?: number;
  godPhotoSize?: number;
}

export default function PreviewPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);
  const { language, setLanguage } = useLanguageContext();

  const templates: Template[] = [
    // ELEGANT BASE (1, 2, 3)
    { id: 1, name: "Elegant", img: "/templates/t1.jpg", textColor: "#212121ff", backgroundColor: "#fff", lineHeightFactor: 1.26, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#ae239cff", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.07, labelMarginBottom: 0 },

    { id: 2, name: "Elegant", img: "/templates/t2.jpg", textColor: "#212121ff", backgroundColor: "#fff", lineHeightFactor: 1.30, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4155b8ff", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // ELEGANT 1 SERIES
    { id: 4, name: "Elegant 1", img: "/templates/t4.jpg", textColor: "#212121ff", backgroundColor: "#fff", lineHeightFactor: 1.27, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.08, labelMarginBottom: 0 },

    { id: 5, name: "Elegant 1", img: "/templates/t5.jpg", textColor: "#212121ff", backgroundColor: "#fff", lineHeightFactor: 1.27, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.10, labelMarginBottom: 0 },

    { id: 6, name: "Elegant 1", img: "/templates/t6.jpg", textColor: "#212121ff", backgroundColor: "#fff", lineHeightFactor: 1.30, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.05, labelMarginBottom: 0 },

    // ELEGANT 2
    { id: 7, name: "Elegant 2", img: "/templates/t7.jpg", textColor: "#212121ff", backgroundColor: "#fff", lineHeightFactor: 1.27, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // ELEGANT 3
    { id: 8, name: "Elegant 3", img: "/templates/t8.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.10, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4B0082", sectionTitleColor: "#CD853F", userPhotomarginLeft: 0.08, labelMarginBottom: 0 },

    // ELEGANT 4
    { id: 9, name: "Elegant 4", img: "/templates/t9.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.10, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // ELEGANT 5
    { id: 10, name: "Elegant 5", img: "/templates/t10.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.22, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // ELEGANT 6
    { id: 11, name: "Elegant 6", img: "/templates/t11.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#191970", sectionTitleColor: "#7eb0e1", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // ELEGANT 7
    { id: 12, name: "Elegant 7", img: "/templates/t12.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.10, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#8B0000", sectionTitleColor: "#DAA520", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // ELEGANT 8
    { id: 13, name: "Elegant 8", img: "/templates/t13.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.10, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#00008B", sectionTitleColor: "#B8860B", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // ELEGANT 9
    { id: 14, name: "Elegant 9", img: "/templates/t14.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.15, godMarginTop: 0.05, labelsLeftPadding: 0.13, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.10, labelMarginBottom: 0 },

    // ELEGANT 10
    { id: 15, name: "Elegant 10", img: "/templates/t15.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.10, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // ELEGANT 11
    { id: 16, name: "Elegant 11", img: "/templates/t16.jpg", textColor: "#212121ff", backgroundColor: "#fff", lineHeightFactor: 1.10, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#3f9e5bff", sectionTitleColor: "#ccc310ff", userPhotomarginLeft: 0.07, labelMarginBottom: 0 },

    // ELEGANT 12
    { id: 17, name: "Elegant 12", img: "/templates/t17.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.28, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#212121", sectionTitleColor: "#757575", userPhotomarginLeft: 0.07, labelMarginBottom: 0 },

    // ELEGANT 13
    { id: 18, name: "Elegant 13", img: "/templates/t18.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.12, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // ELEGANT 14 (t19)
    { id: 19, name: "Elegant 14", img: "/templates/t19.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.25, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.09, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.06, labelMarginBottom: 0 },

    // ELEGANT 15
    { id: 20, name: "Elegant 15", img: "/templates/t20.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.22, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.13, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.06, labelMarginBottom: 0 },

    // ELEGANT 16
    { id: 21, name: "Elegant 16", img: "/templates/t21.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.22, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.07, labelMarginBottom: 0 },

    // ELEGANT 17
    { id: 22, name: "Elegant 17", img: "/templates/t22.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 23, name: "Elegant 17", img: "/templates/t23.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 24, name: "Elegant 17", img: "/templates/t24.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 25, name: "Elegant 17", img: "/templates/t25.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 26, name: "Elegant 17", img: "/templates/t26.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 27, name: "Elegant 17", img: "/templates/t27.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 28, name: "Elegant 17", img: "/templates/t28.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 29, name: "Elegant 17", img: "/templates/t29.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 30, name: "Elegant 17", img: "/templates/t30.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

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
  }, [language]);

  // Cache loaded images so navigating templates or re-rendering doesn't re-download them
  const imageCacheRef = useRef<Map<string, Promise<HTMLImageElement>>>(new Map());
  // Offscreen measurement canvas reused to avoid re-allocating a canvas object frequently
  const measureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  // Debounce/RAF helpers for scheduling canvas draws
  const rafRef = useRef<number | null>(null);
  const loadImage = (src: string) => {
    if (!src) return Promise.resolve<HTMLImageElement>(document.createElement("img"));
    const cache = imageCacheRef.current;
    // cache key is the original src string
    if (cache.has(src)) return cache.get(src)!;

    // Build variants to try: prefer AVIF, then WEBP, then original
    const tryVariants = (url: string) => {
      const ext = url.substring(url.lastIndexOf('.'));
      const base = url.substring(0, url.lastIndexOf('.'));
      console.log('base: ', base);
      return [`${base}.jpg`, `${base}.png`, `${base}${ext}`];
    };

    const variants = tryVariants(src);

    const promise = new Promise<HTMLImageElement>((resolve) => {
      let loaded = false;
      const tryNext = (index: number) => {
        if (index >= variants.length) {
          // no variant loaded; return empty image element
          return resolve(document.createElement("img"));
        }
        const url = variants[index];
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          loaded = true;
          resolve(img);
        };
        img.onerror = () => {
          // try next variant
          tryNext(index + 1);
        };
        img.src = url;
      };
      tryNext(0);
    });

    cache.set(src, promise);
    return promise;
  };

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    draw: boolean = true,
    spacingMultiplier?: number
  ) {
    // Support explicit newlines: treat each paragraph (split by \n) separately
    const paragraphs = String(text).split(/\r?\n/);
    let cursorY = y;

    // Spacing configuration
    const defaultLineSpacing = 1.02; // spacing between wrapped lines
    const lineSpacing = spacingMultiplier ?? defaultLineSpacing;
    const lineBreakGap = Math.max(0, lineHeight * 0.01); // small gap for single newline (user Enter)
    const paragraphGapLarge = Math.max(0, lineHeight * 0.45); // larger gap for empty-line paragraph separation

    for (let p = 0; p < paragraphs.length; p++) {
      const para = paragraphs[p];

      // Empty paragraph (caused by double newline) -> large paragraph gap
      if (para === "") {
        cursorY += paragraphGapLarge;
        continue;
      }

      // Build lines for this paragraph
      const words = para.split(" ");
      const lines: string[] = [];
      let current = "";

      for (let w = 0; w < words.length; w++) {
        const word = words[w];
        const sep = current ? " " : "";
        const test = current + sep + word;
        const testWidth = ctx.measureText(test).width;

        if (testWidth <= maxWidth) {
          current = test;
          continue;
        }

        if (current) {
          lines.push(current);
          current = word;
          if (ctx.measureText(current).width > maxWidth) {
            // fall through to breaking long word
          } else {
            continue;
          }
        }

        // Break a very long word into chunks by characters
        let chunk = "";
        for (let i = 0; i < word.length; i++) {
          chunk += word[i];
          const wWidth = ctx.measureText(chunk).width;
          if (wWidth > maxWidth) {
            const pushChunk = chunk.slice(0, -1);
            if (pushChunk) lines.push(pushChunk);
            chunk = word[i];
          }
        }
        if (chunk) current = chunk;
        else current = "";
      }

      if (current) lines.push(current);

      // Draw or measure lines for this paragraph
      for (let i = 0; i < lines.length; i++) {
        const lineText = lines[i];
        if (draw) ctx.fillText(lineText, x, cursorY + i * lineHeight * lineSpacing);
      }

      // advance cursorY by number of wrapped lines
      cursorY = cursorY + lines.length * lineHeight * lineSpacing;

      // If next paragraph exists and is non-empty, add a small lineBreak gap.
      // If next paragraph is empty, the next loop iteration will add a larger paragraph gap.
      if (p < paragraphs.length - 1) {
        const nextPara = paragraphs[p + 1];
        if (nextPara !== "") cursorY += lineBreakGap;
      }
    }

    return cursorY;
  }

  const sanitizeFileName = (name: string) => name.replace(/[^a-z0-9]/gi, "_");

  // Draw only the frame/background (no content). Keeps frame at native size so we can scale content separately.
  const drawFrame = (ctx: CanvasRenderingContext2D, width: number, height: number, frameImg: HTMLImageElement | null) => {
    if (!selectedTemplate) return;
    ctx.fillStyle = selectedTemplate.backgroundColor || "#fff";
    ctx.fillRect(0, 0, width, height);
    if (frameImg && frameImg.src) ctx.drawImage(frameImg, 0, 0, width, height);
  };

  // Draw or measure content (everything except the frame). When dryRun === true we only measure and do not paint.
  const drawBiodataContent = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    config: { fontSize: number; godPhotoSize: number; godTitleSize: number },
    images: { frameImg: HTMLImageElement; godImg: HTMLImageElement | null; userImg: HTMLImageElement | null },
    template: Template, // Accept template as parameter for adjusted labelFontSize
    dryRun: boolean = false
  ) => {
    if (!formData || !template) return 0;

    const { fontSize, godPhotoSize, godTitleSize } = config;
    const { godImg, userImg } = images;

    let y = height * template.godMarginTop;

    // God Photo
    if (godImg) {
      if (!dryRun) {
        ctx.drawImage(godImg, (width - godPhotoSize) / 2, y, godPhotoSize, godPhotoSize);
      }
      // Smaller gap after the god photo: proportional to the photo size + a small absolute min
      y += godPhotoSize + Math.max(6, Math.round(godPhotoSize * 0.30));
    } else {
      y += 20;
    }

    // God Title
    if (formData.godTitle) {
      if (!dryRun) {
        const serifFont = language === "mr" || language === "hi" ? '"Noto Serif", "Noto Sans Devanagari"' : '"Playfair Display", serif';
        ctx.font = `700 ${godTitleSize}px ${serifFont}`;
        ctx.fillStyle = template.godTitleColor || "#872341";
        ctx.textAlign = "center";
        ctx.fillText(formData.godTitle, width / 2, y);
      }
      // smaller proportional gap after God Title
      // y += godTitleSize + Math.max(4, Math.round(godTitleSize * 0.001));
      y += godTitleSize + 0.01;

    }

    // User Photo
    let photoWidth = 0, photoHeight = 0, photoX = 0, photoY = 0;
    if (userImg) {
      photoWidth = width * 0.18;
      photoHeight = photoWidth * 1.2;
      photoX = width - photoWidth - width * template.userPhotomarginLeft; // more right space
      // Add optional top margin for the user photo. If template sets userPhotomarginTop as
      // a small fractional value (e.g., 0.02) we treat it as fraction of the canvas width.
      // If absent, provide a small default offset relative to photo height.
      const defaultTopOffset = Math.max(4, Math.round(photoHeight * 0.20));
      photoY = y + (typeof template.userPhotomarginTop === 'number'
        ? (template.userPhotomarginTop > 0 && template.userPhotomarginTop < 1
          ? Math.round(width * template.userPhotomarginTop)
          : Math.round(template.userPhotomarginTop))
        : defaultTopOffset);

      if (!dryRun) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(photoX - 4, photoY - 4, photoWidth + 5, photoHeight + 5);
        ctx.drawImage(userImg, photoX, photoY, photoWidth, photoHeight);
      }
    }

    // Sections
    const sections = [formData.personalInfo, formData.familyInfo, formData.contactInfo].filter(Boolean);

    // Calculate line height using the selected template's lineHeightFactor when provided
    const templateLineFactor = template?.lineHeightFactor ?? 1.25;
    // Allow templates to scale line-height, but clamp to reasonable minima/maxima to avoid too-tight or huge gaps
    const lineHeightFactor = Math.max(0.85, Math.min(1.5, templateLineFactor));
    let lineHeight = fontSize * lineHeightFactor; // base multiplier controlled by template

    // Use top baseline so y corresponds to the top of the text block (prevents baseline-descender gaps)
    ctx.textBaseline = "top";

    const sectionTitleFontSize = Math.max(12, lineHeight * 0.9);

    const labelX = width * (template.labelsLeftPadding ?? 0.12);
    // Move colon and value slightly left so values sit closer to labels
    const colonX = width * 0.32;
    const valueX = colonX + 18;

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
        ctx.fillStyle = template.sectionTitleColor || "#000";
        const sectionFont = language === "mr" || language === "hi" ? '"Noto Serif", "Noto Sans Devanagari"' : '"Merriweather", serif';
        ctx.font = `700 ${godTitleSize}px ${sectionFont}`;
        ctx.textAlign = "center";

        // Add professional spacing and visual weight
        const originalLetterSpacing = ctx.letterSpacing;
        ctx.letterSpacing = "1.5px";

        // Subtle shadow for "HD" depth (optional, makes it pop slightly)
        ctx.shadowColor = "rgba(0,0,0,0.1)";
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        ctx.fillText((sec.title || "").toUpperCase(), width / 2, y);

        // Reset context
        ctx.letterSpacing = originalLetterSpacing;
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }

      // Tighten spacing between section title and prior content; use a smaller multiplier
      y += sectionTitleFontSize + lineHeight * 0.2;

      // --- Fields ---
      if (!dryRun) ctx.textAlign = "left";

      validFields.forEach((f: any) => {
        // Normalize/trim values to avoid accidental trailing whitespace/newlines which create extra gaps
        const labelText = (f.label ?? "").toString().trim();
        const valueText = (f.value ?? "").toString().trim();
        const safeRight = photoWidth && y < (photoY + photoHeight + 20)
          ? photoX - 16
          : width - 40;

        const labelMaxWidth = Math.max(40, colonX - labelX - 10);
        const valueMaxWidth = safeRight - valueX;

        // Set fonts (use slightly smaller sizes for labels/values so dense lists fit better)
        ctx.fillStyle = template.textColor || "#000";
        const labelFont = language === "mr" || language === "hi" ? '"Noto Sans Devanagari", "Poppins", sans-serif' : '"Poppins", sans-serif';
        const valueFont = language === "mr" || language === "hi" ? '"Noto Sans Devanagari", "Poppins", sans-serif' : '"Poppins", sans-serif';

        // derive label/value font sizes from the template when provided.
        // Templates currently use a small fractional value (e.g. 0.015) which
        // we interpret as a fraction of the canvas width. If the template
        // provides an absolute px value (>= 1) we accept that as px. Otherwise
        // fall back to a scale of the base fontSize so older templates still work.
        const computeFontFromTemplate = (tplSize?: number, defaultScale = 0.95) => {
          if (typeof tplSize === "number") {
            if (tplSize > 0 && tplSize < 1) {
              // fractional value relative to canvas width
              return Math.max(9, Math.round(width * tplSize));
            }
            if (tplSize >= 1) {
              // explicit px value
              return Math.max(9, Math.round(tplSize));
            }
          }
          return Math.max(9, Math.round(fontSize * defaultScale));
        };

        const labelFontSize = computeFontFromTemplate(template.labelFontSize, 0.98);
        // Keep value size consistent with label size (matches previous behavior)
        const valueFontSize = labelFontSize;
        ctx.textAlign = "left";

        // --- Calculate wrapped label height ---
        ctx.font = `600 ${labelFontSize}px ${labelFont}`;
        const labelHeight = wrapText(ctx, labelText, labelX, y, labelMaxWidth, lineHeight, false);

        // --- Calculate wrapped value height (use slightly tighter spacing for values)
        ctx.font = `600 ${valueFontSize}px ${valueFont}`;
        const valueHeight = wrapText(ctx, valueText, valueX, y, valueMaxWidth, lineHeight, false, 1.0);

        // New Y = lowest point after the tallest column
        const newY = Math.max(labelHeight, valueHeight);

        // ---- NOW DRAW ----
        ctx.font = `600 ${labelFontSize}px ${labelFont}`;
        wrapText(ctx, labelText, labelX, y, labelMaxWidth, lineHeight, true);
        ctx.font = `600 ${valueFontSize}px ${valueFont}`;
        ctx.fillText(":", colonX, y);
        wrapText(ctx, valueText, valueX, y, valueMaxWidth, lineHeight, true, 1);

        // Move to next row
        y = newY + (template.labelMarginBottom || 0);
      });

      y += lineHeight * 0.08;
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

    // Count total fields across all sections to pre-adjust font size
    const sections = [formData.personalInfo, formData.familyInfo, formData.contactInfo].filter(Boolean);
    const totalFields = sections.reduce((count, sec: any) => {
      if (!sec?.fields) return count;
      // Count only fields that have both label and value
      const validFields = sec.fields.filter((f: any) =>
        f.label?.trim() !== "" && f.value?.trim() !== ""
      );
      return count + validFields.length;
    }, 0);

    // --- DYNAMIC CONTINUOUS SCALING ---
    // Instead of fixed tiers, we use a continuous function to calculate the perfect size
    // for ANY number of fields. This ensures consistent bottom spacing.

    const MIN_FIELDS = 18; // Below this, use max spacing
    const MAX_FIELDS = 50; // Above this, use min spacing

    // Clamp count to range
    const clampedCount = Math.max(MIN_FIELDS, Math.min(totalFields, MAX_FIELDS));

    // Calculate interpolation factor 't' (0.0 to 1.0)
    const t = (clampedCount - MIN_FIELDS) / (MAX_FIELDS - MIN_FIELDS);

    // Helper to interpolate between two values
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    // Calculate exact parameters for this specific field count
    let fontSize = lerp(20, 13.5, t);
    // Round to nearest 0.1 for cleaner rendering
    fontSize = Math.round(fontSize * 10) / 10;

    let godPhotoSize = width * lerp(0.13, selectedTemplate.godPhotoSize ?? 0.11, t);
    let godTitleSize = lerp(18.5, 13.5, t);

    // Dynamic Line Height: 1.55 (loose) -> 1.05 (tight)
    const targetLineHeightFactor = lerp(1.55, 1.05, t);

    // Dynamic Label Scale: 100% -> 70%
    const labelScale = lerp(1.0, 0.70, t);

    // Apply calculated values to template
    let adjustedTemplate = {
      ...selectedTemplate,
      lineHeightFactor: targetLineHeightFactor, // Override template default
      labelFontSize: selectedTemplate.labelFontSize
        ? selectedTemplate.labelFontSize * labelScale
        : 0.024 * labelScale
    };

    // Try to fit
    let contentHeight = 0;
    let attempts = 0;
    const bottomPadding = selectedTemplate.marginBottom ?? 40;
    const availableHeight = FIXED_HEIGHT - bottomPadding;

    // Use a single offscreen canvas/context for measuring so we don't disturb the real canvas state
    const measureCanvas = measureCanvasRef.current || document.createElement("canvas");
    measureCanvasRef.current = measureCanvas;
    const measureCtx = measureCanvas.getContext("2d");
    if (!measureCtx) return;
    // Make sure measurement context uses the same textBaseline for accurate line height calculations
    measureCtx.textBaseline = "top";

    while (attempts < 50) { // Increased from 30 to handle extreme cases (50+ fields)
      const config = { fontSize, godPhotoSize, godTitleSize };
      // Measure content height without drawing on the visible canvas
      contentHeight = drawBiodataContent(measureCtx, width, FIXED_HEIGHT, config, images, adjustedTemplate, true);

      if (contentHeight <= availableHeight) {
        break; // Content fits!
      }

      // Calculate how much we're overflowing
      const overflow = contentHeight - availableHeight;
      const overflowRatio = overflow / availableHeight;

      // More aggressive reduction for extreme overflow (50+ fields scenario)
      if (overflowRatio > 0.5) {
        // Severe overflow - reduce more aggressively
        if (fontSize > 6) fontSize -= Math.max(1.0, (fontSize - 6) * 0.12);
        if (godPhotoSize > width * 0.04) godPhotoSize *= 0.88;
        if (godTitleSize > 8) godTitleSize -= Math.max(1.0, (godTitleSize - 8) * 0.10);
      } else if (overflowRatio > 0.2) {
        // Moderate overflow - standard reduction
        if (fontSize > 6) fontSize -= Math.max(0.8, (fontSize - 6) * 0.08);
        if (godPhotoSize > width * 0.04) godPhotoSize *= 0.92;
        if (godTitleSize > 8) godTitleSize -= Math.max(0.8, (godTitleSize - 8) * 0.07);
      } else {
        // Minor overflow - gentle reduction
        if (fontSize > 6) fontSize -= Math.max(0.6, (fontSize - 6) * 0.06);
        if (godPhotoSize > width * 0.04) godPhotoSize *= 0.94;
        if (godTitleSize > 8) godTitleSize -= Math.max(0.6, (godTitleSize - 8) * 0.05);
      }

      // Stop if everything is at minimum already (lowered minimums for extreme cases)
      if (fontSize <= 6 && godPhotoSize <= width * 0.04 && godTitleSize <= 8) {
        // Even at minimum sizes, content doesn't fit - will use scaling as fallback
        break;
      }

      attempts++;
    }

    // Final Draw with devicePixelRatio and optional content scaling so we never overflow the frame
    const dpr = Math.min(devicePixelRatio || 1, 2); // cap DPR to 2 to avoid huge canvas sizes on high-DPI displays
    canvas.width = width * dpr;
    canvas.height = FIXED_HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    // Draw frame at native/full size (so frame artwork is not squashed)
    drawFrame(ctx, width, FIXED_HEIGHT, images.frameImg);

    // CRITICAL: If content still too tall after all iterations, scale it down to fit
    // This is the final safety net that GUARANTEES no overflow, even with 50+ fields
    // Add a small safety margin (0.98) to account for rounding errors
    const safetyMargin = 0.98;
    const finalContentScale = contentHeight > 0 && contentHeight > availableHeight
      ? (availableHeight / contentHeight) * safetyMargin
      : 1;

    const configFinal = { fontSize, godPhotoSize, godTitleSize };

    if (finalContentScale < 1) {
      // Content doesn't fit even at minimum sizes - scale it down
      ctx.save();
      // Center content vertically inside frame
      const scaledHeight = contentHeight * finalContentScale;
      const translateY = (FIXED_HEIGHT - scaledHeight) / 2;
      ctx.translate(0, translateY);
      ctx.scale(finalContentScale, finalContentScale);
      drawBiodataContent(ctx, width, FIXED_HEIGHT, configFinal, images, adjustedTemplate, false);
      ctx.restore();
    } else {
      drawBiodataContent(ctx, width, FIXED_HEIGHT, configFinal, images, adjustedTemplate, false);
    }
  };


  // Always update canvas when data or selected template changes.
  // Keep intersection observer for other performance optimizations, but users expect immediate preview updates when clicking templates.
  // Helper to schedule a single canvas draw via requestAnimationFrame
  const scheduleUpdate = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateCanvas());
  };

  // Always update canvas when template changes (users expect immediate preview changes)
  useEffect(() => {
    if (selectedTemplate) scheduleUpdate();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [selectedTemplate]);

  // Only update when form data changes if the canvas is visible (saves CPU while off-screen)
  useEffect(() => {
    if (formData && isCanvasVisible) scheduleUpdate();
  }, [formData, isCanvasVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsCanvasVisible(entry.isIntersecting);
    }, { root: null, threshold: 0.1 });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [canvasRef]);

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
            {/* <h1
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 
        tracking-wide drop-shadow-sm"
            >
              Choose Your Biodata Template
            </h1> */}

            {/* SUB TEXT */}
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              100% Free • Instant Download • High-Quality PNG Output
            </p>

          </div>

        </div>
      </header>

      <div className="min-h-screen bg-gray-50 pl-4 pr-4 md:p-8">
        {/* <div className="max-w-7xl mx-auto text-center"> */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mt-2">
          <div className="w-full md:w-7/12 flex flex-col items-center relative">
            <div className="bg-white rounded-xl shadow-md w-full flex justify-center mt-0 relative overflow-hidden min-h-[50vh]">
              {/* PREMIUM DESIGN SKELETON - Matched to Template Size */}
              {isTemplateLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md transition-all duration-300">
                  <div
                    className="relative bg-[#fafbfc] rounded-lg overflow-hidden border border-gray-100 shadow-2xl animate-pulse flex flex-col items-center"
                    style={{
                      height: isMobile ? "55vh" : "75vh",
                      maxHeight: "800px",
                      width: isMobile ? "80%" : "50%",
                      maxWidth: "760px",
                    }}
                  >
                    {/* Skeleton Header Section */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-pink-50 rounded-2xl mt-12 mb-6" />
                    <div className="w-1/2 h-4 bg-pink-100/50 rounded-full mb-12" />

                    {/* Skeleton Form Grid */}
                    <div className="w-full px-8 sm:px-12 space-y-6">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex gap-4 items-center">
                          <div className="w-24 h-3 bg-gray-200/60 rounded" />
                          <div className="flex-1 h-3 bg-gray-100/60 rounded" />
                        </div>
                      ))}
                    </div>

                    {/* Pro Shimmer Overlay */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />

                    {/* Status Message */}
                    <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3">
                      <p className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-[0.3em] animate-pulse">
                        Perfecting Layout
                      </p>
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <canvas
                ref={canvasRef}
                className="shadow-inner bg-white mt-5 mb-5 w-[85%] sm:w-[50%] h-[50vh] sm:h-[75vh] max-h-[800px] max-w-[760px] transition-opacity duration-300"
                style={{
                  height: isMobile ? "55vh" : "75vh",
                  maxHeight: "800px",
                  width: isMobile ? "80%" : "50%",
                  maxWidth: "760px",
                  aspectRatio: "auto",
                  opacity: isTemplateLoading ? 0.5 : 1
                }}
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
                bg-linear-to-r from-pink-500 to-rose-600 text-white font-semibold 
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

          <div className="w-full md:w-5/12 bg-white shadow-sm rounded-xl p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Choose Template</h2>
            <div className="flex md:hidden gap-2 py-2 overflow-x-auto scroll-smooth scrollbar-hide">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => {
                    if (selectedTemplate?.id === tpl.id) return;
                    setIsTemplateLoading(true);
                    // Use a timeout to allow the loading state to render before heavy canvas work
                    setTimeout(() => {
                      setSelectedTemplate(tpl);
                      setTimeout(() => setIsTemplateLoading(false), 1000);
                    }, 50);
                  }}
                  className={`
                    w-20 h-20 shrink-0 cursor-pointer rounded-xl overflow-hidden relative transition-all duration-300 transform
                    ${tpl.id === selectedTemplate?.id
                      ? "border-1 border-gray-200 opacity-80"
                      : "border border-gray-200 opacity-80 hover:opacity-100"}
                  `}
                >
                  <NextImage
                    src={tpl.img}
                    alt={tpl.name}
                    fill
                    loading={tpl.id === selectedTemplate?.id ? "eager" : "lazy"}
                    sizes="80px"
                    className="object-contain"
                  />
                  {tpl.id === selectedTemplate?.id && (
                    <>
                      <div className="absolute inset-0   z-0"></div>
                      <div className="absolute top-1 right-1 bg-pink-500 text-white rounded-full p-0.5 shadow-md z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Web: Vertical Scroll Grid */}
            <div className="hidden md:grid max-h-[75vh] overflow-y-auto grid-cols-2 lg:grid-cols-3 gap-6 mt-4 pr-2 custom-scrollbar">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => {
                    if (selectedTemplate?.id === tpl.id) return;
                    setIsTemplateLoading(true);
                    setTimeout(() => {
                      setSelectedTemplate(tpl);
                      setTimeout(() => setIsTemplateLoading(false), 5);
                    }, 50);
                  }}
                  className={`
                    cursor-pointer rounded-xl overflow-hidden bg-white shadow-sm border transition-all duration-300
                    hover:shadow-xl hover:-translate-y-1 hover:border-pink-300 group relative
                    ${tpl.id === selectedTemplate?.id
                      ? "border-pink-500 ring-4 ring-pink-500/10 shadow-lg scale-[1.02]"
                      : "border-gray-100"}
                  `}
                >
                  <div className="w-full aspect-[3/4] relative bg-gray-50">
                    <NextImage
                      src={tpl.img}
                      alt={tpl.name}
                      fill
                      loading={tpl.id === selectedTemplate?.id ? "eager" : "lazy"}
                      sizes="240px"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* <div className="px-3 py-3 text-center bg-gray-50 border-t">
                    <p
                      className={`text-sm font-semibold tracking-wide ${tpl.id === selectedTemplate?.id ? "text-pink-600" : "text-gray-700"
                        }`}
                    >
                      {tpl.name}
                    </p>
                  </div> */}
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
