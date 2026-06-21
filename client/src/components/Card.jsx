import React from 'react'
import { Wishlist } from '../pages';
import { Link } from 'react-router-dom';
import { addToCart } from '../apis/cart.api';
import { FaStar, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCartData, setWishlist } from '../features/perfumeSlice';
import { addToWishlist, removeFromWishlist } from '../apis/wishlist.api';
import { showCustomToast, showLoadingToast, showErrorToast, showSuccessToast } from '../utils/hotToast';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Card = ({ perfume }) => {

      const dispatch = useDispatch()

      const { wishlist } = useSelector(state => state.perfume);
      
      const { cart, appliedCoupon, currentCartState } =
            useSelector(state => state.perfume.cartData);

      const isWishlisted = wishlist.some(
            item => item?.perfume?._id === perfume?._id
      )

      const isInCart = cart.some(
            item => item?.perfume?._id === perfume?._id
      )


      const addToCartHandler = async (perfumeId) => {

            const toastId =
                  showLoadingToast("Adding to cart...");

            try {

                  const response = await addToCart(perfumeId);
                  dispatch(setCartData(response?.data));

                  showSuccessToast("Added to cart successfully", toastId);

            } catch (error) {
                  showErrorToast("Failed to add to cart", toastId);
                  console.error("Error adding to cart:", error.response);
            }
      };


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


      return (
            <Link to={perfume ? `/perfume/${perfume._id}` : null} >
                  <div key={perfume.id} className="group relative flex flex-col justify-between bg-secondary-white/40 border border-beige-light/60 rounded-2xl p-4 hover:border-beige-light transition-colors">

                        {/* Visual Top Area / Tags */}
                        <div className="w-full h-64 bg-white rounded-xl relative flex items-center justify-center p-3 border border-secondary-white overflow-hidden">

                              <button onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    if (isWishlisted) {
                                          removeFromWishlistHandler(perfume?._id);
                                    } else {
                                          addToWishlistHandler(perfume?._id);
                                    }
                              }}
                                    className={`absolute top-4 right-4 ${isWishlisted ? ' text-red-500' : 'text-white'} bg-primary-black/20 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all shadow-xs z-10`}>
                                    <FaHeart />
                              </button>


                              <div className="relative w-full h-full group-hover:scale-105 rounded-lg overflow-hidden transition-transform duration-500 flex flex-col items-center">
                                    {
                                          <img src={perfume?.images?.[0].url} alt="perfume image"
                                                className='w-full h-full object-cover object-center' />
                                          || <Skeleton />
                                    }
                              </div>
                        </div>

                        {/* Info Metadata */}
                        <div className="mt-4 space-y-1">
                              <div className="flex justify-between items-center">
                                    <span className="text-[12px] font-artistic-secondary text-beige-dark capitalize tracking-wider">{perfume.category || <Skeleton />}</span>
                                    <div className=" text-[11px] font-['Roboto',sans-serif] text-primary-black">
                                          <FaStar className="text-amber-500 text-[10px]" />
                                    </div>
                              </div>
                              <div className='flex items-center justify-start gap-1'>
                                    <h4 className="font-primary font-semibold text-[15px] text-primary-black capitalize tracking-tight">{perfume.brand || <Skeleton />}</h4>
                                    <p className="text-[13px] font-semibold capitalize font-primary text-secondary-black truncate">{perfume?.name || <Skeleton />}</p>
                              </div>

                              <div className="flex justify-start items-end pt-3 mt-2 gap-2 border-t border-beige-light/40 ">
                                    <div className="font-secondary font-bold text-sm text-secondary-black">Rs {perfume?.price?.toLocaleString("en-IN") || <Skeleton />}</div>
                                    <div className="font-primary capitalize font-bold text-sm text-gray-500">{perfume?.size || <Skeleton />}</div>
                                    <button
                                          onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                addToCartHandler(perfume?._id);
                                          }}
                                          disabled={isInCart}
                                          className={`text-xs px-3 ml-auto py-1.5 rounded-lg transition-colors font-['Roboto',sans-serif] ${isInCart ? "bg-gray-400 cursor-not-allowed text-white" : "bg-primary-black hover:bg-green-dark text-white"}`}>
                                          {isInCart ? "Added" : "+ Bag"}
                                    </button>
                              </div>
                        </div>

                  </div>
            </Link>

      )
}

export default Card