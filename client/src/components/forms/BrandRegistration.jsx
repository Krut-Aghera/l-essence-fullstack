import React from "react";
import { FaBuilding, FaLink, FaCloudUploadAlt, FaGlobe, FaCheck, FaLeaf } from "react-icons/fa";

export default function BrandRegistration() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-[var(--color-secondary-white)] p-3 sm:p-6 overflow-hidden">
            <form className="w-full max-w-3xl max-h-[95vh] md:max-h-[85vh] bg-[var(--color-primary-white)] rounded-2xl border border-[var(--color-beige-light)] shadow-sm p-5 sm:p-8 flex flex-col relative overflow-hidden">
                {/* Decorative Background Element */}
                <div className="absolute -top-6 -right-6 text-[var(--color-secondary-white)] opacity-40 pointer-events-none z-0">
                    <FaLeaf className="text-[90px] md:text-[120px]" />
                </div>

                {/* Form Header - Tightened margins */}
                <div className="mb-5 relative z-10 flex-shrink-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-black)] font-[var(--font-primary)] tracking-tight">
                        Register House
                    </h2>
                    <p className="text-xs md:text-sm text-[var(--color-secondary-black)] font-[var(--font-secondary)] mt-1">
                        Add a new fragrance house or botanical brand to the archive.
                    </p>
                </div>

                {/* Scrollable Form Body Container for Mobile Safety / Flawless Layout on Desktop */}
                <div className="flex-grow overflow-y-auto pr-1 custom-scrollbar relative z-10 mb-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                        {/* LEFT COLUMN: Text Fields & Dropdowns */}
                        <div className="space-y-4 flex flex-col justify-between">
                            {/* 1. Brand Name Input */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="brandName"
                                    className="block text-xs font-bold text-[var(--color-primary-black)] font-[var(--font-primary)] tracking-wide"
                                >
                                    Brand Name
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <FaBuilding className="text-[var(--color-beige-dark)] text-xs" />
                                    </span>
                                    <input
                                        type="text"
                                        id="brandName"
                                        placeholder="e.g. Maison Verte"
                                        className="w-full pl-10 pr-3 py-2.5 bg-[var(--color-secondary-white)] border border-[var(--color-beige-light)] rounded-xl focus:outline-none focus:border-[var(--color-green-dark)] focus:ring-1 focus:ring-[var(--color-green-dark)] text-[var(--color-primary-black)] font-[var(--font-secondary)] text-xs transition-all"
                                    />
                                </div>
                            </div>

                            {/* 2. Brand Slug Input */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="brandSlug"
                                    className="block text-xs font-bold text-[var(--color-primary-black)] font-[var(--font-primary)] tracking-wide"
                                >
                                    URL Slug
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <FaLink className="text-[var(--color-beige-dark)] text-xs" />
                                    </span>
                                    <input
                                        type="text"
                                        id="brandSlug"
                                        placeholder="e.g. maison-verte"
                                        className="w-full pl-10 pr-3 py-2.5 bg-[var(--color-secondary-white)] border border-[var(--color-beige-light)] rounded-xl focus:outline-none focus:border-[var(--color-green-dark)] focus:ring-1 focus:ring-[var(--color-green-dark)] text-[var(--color-primary-black)] font-[var(--font-secondary)] text-xs transition-all"
                                    />
                                </div>
                                <p className="text-[10px] text-[var(--color-beige-dark)] font-[var(--font-secondary)] mt-0.5">
                                    aura.com/brands/
                                    <span className="text-[var(--color-secondary-black)] font-semibold">
                                        maison-verte
                                    </span>
                                </p>
                            </div>

                            {/* 3. Origin Country Dropdown */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="country"
                                    className="block text-xs font-bold text-[var(--color-primary-black)] font-[var(--font-primary)] tracking-wide"
                                >
                                    Country of Origin
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <FaGlobe className="text-[var(--color-beige-dark)] text-xs" />
                                    </span>
                                    <select
                                        id="country"
                                        className="w-full pl-10 pr-8 py-2.5 bg-[var(--color-secondary-white)] border border-[var(--color-beige-light)] rounded-xl focus:outline-none focus:border-[var(--color-green-dark)] focus:ring-1 focus:ring-[var(--color-green-dark)] text-[var(--color-primary-black)] font-[var(--font-secondary)] text-xs transition-all appearance-none cursor-pointer"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select origin country
                                        </option>
                                        <option value="fr">France</option>
                                        <option value="it">Italy</option>
                                        <option value="uk">United Kingdom</option>
                                        <option value="us">United States</option>
                                        <option value="jp">Japan</option>
                                        <option value="ae">United Arab Emirates</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[var(--color-beige-dark)]">
                                        <svg
                                            className="w-3.5 h-3.5 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Adaptive Drag & Drop Component */}
                        <div className="space-y-1.5 flex flex-col">
                            <label className="block text-xs font-bold text-[var(--color-primary-black)] font-[var(--font-primary)] tracking-wide flex-shrink-0">
                                Brand Insignia / Logo
                            </label>
                            <label
                                htmlFor="logoFile"
                                className="flex-grow flex flex-col items-center justify-center w-full min-h-[140px] md:min-h-0 bg-[var(--color-secondary-white)] border-2 border-dashed border-[var(--color-beige-light)] rounded-xl cursor-pointer hover:bg-[var(--color-primary-white)] hover:border-[var(--color-green-dark)] transition-all group p-4 text-center"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <FaCloudUploadAlt className="text-3xl text-[var(--color-beige-dark)] mb-2 group-hover:text-[var(--color-green-dark)] transition-colors" />
                                    <p className="mb-0.5 text-xs text-[var(--color-secondary-black)] font-[var(--font-secondary)]">
                                        <span className="font-semibold text-[var(--color-primary-black)]">
                                            Click to upload
                                        </span>{" "}
                                        or drag
                                    </p>
                                    <p className="text-[10px] text-[var(--color-beige-dark)] font-[var(--font-secondary)]">
                                        SVG, PNG, or JPG (MAX. 2MB)
                                    </p>
                                </div>
                                <input
                                    id="logoFile"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* 5. Action Footer Button Component - Persistent at bottom */}
                <div className="flex-shrink-0 pt-2 border-t border-[var(--color-secondary-white)]">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-black)] hover:bg-[var(--color-green-dark)] text-[var(--color-primary-white)] font-[var(--font-secondary)] text-xs font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99]"
                    >
                        <FaCheck className="text-[10px]" />
                        Register Brand
                    </button>
                </div>
            </form>
        </div>
    );
}
