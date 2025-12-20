"use client";

import { useEffect, useState } from "react";
import { useLanguageContext } from "../hooks/useLanguage";
import { FaMedal } from "react-icons/fa";

const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "mr", label: "मराठी" },
    { code: "hi", label: "हिन्दी" },
];

export default function Header() {
    const { language, setLanguage } = useLanguageContext();
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [lastSelectedLang, setLastSelectedLang] = useState("");

    useEffect(() => setMounted(true), []);

    const handleLanguageChange = (code: string) => {
        if (code === language) {
            setShowLangMenu(false);
            return;
        }
        setLanguage(code);
        setLastSelectedLang(code);
        setShowLangMenu(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1500);
    };

    const getToastMessage = () => {
        switch (lastSelectedLang) {
            case "mr":
                return "मराठी निवडली! तुमचा सुंदर बायोडाटा तयार करायला आता सुरुवात करा. ✨";
            case "hi":
                return "हिंदी चुनी गई! अपना शानदार बायोडाटा बनाना अभी शुरू करें। ✨";
            default:
                return "English selected! You're all set to create your professional biodata. ✨";
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 pl-0">
                <div className="h-16 flex items-center justify-between">

                    {/* LEFT — Logo + Titles */}
                    <div className="flex items-center gap-2">

                        {/* Logo Box */}
                        {/* Logo */}
                        <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg hover:scale-110 ml-1 transition-transform duration-300">
                            <FaMedal className="text-white text-2xl sm:text-3xl" />
                        </div>

                        {/* Desktop Title */}
                        <div className="hidden sm:flex flex-col leading-tight ml-1">
                            <h1 className="text-xl md:text-2xl font-black bg-clip-text text-transparent 
                                bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 tracking-tight">
                                Biodata Maker
                            </h1>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Premium Designs</p>
                        </div>

                        {/* Mobile Title */}
                        <div className="sm:hidden flex flex-col leading-tight ml-1">
                            <span className="text-lg font-black bg-gradient-to-r bg-clip-text text-transparent
                                from-pink-600 to-purple-600 tracking-tight">
                                Biodata Maker
                            </span>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">100% Free • Fast</p>
                        </div>
                    </div>

                    {/* RIGHT — Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200
                               transition flex items-center gap-2 shadow-sm"
                        >
                            {mounted ? (
                                <span className="flex items-center gap-2">
                                    🌐 {LANGUAGES.find((l) => l.code === language)?.label}
                                </span>
                            ) : (
                                "Loading..."
                            )}
                        </button>

                        {/* Dropdown */}
                        {showLangMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                                {LANGUAGES.map((l) => (
                                    <button
                                        key={l.code}
                                        onClick={() => handleLanguageChange(l.code)}
                                        className={`w-full text-left px-4 py-2 text-sm transition 
                                            ${language === l.code
                                                ? "bg-pink-50 text-pink-700 font-semibold"
                                                : "hover:bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Language Change Toast - Compact & Responsive */}
            {showToast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-4 w-full flex justify-center animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-white/95 backdrop-blur-md text-gray-900 border border-pink-100 py-3 px-5 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] flex items-center gap-3 w-fit max-w-full">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 text-lg shadow-sm">
                            ✨
                        </div>
                        <p className="text-sm font-bold leading-tight text-gray-800">
                            {getToastMessage()}
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
}
