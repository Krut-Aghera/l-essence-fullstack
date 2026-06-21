import React from 'react'
import { FaArrowRight, FaLayerGroup } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BrandCard = ({brand}) => {
      console.log(brand)
      return (
            <div
                  key={brand.id}
                  className="bg-primary-white rounded-2xl border border-beige-light overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
            >
                  {/* Image Frame Visualizer */}
                  <div className="h-64 relative overflow-hidden bg-secondary-white/60">
                        <img
                              src={brand?.image}
                              alt={`${brand?.brand} curation catalog layout`}
                              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                        />
                        {/* Floating Absolute Layer */}
                        <div className="absolute top-4 right-4 bg-primary-black/80 text-primary-white font-secondary text-[10px] font-medium tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                              <FaLayerGroup className="text-[9px] text-beige-light" />
                              <span>{brand?.perfumeCount} Creations</span>
                        </div>
                  </div>

                  {/* Content Frame & Action Block */}
                  <div className="p-6 space-y-4 grow flex flex-col justify-between">
                        <div className="text-left">
                              <h2 className="font-artistic text-xl font-bold text-primary-black tracking-wide line-clamp-1 group-hover:text-green-dark transition-colors">
                                    {brand?.name}
                              </h2>
                        </div>

                        <Link to={`/perfumes?brand=${encodeURIComponent(brand?.brand)}`} className="block w-full">
                              <button className="w-full bg-green-dark/3 hover:bg-green-dark text-green-dark hover:text-primary-white border border-green-dark/15 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer">
                                    <span>Explore Collection</span>
                                    <FaArrowRight className="text-[9px] transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                              </button>
                        </Link>
                  </div>
            </div>
      )
}

export default BrandCard