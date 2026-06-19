import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Footer, Header } from '../components';
import { fetchBrands } from '../apis/perfume.api';


export default function BrandShowcase() {
      const [brands, setBrands] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
      const [isLoading, setIsLoading] = useState(true);


      useEffect(() => {
            const fetchBrandsHandler = async () => {
                  try {
                        setIsLoading(true);
                        const response = await fetchBrands()
                        setBrands( response.data )
                  } catch (err) {
                        console.log(err)
                  } finally {
                        setIsLoading(false);
                  }
            };

            fetchBrandsHandler();
      }, []);

      // Filter list smoothly based on search parameters
      const filteredBrands = brands?.filter((brand) =>
            brand.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (<>

            <Header />

            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-secondary-white">

                  {/* Editorial Header Section */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-beige-light/60 pb-6 mb-8 gap-4">
                        <div>
                              <span className="text-[10px] font-bold tracking-widest text-beige-dark uppercase font-secondary">
                                    Curated Collections
                              </span>
                              <h2 className="text-3xl md:text-4xl font-primary font-bold text-primary-black mt-1">
                                    Fragrance Houses
                              </h2>
                              <p className="text-xs sm:text-sm font-secondary text-secondary-black/80 mt-1 max-w-md">
                                    Explore premium masterpieces cataloged by their original creative design houses.
                              </p>
                        </div>

                  </div>

                  {/* --- DISPLAY SWITCHBOARD --- */}

                  {/* 1. Loading Skeletons */}
                  {isLoading && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                              {[...Array(12)].map((_, idx) => (
                                    <div key={idx} className="h-24 bg-primary-white border border-beige-light/40 rounded-xl p-5 flex flex-col items-center justify-center animate-pulse">
                                          <div className="w-24 h-3 bg-secondary-white rounded mb-2" />
                                          <div className="w-12 h-2.5 bg-secondary-white rounded" />
                                    </div>
                              ))}
                        </div>
                  )}

                  {/* 3. Pure Typography Brand Grid */}
                  {!isLoading && filteredBrands.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                              {filteredBrands.map((brand) => {
                                    const targetQuery = encodeURIComponent(brand.brand);

                                    return (
                                          <Link
                                                key={brand.brand}
                                                to={`/perfumes?brand=${targetQuery}`}

                                                className="group relative h-40 bg-primary-white/50 border-2 border-beige-light/40 gap-3 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-sm shadow-beige-light/40 hover:shadow-md cursor-pointer"
                                          >
                                                {/* Brand Title String */}
                                                <h3 className="font-artistic-secondary font-bold text-2xl sm:text-lg text-secondary-black capitalize group-hover:text-beige-dark transition-colors duration-200 line-clamp-2 px-1">
                                                      {brand.brand}
                                                </h3>

                                                {/* Quantitative Product Count Tag */}
                                                {brand.perfumeCount !== undefined && (
                                                      <span className="text-[12px] font-secondary font-medium text-secondary-black/40 group-hover:text-green-light duration-300 block">
                                                            {brand.perfumeCount} Products
                                                      </span>
                                                )}
                                          </Link>
                                    );
                              })}
                        </div>
                  )}

            </section>
            <Footer />
      </>
      );
}