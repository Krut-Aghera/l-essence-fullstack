// import React, { useEffect, useMemo, useState } from 'react';
// import {
//       FaShoppingBag,
//       FaUser,
//       FaHeart,
//       FaSearch,
//       FaStar,
//       FaFilter,
//       FaChevronDown
// } from 'react-icons/fa';
// import { matchPath, useLocation, useSearchParams } from 'react-router-dom';
// import { Card, Footer, Header } from '../components';
// import { fetchPerfumes } from '../apis/perfume.api';


// const filterCategories = ["Woody & Earth", "Floral & Botanical", "Fresh & Citrus", "Gourmand & Warm"];
// const filterBrands = ["Aura Botanicals", "Maison Verte", "Le Bois", "Serene"];

// export default function PerfumeShowcase() {

//       const [searchParams, setSearchParams] = useSearchParams()
//       const [perfumes, setPerfumes] = useState([])


//       const [pagination, setPagination] = useState({
//             currentPage: 1,
//             totalPages: 1,
//             totalItems: null,
//             hasNextPage: false,
//             hasPreviousPage: false,
//             maxItemsPerPage: null
//       });

//       const startItem =
//             (pagination?.currentPage - 1) * pagination?.maxItemsPerPage + 1;

//       const endItem = Math.min(
//             pagination?.currentPage * pagination?.maxItemsPerPage,
//             pagination?.totalItems
//       );


//       const query = useMemo(() => {
//             return Object.fromEntries(searchParams.entries());
//       }, [searchParams]);


//       useEffect(() => {
//             const getPerfumes = async () => {
//                   try {
//                         const response = await fetchPerfumes(query)
//                         setPerfumes(response?.data?.perfumes || [])

//                         setPagination({
//                               currentPage: response?.data?.metadata.currentPage,
//                               totalPages: response?.data?.metadata.totalPages,
//                               totalItems: response?.data?.metadata.totalItems,
//                               hasNextPage: response?.data?.metadata.hasNextPage,
//                               hasPreviousPage: response?.data?.metadata.hasPreviousPage,
//                               maxItemsPerPage: response?.data?.metadata.maxItemsPerPage
//                         })
//                   } catch (error) {
//                         console.error(error?.response || error)
//                   }
//             }

//             getPerfumes()
//       }, [query])


//       const handlePageChange = (page) => {

//             const params = new URLSearchParams(searchParams)
//             params.set("page", page)
//             setSearchParams(params)
//       }



//       return (
//             <div className="min-h-screen flex flex-col bg-[#F0F0F0] text-[#222831] font-['Alegreya_Sans',sans-serif]">

//                   {/* --- HEADER (Same as Home Page) --- */}
//                   <Header />

//                   {/* --- PAGE HEADER (Title Area) --- */}
//                   <div className="bg-white border-b border-[#DFD0B8] py-8 px-6">
//                         <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
//                               <h1 className="text-4xl font-bold text-[#222831] font-['Alegreya_Sans',sans-serif] mb-2">{''}</h1>
//                               <p className="text-[#4B5563] text-sm font-['Roboto',sans-serif] max-w-lg">
//                                     Discover our entire archive of small-batch botanical extraits. Filter by your preferred notes and skin profiles.
//                               </p>
//                         </div>
//                   </div>

//                   {/* --- MAIN CONTENT & SIDEBAR --- */}
//                   <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12 flex flex-col md:flex-row gap-8 items-start">

//                         {/* ASIDE / FILTER SIDEBAR */}
//                         <aside className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl border border-[#DFD0B8] p-6 shadow-sm">
//                               <div className="flex items-center gap-2 text-[#222831] font-bold text-lg mb-6 border-b border-[#F0F0F0] pb-4">
//                                     <FaFilter className="text-[#837664] text-sm" /> Filters
//                               </div>

//                               {/* Scent Profile Filter */}
//                               <div className="mb-8">
//                                     <h3 className="font-bold text-[#222831] text-base mb-3 font-['Alegreya_Sans',sans-serif]">Scent Profile</h3>
//                                     <div className="space-y-3 font-['Roboto',sans-serif] text-sm text-[#4B5563]">
//                                           {filterCategories.map((cat, i) => (
//                                                 <label key={i} className="flex items-center gap-3 cursor-pointer group">
//                                                       <input type="checkbox" className="w-4 h-4 rounded border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
//                                                       <span className="group-hover:text-[#222831] transition-colors">{cat}</span>
//                                                 </label>
//                                           ))}
//                                     </div>
//                               </div>

