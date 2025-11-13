"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaEdit, FaPalette, FaDownload, FaGlobe, FaHeart } from "react-icons/fa";
import BiodataForm from "../Biodata-Form/page";
import { useLanguageContext } from "../hooks/useLanguage";

export default function HomePage() {
  const { language, setLanguage, translations, setFolder } = useLanguageContext();
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load home page translations
    setFolder("homeLang");
  }, [language, setFolder]);

  const templates = [
    { id: 1, name: "Classic", img: "/templates/template1.jpg" },
    { id: 2, name: "Modern", img: "/templates/template2.jpg" },
    { id: 4, name: "Minimal 1", img: "/templates/template4.jpg" },
    { id: 5, name: "Minimal 2", img: "/templates/template5.jpg" },
    { id: 6, name: "Minimal 3", img: "/templates/template6.jpg" },
  ];

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand Section */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <FaHeart className="text-white text-sm" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-semibold text-gray-800">
                  Marriage Biodata Maker
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">
                  Create Professional Biodatas
                </p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100">
                <FaGlobe className="text-gray-600 text-xs" />
                <select
                  className="appearance-none bg-transparent border-none outline-none cursor-pointer text-xs font-medium text-gray-700"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.25rem center",
                    backgroundSize: "0.75rem",
                    paddingRight: "1.25rem",
                  }}
                >
                  <option value="en" className="text-gray-900">
                    English
                  </option>
                  <option value="mr" className="text-gray-900">
                    मराठी
                  </option>
                  <option value="hi" className="text-gray-900">
                    हिन्दी
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-10 gap-10">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            {translations?.headerTitle || "The Ultimate Marriage Biodata Maker"}
          </h2>
          <p className="text-lg text-gray-600">
            {translations?.headerDesc || "Create beautiful biodatas easily"}
          </p>

          {/* FEATURES */}
          <div className="space-y-1">
            {translations?.features?.map((f: string, i: number) => (
              <p key={i} className="text-gray-700 font-medium">
                ✅ {f}
              </p>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={scrollToForm}
            className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg font-medium"
          >
            {translations?.createBiodataBtn || "Create Biodata Now"}
          </button>

          <p className="text-gray-500 mt-3">
            {1000} {translations?.biodatasCount || "biodatas created today"}
          </p>
        </div>

        <div className="flex-1 text-center">
          <img
            src="/Images/homePageImage.jpg"
            alt="Marathi Wedding Couple"
            className="max-w-full rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* ===== INFO SECTION ===== */}
      <section className="bg-gray-50 px-6 py-10 text-center">
        <h3 className="text-2xl font-semibold mb-2">
          {translations?.biodataInfoTitle || "Why Create Biodata?"}
        </h3>
        <p className="text-gray-600">
          {translations?.biodataInfoDesc || "Create marriage biodata quickly and easily."}
        </p>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="px-6 py-10 bg-white">
        <h2 className="text-center text-3xl font-semibold mb-6 text-gray-800">
          {translations?.howItWorksheading || "How It Works"}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          {translations?.howItWorks?.map((step: any, i: number) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
            >
              <div className="text-3xl text-blue-600 mb-2 flex justify-center">
                {i === 0 ? <FaEdit /> : i === 1 ? <FaPalette /> : <FaDownload />}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section ref={formRef} className="px-2 py-10 bg-gray-50">
        <BiodataForm />
      </section>
    </main>
  );
}
