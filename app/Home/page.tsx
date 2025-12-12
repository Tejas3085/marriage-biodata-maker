"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaEdit,
  FaPalette,
  FaDownload,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import BiodataForm from "../Biodata-Form/page";
import { useLanguageContext } from "../hooks/useLanguage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CheckCircle } from "lucide-react";
import Header from "../Header/page";
import FooterPage from "../Footer/page";

export default function HomePage() {
  const { translations, setFolder } = useLanguageContext();
  const formRef = useRef<HTMLDivElement | null>(null);

  // Scroll when coming from preview using localStorage flag
  useEffect(() => {
    if (localStorage.getItem("page")) {
      // Wait until page content is loaded
      setTimeout(() => {
        const scrollToForm = () => {
          if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
            localStorage.removeItem("page");
          } else {
            // If formRef is not ready, try next frame
            requestAnimationFrame(scrollToForm);
          }
        };
        scrollToForm();
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (!translations) setFolder("homeLang");
  }, [translations, setFolder]);

  const templates = [
    { id: 1, name: "Classic", img: "/templates/t1.jpg" },
    { id: 2, name: "Modern", img: "/templates/t2.jpg" },
    { id: 3, name: "Elegant", img: "/templates/t3.jpg" },
    { id: 4, name: "Minimal", img: "/templates/t4.jpg" },
    { id: 5, name: "Traditional", img: "/templates/t5.jpg" },
    { id: 6, name: "Royal", img: "/templates/t6.jpg" },
  ];

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="text-gray-800 bg-linear-to-b from-white via-gray-50 to-gray-100">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-pink-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* HEADER */}
      <Header />

      {/* HERO SECTION - Optimized for visibility without scrolling */}
      <section
        id="main-content"
        className="relative overflow-hidden py-4 sm:py-6 md:py-8 lg:py-12 min-h-[calc(100vh-80px)]"
        aria-label="Hero section"
        style={{ background: "linear-gradient(135deg, #fff0f5 0%, #f0f8ff 50%, #edece7ff 100%)" }}
      >
        {/* Decorative faint shape */}
        <div className="pointer-events-none absolute -right-28 -top-20 opacity-20 transform rotate-12 w-80 h-80 rounded-full bg-gradient-to-tr from-pink-200 to-purple-200 blur-3xl" aria-hidden />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center w-full">
            {/* LEFT - Copy */}
            <div className="order-2 lg:order-1 text-center lg:text-left space-y-3 sm:space-y-4">
              <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 leading-tight p-4 m-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ lineHeight: 1.1 }}>
                {translations?.headerTitle || "The Ultimate Marriage Biodata Maker"}
              </h1>

              <p className="text-gray-700 max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg">
                {translations?.headerDesc || "Create beautiful biodatas easily and professionally."}
              </p>

              {/* Features grid - Compact on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 max-w-xl mx-auto lg:mx-0">
                {translations?.features?.map((f: string, i: number) => (
                  <div key={i} className="flex items-start gap-1">
                    <span className="flex-none mt-0.5 p-1 rounded-md bg-white shadow-sm text-green-600">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium pt-[2%]">
                      {f}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA - Prominent and always visible */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={handleScrollToForm}
                  className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
                  aria-label="Scroll to biodata creation form"
                >
                  {translations?.createBiodataBtn || "Create Biodata Now"}
                </button>

              </div>

              <p className="text-xs sm:text-sm text-gray-600 flex items-center justify-center lg:justify-start gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                12,000+ {translations?.biodatasCount || "biodatas created today"}
              </p>
            </div>

            {/* RIGHT - Template Cards - Properly sized for desktop */}
            <div className="order-1 lg:order-2 relative mx-auto lg:mx-0 w-full max-w-sm lg:max-w-lg xl:max-w-xl">
              <div className="relative w-full h-[200px] sm:h-[280px] md:h-[340px] lg:h-[450px] xl:h-[500px]">
                {/* Left Card */}
                <div className="absolute left-2 sm:left-4 lg:-left-4 xl:-left-8 top-8 sm:top-10 lg:top-12 w-28 sm:w-48 md:w-56 lg:w-64 xl:w-72 transform -rotate-12 hover:-rotate-15 transition-all duration-500 z-10 hover:z-30 hover:scale-105 shadow-2xl rounded-xl overflow-hidden border-2 sm:border-4 border-white">
                  <Image
                    src="/templates/t2.jpg"
                    alt="Modern marriage biodata template with elegant design and professional layout"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                {/* Right Card */}
                <div className="absolute right-2 sm:right-4 lg:-right-4 xl:-right-8 top-8 sm:top-10 lg:top-12 w-28 sm:w-48 md:w-56 lg:w-64 xl:w-72 transform rotate-12 hover:rotate-15 transition-all duration-500 z-10 hover:z-30 hover:scale-105 shadow-2xl rounded-xl overflow-hidden border-2 sm:border-4 border-white">
                  <Image
                    src="/templates/t3.jpg"
                    alt="Elegant marriage biodata template with sophisticated styling and beautiful colors"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                {/* Center Card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-56 md:w-64 lg:w-72 xl:w-80 transform hover:-translate-y-2 transition-all duration-500 z-20 hover:z-30 shadow-2xl rounded-xl overflow-hidden border-2 sm:border-4 border-white">
                  <Image
                    src="/templates/t1.jpg"
                    alt="Classic marriage biodata template with traditional design and timeless appeal"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="template-gallery" className="mt-10 py-12 px-4 md:px-6 rounded-2xl mx-4 md:mx-auto" style={{ background: "linear-gradient(135deg, #fff0f5 0%, #f0f8ff 50%, #fffacd 100%)" }} aria-label="Template gallery">
        <div className="mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">Choose Your Template</h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-12">
            Select from professionally designed marriage biodata templates to make your biodata unique and elegant.
          </p>

          <div className="relative">
            <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button
                className="p-3 bg-white shadow-md rounded-full text-gray-700 hover:bg-pink-500 hover:text-white transition-all"
                aria-label="Previous template"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
            </div>
            <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button
                className="p-3 bg-white shadow-md rounded-full text-gray-700 hover:bg-pink-500 hover:text-white transition-all"
                aria-label="Next template"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
            >
              {templates.map((template) => (
                <SwiperSlide key={template.id}>
                  <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white hover:scale-105 transition-transform">
                    <div className="flex items-center justify-center bg-gray-100">
                      <Image
                        src={template.img}
                        alt={`${template.name} marriage biodata template - professional design for creating beautiful biodatas`}
                        width={300}
                        height={400}
                        className="w-full h-80 object-contain p-5 cursor-pointer"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 md:px-6 py-12 md:py-16 rounded-2xl md:rounded-3xl mx-4 md:mx-auto mt-5" style={{ background: "linear-gradient(135deg, #fef9f5 0%, #e6f7ff 50%, #fff3e6 100%)" }} aria-label="How it works">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">{translations?.howItWorksheading || "How It Works"}</h2>
        <div className="grid md:grid-cols-3 gap-8 cursor-pointer text-center max-w-6xl mx-auto">
          {translations?.howItWorks?.map((step: any, i: number) => (
            <div key={i} className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white hover:border-pink-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl text-pink-500 mb-4 flex justify-center" aria-hidden="true">{i === 0 ? <FaEdit /> : i === 1 ? <FaPalette /> : <FaDownload />}</div>
              <h3 className="font-semibold text-lg sm:text-xl md:text-2xl mb-2 text-gray-800">{step.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM SECTION */}
      <section ref={formRef} className="md:px-6 py-12 md:py-16 rounded-2xl md:rounded-3xl md:mx-auto shadow-xl mt-5" style={{ background: "linear-gradient(135deg, #fff5f7 0%, #f3f0ff 50%, #fffde7 100%)" }} aria-label="Biodata creation form">
        <BiodataForm />
      </section>

      {/* FOOTER */}
      <FooterPage />
    </main>
  );
}
