"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import Link from "next/link";
import { useLanguageContext } from "../hooks/useLanguage";
import { Download, Sparkles, Zap, ArrowLeft, Check, Pencil, Share2, Loader2, BadgeCheck, Printer, FileText, Image as ImageIcon, ChevronDown, Lock } from "lucide-react";
import PayDialog from "../components/PayDialog";
import { getTemplatePrice, hasUnlock, isPremiumTemplate, readUnlocks, saveUnlock, PREMIUM_PRICE_INR } from "./premium";

interface Field { label: string; value: string; }

// Script font per language code (families loaded in app/layout.tsx).
// Identical output to the old inline ternaries for en/hi/mr.
const LANG_FONT_STACKS: Record<string, string> = {
  hi: '"Noto Sans Devanagari", "Inter"',
  mr: '"Noto Sans Devanagari", "Inter"',
  ta: '"Noto Sans Tamil", "Inter"',
  te: '"Noto Sans Telugu", "Inter"',
  bn: '"Noto Sans Bengali", "Inter"',
  gu: '"Noto Sans Gujarati", "Inter"',
  kn: '"Noto Sans Kannada", "Inter"',
  pa: '"Noto Sans Gurmukhi", "Inter"',
};

function langFont(language: string): string {
  const fam = LANG_FONT_STACKS[language];
  return fam ? `${fam}, sans-serif` : '"Inter", sans-serif';
}
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

