import React from 'react'

const Footer = () => {
      return (
            <footer className="bg-[#222831] text-[#F0F0F0] border-t border-[#837664]/20 py-12 px-6 mt-auto">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm font-['Roboto',sans-serif]">
                        <div className="space-y-4">
                              <div className="text-2xl font-bold tracking-wider font-['Federo',cursive] text-white">
                                    AURA<span className="text-[#739072]">.</span>
                              </div>
                              <p className="text-xs text-[#948979] leading-relaxed max-w-xs">
                                    Artisan botanical fragrances designed to capture memory and melt into your skin.
                              </p>
                        </div>
                        <div className="space-y-2">
                              <h5 className="font-['Alegreya_Sans',sans-serif] font-bold text-base text-white tracking-wide">Shop</h5>
                              <ul className="space-y-1 text-xs text-[#948979]">
                                    <li><a href="#" className="hover:text-white transition-colors">All Fragrances</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Discovery Sets</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Body Oils</a></li>
                              </ul>
                        </div>
                        <div className="space-y-2">
                              <h5 className="font-['Alegreya_Sans',sans-serif] font-bold text-base text-white tracking-wide">Client Care</h5>
                              <ul className="space-y-1 text-xs text-[#948979]">
                                    <li><a href="#" className="hover:text-white transition-colors">Scent Consultation</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Ingredients Glossary</a></li>
                              </ul>
                        </div>
                        <div className="space-y-3">
                              <h5 className="font-['Alegreya_Sans',sans-serif] font-bold text-base text-white tracking-wide">Join the Inner Circle</h5>
                              <p className="text-xs text-[#948979]">Receive early access to seasonal scent archives.</p>
                              <div className="flex gap-2">
                                    <input
                                          type="email"
                                          placeholder="Your email"
                                          className="bg-[#4B5563]/30 border border-[#4B5563] text-xs px-3 py-2 rounded-lg text-white placeholder-[#948979] focus:outline-none focus:border-[#739072] w-full"
                                    />
                                    <button className="bg-[#4F6F52] hover:bg-[#739072] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                                          Subscribe
                                    </button>
                              </div>
                        </div>
                  </div>
                  <div className="max-w-7xl mx-auto border-t border-[#4B5563]/30 mt-10 pt-4 text-center text-[11px] text-[#948979]">
                        &copy; 2026 Aura Botanicals Inc. All rights reserved. Crafted in Grasse, poured in New York.
                  </div>
            </footer>
      )
}

export default Footer