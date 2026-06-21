import React, { useEffect, useState } from 'react'
import { Footer, Header, PerfumeDetailsSkeleton } from '../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchPerfumeById, removePerfume } from '../apis/perfume.api'
import { addToWishlist, removeFromWishlist } from '../apis/wishlist.api'
import {
      FaStar, FaMinus, FaPlus, FaShoppingBag, FaHeart, FaLeaf, FaShieldAlt, FaUndo, FaEdit, FaTrashAlt, FaExclamationTriangle
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setWishlist, setCartData } from '../features/perfumeSlice';
import { showCustomToast, showErrorToast, showLoadingToast, showSuccessToast } from '../utils/hotToast';
import { addToCart } from '../apis/cart.api';

const PerfumeInfoPage = () => {

      const { id } = useParams()
      if (!id) return <p className='text-primary-black text-2xl font-medium'> No perfume Id Found </p>

      const [isLoading, setIsLoading] = useState(true);
      const [perfumeDetails, setPerfumeDetails] = useState(null)
      const [displayedImage, setDisplayedImage] = useState(null)
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
      const [quantity, setQuantity] = useState(1)

      const [isDeleting, setIsDeleting] = useState(false)

      const dispatch = useDispatch()
      const navigate = useNavigate()

      const { wishlist } = useSelector(state => state.perfume)
      const { cart } = useSelector(state => state.perfume.cartData)
      const { userData } = useSelector(state => state.auth)

      const isWishlisted = wishlist.some(
            item => item?.perfume?._id === perfumeDetails?._id
      )

      const isInCart = cart.some(
            item => item?.perfume?._id === perfumeDetails?._id
      )


      const addToWishlistHandler = async (perfumeId) => {
            try {

                  const response = await addToWishlist(perfumeId);
                  dispatch(setWishlist(response?.data?.list))

                  showCustomToast(
                        "Added to Wishlist ❤️",
                        "Perfume saved for later"
                  );

            } catch (error) {
                  showErrorToast("Failed to add to wishlist");
                  console.error(error);
            }
      };


      const removeFromWishlistHandler = async (perfumeId) => {
            try {
                  const response = await removeFromWishlist(perfumeId);
                  dispatch(setWishlist(response?.data?.list));
                  showSuccessToast("Removed from Wishlist");

            } catch (error) {
                  showErrorToast("Failed to remove from wishlist");
                  console.error("Error removing from wishlist:", error);
            }
      };


      const deletePerfumehandler = async (perfumeId) => {
            setIsDeleting(true)
            const toastId = showLoadingToast("Removing perfume...");

            try {

                  const response = await removePerfume(perfumeId)
                  showSuccessToast("Perfume removed successfully", toastId);

                  navigate("/perfumes")

            } catch (error) {
                  showErrorToast("Failed to remove perfume", toastId);
                  console.error("Error deleting perfume :", error.response)
            } finally {
                  setIsDeleting(false)
            }

            setIsDeleteModalOpen(false)
      }



      const addToCartHandler = async (perfumeId) => {

            const toastId = showLoadingToast("Adding to cart...");

            try {

                  const response = await addToCart(perfumeId, quantity);
                  dispatch(setCartData(response?.data));

                  showSuccessToast("Added to cart successfully", toastId);

            } catch (error) {
                  showErrorToast("Failed to add to cart", toastId);
                  console.error("Error adding to cart:", error.response);
            }
      };


      useEffect(() => {
            const fetchPerfumeDetails = async () => {
                  try {

                        const response = await fetchPerfumeById(id)
                        setPerfumeDetails(response.data)
                        setDisplayedImage(response?.data?.images?.[0].url)
                  } catch (err) {
                        console.log(err.response)
                  } finally {
                        setIsLoading(false);
                  }
            }
            fetchPerfumeDetails()
      }, [])


      if (isLoading) {
            return (
                  <>
                        <Header />
                        <PerfumeDetailsSkeleton />
                        <Footer />
                  </>
            );
      }


      return (
            <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary relative">

                  <Header />

                  {/* --- 2. BREADCRUMBS --- */}
                  <div className="max-w-7xl w-full mx-auto px-6 pt-6 text-xs tracking-wide font-secondary text-beige-dark">
                        <span className="hover:text-primary-black cursor-pointer">Fragrances</span> / <span className="hover:text-primary-black cursor-pointer">{perfumeDetails?.category}</span> / <span className="text-secondary-black font-medium">{perfumeDetails?.name}</span>
                  </div>

                  {/* --- 3. MAIN PRODUCT INTERFACE DISPLAY --- */}
                  <main className="grow max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                        {/* LEFT LAYOUT: SIDE-BY-SIDE SIDEBAR IMAGES GALLERY */}
                        <div className="flex items-start gap-4 lg:col-span-5 w-full">

                              {/* Thumbnails Gallery Strip */}
                              <div className="w-20 md:w-24 shrink-0">
                                    <div className="grid grid-cols-1 gap-3">
                                          {perfumeDetails?.images.map((img, idx) => (

                                                <div
                                                      onClick={() => setDisplayedImage(img?.url)}
                                                      key={idx}
                                                      className={`aspect-square rounded-xl overflow-hidden border bg-primary-white cursor-pointer p-1 transition-colors ${displayedImage === img?.url ? 'border-green-dark' : 'border-beige-light'}`}
                                                >
                                                      <img
                                                            src={img.url}
                                                            alt="fragrance clip"
                                                            className="w-full h-full object-cover rounded-lg"
                                                      />

                                                </div>
                                          ))}
                                    </div>
                              </div>

                              {/* Main Showcase Large Image Container */}
                              <div className="flex-1 relative aspect-4/5 bg-primary-white rounded-2xl border border-beige-light overflow-hidden flex items-center justify-center shadow-xs">
                                    {

                                          <img
                                                src={displayedImage}
                                                alt={perfumeDetails?.name}
                                                className="w-full h-full object-cover object-center"
                                          />

                                    }
                                    <div className="absolute top-4 left-4">
                                          {perfumeDetails?.inStock > 0 ? (
                                                <span className="bg-green-dark/90 backdrop-blur-sm text-primary-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-secondary shadow-xs">
                                                      In Stock
                                                </span>
                                          ) : (
                                                <span className="bg-secondary-black/90 backdrop-blur-sm text-primary-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-secondary shadow-xs">
                                                      Out of Stock
                                                </span>
                                          )}
                                    </div>
                              </div>
                        </div>

                        {/* RIGHT COLUMN: PERFUME CONFIGURATION INFO */}
                        <div className="lg:col-span-7 space-y-6">

                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div>
                                          <span className="font-artistic-secondary font-semibold text-xs uppercase tracking-widest text-beige-dark block mb-1">
                                                {perfumeDetails?.brand }
                                          </span>
                                          <h1 className="font-primary text-3xl capitalize md:text-4xl font-bold text-primary-black leading-tight">
                                                {perfumeDetails?.name } <span className='font-primary font-semibold text-secondary-black text-lg inline-block ml-1'>{perfumeDetails?.concentration }</span>
                                          </h1>
                                          <p className="font-primary text-base text-beige-dark mt-1 tracking-wide">
                                                Scent Family: <span className="capitalize text-secondary-black ">{perfumeDetails?.category }</span>
                                          </p>
                                    </div>

                                    {/* CONDITIONAL ADMIN CONTROL PANEL - SLOTTED TOP RIGHT */}
                                    {userData && userData.role === 'admin' && (
                                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-start bg-primary-white p-1.5 rounded-xl border border-beige-light/60 shadow-xs">

                                                <Link to={`/admin/perfume/${perfumeDetails?._id}`}>
                                                      <button
                                                            className="p-2.5 bg-secondary-white hover:bg-beige-light/30 text-secondary-black rounded-lg transition-all group"
                                                            title="Edit Product Details"
                                                      >
                                                            <FaEdit className="text-xs group-hover:text-primary-black" />
                                                      </button>
                                                </Link>
                                                <button
                                                      onClick={() => setIsDeleteModalOpen(true)}
                                                      className="p-2.5 bg-secondary-white hover:bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-all"
                                                      title="Purge / Delete Product"
                                                >
                                                      <FaTrashAlt className="text-xs" />
                                                </button>
                                          </div>
                                    )}
                              </div>

                              {/* Ratings & Review Statistics Container */}
                              <div className="flex items-center gap-2 border-y border-beige-light py-3">
                                    <div className="flex items-center gap-0.5 text-amber-500 text-sm">
                                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                    </div>
                                    <span className="font-secondary text-xs text-primary-black font-semibold ml-1">4.6</span>
                                    <span className="text-xs text-beige-dark font-secondary">149 verified customer reviews</span>
                              </div>

                              {/* Pricing Box Elements */}
                              <div className="space-y-1">
                                    <div className="flex items-baseline gap-3">
                                          <span className="text-2xl font-bold font-secondary text-primary-black">
                                                Rs. {perfumeDetails?.price
                                                      ?.toLocaleString('en-IN') }
                                          </span>
                                          {perfumeDetails?.oldPrice && (
                                                <span className="text-sm font-secondary text-secondary-black line-through">
                                                      Rs. {perfumeDetails?.oldPrice.toLocaleString('en-IN') }
                                                </span>
                                          )}
                                          {perfumeDetails?.discount > 0 && (
                                                <span className="text-xs font-secondary font-bold text-green-light capitalize bg-green-light/10 px-2 py-0.5 rounded-md">
                                                      {`${perfumeDetails?.discount}% Off`}
                                                </span>
                                          )}
                                    </div>
                                    <span className="text-sm font-bold font-secondary text-secondary-black block pt-1">
                                          Size: {(perfumeDetails?.size)?.replace(/(\d+)([a-zA-Z]+)/, "$1 $2") }
                                    </span>
                                    <p className="text-[11px] font-secondary text-beige-dark">Or 4 interest-free split payments via Klarna.</p>
                              </div>

                              {/* Botanical Scent Pyramid Breakdown */}
                              <div className="bg-primary-white border-2 border-beige-light/60 rounded-xl p-5 space-y-3 shadow-xs">
                                    <h3 className="font-bold text-sm tracking-wide text-primary-black font-primary uppercase">Scent Architecture</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base font-artistic-primary capitalize  leading-relaxed">
                                          <div className="border-l-2 border-beige-light pl-3">
                                                <span className="block font-bold text-beige-light uppercase text-[13px] tracking-wider">Top Notes</span>
                                                <p className="text-secondary-black text-[17px]  mt-0.5">{perfumeDetails?.notes?.top }</p>
                                          </div>
                                          <div className="border-l-2 border-beige-dark pl-3">
                                                <span className="block font-bold text-beige-dark uppercase text-[13px] tracking-wider">Heart Notes</span>
                                                <p className="text-secondary-black text-[17px]  mt-0.5">{perfumeDetails?.notes?.heart }</p>
                                          </div>
                                          <div className="border-l-2 border-beige-accent pl-3">
                                                <span className="block font-bold text-beige-accent uppercase text-[13px] tracking-wider">Base Notes</span>
                                                <p className="text-secondary-black text-[17px]  mt-0.5">{perfumeDetails?.notes?.base }</p>
                                          </div>
                                    </div>
                              </div>

                              {/* Quantitative Actions Controls & Cart Processing Buttons */}
                              <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-4 border-t-2 border-beige-light/60">
                                    <div className="flex items-center justify-between border border-beige-light bg-primary-white rounded-xl px-4 py-3 sm:w-32">
                                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-beige-dark hover:text-primary-black text-xs transition-colors">
                                                <FaMinus />
                                          </button>
                                          <span className="font-bold text-sm text-primary-black font-secondary">{quantity}</span>
                                          <button onClick={() => setQuantity(quantity + 1)} className="text-beige-dark hover:text-primary-black text-xs transition-colors">
                                                <FaPlus />
                                          </button>
                                    </div>

                                    <button
                                          onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                addToCartHandler(perfumeDetails?._id);
                                          }}
                                          disabled={isInCart}
                                          className={`flex-1 flex items-center justify-center gap-2 ${isInCart ? "bg-gray-400 cursor-not-allowed " : " bg-green-dark hover:bg-primary-black"} text-primary-white font-secondary text-sm font-bold py-4 px-6 rounded-xl transition-colors shadow-md`}>
                                          <FaShoppingBag className="text-xs" /> {isInCart ? "Already Added in Shoping Bag" : "Add to Shopping Bag"}
                                    </button>

                                    <button
                                          onClick={(e) => {
                                                e.preventDefault(); e.stopPropagation();
                                                isWishlisted ? removeFromWishlistHandler(perfumeDetails?._id) : addToWishlistHandler(perfumeDetails?._id);
                                          }}
                                          className={`px-4 py-4 border rounded-xl flex items-center justify-center transition-colors text-sm ${isWishlisted ? 'border-red-200 text-red-500 bg-red-50/50' : 'border-beige-light text-beige-dark hover:text-primary-black bg-primary-white'}`}
                                    >
                                          <FaHeart className={isWishlisted ? 'scale-110 transition-transform' : ''} />
                                    </button>
                              </div>

                              {/* Editorial Core Informative Block Hooks */}
                              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t-2 border-beige-light/60 font-secondary text-xs text-secondary-black">
                                    <div className="flex items-center gap-2.5">
                                          <FaLeaf className="text-green-dark" /> <span>100% Organic Extracts</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                          <FaShieldAlt className="text-beige-accent" /> <span>Secure Hypoallergenic Safe</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                          <FaUndo className="text-beige-dark" /> <span>Free Returns on Samples</span>
                                    </div>
                              </div>
                        </div>
                  </main >

                  <Footer />

                  {/* --- LUXURY CONFIRMATION MODAL OVERLAY --- */}
                  {
                        isDeleteModalOpen && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    {/* Backdrop Blur Layer */}
                                    <div
                                          className="absolute inset-0 bg-secondary-black/40 backdrop-blur-xs transition-opacity"
                                          onClick={() => setIsDeleteModalOpen(false)}
                                    />

                                    {/* Central Modal Sheet */}
                                    <div className="relative bg-primary-white border border-beige-light rounded-2xl p-6 max-w-sm w-full shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200 text-center sm:text-left">
                                          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                                <div className="h-10 w-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0">
                                                      <FaExclamationTriangle className="text-sm" />
                                                </div>
                                                <div className="space-y-1">
                                                      <h3 className="font-primary font-bold text-base text-primary-black">
                                                            Delete Perfume Listing
                                                      </h3>
                                                      <p className="font-secondary text-xs text-secondary-black leading-relaxed">
                                                            Are you sure you want to remove <span className="font-semibold text-primary-black">{perfumeDetails?.brand} {perfumeDetails?.name}</span>? This action removes it permanently from your digital collection dashboard.
                                                      </p>
                                                </div>
                                          </div>

                                          {/* Action Buttons Matrix Row */}
                                          <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
                                                <button
                                                      onClick={() => setIsDeleteModalOpen(false)}
                                                      className="w-full sm:w-auto px-4 py-2.5 bg-secondary-white hover:bg-beige-light/30 border border-beige-light/60 text-secondary-black rounded-xl text-xs font-bold font-secondary tracking-wider transition-colors uppercase"
                                                >
                                                      No, Keep It
                                                </button>
                                                <button
                                                      onClick={e => deletePerfumehandler(perfumeDetails._id)}
                                                      disabled={isDeleting}
                                                      className={`w-full sm:w-auto px-5 py-2.5 ${isDeleting ? 'bg-gray-500 cursor-progress' : 'bg-red-600 hover:bg-primary-black'}  text-primary-white rounded-xl text-xs font-bold font-secondary tracking-wider transition-colors uppercase shadow-xs`}
                                                >
                                                      Yes, Delete
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        )
                  }

            </div >
      )
}


export default PerfumeInfoPage