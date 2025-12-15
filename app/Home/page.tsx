"use client";

import React, { useEffect, useRef, useState } from "react";
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
  // const { translations, setFolder } = useLanguageContext();
  const formRef = useRef<HTMLDivElement | null>(null);
  const [isWeb, setIsWeb] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWeb(window.innerWidth >= 1024); // Treat width ≥1024px as web/desktop
    }
  }, []);


  const en = {
    headerTitle: "Create Your Marriage Biodata in Minutes",
    headerSubTitle: "Easy to make, beautiful to share.",
    headerDesc:
      "Pick a template, fill in your details, and download a professional-looking biodata in no time—totally free!",
    features: [
      "Choose elegant and fully customizable templates",
      "Download your biodata instantly in high quality",
      "Create your marriage biodata easily – 100% free"
    ],

    createBiodataBtn: "Create My Biodata",
    biodatasCount: "Thousands of Biodatas Created",
    howItWorksheading: "How It Works",
    howItWorks: [
      {
        title: "Fill Your Details",
        desc: "Add your personal, family, and contact information easily."
      },
      {
        title: "Select a Template",
        desc: "Pick from multiple beautifully designed templates."
      },
      {
        title: "Download & Share",
        desc: "Save your biodata in PDF or PNG format and share instantly."
      }
    ],
    biodataInfoTitle: "Beautiful, Ready-to-Use Templates",
    biodataInfoDesc:
      "Our templates make it simple to create a stylish and professional marriage biodata."
  };


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

  // useEffect(() => {
  //   if (!translations) setFolder("homeLang");
  // }, [translations, setFolder]);

  const templates = [
    { id: 1, name: "Classic", img: "/templates/t1.jpg" },
    { id: 2, name: "Modern", img: "/templates/t2.jpg" },
    { id: 3, name: "Elegant", img: "/templates/t3.jpg" },
    { id: 4, name: "Minimal", img: "/templates/t4.jpg" },
    { id: 5, name: "Traditional", img: "/templates/t5.jpg" },
    { id: 6, name: "Royal", img: "/templates/t6.jpg" },
    { id: 7, name: "Floral", img: "/templates/t7.jpg" },
    // { id: 8, name: "Vintage", img: "/templates/t8.jpg" },
    // { id: 9, name: "Chic", img: "/templates/t9.jpg" },
    { id: 10, name: "Bold", img: "/templates/t10.jpg" },
    { id: 11, name: "Sophisticated", img: "/templates/t11.jpg" },
    { id: 12, name: "Creative", img: "/templates/t12.jpg" },
    { id: 13, name: "Creative", img: "/templates/t13.jpg" },
    { id: 14, name: "Creative", img: "/templates/t14.jpg" },
    { id: 15, name: "Creative", img: "/templates/t15.jpg" },
    { id: 16, name: "Creative", img: "/templates/t16.jpg" },
    { id: 17, name: "Creative", img: "/templates/t17.jpg" },
    { id: 18, name: "Creative", img: "/templates/t18.jpg" },
    { id: 19, name: "Creative", img: "/templates/t19.jpg" },
    { id: 20, name: "Creative", img: "/templates/t20.jpg" },
    { id: 21, name: "Creative", img: "/templates/t21.jpg" },
    { id: 22, name: "Creative", img: "/templates/t22.jpg" },

  ];

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="text-gray-800 bg-gray-50">
      <Header />

      {/* HERO SECTION */}
      <section
        id="main-content"
        className="relative overflow-hidden py-1 md:py-12 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: !isWeb
            ? `
        linear-gradient(
          135deg,
          rgba(255,240,245,0.95) 0%,
          rgba(240,248,255,0.9) 50%,
          rgba(237,236,231,0.95) 100%
        )
      `
            : `
linear-gradient(135deg, rgb(204 190 195 / 95%) 0%, rgb(255, 255, 255) 50%, rgb(165, 235, 227) 100%)      `,
        }}
      >


        {/* Decorative faint shape */}
        <div className="pointer-events-none absolute -right-28 -top-20 opacity-20 transform rotate-12 w-80 h-80 rounded-full bg-gradient-to-tr from-pink-200 to-purple-200 blur-3xl" />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center w-full">
            {/* LEFT - Text */}
            <div className="order-2 md:order-1 text-center md:text-left space-y-4">
              <h1 className="font-extrabold text-2xl sm:text-4xl md:text-xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                {en.headerTitle}
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                {/* {en.headerDesc} */}
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto md:mx-0">
                {en.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-white shadow-sm text-green-600">
                      <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                    </span>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
                      {f}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-center md:justify-start mt-4">
                <button
                  onClick={handleScrollToForm}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 sm:px-7 sm:py-3.5 bg-pink-400 text-white font-semibold shadow-md shadow-indigo-400/20 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-1 active:scale-95"
                >
                  {en.createBiodataBtn}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {en.biodatasCount}
              </p>
            </div>

            {/* RIGHT - Hero Templates */}
            <div className="order-1 md:order-2 relative mx-auto md:mx-0 w-full mt-5 md:mt-0">
              {/* Desktop: absolute floating cards */}
              <div className="hidden md:block relative w-full h-[360px] lg:h-[450px] xl:h-[500px]">
                <div className="absolute left-2 sm:left-4 top-8 w-44 sm:w-52 md:w-56 lg:w-64 transform -rotate-12 hover:-rotate-15 transition-all duration-500 z-10 shadow-2xl rounded-xl overflow-hidden border-2 sm:border-4 border-white">
                  <Image src="/Images/m1.png" alt="Modern template" width={300} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="absolute right-2 sm:right-4 top-8 w-44 sm:w-52 md:w-56 lg:w-64 transform rotate-12 hover:rotate-15 transition-all duration-500 z-10 shadow-2xl rounded-xl overflow-hidden border-2 sm:border-4 border-white">
                  <Image src="/Images/m2.png" alt="Elegant template" width={300} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-56 md:w-64 lg:w-72 transform hover:-translate-y-2 transition-all duration-500 z-20 shadow-2xl rounded-xl overflow-hidden border-2 sm:border-4 border-white">
                  <Image src="/Images/m3.png" alt="Classic template" width={300} height={400} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Mobile/Tablet: stacked smaller cards */}
              {/* Mobile/Tablet: Web-Style Floating Cards */}
              <div className="block md:hidden relative w-full h-[250px]">
                {/* Left Card */}
                <div className="absolute left-[5%] top-8 w-32 transform -rotate-6 z-10 shadow-lg rounded-lg overflow-hidden border-2 border-white opacity-90">
                  <Image src="/Images/m1.png" alt="Template Left" width={150} height={130} className="w-full h-full object-cover" />
                </div>
                {/* Right Card */}
                <div className="absolute right-[5%] top-8 w-32 transform rotate-6 z-10 shadow-lg rounded-lg overflow-hidden border-2 border-white opacity-90">
                  <Image src="/Images/m2.png" alt="Template Right" width={150} height={130} className="w-full h-full object-cover" />
                </div>
                {/* Center Hero Card */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-40 z-20 shadow-2xl rounded-xl overflow-hidden border-[3px] border-white transform hover:-translate-y-1 transition-transform">
                  <Image src="/Images/m3.png" alt="Template Center" width={150} height={130} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TEMPLATE SWIPER SECTION */}
      <section className="mt-10 py-12 px-4 md:px-6 rounded-2xl mx-4 md:mx-auto bg-gradient-to-tr from-pink-50 via-blue-50 to-yellow-50 relative">
        <div className="text-center max-w-8xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Choose Your Template</h2>
          <p className="text-sm sm:text-base md:text-lg mb-12 text-gray-600">
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
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {templates.map((template) => (
                <SwiperSlide key={template.id}>
                  <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white hover:scale-105 transition-transform">
                    <div className="flex items-center justify-center bg-gray-100">
                      <Image
                        src={template.img}
                        alt={`${template.name} template`}
                        width={300}
                        height={400}
                        className="w-full h-80 object-contain p-5 cursor-pointer"
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
      <section className="px-4 md:px-6 py-12 md:py-16 rounded-2xl md:rounded-3xl mx-4 md:mx-auto mt-5 bg-gradient-to-tr from-white via-blue-50 to-yellow-50 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">{en.howItWorksheading}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {en.howItWorks.map((step, i) => (
            <div key={i} className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white hover:border-pink-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl text-pink-500 mb-4 flex justify-center">
                {i === 0 ? <FaEdit /> : i === 1 ? <FaPalette /> : <FaDownload />}
              </div>
              <h3 className="font-semibold text-lg sm:text-xl md:text-2xl mb-2">{step.title}</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM SECTION */}
      <section ref={formRef} className="md:px-6 py-12 md:py-16 rounded-2xl md:rounded-3xl md:mx-auto shadow-xl mt-5 bg-gradient-to-tr from-pink-50 via-blue-50 to-yellow-50">
        <BiodataForm />
      </section>

      <section className="py-10 mt-5 px-4 md:px-6 bg-gradient-to-tr from-pink-50 via-blue-50 to-yellow-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-gray-800">
            Why Choose Our Service
          </h2>

          <div className="flex flex-wrap justify-center gap-5">
            {[
              { title: "100% Free", desc: "No hidden charges or subscriptions" },
              { title: "Secure & Private", desc: "Your data stays on your device" },
              { title: "Easy to Use", desc: "Simple and user-friendly interface" },
              { title: "Instant Download", desc: "Download your biodata instantly" }
            ]
              .map((item, idx) => (
                <div
                  key={idx}
                  className="w-[90%] sm:w-48 md:w-52 p-5 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow text-left"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-green-500 mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>


      <FooterPage />
    </main>

  );
}
