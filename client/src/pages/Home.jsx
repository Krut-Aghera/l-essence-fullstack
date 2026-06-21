import React, { useEffect, useState } from 'react';
import {
      FaArrowRight,
      FaLeaf,
      FaTint,
      FaWind
} from 'react-icons/fa';
import { Card, Footer, Header } from '../components';
import { fetchPerfumes } from '../apis/perfume.api';
import { useDispatch, useSelector } from 'react-redux';
import { setNewArrivals } from '../features/perfumeSlice';
import menFragsImage from '../assets/menFragsImage.png'
import womenFragsImage from '../assets/womenFragsImage.png'
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
                                          Collection No. II • Spring 2026
                                    </span>
                              </div>
                              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-primary-black leading-[0.95]">
                                    Olfactory stories <br className="hidden sm:inline" />
                                    written for <br className="hidden sm:inline" />
                                    <span className="font-tertiary text-6xl sm:text-7xl md:text-6xl font-normal text-green-dark block mt-3 normal-case tracking-normal">
                                          the skin canvas.
                                    </span>
                              </h1>
                              <p className="font-secondary text-sm sm:text-base text-secondary-black max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                                    Moving beyond basic scents into high-art liquid architecture. Our extraits fuse rare botanical extractions with individual molecular pheromones to create an invisible, lingering signature.
                              </p>
                              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                                    <Link to={'/perfumes'}>
                                          <button className="bg-primary-black hover:bg-green-dark text-primary-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-sm flex items-center gap-3 text-xs uppercase tracking-wider group cursor-pointer">
                                                Experience the Sillage<FaArrowRight className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-300" />
                                          </button>
                                    </Link>
                                    <Link to={'/perfumes/glossary'}>
                                          <button className="border border-primary-black/20 text-primary-black hover:bg-primary-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer">
                                                Scent Compendium
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
                                                Architecture Profile
                                          </span>
                                          <span className="text-[10px] font-secondary text-secondary-black/60 bg-secondary-white px-2 py-0.5 rounded">
                                                Batch No. 892
                                          </span>
                                    </div>

                                    {/* Middle Quote Statement Panel */}
                                    <div className="my-8 space-y-4">
                                          <div className="font-artistic-primary text-[38px] text-primary-black tracking-wide leading-[1.1]">
                                                "A dynamic blend does not mask identity; it translates memory into an intimate presence."
                                          </div>
                                          <div className="w-12 h-px bg-green-dark" />
                                    </div>

                                    {/* Interactive Blueprint Pyramid Info Box */}
                                    <div className="bg-secondary-white/50 border border-beige-light/40 p-4 rounded-2xl relative z-10 transition-colors group-hover:bg-primary-white duration-300">
                                          <div className="flex justify-between items-start mb-3">
                                                <div className="space-y-0.5">
                                                      <span className="text-[9px] uppercase tracking-widest text-beige-dark font-bold font-secondary">
                                                            Solitary Accord Core
                                                      </span>
                                                      <h4 className="text-xl font-bold text-primary-black tracking-tight">
                                                            Himalayan Cedarwood
                                                      </h4>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-primary-white flex items-center justify-center text-green-dark border border-beige-light/40 shadow-sm">
                                                      <FaWind className="text-xs animate-pulse" />
                                                </div>
                                          </div>

                                          {/* Mini Structural Breakdown Grid */}
                                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-beige-light/20 text-[11px] font-secondary">
                                                <div>
                                                      <span className="text-beige-dark block text-[9px] uppercase font-bold">Top</span>
                                                      <span className="text-primary-black">Bergamot Peel</span>
                                                </div>
                                                <div>
                                                      <span className="text-beige-dark block text-[9px] uppercase font-bold">Heart</span>
                                                      <span className="text-primary-black">Crushed Iris</span>
                                                </div>
                                                <div>
                                                      <span className="text-green-dark block text-[9px] uppercase font-black">Base</span>
                                                      <span className="text-primary-black font-semibold">Dry Amber Wood</span>
                                                </div>
                                          </div>
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
                                          <h4 className="font-bold text-base text-primary-black">100% Vegan & Botanical</h4>
                                          <p className="font-secondary text-xs text-secondary-black mt-1">Ethically harvested plant extracts. Cruelty-free always.</p>
                                    </div>
                              </div>
                              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="p-3 rounded-xl bg-secondary-white text-green-dark"><FaTint size={20} /></div>
                                    <div>
                                          <h4 className="font-bold text-base text-primary-black">Clean & Skin-Safe</h4>
                                          <p className="font-secondary text-xs text-secondary-black mt-1">Free from parabens, phthalates, and synthetic dyes.</p>
                                    </div>
                              </div>
                              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="p-3 rounded-xl bg-secondary-white text-beige-dark"><FaWind size={20} /></div>
                                    <div>
                                          <h4 className="font-bold text-base text-primary-black">Intoxicating Sillage</h4>
                                          <p className="font-secondary text-xs text-secondary-black mt-1">High-concentration extraits designed for all-day wear.</p>
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

                  {/* Shop By Brand House Curation */}
                  <section className="bg-secondary-white border-t border-beige-light py-20 px-6">
                        <div className="max-w-7xl mx-auto space-y-10">
                              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                    <div>
                                          <h2 className="text-3xl font-bold text-primary-black">Shop by Maison</h2>
                                          <p className="font-artistic-secondary text-xs text-secondary-black mt-1">Filter our database by elite fragrance architecture houses and master artisanal designers.</p>
                                    </div>
                                    <Link to={"/brands"}>
                                          <button className="text-sm font-semibold text-green-dark active:text-green-light cursor-pointer duration-300 ease-in-out flex items-center gap-1.5 group">
                                                Explore All Maisons<FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                                          </button>
                                    </Link>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                          { name: 'Afnan Perfumes', quote: 'Aromatic depth & Eastern mastery', img: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600' },
                                          { name: 'Maison Oud', quote: 'Rich, resinous core elements', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
                                          { name: 'Botanical Artisan', quote: 'Pure small-batch cold presses', img: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600' },
                                          { name: 'Niche Reserve', quote: 'Avant-garde sensory concepts', img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600' }
                                    ].map((brand, i) => (
                                          <Link
                                                key={i}
                                                to={`/perfumes?brand=${encodeURIComponent(brand.name)}`}
                                                className="group relative h-72 rounded-2xl overflow-hidden border border-beige-light shadow-sm bg-primary-white flex flex-col justify-end p-6 hover:shadow-md transition-all duration-300"
                                          >
                                                <div className="absolute inset-0 w-full h-full overflow-hidden">
                                                      <img
                                                            src={brand.img}
                                                            alt={`${brand.name} collection`}
                                                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                                                      />
                                                      <div className="absolute inset-0 bg-linear-to-t from-primary-black/90 via-primary-black/40 to-transparent" />
                                                </div>
                                                <div className="relative z-10 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                      <h3 className="font-artistic-secondary text-lg text-primary-white tracking-wide">
                                                            {brand.name}
                                                      </h3>
                                                      <p className="font-secondary text-[11px] text-beige-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            {brand.quote}
                                                      </p>
                                                </div>
                                          </Link>
                                    ))}
                              </div>
                        </div>
                  </section>

                  <Footer />
            </div>
      );
}