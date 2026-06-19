import React, { useEffect, useMemo, useState } from 'react';
import {
      FaShoppingBag,
      FaUser,
      FaHeart,
      FaSearch,
      FaStar,
      FaFilter,
      FaChevronDown
} from 'react-icons/fa';
import { matchPath, useLocation, useSearchParams } from 'react-router-dom';
import { Card, Footer, Header } from '../components';
import { fetchPerfumes } from '../apis/perfume.api';

// --- MOCK DATA ---
const perfumes = [
      { id: 1, brandName: "Aura Botanicals", perfumeName: "Santal Dusk Extrait", category: "Woody & Earth", price: "$145.00", rating: 4.8, reviews: 128, inStock: true, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop" },
      { id: 2, brandName: "Maison Verte", perfumeName: "Neroli Canvas", category: "Floral & Citrus", price: "$98.00", rating: 5.0, reviews: 84, inStock: false, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop" },
      { id: 3, brandName: "Le Bois", perfumeName: "Midnight Cedar", category: "Woody & Earth", price: "$110.00", rating: 4.6, reviews: 56, inStock: true, image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=600&auto=format&fit=crop" },
      { id: 4, brandName: "Serene", perfumeName: "Vanilla Orchid", category: "Gourmand & Floral", price: "$125.00", rating: 4.9, reviews: 210, inStock: true, image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=600&auto=format&fit=crop" },
      { id: 5, brandName: "Aura Botanicals", perfumeName: "Bergamot Breeze", category: "Fresh & Citrus", price: "$85.00", rating: 4.5, reviews: 42, inStock: true, image: "https://images.unsplash.com/photo-1595532587532-6eb62810fb70?q=80&w=600&auto=format&fit=crop" },
      { id: 6, brandName: "Maison Verte", perfumeName: "Rose Water Extrait", category: "Floral & Botanical", price: "$130.00", rating: 4.7, reviews: 93, inStock: true, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop" },
];

const filterCategories = ["Woody & Earth", "Floral & Botanical", "Fresh & Citrus", "Gourmand & Warm"];
const filterBrands = ["Aura Botanicals", "Maison Verte", "Le Bois", "Serene"];

export default function PerfumeShowcase() {

      const [searchParams, setSearchParams] = useSearchParams()
      const [perfumes, setPerfumes] = useState([])


      const [pagination, setPagination] = useState({
            currentPage: 1,
            totalPages: 1,
            totalItems: null,
            hasNextPage: false,
            hasPreviousPage: false,
            maxItemsPerPage: null
      });

      const startItem =
            (pagination?.currentPage - 1) * pagination?.maxItemsPerPage + 1;

      const endItem = Math.min(
            pagination?.currentPage * pagination?.maxItemsPerPage,
            pagination?.totalItems
      );


      const query = useMemo(() => {
            return Object.fromEntries(searchParams.entries());
      }, [searchParams]);

      useEffect(() => {
            const getPerfumes = async () => {
                  try {
                        const response = await fetchPerfumes(query)
                        setPerfumes(response?.data?.perfumes || [])

                        setPagination({
                              currentPage: response?.data?.metadata.currentPage,
                              totalPages: response?.data?.metadata.totalPages,
                              totalItems: response?.data?.metadata.totalItems,
                              hasNextPage: response?.data?.metadata.hasNextPage,
                              hasPreviousPage: response?.data?.metadata.hasPreviousPage,
                              maxItemsPerPage: response?.data?.metadata.maxItemsPerPage
                        })
                  } catch (error) {
                        console.error(error?.response || error)
                  }
            }

            getPerfumes()
      }, [query])


      const handlePageChange = (page) => {

            const params = new URLSearchParams(searchParams)
            params.set("page", page)
            setSearchParams(params)
      }



      return (
            <div className="min-h-screen flex flex-col bg-[#F0F0F0] text-[#222831] font-['Alegreya_Sans',sans-serif]">

                  {/* --- HEADER (Same as Home Page) --- */}
                  <Header />

                  {/* --- PAGE HEADER (Title Area) --- */}
                  <div className="bg-white border-b border-[#DFD0B8] py-8 px-6">
                        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                              <h1 className="text-4xl font-bold text-[#222831] font-['Alegreya_Sans',sans-serif] mb-2">{''}</h1>
                              <p className="text-[#4B5563] text-sm font-['Roboto',sans-serif] max-w-lg">
                                    Discover our entire archive of small-batch botanical extraits. Filter by your preferred notes and skin profiles.
                              </p>
                        </div>
                  </div>

                  {/* --- MAIN CONTENT & SIDEBAR --- */}
                  <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-start">

                        {/* ASIDE / FILTER SIDEBAR */}
                        <aside className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl border border-[#DFD0B8] p-6 shadow-sm">
                              <div className="flex items-center gap-2 text-[#222831] font-bold text-lg mb-6 border-b border-[#F0F0F0] pb-4">
                                    <FaFilter className="text-[#837664] text-sm" /> Filters
                              </div>

                              {/* Scent Profile Filter */}
                              <div className="mb-8">
                                    <h3 className="font-bold text-[#222831] text-base mb-3 font-['Alegreya_Sans',sans-serif]">Scent Profile</h3>
                                    <div className="space-y-3 font-['Roboto',sans-serif] text-sm text-[#4B5563]">
                                          {filterCategories.map((cat, i) => (
                                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                                      <input type="checkbox" className="w-4 h-4 rounded border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
                                                      <span className="group-hover:text-[#222831] transition-colors">{cat}</span>
                                                </label>
                                          ))}
                                    </div>
                              </div>

                              {/* Brands Filter */}
                              <div className="mb-8">
                                    <h3 className="font-bold text-[#222831] text-base mb-3 font-['Alegreya_Sans',sans-serif]">House / Brand</h3>
                                    <div className="space-y-3 font-['Roboto',sans-serif] text-sm text-[#4B5563]">
                                          {filterBrands.map((brand, i) => (
                                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                                      <input type="checkbox" className="w-4 h-4 rounded border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
                                                      <span className="group-hover:text-[#222831] transition-colors">{brand}</span>
                                                </label>
                                          ))}
                                    </div>
                              </div>

                              {/* Price Range Filter */}
                              <div>
                                    <h3 className="font-bold text-[#222831] text-base mb-3 font-['Alegreya_Sans',sans-serif]">Price Range</h3>
                                    <div className="space-y-3 font-['Roboto',sans-serif] text-sm text-[#4B5563]">
                                          <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="radio" name="price" className="w-4 h-4 border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
                                                <span className="group-hover:text-[#222831] transition-colors">Under $100</span>
                                          </label>
                                          <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="radio" name="price" className="w-4 h-4 border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
                                                <span className="group-hover:text-[#222831] transition-colors">$100 - $150</span>
                                          </label>
                                          <label className="flex items-center gap-3 cursor-pointer group">
                                                <input type="radio" name="price" className="w-4 h-4 border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
                                                <span className="group-hover:text-[#222831] transition-colors">Over $150</span>
                                          </label>
                                    </div>
                              </div>
                        </aside>

                        {/* RIGHT SIDE: PRODUCT GRID AREA */}
                        <div className="flex-1 w-full">

                              {/* Top Bar (Results count & Sort) */}
                              <div className="flex justify-between items-center mb-6 font-['Roboto',sans-serif]">
                                    <span className="text-[#948979] text-sm tracking-wide">  Showing {startItem} - {endItem} of {pagination?.totalItems} fragrances</span>
                                    <div className="flex items-center gap-2 text-sm text-[#4B5563] cursor-pointer hover:text-[#222831]">
                                          <span>Sort by: <span className="font-semibold text-[#222831]">Featured</span></span>
                                          <FaChevronDown className="text-[10px]" />
                                    </div>
                              </div>

                              {/* Product Grid (Cards) */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                          perfumes
                                          && perfumes.map(perfume => (
                                                <Card key={perfume._id} perfume={perfume} />
                                          ))
                                    }
                              </div>

                              {/* Pagination Placeholder */}
                              <div className="mt-12 flex justify-center items-center gap-2 font-['Roboto',sans-serif] text-sm">
                                    <button
                                          disabled={!pagination?.hasPreviousPage}
                                          onClick={() =>
                                                handlePageChange(pagination?.currentPage - 1)
                                          }
                                          className="px-4 py-2 border rounded disabled:opacity-50"
                                    >
                                          Previous
                                    </button>

                                    {[...Array(pagination?.totalPages)].map((_, index) => {
                                          const pageNumber = index + 1;

                                          return (
                                                <button
                                                      key={pageNumber}
                                                      onClick={() => handlePageChange(pageNumber)}
                                                      className={`px-4 py-2 border rounded ${pagination.currentPage === pageNumber
                                                            ? "bg-primary-black text-white"
                                                            : ""
                                                            }`}
                                                >
                                                      {pageNumber}
                                                </button>
                                          );
                                    })}

                                    <button
                                          disabled={!pagination?.hasNextPage}
                                          onClick={() =>
                                                handlePageChange(pagination?.currentPage + 1)
                                          }
                                          className="px-4 py-2 border rounded disabled:opacity-50"
                                    >
                                          Next
                                    </button>
                              </div>

                        </div>
                  </main>

                  {/* --- FOOTER (Same as Home Page) --- */}
                  <Footer />

            </div>
      );
}