import React, { useEffect, useState } from 'react';
import {
      FaArrowRight,
      FaLeaf,
      FaTint,
      FaWind,
      FaAward
} from 'react-icons/fa';
import { Card, Footer, Header } from '../components';
import { fetchPerfumes } from '../apis/perfume.api';
import { useDispatch, useSelector } from 'react-redux';
import { setNewArrivals } from '../features/perfumeSlice';
import menFragsImage from '../assets/menFragsImage.png'
import womenFragsImage from '../assets/womenFragsImage.png'
import heroImage from '../assets/heroImage.png' // Verbatim reference to your uploaded asset
import { Link, useNavigate } from 'react-router-dom';

const scentFamilies = [
      { name: "Woody & Earth", counts: "12 Scents", tag: "Warm & Grounded" },
      { name: "Floral & Botanical", counts: "18 Scents", tag: "Fresh Bloom" },
      { name: "Discovery Sets", counts: "4 Curations", tag: "Find Your Signature" },
];

export default function Home() {
      const { newArrivals } = useSelector((state) => state.perfume);
      const dispatch = useDispatch();
      const navigate = useNavigate();

      useEffect(() => {
            const getPerfumes = async () => {
                  try {
                        const response = await fetchPerfumes({
                              limit: 4,
                              sort: "-createdAt"
                        });
                        dispatch(setNewArrivals(response.data?.perfumes || []));
                  } catch (err) {
                        console.error(err);
                  }
            };
            getPerfumes();
      }, [dispatch]);

      const handleMenClick = () => { navigate("/perfumes?gender=male"); };
      const handleWomenClick = () => { navigate("/perfumes?gender=female"); };

      return (
            <div className="min-h-screen bg-secondary-white text-primary-black font-primary">
                  <Header />

                  {/* ================= HERO SECTION ================= */}
                  <header className="relative px-6 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                        {/* Left Editorial Text Column */}
                        <div className="lg:col-span-6 space-y-8 z-10 text-center lg:text-left">
                              <div className="inline-block">
                                    <span className="font-artistic-secondary text-[10px] uppercase tracking-[0.25em] text-beige-dark bg-beige-light/40 px-4 py-1.5 rounded-full font-medium">
                                          The Premium Collection • 2026
                                    </span>
                              </div>
                              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary-black leading-[0.95]">
                                    Your destination for <br className="hidden sm:inline" />
                                    fine global <br className="hidden sm:inline" />
                                    <span className="font-tertiary text-4xl sm:text-5xl md:text-5xl font-normal text-green-dark block mt-3 normal-case tracking-normal">
                                          fragrance houses.
                                    </span>
                              </h1>
                              <p className="font-secondary text-sm sm:text-base text-secondary-black max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                                    We bring together the world's finest, most sought-after luxury and niche perfumes under one roof. No duplicates, no compromises—just 100% authentic designer fragrances curated directly for you.
                              </p>
                              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                                    <Link to={'/perfumes'}>
                                          <button className="bg-primary-black hover:bg-green-dark text-primary-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-sm flex items-center gap-3 text-xs uppercase tracking-wider group cursor-pointer">
                                                Shop the Collection <FaArrowRight className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-300" />
                                          </button>
                                    </Link>
                                    <Link to={'/perfumes/glossary'}>
                                          <button className="border border-primary-black/20 text-primary-black hover:bg-primary-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer">
                                                The Scent Directory
                                          </button>
                                    </Link>
                              </div>
                        </div>

                        {/* Right Decorative Graphic Column */}
                        <div className="lg:col-span-6 relative flex justify-center lg:justify-end w-full">

                              {/* Soft structural background blur element */}
                              <div className="absolute top-1/2 left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-beige-light/30 rounded-full blur-3xl -z-10 pointer-events-none" />

                              {/* Main Feature Container Frame */}
                              <div className="w-full max-w-md bg-primary-white border border-beige-light/60 rounded-3xl p-8 relative shadow-sm flex flex-col justify-between group overflow-hidden">

                                    {/* Accent Top Bar */}
                                    <div className="flex items-center justify-between border-b border-beige-light/30 pb-4">
                                          <span className="font-artistic-secondary text-[10px] uppercase tracking-widest text-beige-dark">
                                                Retail Guarantee
                                          </span>
                                          <span className="text-[10px] font-secondary text-secondary-black/60 bg-secondary-white px-2 py-0.5 rounded">
                                                100% Original Bottles
                                          </span>
                                    </div>

                                    {/* Middle Quote Statement Panel */}
                                    <div className="my-8 space-y-4">
                                          <div className="font-artistic-primary text-[29px] sm:text-[32px] text-primary-black tracking-wide leading-[1.15]">
                                                "A great fragrance isn't just a luxury; it's an invisible extension of who you are."
                                          </div>
                                          <div className="w-12 h-px bg-green-dark" />
                                    </div>

                                    {/* Simplified Retail/Sourcing Trust Box */}
                                    <div className="bg-secondary-white/50 border border-beige-light/40 p-5 rounded-2xl relative z-10 transition-colors group-hover:bg-primary-white duration-300">
                                          <div className="flex justify-between items-start mb-2">
                                                <div className="space-y-0.5">
                                                      <span className="text-[9px] uppercase tracking-widest text-green-dark font-bold font-secondary block">
                                                            Verified Distribution
                                                      </span>
                                                      <h4 className="text-xl font-bold text-primary-black tracking-tight">
                                                            Direct-From-Maison Sourcing
                                                      </h4>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-primary-white flex items-center justify-center text-green-dark border border-beige-light/40 shadow-sm">
                                                      <FaAward className="text-xs" />
                                                </div>
                                          </div>

                                          <p className="text-xs text-secondary-black font-secondary leading-relaxed">
                                                Every bottle in our boutique catalog features completely intact original serials, valid batch codes, and authentic luxury retail packaging.
                                          </p>
                                    </div>

                                    {/* Underlay Minimalist Clean Linework Watermark */}
                                    <div className="absolute right-4 top-1/4 pointer-events-none opacity-[0.03] select-none group-hover:opacity-[0.06] transition-opacity duration-500">
                                          <FaTint className="text-[18rem]" />
                                    </div>
                              </div>
                        </div>
                  </header>


                  {/* Core Brand Philosophy */}
                  <section className="bg-primary-white border-y border-beige-light py-8 px-6">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="p-3 rounded-xl bg-secondary-white text-green-dark"><FaLeaf size={20} /></div>
                                    <div>
                                          <h4 className="font-bold text-base text-primary-black">100% Authenticity Sourced</h4>
                                          <p className="font-secondary text-xs text-secondary-black mt-1">Directly curated from verified luxury networks. No clones, no compromises.</p>
                                    </div>
                              </div>
                              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="p-3 rounded-xl bg-secondary-white text-green-dark"><FaTint size={20} /></div>
                                    <div>
                                          <h4 className="font-bold text-base text-primary-black">Curated Niche Vault</h4>
                                          <p className="font-secondary text-xs text-secondary-black mt-1">Handpicked architectural masterworks from elite global designers.</p>
                                    </div>
                              </div>
                              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="p-3 rounded-xl bg-secondary-white text-beige-dark"><FaWind size={20} /></div>
                                    <div>
                                          <h4 className="font-bold text-base text-primary-black">Pragmatic Discovery</h4>
                                          <p className="font-secondary text-xs text-secondary-black mt-1">Skip the blind buys. Explore organized breakdowns before deciding.</p>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* Categorized Curation Grid */}
                  <section className="max-w-7xl mx-auto px-6 py-10 space-y-6" id="shop">
                        <div className="flex justify-between items-end">
                              <div>
                                    <h2 className="text-3xl font-bold text-primary-black">Discover Your Essence</h2>
                                    <p className="font-artistic-secondary text-xs text-secondary-black mt-1">Whether bold and charismatic or soft and captivating, find the fragrance that tells your story.</p>
                              </div>
                              <Link to={"/perfumes?gender=unisex"}>
                                    <button className="text-sm font-semibold text-green-dark active:text-green-light cursor-pointer duration-300 ease-in-out flex items-center gap-1.5 group">
                                          Shop Unisex Fragrances <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                              </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                              <div onClick={handleMenClick} className="rounded-2xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between h-80">
                                    <img src={menFragsImage} alt="mens fragrance image" className='w-full h-full object-cover object-top' />
                              </div>
                              <div onClick={handleWomenClick} className="rounded-2xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between h-80">
                                    <img src={womenFragsImage} alt="womens fragrance image" className='w-full h-full object-cover object-top' />
                              </div>
                        </div>
                  </section>

                  {/* Trending Products Grid */}
                  <section className="bg-primary-white border-t border-beige-light py-16 px-6">
                        <div className="max-w-7xl mx-auto space-y-8">
                              <div className="text-center max-w-md mx-auto space-y-2">
                                    <h2 className="text-3xl font-bold text-primary-black">New Arrivals</h2>
                                    <p className="font-secondary text-sm text-secondary-black">
                                          Explore the newest additions to our collection, where innovation meets timeless elegance.
                                    </p>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {newArrivals && newArrivals.map((prod) => (
                                          <Card key={prod._id} perfume={prod} />
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* ================= CURATED EDITS BY VIBE ================= */}
                  <section className="bg-secondary-white border-t border-beige-light py-16 px-6">
                        <div className="max-w-7xl mx-auto space-y-10">

                              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div className="space-y-2">
                                          <span className="font-artistic-secondary text-[10px] uppercase tracking-[0.2em] text-beige-dark block">
                                                Retailer Curation
                                          </span>
                                          <h2 className="text-3xl font-bold text-primary-black tracking-tight">
                                                Shop by Occasion & Vibe
                                          </h2>
                                    </div>
                                    <p className="font-secondary text-sm text-secondary-black max-w-md font-light leading-relaxed">
                                          We’ve categorized our luxury global catalog into distinct sensory profiles, making it effortless to find the exact match for your lifestyle.
                                    </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                    {/* Edit 1: Corporate / Power */}
                                    <div className="bg-primary-white border border-beige-light/50 p-8 rounded-3xl flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                                          <div className="space-y-4">
                                                <span className="text-[10px] uppercase tracking-wider bg-secondary-white text-primary-black font-semibold px-3 py-1 rounded-md inline-block">
                                                      The Boardroom Edit
                                                </span>
                                                <h3 className="text-2xl font-bold text-primary-black tracking-tight">
                                                      Crisp, Sharp & Commanding
                                                </h3>
                                                <p className="font-secondary text-xs text-secondary-black leading-relaxed font-light">
                                                      Tailored for high-stakes environments. Features refined designer profiles dominated by clean vetiver, rich cedarwood, and sharp Italian citrus.
                                                </p>
                                          </div>
                                          <div className="pt-8 flex items-center justify-between border-t border-beige-light/20 mt-6">
                                                <span className="text-[11px] text-beige-dark font-medium font-secondary">Ideal for: Professional Presence</span>
                                                <Link to="/perfumes?vibe=corporate" className="text-xs font-bold text-green-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                      View Curation <FaArrowRight className="text-[9px]" />
                                                </Link>
                                          </div>
                                    </div>

                                    {/* Edit 2: Night Out / Intimate */}
                                    <div className="bg-primary-white border border-beige-light/50 p-8 rounded-3xl flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                                          <div className="space-y-4">
                                                <span className="text-[10px] uppercase tracking-wider bg-secondary-white text-primary-black font-semibold px-3 py-1 rounded-md inline-block">
                                                      The After-Hours Edit
                                                </span>
                                                <h3 className="text-2xl font-bold text-primary-black tracking-tight">
                                                      Bold, Warm & Captivating
                                                </h3>
                                                <p className="font-secondary text-xs text-secondary-black leading-relaxed font-light">
                                                      Curated for evenings, intimate dinners, and night statements. Heavy on rare ambers, rich vanilla bean, and exotic spices that linger gracefully.
                                                </p>
                                          </div>
                                          <div className="pt-8 flex items-center justify-between border-t border-beige-light/20 mt-6">
                                                <span className="text-[11px] text-beige-dark font-medium font-secondary">Ideal for: Statement Evenings</span>
                                                <Link to="/perfumes?vibe=evening" className="text-xs font-bold text-green-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                      View Curation <FaArrowRight className="text-[9px]" />
                                                </Link>
                                          </div>
                                    </div>

                                    {/* Edit 3: Daily / Minimalist */}
                                    <div className="bg-primary-white border border-beige-light/50 p-8 rounded-3xl flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                                          <div className="space-y-4">
                                                <span className="text-[10px] uppercase tracking-wider bg-secondary-white text-primary-black font-semibold px-3 py-1 rounded-md inline-block">
                                                      The Second-Skin Edit
                                                </span>
                                                <h3 className="text-2xl font-bold text-primary-black tracking-tight">
                                                      Subtle, Clean & Effortless
                                                </h3>
                                                <p className="font-secondary text-xs text-secondary-black leading-relaxed font-light">
                                                      Light, office-safe, and perfect for casual luxury daywear. Features crisp molecule fragrances, soft musks, and freshly laundered cotton notes.
                                                </p>
                                          </div>
                                          <div className="pt-8 flex items-center justify-between border-t border-beige-light/20 mt-6">
                                                <span className="text-[11px] text-beige-dark font-medium font-secondary">Ideal for: Everyday Signature</span>
                                                <Link to="/perfumes?vibe=minimalist" className="text-xs font-bold text-green-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                      View Curation <FaArrowRight className="text-[9px]" />
                                                </Link>
                                          </div>
                                    </div>

                              </div>
                        </div>
                  </section>


                  {/* ================= REDESIGNED BRAND SHOWCASE BANNER ================= */}
                  <section className="bg-primary-white border-t border-beige-light py-16 px-6">
                        <div className="max-w-7xl mx-auto">
                              <div className="relative rounded-3xl overflow-hidden border border-beige-light shadow-sm min-h-105 flex items-center bg-secondary-white group">

                                    {/* Left Side: Editorial Context Card overlay */}
                                    <div className="relative z-10 w-full md:w-1/2 p-8 md:p-14 space-y-6 bg-linear-to-r from-secondary-white via-secondary-white/95 to-transparent md:to-secondary-white/0">
                                          <div className="flex items-center gap-2 text-green-dark">
                                                <FaAward className="text-sm" />
                                                <span className="font-artistic-secondary text-[10px] uppercase tracking-[0.2em] font-semibold text-beige-dark">
                                                      Curated Fragrance Heritage
                                                </span>
                                          </div>

                                          <div className="space-y-3">
                                                <h2 className="text-4xl md:text-5xl font-bold text-primary-black tracking-tight leading-tight">
                                                      Shop by <br />
                                                      Historic Maison
                                                </h2>
                                                <p className="font-secondary text-sm md:text-base text-secondary-black max-w-md leading-relaxed font-light">
                                                      Filter our entire architectural catalog database by world-class fragrance legacy houses, modern niche collectives, and master artisanal curators.
                                                </p>
                                          </div>

                                          <div className="pt-4">
                                                <Link to="/brands">
                                                      <button className="bg-primary-black hover:bg-green-dark text-primary-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-md flex items-center gap-3 text-xs uppercase tracking-wider group cursor-pointer">
                                                            Explore All Maisons
                                                            <FaArrowRight className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-300" />
                                                      </button>
                                                </Link>
                                          </div>
                                    </div>

                                    {/* Right Side: Showcase Cinematic Background Graphic (Verbatim asset reference) */}
                                    <div className="absolute inset-y-0 right-0 w-full md:w-3/5 h-full z-0 overflow-hidden">
                                          <img
                                                src={heroImage}
                                                alt="Maison curation layout blueprint"
                                                className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                                          />
                                          {/* Smooth gradient fade ensuring left text is perfectly readable regardless of screen scaling */}
                                          <div className="absolute inset-0 bg-linear-to-r from-secondary-white via-secondary-white/40 md:via-secondary-white/20 to-transparent pointer-events-none" />
                                    </div>

                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}