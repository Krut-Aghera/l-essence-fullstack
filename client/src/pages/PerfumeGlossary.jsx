import React, { useState } from "react";
import { Footer, Header } from "../components/index";

const GLOSSARY_DATA = [
    {
        category: "Fragrance Concentrations",
        items: [
            {
                id: "edc",
                term: "EDC (Eau de Cologne)",
                definition:
                    "Contains roughly 2% to 4% perfume oils. Typically light, fresh, and citrus-heavy, offering a brief olfactive burst that lingers for 1 to 2 hours.",
            },
            {
                id: "edt",
                term: "EDT (Eau de Toilette)",
                definition:
                    "Concentrated between 5% to 15% aromatic compounds. Formulated for everyday wear, it emphasizes top notes and projects beautifully for 3 to 5 hours.",
            },
            {
                id: "edp",
                term: "EDP (Eau de Parfum)",
                definition:
                    "One of the most popular builds, featuring a 15% to 20% oil concentration. It highlights heart notes, offers exceptional depth, and sits beautifully on skin for 5 to 8 hours.",
            },
            {
                id: "parfum",
                term: "Parfum / Pure Parfum",
                definition:
                    "A rich luxury concentration containing 20% to 30% essential oils. It possesses a denser, more intimate trail (sillage) with minimal alcohol burn, lasting 8 to 12+ hours.",
            },
            {
                id: "extrait",
                term: "Extrait de Parfum",
                definition:
                    "The absolute pinnacle of luxury, hitting anywhere from 30% to 40%+ oil saturation. Deeply complex, intimate, and resilient, it clings tightly to pulse points for an extraordinary duration.",
            },
            {
                id: "elixir",
                term: "Elixir",
                definition:
                    "A modern, highly concentrated variation of an existing fragrance line. Elixirs re-imagine a DNA by distilling it down to extreme oil levels and amplifying heavy base notes for unprecedented depth and power.",
            },
        ],
    },
    {
        category: "Market Classifications",
        items: [
            {
                id: "designer",
                term: "Designer Houses",
                definition:
                    "Fragrances created by mainstream luxury fashion brands (e.g., Chanel, Tom Ford, Dior). They are engineered to appeal broadly, utilizing global distribution and immense marketing scale.",
            },
            {
                id: "niche",
                term: "Niche Perfumery",
                definition:
                    "Scent design from houses dedicated exclusively to the art of perfumery. These creators emphasize unique artistic concepts, rare raw ingredients, and non-traditional profiles rather than mass market appeal.",
            },
            {
                id: "private",
                term: "Private Blend / Exclusive Lines",
                definition:
                    "Ultra-premium, high-tier collections curated within larger designer houses. These represent a perfumer’s creative playground, utilizing exquisite materials and sold exclusively in flagship boutiques.",
            },
        ],
    },
    {
        category: "The Anatomy of Scent",
        items: [
            {
                id: "top",
                term: "Top Notes (Head Notes)",
                definition:
                    "The initial, immediate impression of a fragrance upon application. Formulated with volatile molecules like citrus and light herbs, they flash off within 10 to 30 minutes to reveal the core.",
            },
            {
                id: "heart",
                term: "Heart Notes (Middle Notes)",
                definition:
                    "Considered the true soul of the perfume. Emerging as the top notes fade, these medium-bodied floral, fruit, or spice accords dictate the main character of the scent for several hours.",
            },
            {
                id: "base",
                term: "Base Notes",
                definition:
                    "The structural foundation of the perfume pyramid. Heavy, slow-evaporating molecules like wood, resins, amber, and musk anchor the lighter notes, providing body, longevity, and warmth.",
            },
            {
                id: "accords",
                term: "Accords vs. Notes",
                definition:
                    "A 'Note' represents an individual scent component (e.g., Jasmine). An 'Accord' is a distinct olfactory illusion created by blending multiple notes together to form a brand new scent profile (e.g., an Amber Accord).",
            },
            {
                id: "families",
                term: "Fragrance Families",
                definition:
                    "The universal classification wheel used to categorize scents. The primary groups include Fresh (citrusy/aquatic), Floral (rose/jasmine), Oriental/Amber (warm spices/vanilla), and Woody (sandalwood/cedar).",
            },
        ],
    },
    {
        category: "Chemistry & Aging",
        items: [
            {
                id: "maceration",
                term: "Maceration",
                definition:
                    "The crucial aging process where the concentrated perfume oil completely bonds with the alcohol solvent. Often, a bottle will dynamically develop richer performance and smoother notes a few weeks after its first few sprays expose it to oxygen.",
            },
        ],
    },
];

