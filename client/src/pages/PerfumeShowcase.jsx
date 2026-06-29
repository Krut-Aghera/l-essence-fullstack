import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
      FaFilter,
      FaChevronDown,
      FaTimes,
      FaCheck
} from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import { Card, FilterSidebar, Footer, Header } from '../components'
import { fetchPerfumes } from '../apis/perfume.api'

const PerfumeShowcase = () => {
      const [searchParams, setSearchParams] = useSearchParams()
      const [perfumes, setPerfumes] = useState([])
      const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
      const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
      const dropdownRef = useRef(null)

      const [pagination, setPagination] = useState({
            currentPage: 1,
            totalPages: 1,
            totalItems: null,
            hasNextPage: false,
            hasPreviousPage: false,
            maxItemsPerPage: null
      })

      // Sort Map Configuration Matrix
      const sortOptions = [
            { label: 'Featured', value: 'featured' },
            { label: 'Price: Low to High', value: 'price_asc' },
            { label: 'Price: High to Low', value: 'price_desc' },
            { label: 'Name: A to Z', value: 'alpha_asc' },
            { label: 'Name: Z to A', value: 'alpha_desc' },
            { label: 'Newest Arrivals', value: 'newest' },
            { label: 'Oldest Releases', value: 'oldest' }
      ]

      // Read current sort active key from URL parameters or fall back to default curation
      const currentSortValue = searchParams.get('sort') || 'featured'
      const currentSortLabel = sortOptions.find(opt => opt.value === currentSortValue)?.label || 'Featured'

      const startItem = (pagination?.currentPage - 1) * pagination?.maxItemsPerPage + 1
      const endItem = Math.min(
            pagination?.currentPage * pagination?.maxItemsPerPage,
            pagination?.totalItems
      )

      const query = useMemo(() => {
            return Object.fromEntries(searchParams.entries())
      }, [searchParams])

      const handlePageChange = (page) => {
            const params = new URLSearchParams(searchParams)
            params.set("page", page)
            setSearchParams(params)
            window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      // Handle sort changes inside the query layer string
      const handleSortChange = (sortValue) => {
            const params = new URLSearchParams(searchParams)
            params.set("sort", sortValue)
            params.set("page", "1") // Always reset layout pagination view context back to page 1 on reshuffle
            setSearchParams(params)
            setIsSortDropdownOpen(false)
      }

      const handleResetAllFilters = () => {
            setSearchParams(new URLSearchParams())
            setIsMobileFilterOpen(false)
      }

      // Close dropdown tracker if user clicks external window frames
      useEffect(() => {
            const handleOutsideClick = (event) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setIsSortDropdownOpen(false)
                  }
            }
            document.addEventListener('mousedown', handleOutsideClick)
            return () => document.removeEventListener('mousedown', handleOutsideClick)
      }, [])

      useEffect(() => {
            const getPerfumes = async () => {
                  try {
                        const response = await fetchPerfumes(query)
                        setPerfumes(response?.data?.perfumes || [])

                        setPagination({
                              currentPage: response?.data?.metadata?.currentPage || 1,
                              totalPages: response?.data?.metadata?.totalPages || 1,
                              totalItems: response?.data?.metadata?.totalItems || 0,
                              hasNextPage: response?.data?.metadata?.hasNextPage || false,
                              hasPreviousPage: response?.data?.metadata?.hasPreviousPage || false,
                              maxItemsPerPage: response?.data?.metadata?.maxItemsPerPage || 12
                        })
                  } catch (error) {
                        console.error(error?.response || error)
                  }
            }
            getPerfumes()
      }, [query])

      const renderPageButtons = () => {
            const { currentPage, totalPages } = pagination
            const pages = []
            const isMobile = window.innerWidth < 640

            if (!isMobile) {
                  for (let i = 1; i <= totalPages; i++) {
                        pages.push(renderButton(i))
                  }
                  return pages
            }

            pages.push(renderButton(1))
            if (currentPage > 3) {
                  pages.push(<span key="left-ellipsis" className="px-1.5 text-beige-dark font-secondary">...</span>)
            }

            const startRange = Math.max(2, currentPage - 1)
            const endRange = Math.min(totalPages - 1, currentPage + 1)

            for (let i = startRange; i <= endRange; i++) {
                  if (i !== 1 && i !== totalPages) {
                        pages.push(renderButton(i))
                  }
            }

            if (currentPage < totalPages - 2) {
                  pages.push(<span key="right-ellipsis" className="px-1.5 text-beige-dark font-secondary">...</span>)
            }

            if (totalPages > 1) {
                  pages.push(renderButton(totalPages))
            }

            return pages
      }

      const renderButton = (pageNumber) => {
            return (
                  <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-9 h-9 border rounded-xl font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center text-xs ${pagination.currentPage === pageNumber
                                    ? "bg-primary-black border-primary-black text-primary-white shadow-sm scale-105"
                                    : "border-beige-light hover:bg-primary-white text-secondary-black"
                              }`}
                  >
                        {pageNumber}
                  </button>
            )
      }
      

      return (
            <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary relative">
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
                        <aside className="hidden md:block w-64 shrink-0 sticky top-24">
                              <div className="flex items-center gap-2 text-primary-black font-bold text-lg mb-4 px-2">
                                    <FaFilter className="text-beige-dark text-xs" />
                                    <span className="font-artistic-secondary text-sm uppercase tracking-wider">Filters</span>
                              </div>
                              <FilterSidebar
                                    searchParams={searchParams}
                                    setSearchParams={setSearchParams}
                                    setIsMobileFilterOpen={setIsMobileFilterOpen}
                              />
                        </aside>

                        {/* RIGHT SIDE: ARCHIVE DISPLAY GRID */}
                        <div className="flex-1 w-full">

                              {/* Filtering Results Count Status Top Bar */}
                              <div className="flex justify-between items-center mb-6 font-secondary relative">
                                    <span className="text-beige-dark text-xs tracking-wide">
                                          Showing {pagination.totalItems > 0 ? startItem : 0} - {endItem} of {pagination?.totalItems} formulations
                                    </span>

                                    <div className="flex items-center gap-4">
                                          <button
                                                onClick={() => setIsMobileFilterOpen(true)}
                                                className="md:hidden flex items-center gap-2 px-4 py-2 border border-beige-light bg-primary-white rounded-xl text-xs font-semibold text-primary-black uppercase tracking-wider shadow-sm cursor-pointer hover:bg-secondary-white transition-colors"
                                          >
                                                <FaFilter className="text-[10px] text-beige-dark" /> Filter
                                          </button>
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
                                    <div className="text-center py-20 bg-primary-white rounded-2xl border border-beige-light border-dashed px-4">
                                          <p className="font-primary text-xl text-primary-black font-medium">No botanical profiles match your curation.</p>
                                          <button
                                                onClick={handleResetAllFilters}
                                                className="mt-4 font-secondary text-xs text-green-dark font-semibold hover:underline cursor-pointer"
                                          >
                                                Reset Filters and Return to System Index
                                          </button>
                                    </div>
                              )}

                              {/* Pagination Control Bar Block */}
                              {pagination.totalPages > 1 && (
                                    <div className="mt-12 flex justify-center items-center gap-1 sm:gap-1.5 font-secondary text-xs">
                                          <button
                                                disabled={!pagination?.hasPreviousPage}
                                                onClick={() => handlePageChange(pagination?.currentPage - 1)}
                                                className="px-2.5 sm:px-3.5 py-2 border border-beige-light rounded-xl font-medium disabled:opacity-30 disabled:pointer-events-none hover:bg-primary-white transition-colors duration-200 cursor-pointer text-secondary-black text-xs"
                                          >
                                                Prev
                                          </button>

                                          {renderPageButtons()}

                                          <button
                                                disabled={!pagination?.hasNextPage}
                                                onClick={() => handlePageChange(pagination?.currentPage + 1)}
                                                className="px-2.5 sm:px-3.5 py-2 border border-beige-light rounded-xl font-medium disabled:opacity-30 disabled:pointer-events-none hover:bg-primary-white transition-colors duration-200 cursor-pointer text-secondary-black text-xs"
                                          >
                                                Next
                                          </button>
                                    </div>
                              )}
                        </div>
                  </main>

                  {/* RESPONSIVE MOBILE SLIDEOVER DRAWER DRAWER LAYER */}
                  {isMobileFilterOpen && (
                        <div className="fixed inset-0 bg-primary-black/50 z-50 transition-opacity duration-200 md:hidden flex justify-end">
                              <div className="absolute inset-0" onClick={() => setIsMobileFilterOpen(false)} />

                              <div className="relative w-full max-w-xs bg-primary-white h-full p-6 shadow-xl flex flex-col gap-4 z-10 overflow-y-auto">
                                    <div className="flex items-center justify-between border-b border-secondary-white pb-4">
                                          <div className="flex items-center gap-2 text-primary-black font-bold text-lg">
                                                <FaFilter className="text-beige-dark text-xs" />
                                                <span className="font-artistic-secondary text-sm uppercase tracking-wider">Filters</span>
                                          </div>
                                          <button
                                                onClick={() => setIsMobileFilterOpen(false)}
                                                className="text-secondary-black hover:text-primary-black p-1.5 rounded-lg hover:bg-secondary-white transition-colors cursor-pointer"
                                          >
                                                <FaTimes size={14} />
                                          </button>
                                    </div>

                                    <FilterSidebar
                                          searchParams={searchParams}
                                          setSearchParams={setSearchParams}
                                          setIsMobileFilterOpen={setIsMobileFilterOpen}
                                    />
                              </div>
                        </div>
                  )}

                  <Footer />
            </div>
      )
}


export default PerfumeShowcase