import React from "react";
import { FaArrowRight, FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";

const BrandCard = ({ brand }) => {
      return (
            <div
                  key={brand.id}
                  className="bg-primary-white rounded-2xl border border-beige-light overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300 group"
            >
                  {/* --- Visual Frame (Scaled Down) --- */}
                  <div className="h-52 relative overflow-hidden bg-secondary-white/40">
                        <img
                              src={brand?.image}
                              alt={`${brand?.brand} curation showcase`}
                              className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500 ease-out"
                        />
                        {/* Subtle Gradient Shadow Base */}
                        <div className="absolute inset-0 bg-linear-to-t from-primary-black/20 via-transparent to-transparent opacity-60" />

                        {/* Compact Floating Top Pill */}
                        <div className="absolute top-3 right-3 bg-primary-white/90 text-primary-black font-secondary text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md flex items-center gap-1 border border-beige-light/20">
                              <FaLayerGroup className="text-[8px] text-green-dark" />
                              <span>{brand?.perfumeCount} SKUs</span>
                        </div>
                  </div>

                  {/* --- Content Frame (Compact Spacing) --- */}
                  <div className="p-4 flex flex-col justify-between grow space-y-4">
                        <div className="text-left">
                              <span className="text-[9px] font-secondary uppercase tracking-widest text-secondary-black/40 font-bold block">
                                    House Curation
                              </span>
                              <h2 className="font-artistic text-lg font-bold capitalize text-primary-black tracking-wide line-clamp-1 group-hover:text-green-dark transition-colors duration-300">
                                    {brand?.brand}
                              </h2>
                        </div>

                        {/* Streamlined Interactive Link (No Translate Properties) */}
                        <Link
                              to={`/perfumes?brand=${encodeURIComponent(brand?.brand)}`}
                              className="w-full bg-secondary-white hover:bg-green-dark text-primary-black hover:text-primary-white border border-beige-light hover:border-green-dark py-2.5 rounded-xl text-[10px] font-secondary uppercase font-bold tracking-wider transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                              <span>Explore Collection</span>
                              <FaArrowRight className="text-[8px]" />
                        </Link>
                  </div>
            </div>
      );
};

export default BrandCard;
