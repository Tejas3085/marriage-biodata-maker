import { FaMedal } from "react-icons/fa";
import { useLanguageContext } from "../hooks/useLanguage";

export default function Header() {
    const { language, setLanguage } = useLanguageContext();

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* LEFT SIDE — LOGO + TITLE */}
                    <div className="flex items-center gap-4">
                        {/* Logo */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg hover:scale-105 transition-transform duration-300">
                            <FaMedal className="text-white text-2xl sm:text-3xl" />
                        </div>

                        {/* Title */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide bg-clip-text text-transparent 
                 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500">
                                Create Biodata
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
                                Make It Yours, Fast
                            </p>
                        </div>

                    </div>

                    {/* RIGHT SIDE — LANGUAGE SELECTOR */}
                    <div className="flex items-center">
                        <select
                            className="appearance-none bg-transparent border-none outline-none text-xs sm:text-sm md:text-base font-medium text-gray-700 cursor-pointer"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 0.25rem center",
                                backgroundSize: "0.75rem",
                                paddingRight: "1.25rem",
                            }}
                        >
                            <option value="en">English</option>
                            <option value="mr">मराठी</option>
                            <option value="hi">हिन्दी</option>
                        </select>
                    </div>

                </div>
            </div>
        </header>
    );
}
