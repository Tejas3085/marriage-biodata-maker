import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaMedal } from 'react-icons/fa'
import Link from 'next/link'

export default function FooterPage() {
  return (
    <footer className="bg-gray-900 pt-16 pb-12 mt-20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-gray-400">

        {/* Branding Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xl">
              <FaMedal />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Marriage Biodata</h3>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Create professional and beautiful marriage biodata in minutes. Available in English, Hindi, and Marathi with premium templates for every tradition.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-pink-500 transition-colors" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-pink-500 transition-colors" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-pink-500 transition-colors" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/" className="hover:text-pink-500 transition-colors">Home</Link></li>
            <li><Link href="/Biodata-Form" className="hover:text-pink-500 transition-colors">Create Biodata</Link></li>
          </ul>
        </div>

        {/* Support & Languages */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Languages</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2"><span>🇮🇳</span> English</li>
            <li className="flex items-center gap-2"><span>🇮🇳</span> मराठी (Marathi)</li>
            <li className="flex items-center gap-2"><span>🇮🇳</span> हिन्दी (Hindi)</li>
          </ul>
        </div>

        {/* Features Column */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Features</h4>
          <ul className="space-y-4 text-sm">
            <li>20+ Premium Designs</li>
            <li>High-Quality PDF Exports</li>
            <li>100% Free Forever</li>
            <li>Secure Data Processing</li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
        <p className="text-gray-500">© {new Date().getFullYear()} Marriage Biodata Maker. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        </div>
      </footer>
  )
}
