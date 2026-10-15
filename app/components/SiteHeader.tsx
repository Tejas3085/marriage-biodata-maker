"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguageContext } from "../hooks/useLanguage";
import { ChevronDown, Check, Globe } from "lucide-react";

const LANGUAGES = [
    { code: "en", label: "English", name: "English" },
    { code: "hi", label: "हिन्दी", name: "Hindi" },
    { code: "mr", label: "मराठी", name: "Marathi" },
    { code: "ta", label: "தமிழ்", name: "Tamil" },
    { code: "te", label: "తెలుగు", name: "Telugu" },
    { code: "bn", label: "বাংলা", name: "Bengali" },
    { code: "gu", label: "ગુજરાતી", name: "Gujarati" },
    { code: "kn", label: "ಕನ್ನಡ", name: "Kannada" },
    { code: "pa", label: "ਪੰਜਾਬੀ", name: "Punjabi" },
];

export default function SiteHeader() {
    const { language, setLanguage } = useLanguageContext();
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [lastSelectedLang, setLastSelectedLang] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowLangMenu(false);
            }
        }
        if (showLangMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showLangMenu]);

    const handleLanguageChange = (code: string) => {
        if (code === language) {
            setShowLangMenu(false);
            return;
        }
        setLanguage(code);
        setLastSelectedLang(code);
        setShowLangMenu(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1800);
    };

    const getToastMessage = () => {
        switch (lastSelectedLang) {
            case "mr":
                return "मराठी निवडली — चला तुमचा बायोडाटा तयार करूया.";
            case "hi":
                return "हिंदी चुनी गई — चलिए अपना बायोडाटा बनाते हैं।";
            default:
                return "English selected — you're ready to create your biodata.";
        }
    };

    const scrollTo = (id: string) => {
        // Section ids live on the homepage — from any other page, go home first.
        if (isHome) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            router.push(`/#${id}`);
        }
    };

    const goHome = () => {
        if (isHome) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            router.push("/");
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
            {/* thin top accent */}
            <div className="h-[2px] w-full bg-gradient-to-r from-rose-900 via-rose-700 to-amber-600" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="h-[68px] flex items-center justify-between gap-4">

                    {/* LEFT — Brand */}
                    <button onClick={goHome} className="flex items-center gap-3 text-left group" aria-label="Go to homepage">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-900 text-white shadow-sm group-hover:bg-rose-800 transition-colors">
                            <span className="font-display text-xl leading-none pt-[2px]">श्री</span>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[17px] font-semibold tracking-tight text-slate-900">
                                Biodata Maker
                            </span>
                            <span className="text-xs font-medium tracking-[0.14em] uppercase text-slate-500 mt-1">
                                Marriage • Free • Premium
                            </span>
                        </div>
                    </button>

                    {/* CENTER — Nav (desktop) */}
                    <nav className="hidden md:flex items-center gap-1 text-[14px] font-medium text-slate-600">
                        <button onClick={() => scrollTo("templates")} className="px-3.5 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition">Templates</button>
                        <button onClick={() => scrollTo("how-it-works")} className="px-3.5 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition">How it works</button>
                        <button onClick={() => scrollTo("why-us")} className="px-3.5 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition">Why us</button>
                        <button onClick={() => scrollTo("create")} className="px-3.5 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition">Create</button>
                    </nav>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2.5">
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowLangMenu(!showLangMenu)}
                                className="h-12 px-3.5 rounded-full text-[13.5px] font-medium bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition flex items-center gap-2 text-slate-700"
                                aria-haspopup="listbox"
                                aria-expanded={showLangMenu}
                            >
                                <Globe className="w-4 h-4 text-slate-500" />
                                {mounted ? (
                                    <span>{LANGUAGES.find((l) => l.code === language)?.label}</span>
                                ) : (
                                    <span className="w-12 h-4 bg-slate-100 animate-pulse rounded" />
                                )}
                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showLangMenu ? "rotate-180" : ""}`} />
                            </button>

                            {showLangMenu && (
                                <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 grid grid-cols-2 gap-0.5" role="listbox" aria-label="Choose language">
                                    {LANGUAGES.map((l) => {
                                        const active = language === l.code;
                                        return (
                                            <button
                                                key={l.code}
                                                onClick={() => handleLanguageChange(l.code)}
                                                role="option"
                                                aria-selected={active}
                                                className={`text-left px-3 py-2 rounded-lg transition ${active
                                                        ? "bg-rose-50 text-rose-900"
                                                        : "hover:bg-slate-50 text-slate-700"
                                                    }`}
                                            >
                                                <span className="flex items-center justify-between gap-1">
                                                    <span className={`block text-[13.5px] leading-tight ${active ? "font-semibold" : "font-medium"}`}>{l.label}</span>
                                                    {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                                                </span>
                                                <span className="block text-[11px] leading-tight text-slate-400 mt-0.5">{l.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => scrollTo("create")}
                            className="hidden sm:inline-flex h-12 items-center px-5 rounded-full bg-rose-900 text-white text-[13.5px] font-semibold hover:bg-rose-800 transition-colors shadow-sm"
                        >
                            Create Free
                        </button>
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-4 w-full flex justify-center pointer-events-none">
                    <div className="bg-rose-900 text-white py-2.5 px-5 rounded-full shadow-lg flex items-center gap-2.5 w-fit max-w-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <p className="text-[13px] font-medium">
                            {getToastMessage()}
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
}
