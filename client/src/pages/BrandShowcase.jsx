import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BrandCard } from '../components';
import { fetchBrands } from '../apis/perfume.api';
import { useDispatch, useSelector } from 'react-redux';
import { setBrands } from '../features/perfumeSlice';
import { showErrorToast } from '../utils/hotToast';

export default function BrandsPage() {

      const dispatch = useDispatch()
      const { brands } = useSelector(state => state.perfume)

      console.log(brands)
      
      useEffect(() => {
            const getAllBrand = async () => {
                  try {
                        const response = await fetchBrands()
                        dispatch(setBrands(response?.data))
                        
                  } catch (err) {
                        console.log(err.response)
                  }
            }
            
            getAllBrand()
      }, [])
      
      return (
            <div className="min-h-screen bg-secondary-white text-primary-black font-primary flex flex-col">
                  <Header />

                  {/* --- 1. EDITORIAL PAGE HEADER --- */}
                  <header className="px-6 pt-16 pb-12 max-w-7xl w-full mx-auto space-y-6 text-center md:text-left">
                        <div className="space-y-3">
                              <span className="inline-block font-artistic text-[10px] uppercase tracking-[0.25em] text-beige-dark bg-beige-light/30 px-4 py-1.5 rounded-full">
                                    The Olfactive Directory
                              </span>
                              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary-black">
                                    Fragrance Houses & Maisons
                              </h1>
                        </div>
                        <p className="font-secondary text-sm md:text-base text-secondary-black max-w-xl leading-relaxed">
                              Explore curated collections from the world’s elite scent architects, legacy blending lines, and modern formulation studios.
                        </p>
                  </header>

                  {/* --- 2. MAIN BRANDS ARCHITECTURE GRID --- */}
                  <main className="grow max-w-7xl w-full mx-auto px-6 pb-24">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                              {brands.map((brand, index) => (
                                    <BrandCard key={index} brand={brand} />
                              ))}
                        </div>
                  </main>

                  <Footer />
            </div>
      );
}