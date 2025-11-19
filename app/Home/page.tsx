"use client";

import React, { useEffect, useRef } from "react";
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
    { id: 1, name: "Classic", img: "/templates/template1.jpg" },
    { id: 2, name: "Modern", img: "/templates/template2.jpg" },
    { id: 3, name: "Elegant", img: "/templates/template3.jpg" },
    { id: 4, name: "Minimal", img: "/templates/template4.jpg" },
    { id: 5, name: "Traditional", img: "/templates/template5.jpg" },
    { id: 6, name: "Royal", img: "/templates/template6.jpg" },
  ];

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="text-gray-800 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-around px-4 sm:px-6 py-8 md:py-12 w-full gap-6 md:gap-16 shadow-xl" style={{ background: "linear-gradient(135deg, #fff0f5 0%, #f0f8ff 50%, #edece7ff 100%)" }}>
        <div className="flex-1 flex flex-col justify-center space-y-3 md:space-y-5 max-w-lg md:max-w-md mx-auto md:mx-0 text-center md:text-left">
          <h2 className="font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight" style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}>
            {translations?.headerTitle || "The Ultimate Marriage Biodata Maker"}
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
            {translations?.headerDesc || "Create beautiful biodatas easily and professionally."}
          </p>

          <div className="space-y-2 md:space-y-3">
            {translations?.features?.map((f: string, i: number) => (
              <div key={i} className="flex items-start gap-3 mx-auto md:mx-0 w-fit md:w-auto text-center md:text-left">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-700 leading-snug">{f}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:gap-4 grid justify-center md:justify-start mt-4 md:mt-6">
            <button onClick={handleScrollToForm} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 rounded-lg shadow-lg hover:shadow-xl font-semibold transition-all hover:scale-105 text-sm sm:text-base md:text-lg">
              {translations?.createBiodataBtn || "Create Biodata Now"}
            </button>
            <p className="text-gray-600 mt-2 md:mt-0 text-xs sm:text-sm md:text-base">
              12,000+ {translations?.biodatasCount || "biodatas created today"}
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end items-center max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0">
          <img src="/Images/homePageImage.jpg" alt="Wedding Couple creating marriage biodata" className="w-4/5 sm:w-3/4 md:w-full h-auto max-h-60 sm:max-h-80 md:max-h-[400px] rounded-3xl shadow-2xl hover:scale-105 transition-transform" />
        </div>
      </section>

      {/* TEMPLATE GALLERY */}
      <section className="mt-10 py-12 px-4 md:px-6 rounded-2xl mx-4 md:mx-auto" style={{ background: "linear-gradient(135deg, #fff0f5 0%, #f0f8ff 50%, #fffacd 100%)" }}>
        <div className="mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">Choose Your Template</h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-12">
            Select from professionally designed marriage biodata templates to make your biodata unique and elegant.
          </p>

          <div className="relative">
            <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button className="p-3 bg-white shadow-md rounded-full text-gray-700 hover:bg-pink-500 hover:text-white transition-all">
                <FaChevronLeft />
              </button>
            </div>
            <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button className="p-3 bg-white shadow-md rounded-full text-gray-700 hover:bg-pink-500 hover:text-white transition-all">
                <FaChevronRight />
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
                      <img src={template.img} alt={`${template.name} template`} className="w-full h-80 object-contain p-5 cursor-pointer" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 md:px-6 py-12 md:py-16 rounded-2xl md:rounded-3xl mx-4 md:mx-auto" style={{ background: "linear-gradient(135deg, #fef9f5 0%, #e6f7ff 50%, #fff3e6 100%)" }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">{translations?.howItWorksheading || "How It Works"}</h2>
        <div className="grid md:grid-cols-3 gap-8 cursor-pointer text-center max-w-6xl mx-auto">
          {translations?.howItWorks?.map((step: any, i: number) => (
            <div key={i} className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white hover:border-pink-500 hover:shadow-2xl transition-all">
              <div className="text-3xl sm:text-4xl md:text-5xl text-pink-500 mb-4 flex justify-center">{i === 0 ? <FaEdit /> : i === 1 ? <FaPalette /> : <FaDownload />}</div>
              <h3 className="font-semibold text-lg sm:text-xl md:text-2xl mb-2 text-gray-800">{step.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM SECTION */}
      <section ref={formRef} className="md:px-6 py-12 md:py-16 rounded-2xl md:rounded-3xl md:mx-auto shadow-xl" style={{ background: "linear-gradient(135deg, #fff5f7 0%, #f3f0ff 50%, #fffde7 100%)" }}>
        <BiodataForm />
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">Marriage Biodata Maker</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">© {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
          <div className="flex space-x-5 text-gray-400 text-xl sm:text-2xl">
            <a href="#" className="hover:text-blue-400 transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400 transition-colors"><FaTwitter /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