const PerfumeGlossary = () => {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleAccordion = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const scrollToSection = (index) => {
        const element = document.getElementById(`glossary-sec-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* TYPOGRAPHY ISOLATION SHIELD FOR THE HEADER */}
            <div className="w-full  text-sm text-left normal-case tracking-normal [font-size:initial] [line-height:initial]">
                <Header />
            </div>

            {/* Hero Section Element */}
            <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 font-['Alegreya_Sans',sans-serif]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#DFD0B8]/40 pb-12">
                    {/* Left Text Column */}
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        <div className="inline-block">
                            <span className="px-4 py-1.5 rounded-full bg-[#DFD0B8]/40 text-[#837664] font-['Federo',cursive] text-xs tracking-widest uppercase">
                                The Scent Compendium
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#222831] leading-[1.05]">
                            Decoding the language of <br />
                            <span className="font-['Allura',cursive] text-5xl sm:text-6xl md:text-7xl font-normal text-[#4F6F52] block mt-2 normal-case">
                                botanicals & blend architecture.
                            </span>
                        </h1>
                        <p className="font-['Roboto',sans-serif] text-[#4B5563] text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Demystifying the vocabulary, volatile compounds, structural pyramids,
                            and chemical maturations that dictate high-tier perfumery.
                        </p>
                    </div>

                    {/* Right Grid Editorial Navigation Card Panel */}
                    <div className="lg:col-span-5 bg-white border border-[#DFD0B8]/50 p-6 rounded-2xl shadow-sm space-y-4">
                        <h3 className="font-['Federo',cursive] text-xs text-[#837664] uppercase tracking-wider border-b border-[#DFD0B8]/30 pb-2">
                            Quick Chapter Jump
                        </h3>
                        <nav className="flex flex-col gap-2">
                            {GLOSSARY_DATA.map((section, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToSection(idx)}
                                    className="text-left text-sm font-medium text-[#222831] hover:text-[#4F6F52] transition-colors py-1.5 px-2 rounded-lg hover:bg-[#F0F0F0]/50 group flex items-center justify-between cursor-pointer"
                                >
                                    <span>{section.category}</span>
                                    <span className="text-xs text-[#837664]/65 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
                                        →
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Grid Content Matrix */}
            <main className="flex-1 w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-[#222831] font-['Alegreya_Sans',sans-serif]">
                <div className="space-y-12">
                    {GLOSSARY_DATA.map((section, secIdx) => (
                        <div
                            key={secIdx}
                            id={`glossary-sec-${secIdx}`}
                            className="space-y-4 scroll-mt-24"
                        >
                            {/* Section Category Tag */}
                            <h2 className="text-[11px] font-bold tracking-widest text-[#837664] uppercase font-['Federo',cursive] pl-1">
                                {section.category}
                            </h2>

                            {/* Collapsible Accordion Grid Stack */}
                            <div className="bg-white border border-[#DFD0B8]/60 rounded-2xl divide-y divide-[#DFD0B8]/30 overflow-hidden shadow-sm">
                                {section.items.map((item) => {
                                    const isOpened = !!expandedItems[item.id];
                                    return (
                                        <div
                                            key={item.id}
                                            className="transition-colors duration-200"
                                        >
                                            {/* Clickable Title Strip */}
                                            <button
                                                type="button"
                                                onClick={() => toggleAccordion(item.id)}
                                                className="w-full px-5 py-4 flex items-center justify-between text-left group hover:bg-[#F0F0F0]/40 transition-colors focus:outline-none cursor-pointer"
                                            >
                                                <span className="font-bold text-sm sm:text-base text-[#222831] tracking-tight group-hover:text-[#4F6F52] transition-colors">
                                                    {item.term}
                                                </span>

                                                {/* Custom Rotational Chevron */}
                                                <div
                                                    className={`w-5 h-5 rounded-full flex items-center justify-center border border-[#DFD0B8] bg-white shadow-sm transition-transform duration-300 ${isOpened ? "rotate-180 border-[#222831]" : ""}`}
                                                >
                                                    <svg
                                                        className="w-2.5 h-2.5 text-[#222831]"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>

                                            {/* Body Content Transition Layer */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpened ? "max-h-40 opacity-100 border-t border-[#DFD0B8]/20" : "max-h-0 opacity-0"}`}
                                            >
                                                <div className="px-5 pb-5 pt-3 bg-[#F0F0F0]/10">
                                                    <p className="font-['Roboto',sans-serif] text-xs sm:text-sm leading-relaxed text-[#4B5563]">
                                                        {item.definition}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Minimal Footer Signature Flag */}
                <div className="text-center pt-16">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#837664]/60 font-['Federo',cursive]">
                        Aura Analytics Catalog — Terminology Matrix
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PerfumeGlossary;