//                               {/* Brands Filter */}
//                               <div className="mb-8">
//                                     <h3 className="font-bold text-[#222831] text-base mb-3 font-['Alegreya_Sans',sans-serif]">House / Brand</h3>
//                                     <div className="space-y-3 font-['Roboto',sans-serif] text-sm text-[#4B5563]">
//                                           {filterBrands.map((brand, i) => (
//                                                 <label key={i} className="flex items-center gap-3 cursor-pointer group">
//                                                       <input type="checkbox" className="w-4 h-4 rounded border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
//                                                       <span className="group-hover:text-[#222831] transition-colors">{brand}</span>
//                                                 </label>
//                                           ))}
//                                     </div>
//                               </div>

//                               {/* Price Range Filter */}
//                               <div>
//                                     <h3 className="font-bold text-[#222831] text-base mb-3 font-['Alegreya_Sans',sans-serif]">Price Range</h3>
//                                     <div className="space-y-3 font-['Roboto',sans-serif] text-sm text-[#4B5563]">
//                                           <label className="flex items-center gap-3 cursor-pointer group">
//                                                 <input type="radio" name="price" className="w-4 h-4 border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
//                                                 <span className="group-hover:text-[#222831] transition-colors">Under $100</span>
//                                           </label>
//                                           <label className="flex items-center gap-3 cursor-pointer group">
//                                                 <input type="radio" name="price" className="w-4 h-4 border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
//                                                 <span className="group-hover:text-[#222831] transition-colors">$100 - $150</span>
//                                           </label>
//                                           <label className="flex items-center gap-3 cursor-pointer group">
//                                                 <input type="radio" name="price" className="w-4 h-4 border-[#DFD0B8] text-[#4F6F52] focus:ring-[#4F6F52] cursor-pointer" />
//                                                 <span className="group-hover:text-[#222831] transition-colors">Over $150</span>
//                                           </label>
//                                     </div>
//                               </div>
//                         </aside>

//                         {/* RIGHT SIDE: PRODUCT GRID AREA */}
//                         <div className="flex-1 w-full">

//                               {/* Top Bar (Results count & Sort) */}
//                               <div className="flex justify-between items-center mb-6 font-['Roboto',sans-serif]">
//                                     <span className="text-[#948979] text-sm tracking-wide">  Showing {startItem} - {endItem} of {pagination?.totalItems} fragrances</span>
//                                     <div className="flex items-center gap-2 text-sm text-[#4B5563] cursor-pointer hover:text-[#222831]">
//                                           <span>Sort by: <span className="font-semibold text-[#222831]">Featured</span></span>
//                                           <FaChevronDown className="text-[10px]" />
//                                     </div>
//                               </div>

//                               {/* Product Grid (Cards) */}
//                               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {
//                                           perfumes
//                                           && perfumes.map(perfume => (
//                                                 <Card key={perfume._id} perfume={perfume} />
//                                           ))
//                                     }
//                               </div>

//                               {/* Pagination Placeholder */}
//                               <div className="mt-12 flex justify-center items-center gap-2 font-['Roboto',sans-serif] text-sm">
//                                     <button
//                                           disabled={!pagination?.hasPreviousPage}
//                                           onClick={() =>
//                                                 handlePageChange(pagination?.currentPage - 1)
//                                           }
//                                           className="px-4 py-2 border rounded disabled:opacity-50"
//                                     >
//                                           Previous
//                                     </button>

//                                     {[...Array(pagination?.totalPages)].map((_, index) => {
//                                           const pageNumber = index + 1;

//                                           return (
//                                                 <button
//                                                       key={pageNumber}
//                                                       onClick={() => handlePageChange(pageNumber)}
//                                                       className={`px-4 py-2 border rounded ${pagination.currentPage === pageNumber
//                                                             ? "bg-primary-black text-white"
//                                                             : ""
//                                                             }`}
//                                                 >
//                                                       {pageNumber}
//                                                 </button>
//                                           );
//                                     })}

//                                     <button
//                                           disabled={!pagination?.hasNextPage}
//                                           onClick={() =>
//                                                 handlePageChange(pagination?.currentPage + 1)
//                                           }
//                                           className="px-4 py-2 border rounded disabled:opacity-50"
//                                     >
//                                           Next
//                                     </button>
//                               </div>

