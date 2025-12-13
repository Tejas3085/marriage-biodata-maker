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

    useEffect(() => setMounted(true), []);

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 pl-0">
                <div className="h-16 flex items-center justify-between">

                    {/* LEFT — Logo + Titles */}
                    <div className="flex items-center gap-2">

                        {/* Logo Box */}
                                                {/* Logo */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg hover:scale-105 ml-1 transition-transform duration-300">
                            <FaMedal className="text-white text-2xl sm:text-3xl" />

</div>
                        {/* Desktop Title */}
                        <div className="hidden sm:flex flex-col leading-tight">
                            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent 
                                bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                                Create Biodata
                            </h1>
                            <p className="text-sm text-gray-600">Make It Yours, Fast</p>
                        </div>

                        {/* Mobile Title */}
                        <div className="sm:hidden flex flex-col leading-tight" style={{ fontFamily: "Arial" }}>
                            <span className="text-base font-semibold bg-gradient-to-r bg-clip-text text-transparent
                                from-pink-600 to-purple-600">
                                Free Biodata Maker
                            </span>
                            <p className="text-[11px] text-gray-500">Beautiful Biodata, Effortlessly.</p>
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
                                        onClick={() => {
                                            setLanguage(l.code);
                                            setShowLangMenu(false);
                                        }}
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
        </header>
    );
}
