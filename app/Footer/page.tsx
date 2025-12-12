import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function FooterPage() {
  return (
<>
 <footer className="site-footer bg-gray-900 text-gray-300 mt-12 py-8" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="brand text-center md:text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">Marriage Biodata Maker</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">© {new Date().getFullYear()} All Rights Reserved.</p>
          </div>

          <nav className="social-links flex items-center gap-4" role="navigation" aria-label="Social media links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Visit our Facebook page">
              <FaFacebook aria-hidden="true" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Visit our Instagram profile">
              <FaInstagram aria-hidden="true" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Visit our Twitter profile">
              <FaTwitter aria-hidden="true" />
            </a>
          </nav>
        </div>
      </footer>
</>  
)
}
