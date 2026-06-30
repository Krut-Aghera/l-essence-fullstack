import React from "react";
import { Link } from "react-router-dom";
import completeWhiteLogo from "../assets/completeWhiteLogo.png";

const Footer = () => {
    return (
        <footer className="bg-primary-black text-primary-white border-t border-beige-light/10 py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm font-secondary">
                {/* Brand Meta Block */}
                <div className="space-y-4">
                    <div className="text-2xl font-bold tracking-wider font-artistic text-primary-white">
                        <img src={completeWhiteLogo} className="h-14" alt="" />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                        Your digital destination for premium niche perfumes. Sourced directly,
                        presented authentically.
                    </p>
                </div>

                {/* Shop Navigation Links */}
                <div className="space-y-3">
                    <h5 className="font-primary font-bold text-sm text-primary-white uppercase tracking-wider">
                        Explore
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-500">
                        <li>
                            <Link
                                to="/perfumes"
                                className="hover:text-secondary-white transition-colors duration-200 cursor-pointer"
                            >
                                All Fragrances
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/brands"
                                className="hover:text-secondary-white transition-colors duration-200 cursor-pointer"
                            >
                                All Brands
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/perfumes/glossary"
                                className="hover:text-secondary-white transition-colors duration-200 cursor-pointer"
                            >
                                Fragrance Dictionary
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Client Care Navigation Links */}
                <div className="space-y-3">
                    <h5 className="font-primary font-bold text-sm text-primary-white uppercase tracking-wider">
                        Client Care
                    </h5>
                    <ul className="space-y-2 text-xs text-gray-500">
                        <li>
                            <Link
                                to="/lessence/terms-conditions"
                                className="hover:text-secondary-white transition-colors duration-200 cursor-pointer"
                            >
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/lessence/shipping-returns"
                                className="hover:text-secondary-white transition-colors duration-200 cursor-pointer"
                            >
                                Shipping & Returns
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/lessence/about"
                                className="hover:text-secondary-white transition-colors duration-200 cursor-pointer"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* About Project Block */}
                <div className="space-y-3">
                    <h5 className="font-primary font-bold text-sm text-primary-white uppercase tracking-wider">
                        Crafted With Passion
                    </h5>

                    <p className="text-xs text-gray-500 leading-relaxed">
                        A luxury fragrance experience crafted through modern web technologies and a
                        passion for perfumery.
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.2em] text-beige-dark">
                        Built Using React • Express • MongoDB
                    </p>
                </div>
            </div>

            {/* Copyright Line */}
            <div className="max-w-7xl mx-auto border-t border-beige-light/10 mt-10 pt-6 text-center text-[10px] uppercase tracking-widest text-gray-500">
                &copy; {new Date().getFullYear()} L'essence || All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
