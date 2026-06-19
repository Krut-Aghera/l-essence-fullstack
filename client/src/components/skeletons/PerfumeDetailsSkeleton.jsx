import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const PerfumeDetailsSkeleton = () => {
      // Centralizing the colors to keep the code clean and consistent
      const skeletonProps = {
            baseColor: "#e0e0e0",
            highlightColor: "#f5f5f5",
      };

      return (
            <SkeletonTheme {...skeletonProps}>
                  <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary relative">

                        {/* Optional: Header placeholder if you're skeleton-loading the whole viewport */}
                        {/* <div className="h-16 border-b border-beige-light/40 bg-primary-white/50 mb-6" /> */}

                        {/* --- 2. BREADCRUMBS SKELETON --- */}
                        <div className="max-w-7xl w-full mx-auto px-6 pt-6">
                              <Skeleton width={220} height={16} />
                        </div>

                        {/* --- 3. MAIN PRODUCT INTERFACE DISPLAY SKELETON --- */}
                        <main className="grow max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                              {/* LEFT LAYOUT: SIDE-BY-SIDE GALLERY */}
                              <div className="lg:col-span-5 flex gap-4 w-full">

                                    {/* Thumbnails Gallery Strip */}
                                    <div className="w-20 md:w-24 shrink-0 space-y-3">
                                          {[...Array(4)].map((_, i) => (
                                                <Skeleton
                                                      key={i}
                                                      height={90}
                                                      className="rounded-xl"
                                                />
                                          ))}
                                    </div>

                                    {/* Main Showcase Large Image Container */}
                                    {/* Using aspect-4/5 via style/height to accurately lock layout shifts */}
                                    <div className="flex-1 min-w-0">
                                          <Skeleton
                                                height="100%"
                                                containerClassName="block aspect-4/5 w-full"
                                                className="rounded-2xl"
                                          />
                                    </div>
                              </div>

                              {/* RIGHT COLUMN: PERFUME CONFIGURATION INFO */}
                              <div className="lg:col-span-7 space-y-6 w-full">

                                    {/* Brand, Title & Category */}
                                    <div className="space-y-2">
                                          <Skeleton width={100} height={16} />
                                          <Skeleton width="75%" height={38} className="rounded-lg" />
                                          <Skeleton width="40%" height={20} />
                                    </div>

                                    {/* Ratings & Review Statistics Container */}
                                    <div className="border-y border-beige-light py-3 flex items-center gap-3">
                                          <Skeleton width={90} height={18} />
                                          <Skeleton width={160} height={14} />
                                    </div>

                                    {/* Pricing & Size Box Elements */}
                                    <div className="space-y-2">
                                          <div className="flex items-baseline gap-3">
                                                <Skeleton width={140} height={32} />
                                                <Skeleton width={80} height={18} />
                                          </div>
                                          <Skeleton width={110} height={18} />
                                          <Skeleton width={230} height={14} />
                                    </div>

                                    {/* Botanical Scent Pyramid Breakdown Block */}
                                    <div className="bg-primary-white border border-beige-light rounded-xl p-5 space-y-4">
                                          <Skeleton width={130} height={18} />
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[...Array(3)].map((_, i) => (
                                                      <div key={i} className="border-l-2 border-beige-light pl-3 space-y-1">
                                                            <Skeleton width={70} height={14} />
                                                            <Skeleton width="90%" height={20} />
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    {/* Quantitative Actions Controls & Cart Processing Buttons */}
                                    <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-4 border-t-2 border-beige-light/60">
                                          {/* Quantity selector box */}
                                          <div className="sm:w-32">
                                                <Skeleton height={48} className="rounded-xl" />
                                          </div>
                                          {/* Add to Cart CTA */}
                                          <div className="flex-1">
                                                <Skeleton height={48} className="rounded-xl" />
                                          </div>
                                          {/* Wishlist Button */}
                                          <div className="w-12 shrink-0">
                                                <Skeleton height={48} className="rounded-xl" />
                                          </div>
                                    </div>

                                    {/* Editorial Core Informative Block Hooks */}
                                    <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t-2 border-beige-light/60">
                                          <Skeleton height={16} />
                                          <Skeleton height={16} />
                                          <Skeleton height={16} />
                                    </div>

                              </div>
                        </main>
                  </div>
            </SkeletonTheme>
      );
};

export default PerfumeDetailsSkeleton