//                         </div>
//                   </main>

//                   {/* --- FOOTER (Same as Home Page) --- */}
//                   <Footer />

//             </div>
//       );
// }

import React, { useEffect, useMemo, useState } from 'react';
import {
      FaFilter,
      FaChevronDown,
      FaTimes
} from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { Card, Footer, Header } from '../components';
import { fetchPerfumes } from '../apis/perfume.api';

const filterCategories = [
      { id: "woody", label: "Woody & Earth" },
      { id: "floral", label: "Floral & Botanical" },
      { id: "fresh", label: "Fresh & Citrus" },
      { id: "gourmand", label: "Gourmand & Warm" }
];

const filterBrands = ["Aura Botanicals", "Maison Verte", "Le Bois", "Serene", "Afnan Perfumes", "Maison Oud"];

const priceRanges = [
      { id: "under-100", label: "Under $100", max: 100 },
      { id: "100-150", label: "$100 - $150", min: 100, max: 150 },
      { id: "over-150", label: "Over $150", min: 150 }
];

export default function PerfumeShowcase() {
      const [searchParams, setSearchParams] = useSearchParams();
      const [perfumes, setPerfumes] = useState([]);
      const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

      const [pagination, setPagination] = useState({
            currentPage: 1,
            totalPages: 1,
            totalItems: null,
            hasNextPage: false,
            hasPreviousPage: false,
            maxItemsPerPage: null
      });

      const startItem = (pagination?.currentPage - 1) * pagination?.maxItemsPerPage + 1;
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
                        const response = await fetchPerfumes(query);
                        setPerfumes(response?.data?.perfumes || []);

                        setPagination({
                              currentPage: response?.data?.metadata?.currentPage || 1,
                              totalPages: response?.data?.metadata?.totalPages || 1,
                              totalItems: response?.data?.metadata?.totalItems || 0,
                              hasNextPage: response?.data?.metadata?.hasNextPage || false,
                              hasPreviousPage: response?.data?.metadata?.hasPreviousPage || false,
                              maxItemsPerPage: response?.data?.metadata?.maxItemsPerPage || 12
                        });
                  } catch (error) {
                        console.error(error?.response || error);
                  }
            };

            getPerfumes();
      }, [query]);

      // Dynamic Filter Handler
      const handleFilterChange = (type, value, isChecked = null) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", "1"); // Reset pagination on filter change

            if (type === "category" || type === "brand") {
                  let currentValues = params.get(type) ? params.get(type).split(",") : [];

                  if (isChecked) {
                        if (!currentValues.includes(value)) currentValues.push(value);
                  } else {
                        currentValues = currentValues.filter((v) => v !== value);
                  }

                  if (currentValues.length > 0) {
                        params.set(type, currentValues.join(","));
                  } else {
                        params.delete(type);
                  }
            } else if (type === "price") {
                  if (params.get("price") === value) {
                        // Toggle logic for radio buttons
                        params.delete("price");
                  } else {
                        params.set("price", value);
                  }
            }

            setSearchParams(params);
      };

      const handlePageChange = (page) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", page);
            setSearchParams(params);
            window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      const clearAllFilters = () => {
            setSearchParams(new URLSearchParams());
            setIsMobileFilterOpen(false);
      };

      // Check state utilities for inputs
      const isFilterChecked = (type, value) => {
            const param = searchParams.get(type);
            if (!param) return false;
            return param.split(",").includes(value);
      };

      // Reusable Filter Structure
      const FilterSidebarContent = () => (
            <div className="space-y-8">
                  {/* Category Filter */}
                  <div>
                        <h3 className="font-bold text-primary-black text-base mb-4 font-primary tracking-wide">Scent Profile</h3>
                        <div className="space-y-3 font-secondary text-sm text-secondary-black">
                              {filterCategories.map((cat) => (
                                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group select-none">
                                          <input
                                                type="checkbox"
                                                checked={isFilterChecked("category", cat.id)}
                                                onChange={(e) => handleFilterChange("category", cat.id, e.target.checked)}
                                                className="w-4 h-4 rounded border-beige-light text-green-dark focus:ring-green-dark cursor-pointer accent-green-dark"
                                          />
                                          <span className="group-hover:text-primary-black transition-colors">{cat.label}</span>
                                    </label>
                              ))}
                        </div>
                  </div>

                  {/* Brands Filter */}
                  <div>
                        <h3 className="font-bold text-primary-black text-base mb-4 font-primary tracking-wide">House / Brand</h3>
                        <div className="space-y-3 font-secondary text-sm text-secondary-black">
                              {filterBrands.map((brand, i) => (
                                    <label key={i} className="flex items-center gap-3 cursor-pointer group select-none">
                                          <input
                                                type="checkbox"
                                                checked={isFilterChecked("brand", brand)}
                                                onChange={(e) => handleFilterChange("brand", brand, e.target.checked)}
                                                className="w-4 h-4 rounded border-beige-light text-green-dark focus:ring-green-dark cursor-pointer accent-green-dark"
                                          />
                                          <span className="group-hover:text-primary-black transition-colors">{brand}</span>
                                    </label>
                              ))}
                        </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                        <h3 className="font-bold text-primary-black text-base mb-4 font-primary tracking-wide">Price Matrix</h3>
                        <div className="space-y-3 font-secondary text-sm text-secondary-black">
                              {priceRanges.map((range) => (
                                    <label key={range.id} className="flex items-center gap-3 cursor-pointer group select-none">
                                          <input
                                                type="radio"
                                                name="price-range"
                                                checked={searchParams.get("price") === range.id}
                                                onClick={() => handleFilterChange("price", range.id)}
                                                onChange={() => { }} // Controlled input handler bypass
                                                className="w-4 h-4 border-beige-light text-green-dark focus:ring-green-dark cursor-pointer accent-green-dark"
                                          />
                                          <span className="group-hover:text-primary-black transition-colors">{range.label}</span>
                                    </label>
                              ))}
                        </div>
                  </div>

                  {searchParams.toString() && (
                        <button
                              onClick={clearAllFilters}
                              className="w-full py-2.5 bg-secondary-white hover:bg-beige-light/20 text-beige-accent border border-beige-light rounded-xl font-medium text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                        >
                              Reset Matrices
                        </button>
                  )}
            </div>
      );

      return (
            <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary">
                  <Header />

                  {/* --- PAGE HEADER --- */}
                  <div className="bg-primary-white border-b border-beige-light py-10 px-6">
                        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                              <span className="font-artistic-secondary text-[10px] uppercase tracking-[0.25em] text-beige-dark mb-2">
                                    The Scent Compendium
                              </span>
                              <h1 className="text-4xl md:text-5xl font-bold text-primary-black font-primary mb-3">
                                    Olfactory Index
                              </h1>
                              <p className="text-secondary-black text-sm font-secondary max-w-lg leading-relaxed">
                                    Discover our entire archive of small-batch botanical extraits. Filter by your preferred notes, architectural profiles, and skin signatures.
                              </p>
                        </div>
                  </div>

                  {/* --- MAIN CONTENT CONTAINER --- */}
                  <main className="grow max-w-7xl w-full mx-auto px-6 py-12 flex gap-8 items-start relative">

                        {/* DESKTOP SIDEBAR FILTER */}
                        <aside className="hidden md:block w-64 shrink-0 bg-primary-white rounded-2xl border border-beige-light p-6 shadow-sm sticky top-24">
                              <div className="flex items-center gap-2 text-primary-black font-bold text-lg mb-6 border-b border-secondary-white pb-4">
                                    <FaFilter className="text-beige-dark text-xs" />
                                    <span className="font-artistic-secondary text-sm uppercase tracking-wider">Filters</span>
                              </div>
                              <FilterSidebarContent />
                        </aside>

                        {/* MOBILE SLIDE-OUT FILTER DRAWER OVERLAY */}
                        {isMobileFilterOpen && (
                              <div className="md:hidden fixed inset-0 z-50 flex justify-end">
                                    {/* Backdrop */}
                                    <div
                                          className="absolute inset-0 bg-primary-black/40 backdrop-blur-sm transition-opacity duration-300"
                                          onClick={() => setIsMobileFilterOpen(false)}
                                    />

                                    {/* Drawer Element */}
                                    <div className="relative w-full max-w-xs bg-primary-white h-full p-6 shadow-xl overflow-y-auto flex flex-col justify-between animate-slide-in">
                                          <div>
                                                <div className="flex items-center justify-between pb-4 border-b border-secondary-white mb-6">
                                                      <div className="flex items-center gap-2 text-primary-black font-bold">
                                                            <FaFilter className="text-beige-dark text-xs" />
                                                            <span className="font-artistic-secondary text-sm uppercase tracking-wider">Filter Accords</span>
                                                      </div>
                                                      <button
                                                            onClick={() => setIsMobileFilterOpen(false)}
                                                            className="text-secondary-black hover:text-primary-black p-1 text-lg cursor-pointer"
                                                      >
                                                            <FaTimes />
                                                      </button>
                                                </div>
                                                <FilterSidebarContent />
                                          </div>
                                    </div>
                              </div>
                        )}

                        {/* RIGHT SIDE: ARCHIVE DISPLAY GRID */}
                        <div className="flex-1 w-full">

                              {/* Filtering Results Count Status Top Bar */}
                              <div className="flex justify-between items-center mb-6 font-secondary">
                                    <span className="text-beige-dark text-xs tracking-wide">
                                          Showing {pagination.totalItems > 0 ? startItem : 0} - {endItem} of {pagination?.totalItems} formulations
                                    </span>

                                    <div className="flex items-center gap-4">
                                          {/* Mobile Trigger Button UI */}
                                          <button
                                                onClick={() => setIsMobileFilterOpen(true)}
                                                className="md:hidden flex items-center gap-2 px-4 py-2 border border-beige-light bg-primary-white rounded-xl text-xs font-semibold text-primary-black uppercase tracking-wider shadow-sm cursor-pointer hover:bg-secondary-white transition-colors"
                                          >
                                                <FaFilter className="text-[10px] text-beige-dark" /> Matrix
                                          </button>

                                          <div className="flex items-center gap-2 text-xs text-secondary-black cursor-pointer hover:text-primary-black">
                                                <span>Sort by: <span className="font-semibold text-primary-black">Featured</span></span>
                                                <FaChevronDown className="text-[9px]" />
                                          </div>
                                    </div>
                              </div>

                              {/* Product Dynamic Grid Cards Box */}
                              {perfumes.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                          {perfumes.map((perfume) => (
                                                <Card key={perfume._id} perfume={perfume} />
                                          ))}
                                    </div>
                              ) : (
                                    <div className="text-center py-20 bg-primary-white rounded-2xl border border-beige-light border-dashed">
                                          <p className="font-primary text-xl text-primary-black font-medium">No botanical profiles match your curation.</p>
                                          <button
                                                onClick={clearAllFilters}
                                                className="mt-4 font-secondary text-xs text-green-dark hover:underline cursor-pointer"
                                          >
                                                Reset Filters and Return to System Index
                                          </button>
                                    </div>
                              )}

                              {/* Pagination Control Bar Block */}
                              {pagination.totalPages > 1 && (
                                    <div className="mt-12 flex justify-center items-center gap-1.5 font-secondary text-xs">
                                          <button
                                                disabled={!pagination?.hasPreviousPage}
                                                onClick={() => handlePageChange(pagination?.currentPage - 1)}
                                                className="px-3.5 py-2 border border-beige-light rounded-xl font-medium disabled:opacity-30 disabled:pointer-events-none hover:bg-primary-white transition-colors duration-200 cursor-pointer"
                                          >
                                                Previous
                                          </button>

                                          {[...Array(pagination?.totalPages)].map((_, index) => {
                                                const pageNumber = index + 1;
                                                return (
                                                      <button
                                                            key={pageNumber}
                                                            onClick={() => handlePageChange(pageNumber)}
                                                            className={`w-9 h-9 border rounded-xl font-semibold transition-all duration-200 cursor-pointer ${pagination.currentPage === pageNumber
                                                                        ? "bg-primary-black border-primary-black text-primary-white shadow-sm scale-105"
                                                                        : "border-beige-light hover:bg-primary-white text-secondary-black"
                                                                  }`}
                                                      >
                                                            {pageNumber}
                                                      </button>
                                                );
                                          })}

                                          <button
                                                disabled={!pagination?.hasNextPage}
                                                onClick={() => handlePageChange(pagination?.currentPage + 1)}
                                                className="px-3.5 py-2 border border-beige-light rounded-xl font-medium disabled:opacity-30 disabled:pointer-events-none hover:bg-primary-white transition-colors duration-200 cursor-pointer"
                                          >
                                                Next
                                          </button>
                                    </div>
                              )}
                        </div>
                  </main>

                  <Footer />
            </div>
      );
}