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
import { useNavigate } from 'react-router-dom';

const scentFamilies = [
      { name: "Woody & Earth", counts: "12 Scents", tag: "Warm & Grounded" },
      { name: "Floral & Botanical", counts: "18 Scents", tag: "Fresh Bloom" },
      { name: "Discovery Sets", counts: "4 Curations", tag: "Find Your Signature" },
];


export default function Home() {

      const { newArrivals } = useSelector((state) => state.perfume);

      const dispatch = useDispatch();
      const navigate = useNavigate()

      useEffect(() => {
            const getPerfumes = async () => {
                  try {
                        if (!newArrivals?.length) {
                              const response = await fetchPerfumes({
                                    limit: 4,
                                    sort: '-createdAt'
                              });

                              dispatch(
                                    setNewArrivals(
                                          response.data?.perfumes || []
                                    )
                              );
                        }
                  } catch (err) {
                        console.error(err);
                  }
            };

            getPerfumes();
      }, [dispatch, newArrivals]);



      const handleMenClick = () => {
            navigate("/perfumes?gender=male");
      };

      const handleWomenClick = () => {
            navigate("/perfumes?gender=female");
      };


      return (
            <div className="min-h-screen bg-[#F0F0F0] text-[#222831] font-['Alegreya_Sans',sans-serif]">

                  <Header />

                  {/* 2. Hero Section */}
                  <header className="relative px-6 py-16 md:py-28 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6 space-y-6 z-10">
                              <span className="inline-block font-['Federo',cursive] text-xs uppercase tracking-widest text-[#837664] bg-[#DFD0B8]/40 px-3 py-1 rounded-full">
                                    Spring Botanicals 2026
                              </span>
                              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#222831] leading-[1.05]">
                                    Scents that linger like <br />
                                    <span className="font-['Allura',cursive] text-6xl md:text-7xl font-normal text-[#4F6F52] block mt-2 capitalize">poetry.</span>
                              </h1>
                              <p className="font-['Roboto',sans-serif] text-base text-[#4B5563] max-w-md leading-relaxed">
                                    Artisanally blended botanical perfumes. Small-batch, cruelty-free, and designed to melt seamlessly into your unique skin chemistry.
                              </p>
                              <div className="flex items-center gap-4 pt-2">
                                    <button className="bg-[#4F6F52] hover:bg-[#739072] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-sm flex items-center gap-2 text-sm group">
                                          Shop Fragrances <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button className="border border-[#948979] text-[#222831] hover:bg-white px-6 py-3 rounded-xl font-medium transition-all text-sm">
                                          Take the Scent Quiz
                                    </button>
                              </div>
                        </div>

                        {/* Decorative Editorial Graphic Feature side */}
                        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
                              <div className="w-full max-w-md h-[400px] bg-gradient-to-tr from-[#DFD0B8] via-[#DFD0B8]/60 to-[#739072]/20 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between border border-[#DFD0B8] shadow-inner">
                                    <div className="font-['Pompiere',cursive] text-4xl text-[#837664] tracking-wide leading-tight">
                                          "Perfume is the art that makes memory speak."
                                    </div>
                                    <div className="space-y-2 font-['Roboto',sans-serif] relative z-10">
                                          <div className="text-xs uppercase tracking-widest text-[#948979] font-bold">Featured Note</div>
                                          <div className="text-xl font-['Alegreya_Sans',sans-serif] font-bold text-[#222831]">Himalayan Cedarwood</div>
                                    </div>
                                    {/* Abstract Perfume Droplet Graphic */}
                                    <div className="absolute -right-12 -bottom-10 w-56 h-56 rounded-full border border-[#739072]/30 flex items-center justify-center opacity-60 pointer-events-none">
                                          <div className="w-40 h-40 rounded-full border border-[#DFD0B8] flex items-center justify-center">
                                                <FaTint className="text-8xl text-[#DFD0B8]/40" />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </header>

                  {/* 3. Core Brand Philosophy (Value Props) */}
                  <section className="bg-white border-y border-[#DFD0B8] py-8 px-6">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[#F0F0F0] text-[#4F6F52]"><FaLeaf size={20} /></div>
                                    <div>
                                          <h4 className="font-bold text-base text-[#222831]">100% Vegan & Botanical</h4>
                                          <p className="font-['Roboto',sans-serif] text-xs text-[#4B5563] mt-1">Ethically harvested plant extracts. Cruelty-free always.</p>
                                    </div>
                              </div>
                              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[#F0F0F0] text-[#4F6F52]"><FaTint size={20} /></div>
                                    <div>
                                          <h4 className="font-bold text-base text-[#222831]">Clean & Skin-Safe</h4>
                                          <p className="font-['Roboto',sans-serif] text-xs text-[#4B5563] mt-1">Free from parabens, phthalates, and synthetic dyes.</p>
                                    </div>
                              </div>
                              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                    <div className="p-3 rounded-xl bg-[#F0F0F0] text-[#837664]"><FaWind size={20} /></div>
                                    <div>
                                          <h4 className="font-bold text-base text-[#222831]">Intoxicating Sillage</h4>
                                          <p className="font-['Roboto',sans-serif] text-xs text-[#4B5563] mt-1">High-concentration extraits designed for all-day wear.</p>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* 4. Categorized Curation Grid */}
                  <section className="max-w-7xl mx-auto px-6 py-10 space-y-6" id="shop">
                        <div className="flex justify-between items-end">
                              <div>
                                    <h2 className="text-3xl font-bold text-[#222831]">Explore by Scent Profile</h2>
                                    <p className="font-artistic-secondary text-xs text-[#4B5563] mt-1">Discover your next signature aura.</p>
                              </div>
                              <button className="text-sm font-semibold text-[#4F6F52] hover:text-[#739072] flex items-center gap-1.5 group">
                                    All Profiles <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                              </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                              <div
                                    onClick={handleMenClick}
                                    className="rounded-2xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between h-80">
                                    <img src={menFragsImage} alt="mens fragrance image"
                                          className='w-full h-full object-cover object-top' />
                              </div>
                              <div
                                    onClick={handleWomenClick}
                                    className="rounded-2xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between h-80">
                                    <img src={womenFragsImage} alt="womens fragrance image"
                                          className='w-full h-full object-cover object-top' />
                              </div>
                        </div>
                  </section>


                  {/* 5. Trending Products Grid */}
                  <section className="bg-white border-t border-[#DFD0B8] py-16 px-6">
                        <div className="max-w-7xl mx-auto space-y-8">
                              <div className="text-center max-w-md mx-auto space-y-2">
                                    <h2 className="text-3xl font-bold text-[#222831]">New Arrivals</h2>
                                    <p className="font-['Roboto',sans-serif] text-sm text-[#4B5563]">
                                          Explore the newest additions to our collection, where innovation meets timeless elegance.
                                    </p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {
                                          newArrivals
                                          && newArrivals.map((prod) => (
                                                <Card key={prod._id} perfume={prod} />
                                          ))
                                    }
                              </div>
                        </div>
                  </section>

                  {/* 6. Footer Block */}
                  <Footer />

            </div>
      );
}