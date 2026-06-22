import React, { useEffect, useRef, useState } from 'react';
import { FaTrashAlt, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft, FaTag, FaCreditCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData } from '../features/perfumeSlice';
import { removeFromCart, updateCartItemQuantity } from '../apis/cart.api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { applyCoupon, getCoupons } from '../apis/cart.api';
import { showCustomToast, showErrorToast, showLoadingToast, showSuccessToast } from '../utils/hotToast';
import CartItemSkeleton from './skeletons/CartItemSkeleton';


import Skeleton from 'react-loading-skeleton';


export default function Cart() {

      const [isLoading, setIsLoading] = useState(true)

      const location = useLocation();
      const navigate = useNavigate();

      const previousPage = location.state?.from || "/";


      const dispatch = useDispatch()
      const { cart, appliedCoupon, totalItems, totalQuantity, currentCartState } = useSelector(state => state.perfume.cartData);

      const [discountCoupons, setDiscountCoupons] = useState([]);
      const [promoCode, setPromoCode] = useState(appliedCoupon?.code || null);


      const handleContinueShopping = () => {
            navigate(previousPage);
      };

      useEffect(() => {

            const fetchCoupons = async () => {
                  setIsLoading(true)

                  try {
                        const response = await getCoupons();
                        setDiscountCoupons(response.data);

                  } catch (error) {
                        console.log(error);

                  } finally {
                        setIsLoading(false);
                  };
            }
            fetchCoupons();

      }, []);


      const updateCartHandler = async (perfumeId, newQuantity) => {
            setIsLoading(true)

            if (newQuantity < 0) return;
            if (newQuantity > 10) return;

            try {
                  const response = await updateCartItemQuantity(perfumeId, newQuantity);
                  dispatch(setCartData(response?.data));

            } catch (error) {
                  showErrorToast("Failed to update quantity");

            } finally {
                  setIsLoading(false);

            };
      };


      const removeFromCartHandler = async (perfumeId) => {
            setIsLoading(true)
            const toastId = showLoadingToast("Removing perfume...");

            try {
                  const response = await removeFromCart(perfumeId);
                  dispatch(setCartData(response?.data));
                  showSuccessToast("Removed from cart", toastId);

            } catch (error) {
                  showErrorToast("Failed to remove perfume", toastId);
                  console.error("Error removing from cart:", error?.response);

            } finally {
                  setIsLoading(false);

            };
      };


      const applyCouponHandler = async () => {
            setIsLoading(true)
            if (!promoCode) {
                  return showErrorToast("Please select a coupon");
            }

            const toastId = showLoadingToast("Applying coupon...");

            try {
                  const response = await applyCoupon(promoCode);
                  dispatch(setCartData(response?.data))
                  showSuccessToast("Coupon applied", toastId);
                  showCustomToast("Discount Applied 🎉", `${promoCode} activated successfully`);

            } catch (error) {
                  showErrorToast("Failed to apply coupon", toastId);
                  console.log(error.response);

            } finally {
                  setIsLoading(false);

            };
      };



      return (

            <div className="min-h-screen lg:h-screen bg-secondary-white text-primary-black font-primary p-4 md:p-6 lg:p-8 flex flex-col justify-between">
                  <div className="max-w-7xl w-full mx-auto flex flex-col h-full space-y-4 lg:overflow-hidden">

                        {/* Top Minimal Navigation Bar */}
                        <header className="flex items-center justify-between bg-primary-white px-5 py-4 rounded-xl border border-secondary-white shrink-0 shadow-xs">
                              <button className="flex items-center gap-2 text-sm font-semibold text-secondary-black hover:text-primary-black transition-colors">
                                    <FaArrowLeft className="text-xs" />
                                    <span onClick={handleContinueShopping}>Continue Shopping</span>
                              </button>
                              <div className="flex items-center gap-2 font-bold text-lg">
                                    <FaShoppingBag className="text-beige-accent" />
                                    <span>Shopping Bag ({totalItems})</span>
                              </div>
                        </header>

                        {/* Dynamic Split Layout Columns Panel */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:flex-1 lg:overflow-hidden pb-2">

                              {/* LEFT CONTAINER: Scrollable Checkout List Cards (Takes 2 Columns) */}
                              <div className="lg:col-span-2 flex flex-col h-full lg:overflow-hidden">

                                    {isLoading ? (

                                          <div className="space-y-3 lg:overflow-y-auto pr-0 lg:pr-2 flex-1 pb-4">
                                                {Array.from({ length: 3 }).map((_, index) => (
                                                      <CartItemSkeleton key={index} />
                                                ))}
                                          </div>

                                    ) : cart.length === 0 ? (

                                          <div className="flex-1 bg-primary-white rounded-2xl border border-secondary-white p-12 flex flex-col items-center justify-center text-center space-y-4">
                                                <div className="h-16 w-16 bg-secondary-white rounded-full flex items-center justify-center text-secondary-black text-xl">
                                                      <FaShoppingBag />
                                                </div>
                                                <div>
                                                      <h3 className="text-xl font-bold">Your cart is empty</h3>
                                                      <p className="text-xs font-secondary text-secondary-black mt-1">
                                                            Looks like you haven't added any luxury fragrances yet.
                                                      </p>
                                                </div>
                                          </div>
                                    ) : (
                                          /* Isolated Vertical Scroll Axis Layer for Cart items */
                                          <div className="space-y-3 lg:overflow-y-auto pr-0 lg:pr-2 flex-1 pb-4">
                                                {cart.map((item) => (
                                                      <div
                                                            key={item?.perfume?._id}
                                                            className="w-full h-auto md:h-27.5 bg-primary-white border border-secondary-white rounded-xl p-3 flex flex-col md:flex-row items-center gap-4 group hover:shadow-xs hover:border-beige-light transition-all duration-300 overflow-hidden shrink-0"
                                                      >
                                                            {/* Thumbnail */}
                                                            <Link to={`/perfume/${item?.perfume?._id}`} className='h-full'>
                                                                  <div className="h-20 w-20 md:h-full md:w-20 bg-secondary-white rounded-lg overflow-hidden shrink-0 cursor-pointer">
                                                                        <img src={item?.perfume?.images[0].url} alt={item?.perfume?.name} className="h-full w-full object-cover object-center" />
                                                                  </div>
                                                            </Link>

                                                            {/* Metadata Content Area */}
                                                            <div className="flex-1 flex flex-col sm:flex-row justify-between items-center w-full h-full overflow-hidden gap-3 sm:gap-0 ">
                                                                  <Link to={`/perfume/${item?.perfume?._id}`}  >

                                                                        <div className="flex flex-col justify-center text-center md:text-left overflow-hidden cursor-pointer">
                                                                              <span className="text-[11px] font-bold font-primary text-beige-dark tracking-widest uppercase block leading-none">{item?.perfume?.brand}</span>
                                                                              <h3 className="text-sm font-bold text-primary-black mt-0.5 truncate max-w-xs flex items-center gap-0.5 capitalize font-primary">{item?.perfume?.name}
                                                                                    <span className=''>{item?.perfume?.concentration}</span>

                                                                              </h3>
                                                                              <p className="text-[13px]  font-primary text-secondary-black">Size: <span className="font-semibold ">{item?.perfume?.size}</span></p>
                                                                        </div>
                                                                  </Link>

                                                                  {/* Control Actions & Increments Wrapper */}
                                                                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto shrink-0">
                                                                        {/* Price Breakdown Segment */}
                                                                        <div className="text-right min-w-20">
                                                                              <span className="text-[12px] font-primary text-secondary-black block leading-none mb-0.5">Total</span>
                                                                              <span className="text-base font-bold text-primary-black  ">Rs {item?.perfume?.price.toLocaleString('en-IN')}</span>
                                                                        </div>

                                                                        {/* Custom Counter Box */}
                                                                        <div className="flex items-center border border-secondary-white bg-secondary-white rounded-lg overflow-hidden h-8">
                                                                              <button
                                                                                    onClick={() =>
                                                                                          updateCartHandler(item.perfume._id, item.quantity - 1)}
                                                                                    className="px-2.5 h-full text-secondary-black hover:bg-secondary-white hover:text-primary-black transition-colors">
                                                                                    <FaMinus className="text-[9px]" />
                                                                              </button>
                                                                              <span className="px-3 text-xs font-bold font-secondary text-primary-black w-8 text-center bg-primary-white h-full flex items-center justify-center">
                                                                                    {item?.quantity}
                                                                              </span>
                                                                              <button
                                                                                    onClick={() => updateCartHandler(item.perfume._id, item.quantity + 1)}
                                                                                    disabled={item.quantity >= 10}
                                                                                    className="px-2.5 h-full text-secondary-black hover:bg-secondary-white hover:text-primary-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                                                    <FaPlus className="text-[9px]" />
                                                                              </button>
                                                                        </div>



                                                                        {/* Trash Button */}
                                                                        <button

                                                                              onClick={() => removeFromCartHandler(item?.perfume._id)}
                                                                              className="p-2 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                                                                              title="Remove Item"
                                                                        >
                                                                              <FaTrashAlt className="text-xs" />
                                                                        </button>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    )

                                    }
                              </div>

                              {/* RIGHT CONTAINER: Fixed Sticky Pricing Calculations Summary Drawer */}
                              <div className="lg:col-span-1 h-full flex flex-col justify-between">
                                    <div className="bg-primary-white rounded-2xl border border-secondary-white p-5 space-y-5 flex flex-col justify-between h-full shadow-xs">

                                          <div className="space-y-4">
                                                <h2 className="text-lg font-bold border-b border-secondary-white pb-2 text-primary-black">Order Summary</h2>

                                                {/* Promo Code Entry Frame */}
                                                <div className="space-y-1.5">
                                                      <label className="text-xs font-secondary text-secondary-black flex gap-2">Do you have a coupon code?
                                                            <div className="flex flex-wrap gap-2">

                                                                  {isLoading ? (
                                                                        Array.from({ length: 4 }).map((_, index) => (
                                                                              <Skeleton
                                                                                    key={index}
                                                                                    width={80}
                                                                                    height={28}
                                                                                    borderRadius={6}
                                                                                    baseColor="#ececec"
                                                                                    highlightColor="#f8f8f8"
                                                                              />
                                                                        ))
                                                                  ) : (
                                                                        discountCoupons?.map((coupon, index) => (
                                                                              <span
                                                                                    key={index}
                                                                                    onClick={() => setPromoCode(coupon.code)}
                                                                                    className="font-artistic-primary font-semibold tracking-wider flex items-center text-beige-dark bg-beige-light/40 hover:bg-beige-light/60 duration-200 ease-in-out cursor-pointer pt-1 pb-0.5 px-1 rounded-md"
                                                                              >
                                                                                    {coupon.code}
                                                                              </span>
                                                                        ))
                                                                  )}

                                                            </div>

                                                      </label>
                                                      <div className="flex gap-2">
                                                            <div className="relative flex-1">
                                                                  <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                                                                  <input
                                                                        type="text"
                                                                        data-discount={promoCode?.value || 0}
                                                                        value={promoCode || ""}
                                                                        readOnly
                                                                        placeholder="Select a coupon"
                                                                        className="w-full pl-8 pr-3 py-2 bg-secondary-white border border-secondary-white rounded-xl text-xs 
                                                                        font-semibold  text-green-light font-secondary outline-none focus:border-green-light"
                                                                  />
                                                            </div>
                                                            <button
                                                                  onClick={applyCouponHandler}
                                                                  className="px-3 py-2 bg-primary-black hover:bg-beige-accent text-primary-white text-xs font-semibold rounded-xl transition-colors">
                                                                  Apply
                                                            </button>
                                                      </div>
                                                </div>

                                                {/* Pricing Fee Breakdown Rows Grid */}
                                                <div className="space-y-2 pt-2 font-secondary text-xs text-secondary-black">
                                                      <div className="flex justify-between">
                                                            <span>Subtotal</span>
                                                            <span className="font-bold text-primary-black">Rs {currentCartState?.subtotal}</span>
                                                      </div>
                                                      <div className="flex justify-between">
                                                            <span>Estimated Shipping Charges</span>
                                                            <span className="font-bold text-primary-black">
                                                                  {currentCartState?.shipping === 0 ? "FREE" : `Rs ${currentCartState?.shipping}`}
                                                            </span>
                                                      </div>
                                                      <div className="flex justify-between">
                                                            <span>GST 18%  </span>
                                                            <span className="font-bold text-primary-black"> Included</span>
                                                      </div>
                                                      <div className="flex justify-between">
                                                            <span>Discounted Amount {`( ${currentCartState.discountPercentage}% )`} </span>
                                                            <span className="font-bold text-green-light">
                                                                  - Rs {currentCartState?.discountAmount}
                                                            </span>
                                                      </div>
                                                      <div className="flex justify-between">
                                                            <span>Discount coupon </span>
                                                            <span className="font-bold text-green-light">
                                                                  {appliedCoupon?.code || "No coupon"}
                                                            </span>
                                                      </div>
                                                      {currentCartState?.shipping === 0 && currentCartState?.subtotal > 0 && (
                                                            <p className="text-[11px] text-green-dark bg-green-light/10 px-2 py-1 rounded-md font-medium mt-1">
                                                                  🎉 Eligible for Free Premium Shipping
                                                            </p>
                                                      )}
                                                </div>
                                          </div>

                                          {/* Grand Checkout Total Area Footer Column Block */}
                                          <div className="pt-4 border-t border-secondary-white space-y-3">
                                                <div className="flex justify-between items-baseline">
                                                      <span className="text-base font-bold text-primary-black">Grand Total</span>
                                                      <span className="text-2xl font-bold font-secondary text-primary-black">
                                                            Rs {currentCartState?.grandTotal || 0}
                                                      </span>
                                                </div>

                                                <button
                                                      disabled={cart.length === 0}
                                                      className="w-full flex items-center justify-center gap-2 py-3 bg-green-dark hover:bg-primary-black disabled:bg-gray-300 disabled:cursor-not-allowed text-primary-white font-bold text-sm rounded-xl transition-colors duration-300 shadow-md"
                                                >
                                                      <FaCreditCard className="text-xs" />
                                                      <Link to={'/order/summary'}>
                                                            <span>Proceed to Checkout</span>
                                                      </Link>
                                                </button>
                                          </div>

                                    </div>
                              </div>

                        </div>

                  </div>
            </div >
      );
}