function DownloadMenu({
  onPng,
  onPdf,
  pngBusy,
  pdfBusy,
  triggerClassName = "",
  label = "Download",
}: {
  onPng: () => void;
  onPdf: () => void;
  pngBusy: boolean;
  pdfBusy: boolean;
  triggerClassName?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open ]);

  const busy = pngBusy || pdfBusy;
  const itemCls =
    "w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-slate-50 active:bg-slate-100 transition disabled:opacity-60";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
        aria-haspopup="dialog"
      >
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {label}
        <ChevronDown className="w-4 h-4 opacity-70" />
      </button>
      {open && createPortal(
        <div
          className="fixed inset-0 z-[80] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Choose download format"
        >
          <button
            type="button"
            aria-label="Close download options"
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-transparent cursor-default"
          />
          <div className="relative mx-auto mt-[10vh] mb-10 w-[calc(100%-2rem)] sm:max-w-sm bg-white rounded-2xl shadow-[0_10px_30px_-12px_rgba(15,23,42,0.25)] border border-slate-100 overflow-hidden">
            <p className="px-5 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Download format
            </p>
            <button
              type="button"
              onClick={() => { setOpen(false); onPng(); }}
              disabled={busy}
              className={itemCls}
            >
              <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                {pngBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4 text-slate-700" />}
              </span>
              <span>
                <span className="block text-[14px] font-semibold text-slate-900">PNG image</span>
                <span className="block text-[12.5px] text-slate-500">HD • WhatsApp &amp; mobile</span>
              </span>
            </button>
            <div className="h-px bg-slate-100 mx-5" />
            <button
              type="button"
              onClick={() => { setOpen(false); onPdf(); }}
              disabled={busy}
              className={itemCls}
            >
              <span className="w-10 h-10 rounded-xl bg-rose-900 flex items-center justify-center shrink-0">
                {pdfBusy ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <FileText className="w-4 h-4 text-white" />}
              </span>
              <span>
                <span className="block text-[14px] font-semibold text-slate-900">PDF document</span>
                <span className="block text-[12.5px] text-slate-500">A4 • print shops</span>
              </span>
            </button>
            <div className="p-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full h-11 rounded-full bg-slate-100 text-slate-700 text-[14px] font-semibold hover:bg-slate-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default function PreviewPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { language } = useLanguageContext();

  // Premium unlocks (persisted per-device in localStorage)
  const [unlockedIds, setUnlockedIds] = useState<number[]>(() => readUnlocks());
  const [payOpen, setPayOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"png" | "pdf" | "share" | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }, []);

  const getFileName = useCallback(() => {
    const raw =
      (formData as any)?.personalInfo?.fields?.[0]?.value ||
      (formData as any)?.personalDetails?.fields?.[0]?.value ||
      "biodata";
    const first = String(raw).split(" ")[0] || "biodata";
    return `${sanitizeFileName(first)}_biodata.png`;
  }, [formData]);

  // Premium gate: free templates download/share directly; premium ones open
  // the pay dialog first and resume the pending action after payment.
  // Reads localStorage live (not state) so post-payment retries can't go stale.
  const guardPremium = useCallback((action: "png" | "pdf" | "share") => {
    const tpl = selectedTemplate;
    if (tpl && isPremiumTemplate(tpl.id) && !hasUnlock(tpl.id)) {
      setPendingAction(action);
      setPayOpen(true);
      return true;
    }
    return false;
  }, [selectedTemplate]);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isDownloading) return;
    if (guardPremium("png")) return;
    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = getFileName();
      link.click();
      showToast("PNG downloaded — check your downloads");
    } finally {
      setTimeout(() => setIsDownloading(false), 600);
    }
  }, [getFileName, isDownloading, showToast, guardPremium]);

  const [isPdfBusy, setIsPdfBusy] = useState(false);

  const handleDownloadPdf = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || isPdfBusy) return;
    if (guardPremium("pdf")) return;
    setIsPdfBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
      const pageW = 210;
      const pageH = 297;
      const margin = 10;
      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2;
      const ratio = canvas.width / canvas.height;
      let w = maxW;
      let h = w / ratio;
      if (h > maxH) {
        h = maxH;
        w = h * ratio;
      }
      const x = (pageW - w) / 2;
      const y = (pageH - h) / 2;
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageW, pageH, "F");
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", x, y, w, h);
      pdf.save(getFileName().replace(/\.png$/i, ".pdf"));
      showToast("PDF downloaded — A4 print-ready");
    } catch {
      showToast("Couldn't create PDF — try PNG instead");
    } finally {
      setIsPdfBusy(false);
    }
  }, [getFileName, isPdfBusy, showToast, guardPremium]);

  const handleShare = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || isSharing) return;
    if (guardPremium("share")) return;
    setIsSharing(true);
    try {
      const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
      const fileName = getFileName();
      if (blob) {
        const file = new File([blob], fileName, { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: "My Marriage Biodata" });
          return;
        }
      }
      // Fallback: open WhatsApp share with text prompt to attach the downloaded PNG
      handleDownload();
      window.open(`https://wa.me/?text=${encodeURIComponent("My marriage biodata is ready — attaching now.")}`, "_blank");
    } catch {
      // user cancelled share — no-op
    } finally {
      setIsSharing(false);
    }
  }, [getFileName, handleDownload, isSharing, guardPremium]);

  const runPendingAction = useCallback(() => {
    const action = pendingAction;
    setPendingAction(null);
    if (action === "pdf") handleDownloadPdf();
    else if (action === "share") handleShare();
    else handleDownload();
  }, [pendingAction, handleDownload, handleDownloadPdf, handleShare]);

  const handlePaid = useCallback(() => {
    if (selectedTemplate) saveUnlock(selectedTemplate.id);
    setUnlockedIds(readUnlocks());
    setPayOpen(false);
    showToast("Premium unlocked — enjoy your design");
    setTimeout(() => runPendingAction(), 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate, showToast]);

  const handleSelectTemplate = useCallback((tpl: Template) => {
    setSelectedTemplate((prev) => {
      if (prev?.id === tpl.id) return prev;
      return prev;
    });
    if (selectedTemplate?.id === tpl.id) return;
    setIsTemplateLoading(true);
    setTimeout(() => {
      setSelectedTemplate(tpl);
      setTimeout(() => setIsTemplateLoading(false), 700);
    }, 60);
  }, [selectedTemplate?.id]);

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
    { id: 31, name: "Elegant 17", img: "/templates/t31.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 32, name: "Elegant 17", img: "/templates/t32.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 33, name: "Elegant 17", img: "/templates/t33.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 34, name: "Elegant 17", img: "/templates/t34.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },
    { id: 35, name: "Elegant 17", img: "/templates/t35.jpg", textColor: "#212121", backgroundColor: "#fff", lineHeightFactor: 1.20, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.11, labelFontSize: 0.028, godTitleColor: "#4A148C", sectionTitleColor: "#FF8F00", userPhotomarginLeft: 0.09, labelMarginBottom: 0 },

    // HERITAGE MAROON-GOLD SERIES (SVG frames, 600x950)
    { id: 36, name: "Royal Maroon", img: "/templates/t36.svg", textColor: "#3b2a1e", backgroundColor: "#fffdf8", lineHeightFactor: 1.22, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.12, labelFontSize: 0.028, godTitleColor: "#7f1d1d", sectionTitleColor: "#b45309", userPhotomarginLeft: 0.10, labelMarginBottom: 0 },
    { id: 37, name: "Golden Mandala", img: "/templates/t37.svg", textColor: "#3b2a1e", backgroundColor: "#fef9ef", lineHeightFactor: 1.22, godMarginTop: 0.05, godPhotoSize: 0.11, labelsLeftPadding: 0.13, labelFontSize: 0.028, godTitleColor: "#7f1d1d", sectionTitleColor: "#b45309", userPhotomarginLeft: 0.11, labelMarginBottom: 0 },

  ];



  useEffect(() => {
    const saved = localStorage.getItem(language);
    if (saved) setFormData(JSON.parse(saved));
    // Honor a design picked on the home carousel or templates page (fallback: first)
    let initial = templates[0];
    try {
      const stored = localStorage.getItem("selected-template");
      if (stored) {
        const match = templates.find((t) => t.id === Number(stored));
        if (match) initial = match;
        localStorage.removeItem("selected-template");
      }
    } catch { /* private mode — use default */ }
    setSelectedTemplate(initial);
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
        const serifFont = language === "mr" || language === "hi" ? '"Noto Serif", "Noto Sans Devanagari"' : langFont(language);
        ctx.font = `700 ${godTitleSize}px ${serifFont}`;
        ctx.fillStyle = template.godTitleColor || "#872341";
        ctx.textAlign = "center";

        ctx.fillText(formData.godTitle, width / 2, y);
      }
      // smaller proportional gap after God Title
      // y += godTitleSize + Math.max(4, Math.round(godTitleSize * 0.001));
      y += godTitleSize - 2;

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
        // Simple Photo Frame
        ctx.fillStyle = "#fff";
        ctx.fillRect(photoX - 3, photoY - 3, photoWidth + 6, photoHeight + 6);
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



    const labelX = width * (template.labelsLeftPadding ?? 0.12);

    // Shared label/value fonts (depend only on language)
    const labelFont = langFont(language);
    const valueFont = langFont(language);

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

    // Adaptive label column: measure the widest label so labels never wrap
    // onto two lines (e.g. "Mobile Number"). Clamped so a very long custom
    // label can't eat the whole value column.
    ctx.font = `600 ${labelFontSize}px ${labelFont}`;
    let maxLabelW = 0;
    sections.forEach((sec: any) => {
      if (!sec?.fields) return;
      sec.fields.forEach((f: any) => {
        const lt = (f.label ?? "").toString().trim();
        const vv = (f.value ?? "").toString().trim();
        if (!lt || !vv) return;
        const w = ctx.measureText(lt).width;
        if (w > maxLabelW) maxLabelW = w;
      });
    });
    const colonX = Math.min(width * 0.45, Math.max(width * 0.30, labelX + maxLabelW + 14));
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
        const sectionFont = language === "mr" || language === "hi" ? '"Noto Serif", "Noto Sans Devanagari"' : langFont(language);
        ctx.font = `700 ${godTitleSize}px ${sectionFont}`;
        ctx.textAlign = "center";

        const titleText = (sec.title || "");
        ctx.globalAlpha = 1.0;
        ctx.fillText(titleText, width / 2, y);
      }

      // Tighten spacing between section title and prior content
      y += godTitleSize + lineHeight * 0.2;

      // --- Fields ---
      if (!dryRun) ctx.textAlign = "left";

      validFields.forEach((f: any) => {
        // Normalize/trim values to avoid accidental trailing whitespace/newlines which create extra gaps
        const labelText = (f.label ?? "").toString().trim();
        const valueText = (f.value ?? "").toString().trim();
        const safeRight = photoWidth && y < (photoY + photoHeight + 20)
          ? photoX - 16
          : width - 40;

        const labelMaxWidth = Math.max(40, colonX - labelX - 6);
        const valueMaxWidth = safeRight - valueX;

        // Set fonts (Outfit is more premium than Poppins)
        ctx.fillStyle = template.textColor || "#000";
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

    // Ultra HD Draw with high resolution scale
    const dpr = Math.max(devicePixelRatio || 1, 3); // Scale to 3x for Ultra HD
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

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-[3px] border-slate-200 border-t-rose-900 animate-spin mb-5" />
          <h2 className="text-[17px] font-semibold text-slate-900 tracking-tight">Preparing your preview</h2>
          <p className="text-slate-500 text-[13px] font-medium mt-1">Rendering high-resolution biodata…</p>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-[#fbfaf8] px-6">
        <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-5 text-slate-400 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-[22px] font-semibold text-slate-900 tracking-tight mb-2">No details found</h2>
        <p className="text-slate-600 text-[14.5px] max-w-sm mb-7 leading-relaxed">
          Fill in your biodata details first — then preview and download your design here.
        </p>
        <button
          onClick={() => router.push("/")}
          className="h-12 px-8 bg-rose-900 text-white text-[14.5px] font-semibold rounded-full hover:bg-rose-800 transition-colors"
        >
          Start creating — it&apos;s free
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf8] text-slate-900 antialiased">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-4 w-full flex justify-center pointer-events-none">
          <div className="bg-rose-900 text-white py-2.5 px-5 rounded-full shadow-lg flex items-center gap-2.5 w-fit max-w-full">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-emerald-300" strokeWidth={3} />
            </span>
            <p className="text-[13px] font-medium">{toast}</p>
          </div>
        </div>
      )}

      {payOpen && selectedTemplate && (
        <PayDialog
          open={payOpen}
          templateId={selectedTemplate.id}
          templateName={selectedTemplate.name}
          priceInr={getTemplatePrice(selectedTemplate.id)}
          onClose={() => { setPayOpen(false); setPendingAction(null); }}
          onPaid={handlePaid}
        />
      )}

      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="h-[2px] w-full bg-gradient-to-r from-rose-900 via-rose-700 to-amber-600" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-[64px] flex items-center justify-between gap-3">
            <button
              onClick={() => {
                localStorage.setItem('page', 'true');
                router.push("/");
              }}
              className="inline-flex items-center gap-2 h-10 pl-2.5 pr-4 rounded-full border border-slate-200 bg-white text-[13.5px] font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Edit details
            </button>

            <div className="text-center leading-tight">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-500">Step 2 of 2 • Preview</p>
              <h1 className="text-[16px] sm:text-[17px] font-semibold tracking-tight">Choose template &amp; download</h1>
            </div>

            <div className="hidden sm:block">
              <DownloadMenu
                onPng={handleDownload}
                onPdf={handleDownloadPdf}
                pngBusy={isDownloading}
                pdfBusy={isPdfBusy}
                triggerClassName="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-rose-900 text-white text-[13.5px] font-semibold hover:bg-rose-800 transition"
              />
            </div>
            {/* mobile: compact download icon keeps bar balanced */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              aria-label="Download biodata PNG"
              className="sm:hidden w-10 h-10 rounded-full bg-rose-900 text-white flex items-center justify-center hover:bg-rose-800 transition disabled:opacity-60"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-32 md:pb-16">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT — preview */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <p className="text-[13.5px] font-semibold truncate">
                    {selectedTemplate ? `Design ${selectedTemplate.id} — ${selectedTemplate.name}` : "Your biodata"}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {selectedTemplate && isPremiumTemplate(selectedTemplate.id) && (
                    unlockedIds.includes(selectedTemplate.id) ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} /> Unlocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                        <Lock className="w-3.5 h-3.5" /> Premium • ₹{PREMIUM_PRICE_INR}
                      </span>
                    )
                  )}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                    <BadgeCheck className="w-3.5 h-3.5" /> HD • A4
                  </span>
                </div>
              </div>

              <div className="relative bg-[#f6f4f1] flex justify-center px-4 py-6 sm:py-8 min-h-[52vh]">
                {isTemplateLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[1px]">
                    <div className="w-10 h-10 rounded-full border-[3px] border-slate-200 border-t-rose-900 animate-spin mb-3" />
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.2em]">Applying design</p>
                  </div>
                )}

                <canvas
                  ref={canvasRef}
                  className="bg-white shadow-[0_16px_50px_-20px_rgba(15,23,42,0.35)] rounded-[4px] w-full max-w-[560px] h-auto mx-auto"
                  style={{
                    aspectRatio: "600 / 950",
                    opacity: isTemplateLoading ? 0.4 : 1,
                  }}
                />
              </div>

              {/* Desktop actions */}
              <div className="hidden md:flex items-center gap-3 px-5 py-4 border-t border-slate-100 bg-white">
                <button
                  onClick={() => {
                    localStorage.setItem('page', 'true');
                    router.push("/");
                  }}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-slate-300 text-[14px] font-semibold text-slate-800 hover:border-rose-900 transition"
                >
                  <Pencil className="w-4 h-4" /> Edit details
                </button>
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-slate-300 text-[14px] font-semibold text-slate-800 hover:border-rose-900 transition disabled:opacity-60"
                >
                  {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />} Share
                </button>
                <div className="flex-1">
                  <DownloadMenu
                    onPng={handleDownload}
                    onPdf={handleDownloadPdf}
                    pngBusy={isDownloading}
                    pdfBusy={isPdfBusy}
                    label="Download HD"
                    triggerClassName="w-full inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-rose-900 text-white text-[14px] font-semibold hover:bg-rose-800 transition"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[12.5px] text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Renders instantly when you switch designs</span>
              <span aria-hidden>•</span>
              <span className="inline-flex items-center gap-1.5"><Printer className="w-3.5 h-3.5" /> Print on A4 for best result</span>
              <span aria-hidden>•</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Free • No watermark</span>
            </div>
          </div>

          {/* RIGHT — template picker */}
          <aside className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-[15px] font-semibold tracking-tight">All designs</h2>
                <span className="text-[12px] font-medium text-slate-500">{templates.length} designs</span>
              </div>
              <p className="text-[12.5px] text-slate-500 mb-4">Tap a design — your details apply automatically.</p>

              {/* Mobile: horizontal strip */}
              <div className="flex lg:hidden gap-3 py-1 overflow-x-auto scroll-smooth scrollbar-hide -mx-1 px-1">
                {templates.map((tpl) => {
                  const active = tpl.id === selectedTemplate?.id;
                  return (
                    <button
                      key={tpl.id}
                      onClick={() => handleSelectTemplate(tpl)}
                      aria-pressed={active}
                      className={`w-24 shrink-0 text-left rounded-xl overflow-hidden border-2 transition ${active ? "border-rose-900 shadow-md" : "border-slate-200 opacity-90 hover:border-slate-400"}`}
                    >
                      <span className="block w-full aspect-[3/4] relative bg-[#f6f4f1]">
                        <NextImage
                          src={tpl.img}
                          alt={`Biodata design ${tpl.id} — ${tpl.name}`}
                          fill
                          loading={active ? "eager" : "lazy"}
                          sizes="96px"
                          className="object-contain p-1.5"
                        />
                        {active && (
                          <span className="absolute top-1.5 right-1.5 bg-rose-900 text-white rounded-full p-1 shadow">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                        )}
                        {isPremiumTemplate(tpl.id) && !unlockedIds.includes(tpl.id) && (
                          <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-0.5 bg-rose-900/90 text-white rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                            <Lock className="h-2.5 w-2.5" /> ₹{PREMIUM_PRICE_INR}
                          </span>
                        )}
                      </span>
                      <span className={`block px-2 py-1.5 text-[11px] font-semibold ${active ? "bg-rose-900 text-white" : "bg-white text-slate-600"}`}>
                        Design {tpl.id}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop: grid */}
              <div className="hidden lg:grid max-h-[62vh] overflow-y-auto grid-cols-3 gap-3 pr-1.5 custom-scrollbar">
                {templates.map((tpl) => {
                  const active = tpl.id === selectedTemplate?.id;
                  return (
                    <button
                      key={tpl.id}
                      onClick={() => handleSelectTemplate(tpl)}
                      aria-pressed={active}
                      className={`text-left rounded-xl overflow-hidden border-2 transition group ${active ? "border-rose-900 shadow-md" : "border-slate-200 hover:border-slate-400"}`}
                    >
                      <span className="block w-full aspect-[3/4] relative bg-[#f6f4f1]">
                        <NextImage
                          src={tpl.img}
                          alt={`Biodata design ${tpl.id} — ${tpl.name}`}
                          fill
                          loading={active ? "eager" : "lazy"}
                          sizes="120px"
                          className="object-contain p-1.5 group-hover:scale-[1.03] transition-transform"
                        />
                        {active && (
                          <span className="absolute top-1.5 right-1.5 bg-rose-900 text-white rounded-full p-1 shadow">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                        )}
                        {isPremiumTemplate(tpl.id) && !unlockedIds.includes(tpl.id) && (
                          <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-0.5 bg-rose-900/90 text-white rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                            <Lock className="h-2.5 w-2.5" /> ₹{PREMIUM_PRICE_INR}
                          </span>
                        )}
                      </span>
                      <span className={`block px-2 py-1.5 text-[11px] font-semibold text-center ${active ? "bg-rose-900 text-white" : "bg-white text-slate-600"}`}>
                        {tpl.id}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3.5 hidden lg:block">
                <p className="text-[12.5px] text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900">Tip:</span> darker borders (Classic Maroon) look rich in print; Minimal Ivory saves ink.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Pro tips — replaces emoji cards */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            { icon: Check, title: "Check before download", desc: "Verify names, dates & phone number — typos are the #1 issue." },
            { icon: Printer, title: "Print on A4", desc: "The PNG is high-resolution and stays crisp in colour or B/W." },
            { icon: Share2, title: "Share smartly", desc: "Send the fresh HD file on WhatsApp — avoid re-forwarded blurry copies." },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-2xl border border-slate-200 p-5 flex gap-3.5">
              <span className="w-10 h-10 rounded-xl bg-rose-900 text-white flex items-center justify-center shrink-0">
                <c.icon className="w-4.5 h-4.5" />
              </span>
              <span>
                <span className="block text-[14px] font-semibold tracking-tight">{c.title}</span>
                <span className="block mt-1 text-[13px] text-slate-600 leading-relaxed">{c.desc}</span>
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-slate-500">
          Want a different style? <Link href="/templates" className="font-semibold text-rose-800 hover:underline">Browse all templates</Link> or <Link href="/guide" className="font-semibold text-rose-800 hover:underline">read the guide</Link>.
        </p>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
        <div className="mx-3 mb-3 rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.4)] p-2.5 flex gap-2.5" style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}>
          <button
            onClick={() => {
              localStorage.setItem('page', 'true');
              router.push("/");
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-12 rounded-xl border border-slate-300 text-[14px] font-semibold text-slate-800"
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={handleShare}
            disabled={isSharing}
            aria-label="Share biodata"
            className="w-12 h-12 rounded-xl border border-slate-300 flex items-center justify-center text-slate-800 disabled:opacity-60"
          >
            {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
          </button>
          <div className="flex-[1.4]">
            <DownloadMenu
              onPng={handleDownload}
              onPdf={handleDownloadPdf}
              pngBusy={isDownloading}
              pdfBusy={isPdfBusy}
              label="Download"
              triggerClassName="w-full inline-flex items-center justify-center gap-1.5 h-12 rounded-xl bg-rose-900 text-white text-[14px] font-semibold"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
