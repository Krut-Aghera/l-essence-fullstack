import React, { useEffect, useState } from 'react';
import {
      FaArrowRight,
      FaLeaf,
      FaTint,
      FaWind,
      FaAward,
      FaShieldAlt
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

const Home = () => {
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

                  <header className="relative px-6 py-16 md:py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center bg-secondary-white font-primary">


                        <div className="lg:col-span-7 space-y-6 z-10 text-center lg:text-left">
                              <div className="inline-block">
                                    <span className="font-secondary text-[10px] uppercase tracking-[0.2em] text-beige-dark bg-beige-light/30 px-3.5 py-1.5 rounded-full font-semibold">
                                          100% Authentic • The 2026 Collection
                                    </span>
                              </div>

                              <h1 className="text-[42px] sm:text-6xl md:text-6xl font-extrabold tracking-tight text-primary-black leading-[1.05]">
                                    Discover Premium <br />
                                    <span className="font-tertiary font-light text-green-dark inline-block mt-1">
                                          Global Fragrances
                                    </span>
                              </h1>

                              <p className="font-secondary text-sm sm:text-base text-secondary-black max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                                    Access a curated ledger of the world’s most sought-after luxury and niche perfumes. No duplicates, no compromises; sourced directly from authentic designer maisons.
                              </p>


                              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                                    <Link to="/perfumes">
                                          <button className="bg-primary-black hover:bg-green-dark text-primary-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-sm flex items-center gap-3 text-xs uppercase tracking-widest group cursor-pointer">
                                                Shop Collections
                                                <FaArrowRight className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-300" />
                                          </button>
                                    </Link>

                                    <Link to="/perfumes/glossary">
                                          <button className="border border-primary-black/20 hover:border-primary-black text-primary-black bg-white/50 hover:bg-white px-8 py-4 rounded-xl font-medium transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer shadow-sm">
                                                The Scent Directory
                                          </button>
                                    </Link>
                              </div>
                        </div>



                        <div className="hidden lg:flex lg:col-span-5 relative justify-center lg:justify-end w-full">

                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-beige-light/40 rounded-full blur-3xl -z-10 pointer-events-none" />

                              <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 relative shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">


                                    <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
                                          <div className="flex items-center gap-2">
                                                <FaShieldAlt className="text-green-dark text-sm" />
                                                <span className="font-secondary text-[11px] uppercase tracking-wider text-zinc-900 font-bold">
                                                      Retail Guarantee
                                                </span>
                                          </div>
                                          <span className="text-[10px] font-secondary text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-md font-medium">
                                                Original Bottling
                                          </span>
                                    </div>


                                    <div className="space-y-4 mb-6">
                                          <h3 className="font-artistic-primary text-2xl sm:text-3xl text-primary-black tracking-wide leading-snug">
                                                "An invisible extension of your identity."
                                          </h3>
                                          <div className="w-8 h-0.5 bg-green-dark rounded-full" />
                                    </div>


                                    <div className="bg-zinc-50 border border-zinc-100 p-4 sm:p-5 rounded-2xl relative z-10">
                                          <div className="flex justify-between items-start mb-2">
                                                <div>
                                                      <span className="text-[9px] uppercase tracking-wider text-green-dark font-extrabold font-secondary block mb-0.5">
                                                            Verified Distribution
                                                      </span>
                                                      <h4 className="text-base font-bold text-primary-black tracking-tight">
                                                            Maison Sourced Records
                                                      </h4>
                                                </div>
                                                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-green-dark border border-zinc-200 shadow-sm shrink-0">
                                                      <FaAward className="text-xs" />
                                                </div>
                                          </div>

                                          <p className="text-xs text-secondary-black font-secondary leading-relaxed font-light">
                                                Every purchase arrives in its complete native retail presentation box, housing uncompromised serials and clean batch codes matching distribution channels.
                                          </p>
                                    </div>


                                    <div className="absolute -right-10 -bottom-10 pointer-events-none opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500 text-primary-black">
                                          <FaTint className="text-[14rem]" />
                                    </div>
                              </div>
                        </div>

                  </header>


                  <section className="bg-primary-white border-t border-beige-light py-16 px-6">
                        <div className="max-w-7xl mx-auto">
                              <div className="relative rounded-3xl overflow-hidden border border-beige-light shadow-sm min-h-105 flex items-center bg-secondary-white group">

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


                  <section className="bg-secondary-white border-t border-beige-light py-16 px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto space-y-10">

                              {/* Header Area */}
                              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div className="space-y-2">
                                          <span className="font-artistic-secondary text-[10px] uppercase tracking-[0.2em] text-beige-dark block">
                                                Olfactory Families
                                          </span>
                                          <h2 className="text-2xl sm:text-3xl font-bold text-primary-black tracking-tight">
                                                Shop by Scent Archetype & Vibe
                                          </h2>
                                    </div>
                                    <p className="font-secondary text-xs sm:text-sm text-secondary-black max-w-md font-light leading-relaxed">
                                          We’ve categorized our luxury global catalog into distinct sensory profiles, making it effortless to find the exact olfactory signature for your style.
                                    </p>
                              </div>

                              {/* Responsive Grid Layout */}
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                                    {/* Profile 1: Bold Leathery Statement Maker */}
                                    <div className="bg-primary-white border border-beige-light/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                                          <div className="space-y-3 sm:space-y-4">
                                                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider bg-secondary-white text-primary-black font-semibold px-2 sm:px-3 py-1 rounded-md inline-block">
                                                      The Avant-Garde Edit
                                                </span>
                                                <h3 className="text-base sm:text-2xl font-bold text-primary-black tracking-tight leading-snug">
                                                      Bold, Leathery & Statement Maker
                                                </h3>
                                                <p className="font-secondary text-[11px] sm:text-xs text-secondary-black leading-relaxed font-light line-clamp-4 sm:line-clamp-none">
                                                      Unapologetic fragrances built for distinction. Dominated by raw Tuscan leather, smoky agarwood, dark amber, and sophisticated animalic accords.
                                                </p>
                                          </div>
                                          <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-beige-light/20 mt-4 sm:mt-6">
                                                <span className="text-[10px] sm:text-[11px] text-beige-dark font-medium font-secondary">Ideal for: Presence</span>
                                                <Link to="/perfumes?category=leather,tobacco,warm,oud" className="text-[11px] sm:text-xs font-bold text-green-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                      View <FaArrowRight className="text-[8px] sm:text-[9px]" />
                                                </Link>
                                          </div>
                                    </div>

                                    {/* Profile 2: Sophisticated Powdery Gentle */}
                                    <div className="bg-primary-white border border-beige-light/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                                          <div className="space-y-3 sm:space-y-4">
                                                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider bg-secondary-white text-primary-black font-semibold px-2 sm:px-3 py-1 rounded-md inline-block">
                                                      The Atelier Edit
                                                </span>
                                                <h3 className="text-base sm:text-2xl font-bold text-primary-black tracking-tight leading-snug">
                                                      Sophisticated, Powdery & Gentle
                                                </h3>
                                                <p className="font-secondary text-[11px] sm:text-xs text-secondary-black leading-relaxed font-light line-clamp-4 sm:line-clamp-none">
                                                      An elegant whisper rather than a shout. Features classic Florentine iris, soft white musk, delicate violet leaf, and clean, velvety suede notes.
                                                </p>
                                          </div>
                                          <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-beige-light/20 mt-4 sm:mt-6">
                                                <span className="text-[10px] sm:text-[11px] text-beige-dark font-medium font-secondary">Ideal for: Quiet Luxury</span>
                                                <Link to="/perfumes?category=powdery,musk,vetiver" className="text-[11px] sm:text-xs font-bold text-green-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                      View <FaArrowRight className="text-[8px] sm:text-[9px]" />
                                                </Link>
                                          </div>
                                    </div>

                                    {/* Profile 3: Fresh Pleasing */}
                                    <div className="bg-primary-white border border-beige-light/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                                          <div className="space-y-3 sm:space-y-4">
                                                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider bg-secondary-white text-primary-black font-semibold px-2 sm:px-3 py-1 rounded-md inline-block">
                                                      The Riviera Edit
                                                </span>
                                                <h3 className="text-base sm:text-2xl font-bold text-primary-black tracking-tight leading-snug">
                                                      Fresh, Crisp & Pleasing
                                                </h3>
                                                <p className="font-secondary text-[11px] sm:text-xs text-secondary-black leading-relaxed font-light line-clamp-4 sm:line-clamp-none">
                                                      Effortless, clean daytime classics. Vibrant profiles showcasing effervescent Amalfi citrus, clean marine accord, and freshly crushed mint leaves.
                                                </p>
                                          </div>
                                          <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-beige-light/20 mt-4 sm:mt-6">
                                                <span className="text-[10px] sm:text-[11px] text-beige-dark font-medium font-secondary">Ideal for: Clean Signature</span>
                                                <Link to="/perfumes?category=fresh,green,floral,aquatic" className="text-[11px] sm:text-xs font-bold text-green-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                      View <FaArrowRight className="text-[8px] sm:text-[9px]" />
                                                </Link>
                                          </div>
                                    </div>

                                    {/* Profile 4: Warm Gourmand */}
                                    <div className="bg-primary-white border border-beige-light/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between group hover:shadow-md transition-all duration-300">
                                          <div className="space-y-3 sm:space-y-4">
                                                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider bg-secondary-white text-primary-black font-semibold px-2 sm:px-3 py-1 rounded-md inline-block">
                                                      The After-Hours Edit
                                                </span>
                                                <h3 className="text-base sm:text-2xl font-bold text-primary-black tracking-tight leading-snug">
                                                      Warm, Decadent & Gourmand
                                                </h3>
                                                <p className="font-secondary text-[11px] sm:text-xs text-secondary-black leading-relaxed font-light line-clamp-4 sm:line-clamp-none">
                                                      Rich, addictive scent profiles loaded with warmth. Masterfully blends Madagascar vanilla bean, dark chocolate, and roasted tonka bean.
                                                </p>
                                          </div>
                                          <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-beige-light/20 mt-4 sm:mt-6">
                                                <span className="text-[10px] sm:text-[11px] text-beige-dark font-medium font-secondary">Ideal for: Intimate</span>
                                                <Link to="/perfumes?category=gourmand,vanilla" className="text-[11px] sm:text-xs font-bold text-green-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                      View <FaArrowRight className="text-[8px] sm:text-[9px]" />
                                                </Link>
                                          </div>
                                    </div>

                              </div>
                        </div>
                  </section>


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
                              <div onClick={handleMenClick} className="rounded-2xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between h-85">
                                    <img src={menFragsImage} alt="mens fragrance image" className='w-full h-full object-cover object-center' />
                              </div>
                              <div onClick={handleWomenClick} className="rounded-2xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between h-85">
                                    <img src={womenFragsImage} alt="womens fragrance image" className='w-full h-full object-cover object-center' />
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}


export default Home