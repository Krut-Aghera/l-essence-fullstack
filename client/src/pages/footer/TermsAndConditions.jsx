import React from "react";
import {
    FaInfoCircle,
    FaBalanceScale,
    FaFlask,
    FaShieldAlt,
    FaCode,
    FaGlobe,
} from "react-icons/fa";

const TermsAndConditions = () => {
    // Automatically calculates the current year dynamically
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary selection:bg-green-dark/10">
            {/* --- PAGE HEADER --- */}
            <div className="bg-primary-white border-b border-beige-light py-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <span className="font-secondary text-sm font-semibold uppercase tracking-[0.2em] text-beige-dark block">
                        Legal Framework & Project Scope
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary-black leading-tight">
                        Terms & Conditions
                    </h1>
                    <p className="text-sm font-secondary text-secondary-black/70 uppercase tracking-wider">
                        Last Updated: June {currentYear}
                    </p>
                </div>
            </div>

            {/* --- MAIN TERMS CONTENT --- */}
            <main className="grow max-w-4xl w-full mx-auto px-6 py-16 space-y-16">
                {/* IMMERSIVE CALLOUT BANNER */}
                <div className="bg-amber-50/40 border-2 border-amber-200/70 p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row gap-5 items-start">
                    <div className="p-3 bg-amber-100 rounded-xl text-amber-800 shrink-0 mt-0.5">
                        <FaInfoCircle size={24} />
                    </div>
                    <div className="space-y-3 font-secondary text-base text-secondary-black leading-relaxed">
                        <strong className="text-amber-900 font-bold uppercase tracking-wider block text-sm">
                            Quick Overview of This Website
                        </strong>
                        <p>
                            This entire platform is an independent design concept, interactive
                            portfolio project, and a non-commercial hobby built by me.
                            <strong> No real money is accepted</strong>, and no physical packages
                            will ever be mailed out. You are warmly invited to freely explore the
                            storefront, look up fragrance ingredients, and simulate placing sample
                            orders.
                        </p>
                    </div>
                </div>

                {/* STYLED LEGAL CLAUSES */}
                <div className="space-y-12 font-secondary text-base md:text-lg text-secondary-black leading-relaxed">
                    {/* Section 1 */}
                    <section className="bg-primary-white border border-beige-light rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3 text-primary-black font-extrabold font-primary text-xl tracking-tight">
                            <FaBalanceScale className="text-green-dark text-2xl shrink-0" />
                            <h2>1. Simulated Environment & Non-Commercial Rules</h2>
                        </div>
                        <p>
                            This website is strictly a safe, simulated testing environment. By using
                            this application, you agree and understand that all traditional shopping
                            functions. such as adding items to your shopping bag, typing test
                            checkout information, and viewing simulated balances are visual
                            demonstrations. No commercial transactions are binding, no real money
                            changes hands, and no items are packed or shipped.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-primary-white border border-beige-light rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3 text-primary-black font-extrabold font-primary text-xl tracking-tight">
                            <FaFlask className="text-green-dark text-2xl shrink-0" />
                            <h2>2. Accuracy of Fragrance and Ingredient Information</h2>
                        </div>
                        <p>
                            Even though the shop checkout process is fake, the data behind the
                            fragrances is completely real. All perfume charts, notes breakdowns,
                            longevity descriptions, and historical details listed in our catalog are{" "}
                            <span className="text-green-dark font-bold">
                                100% genuine and accurate
                            </span>{" "}
                            to the real-world fragrance industry. I compiled this detailed
                            information carefully to provide a rich, authentic educational
                            experience.
                        </p>
                    </section>

                    {/* New Section 3: Data References */}
                    <section className="bg-primary-white border border-beige-light rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3 text-primary-black font-extrabold font-primary text-xl tracking-tight">
                            <FaGlobe className="text-green-dark text-2xl shrink-0" />
                            <h2>3. Data Sourcing and Credit Acknowledgments</h2>
                        </div>
                        <p>
                            To ensure the complete realism of the olfactive profiles shown
                            throughout this application, structural data, fragrance accord
                            breakdowns, pyramids, and descriptions were compiled using references
                            from trusted online perfume resources. Specifically, key educational
                            reference material was sourced from{" "}
                            <a
                                href="https://www.fragrantica.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-dark underline font-semibold hover:text-green-dark/80 transition-colors"
                            >
                                Fragrantica
                            </a>{" "}
                            as well as other major community fragrance encyclopedias. All credit for
                            collective catalog organization guidelines belongs to their respective
                            platforms.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-primary-white border border-beige-light rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3 text-primary-black font-extrabold font-primary text-xl tracking-tight">
                            <FaShieldAlt className="text-green-dark text-2xl shrink-0" />
                            <h2>4. Sandbox Testing Data & Personal Information Safety</h2>
                        </div>
                        <p>
                            When typing data into the checkout testing pages, please use fake or
                            placeholder details.{" "}
                            <span className="text-amber-800 font-bold">
                                Do not input real credit cards, active passwords, or private home
                                addresses.
                            </span>{" "}
                            As the **Admin (Krut)**, I have set up this database exclusively for
                            safe software demonstration purposes. Neither the application nor the
                            admin will ever ask you for authentic, sensitive financial credentials.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-primary-white border border-beige-light rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                        <div className="flex items-center gap-3 text-primary-black font-extrabold font-primary text-xl tracking-tight">
                            <FaCode className="text-green-dark text-2xl shrink-0" />
                            <h2>5. Intellectual Property & Brand Intent</h2>
                        </div>
                        <p>
                            This platform was created solely as a live display of modern full-stack
                            web development techniques and user interface design. Brand names,
                            high-quality logos, and product trademarks referenced throughout the
                            system belong entirely to their respective legal owners. They are
                            included here under creative fair-use for contextual, aesthetic display
                            purposes within a personal student portfolio.
                        </p>
                    </section>
                </div>

                {/* --- SIGNATURE CLOSING FOOTNOTE --- */}
                <div className="pt-10 border-t border-beige-light text-center space-y-3">
                    <p className="font-secondary text-sm font-bold uppercase tracking-[0.15em] text-beige-dark">
                        Explore Freely • Crafted with Care by Admin (Krut)
                    </p>
                    <p className="text-base font-secondary text-secondary-black/80 max-w-xl mx-auto">
                        By interacting with this demo, you acknowledge that you are testing a safe,
                        sandboxed web development portfolio project.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default TermsAndConditions;
