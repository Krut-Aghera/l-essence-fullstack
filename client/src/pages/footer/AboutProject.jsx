import React from "react";
import {
    FaCode,
    FaDatabase,
    FaServer,
    FaCloud,
    FaInfoCircle,
    FaUserGraduate,
    FaCalendarAlt,
    FaLock,
    FaSlidersH,
} from "react-icons/fa";

const AboutProject = () => {
    return (
        <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary selection:bg-green-dark/10">
            {/* --- HEADER SECTION --- */}
            <div className="bg-primary-white border-b border-beige-light py-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <span className="font-secondary text-sm font-semibold uppercase tracking-[0.2em] text-beige-dark block">
                        The Creator & The Vision
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary-black leading-tight">
                        Behind the Project
                    </h1>
                    <p className="text-lg md:text-xl font-secondary text-secondary-black max-w-2xl mx-auto leading-relaxed">
                        A simple overview of how this website was built, who created it, and how the
                        entire system works under the hood.
                    </p>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <main className="grow max-w-4xl w-full mx-auto px-6 py-16 space-y-16">
                {/* IMPORTANT DISCLAIMER BOX */}
                <div className="bg-amber-50/40 border-2 border-amber-200/70 p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row gap-5 items-start">
                    <div className="p-3 bg-amber-100 rounded-xl text-amber-800 shrink-0 mt-0.5">
                        <FaInfoCircle size={24} />
                    </div>
                    <div className="space-y-3 font-secondary text-base text-secondary-black leading-relaxed">
                        <strong className="text-amber-900 font-bold uppercase tracking-wider block text-sm">
                            Please Note: This is a Practice Demo Website
                        </strong>
                        <p>
                            This entire platform is created purely as a{" "}
                            <span className="text-amber-900 font-semibold underline decoration-amber-300">
                                personal hobby project and design portfolio
                            </span>
                            .<strong> No real products are for sale</strong>, no real money is
                            processed, and nothing will be shipped to your house. You are completely
                            free to test out adding items to your shopping bag, explore the menus,
                            and click around to test how the website responds. Everything you see
                            here is a safe, simulated testing environment!
                        </p>
                    </div>
                </div>

                {/* DEVELOPER PROFILE SECTION */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pt-4">
                    <div className="md:col-span-5 space-y-4">
                        <div className="bg-primary-white border border-beige-light rounded-2xl p-8 text-center space-y-4 shadow-sm">
                            <div className="w-24 h-24 bg-secondary-white rounded-full mx-auto flex items-center justify-center text-green-dark border border-beige-light shadow-inner">
                                <FaUserGraduate size={40} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-black text-2xl text-primary-black font-primary tracking-tight">
                                    Krut Aghera
                                </h3>
                                <p className="text-sm font-semibold font-secondary text-green-dark">
                                    Fullstack Developer
                                </p>
                            </div>

                            <div className="pt-4 border-t border-beige-light/60 text-sm text-left space-y-3 text-secondary-black font-secondary">
                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-beige-dark text-base" />
                                    <span>
                                        Launched:{" "}
                                        <span className="font-semibold text-primary-black">
                                            June 20, 2026
                                        </span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-dark animate-pulse" />
                                    <span>
                                        Status:{" "}
                                        <span className="font-semibold text-green-dark">
                                            Live & Fully Functional
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7 space-y-6 font-secondary text-base md:text-[18px] text-secondary-black leading-relaxed">
                        <h2 className="text-3xl font-extrabold font-primary text-primary-black tracking-tight">
                            How It All Started
                        </h2>
                        <p>
                            As a final-year{" "}
                            <span className="text-green-dark font-bold">
                                BCA (Bachelor of Computer Applications) student graduating in June
                                2026
                            </span>
                            , this website is a massive milestone for me. It is my very{" "}
                            <span className="text-green-dark font-bold">
                                first complete full-stack website launched live
                            </span>{" "}
                            on the internet.
                        </p>
                        <p>
                            Combining my passion for writing clean computer code with a personal
                            love for fine fragrances, I wanted to build an online store that looks
                            incredibly clean on the outside, while staying powerful and organized
                            behind the scenes.
                        </p>
                        <p>
                            Every single perfume profile, image link, and description listed here
                            was{" "}
                            <span className="text-primary-black font-semibold underline decoration-beige-dark decoration-2">
                                hand-typed and organized into the system by myself
                            </span>{" "}
                            to create a completely realistic experience.
                        </p>
                    </div>
                </section>

                {/* SYSTEM FEATURES GRID */}
                <section className="space-y-6 pt-4">
                    <h3 className="text-2xl font-extrabold text-primary-black tracking-tight font-primary">
                        Features Built Into This System
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-secondary text-base text-secondary-black">
                        {/* FEATURE 1 */}
                        <div className="p-6 bg-primary-white border border-beige-light rounded-2xl space-y-3 shadow-sm hover:border-green-dark/30 transition-colors">
                            <div className="flex items-center gap-3 text-primary-black font-extrabold font-primary text-lg">
                                <FaSlidersH className="text-green-dark text-xl" />
                                <h4>My Central Admin (Krut) Control Panel</h4>
                            </div>
                            <p>
                                A private control panel dashboard built specifically for me as the
                                admin (Krut) to easily watch incoming test orders, monitor total
                                active brands, and track stock amounts.
                            </p>
                        </div>

                        {/* FEATURE 2 */}
                        <div className="p-6 bg-primary-white border border-beige-light rounded-2xl space-y-3 shadow-sm hover:border-green-dark/30 transition-colors">
                            <div className="flex items-center gap-3 text-primary-black font-extrabold font-primary text-lg">
                                <FaDatabase className="text-green-dark text-xl" />
                                <h4>Add, Edit & Delete Items</h4>
                            </div>
                            <p>
                                The system is connected directly to a database, allowing me to{" "}
                                <span className="text-green-dark font-semibold">
                                    instantly add brand new fragrances, update prices, or remove
                                    items
                                </span>{" "}
                                from the storefront in real time.
                            </p>
                        </div>

                        {/* FEATURE 3 */}
                        <div className="p-6 bg-primary-white border border-beige-light rounded-2xl space-y-3 shadow-sm hover:border-green-dark/30 transition-colors">
                            <div className="flex items-center gap-3 text-primary-black font-extrabold font-primary text-lg">
                                <FaLock className="text-green-dark text-xl" />
                                <h4>Protected Admin Security</h4>
                            </div>
                            <p>
                                I built digital security gates on both the front end and backend so
                                that{" "}
                                <span className="text-amber-800 font-semibold">
                                    only me as the authorized admin (Krut)
                                </span>{" "}
                                can securely change product settings or view client orders.
                            </p>
                        </div>

                        {/* FEATURE 4 */}
                        <div className="p-6 bg-primary-white border border-beige-light rounded-2xl space-y-3 shadow-sm hover:border-green-dark/30 transition-colors">
                            <div className="flex items-center gap-3 text-primary-black font-extrabold font-primary text-lg">
                                <FaCode className="text-green-dark text-xl" />
                                <h4>Modern Shopping Foundations</h4>
                            </div>
                            <p>
                                Equipped with instant smart search tools, lightning-fast data
                                loading, global store layout management, and automatic protection to
                                handle any accidental errors gracefully.
                            </p>
                        </div>
                    </div>
                </section>

                {/* TECH STACK TOOLS */}
                <section className="bg-primary-white border border-beige-light rounded-2xl p-8 shadow-sm space-y-6">
                    <h3 className="text-xl font-extrabold text-primary-black tracking-tight font-primary text-center md:text-left">
                        The Digital Tools Used
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-secondary-white/60 rounded-xl border border-beige-light/40">
                            <FaCode className="text-green-dark mx-auto mb-2 text-xl" />
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-black block">
                                Front End
                            </span>
                            <span className="text-xs text-secondary-black font-medium block mt-1">
                                React & Redux
                            </span>
                        </div>

                        <div className="p-4 bg-secondary-white/60 rounded-xl border border-beige-light/40">
                            <FaServer className="text-green-dark mx-auto mb-2 text-xl" />
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-black block">
                                Back End
                            </span>
                            <span className="text-xs text-secondary-black font-medium block mt-1">
                                Node.js & Express
                            </span>
                        </div>

                        <div className="p-4 bg-secondary-white/60 rounded-xl border border-beige-light/40">
                            <FaDatabase className="text-green-dark mx-auto mb-2 text-xl" />
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-black block">
                                Database
                            </span>
                            <span className="text-xs text-secondary-black font-medium block mt-1">
                                MongoDB Atlas
                            </span>
                        </div>

                        <div className="p-4 bg-secondary-white/60 rounded-xl border border-beige-light/40">
                            <FaCloud className="text-green-dark mx-auto mb-2 text-xl" />
                            <span className="text-xs font-bold uppercase tracking-wider text-primary-black block">
                                Design & Assets
                            </span>
                            <span className="text-xs text-secondary-black font-medium block mt-1">
                                Tailwind & Cloudinary
                            </span>
                        </div>
                    </div>
                </section>

                {/* CLOSING STATEMENT */}
                <div className="text-center pt-10 border-t border-beige-light space-y-3">
                    <p className="font-secondary text-sm font-bold uppercase tracking-[0.15em] text-beige-dark">
                        Thank you for checking out my project!
                    </p>
                    <p className="text-base font-secondary text-secondary-black/80 max-w-xl mx-auto">
                        You are warmly invited to interact with everything, run a simulated checkout
                        order, and look around as much as you like.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default AboutProject;
