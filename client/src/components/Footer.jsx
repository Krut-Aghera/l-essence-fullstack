import React from 'react';
import { Link } from 'react-router-dom';
import completeWhiteLogo from '../assets/completeWhiteLogo.png'

const Footer = () => {
      return (
            <footer className="bg-primary-black text-primary-white border-t border-beige-light/10 py-12 px-6 mt-auto">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm font-secondary">

                        {/* Brand Meta Block */}
                        <div className="space-y-4">
                              <div className="text-2xl font-bold tracking-wider font-artistic text-primary-white">
                                 <img src={completeWhiteLogo} className='h-14' alt="" />
                              </div>
                              <p className="text-xs text-secondary-black/60 leading-relaxed max-w-xs">
                                    Artisan botanical fragrances designed to capture memory and melt into your skin.
                              </p>
                        </div>

                        {/* Shop Navigation Links */}
                        <div className="space-y-3">
                              <h5 className="font-primary font-bold text-sm text-primary-white uppercase tracking-wider">Shop</h5>
                              <ul className="space-y-2 text-xs text-secondary-black/70">
                                    <li>
                                          <Link to="/perfumes" className="hover:text-primary-white transition-colors duration-200">
                                                All Fragrances
                                          </Link>
                                    </li>
                                    <li>
                                          <Link to="/discovery-sets" className="hover:text-primary-white transition-colors duration-200">
                                                Discovery Sets
                                          </Link>
                                    </li>
                                    <li>
                                          <Link to="/body-oils" className="hover:text-primary-white transition-colors duration-200">
                                                Body Oils
                                          </Link>
                                    </li>
                              </ul>
                        </div>

                        {/* Client Care Navigation Links */}
                        <div className="space-y-3">
                              <h5 className="font-primary font-bold text-sm text-primary-white uppercase tracking-wider">Client Care</h5>
                              <ul className="space-y-2 text-xs text-secondary-black/70">
                                    <li>
                                          <Link to="/lessence/terms-conditions" className="hover:text-primary-white transition-colors duration-200">
                                                Terms & Conditions
                                          </Link>
                                    </li>
                                    <li>
                                          <Link to="/shipping-returns" className="hover:text-primary-white transition-colors duration-200">
                                                Shipping & Returns
                                          </Link>
                                    </li>
                                    <li>
                                          <Link to="/lessence/about" className="hover:text-primary-white transition-colors duration-200">
                                                About Project
                                          </Link>
                                    </li>
                              </ul>
                        </div>

                        {/* Newsletter Layer */}
                        <div className="space-y-3">
                              <h5 className="font-primary font-bold text-sm text-primary-white uppercase tracking-wider">Join the Inner Circle</h5>
                              <p className="text-xs text-secondary-black/60">Receive early access to seasonal scent archives.</p>
                              <div className="flex gap-2">
                                    <input
                                          type="email"
                                          placeholder="Your email"
                                          className="bg-primary-white/5 border border-beige-light/10 text-xs px-3 py-2.5 rounded-xl text-primary-white placeholder-secondary-black/40 focus:outline-none focus:border-green-dark w-full transition-colors shadow-inner"
                                    />
                                    <button className="bg-green-dark hover:bg-green-dark/80 text-primary-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200 whitespace-nowrap uppercase tracking-wider cursor-pointer">
                                          Subscribe
                                    </button>
                              </div>
                        </div>

                  </div>

                  {/* Copyright Line */}
                  <div className="max-w-7xl mx-auto border-t border-beige-light/10 mt-10 pt-6 text-center text-[10px] uppercase tracking-widest text-secondary-black/40">
                        &copy; {new Date().getFullYear()} Aura Botanicals Inc. All rights reserved. Crafted in Grasse, poured in New York.
                  </div>
            </footer>
      );
};

export default Footer;