import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaTruck, FaCreditCard, FaPlus, FaMapMarkerAlt, FaEdit, FaCheckCircle } from 'react-icons/fa';
import { Button, Footer, Input } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, updateAddress, fetchAddresses } from '../apis/address.api';
import { userstate__setAddress } from '../features/userSlice';
import { useForm } from 'react-hook-form';
import { initiateCheckout } from '../apis/order.api';
import { load } from "@cashfreepayments/cashfree-js";



const dummyCart = [
      {
            _id: "prod_01j7x",
            name: "Bleu De Chanel Eau De Parfum",
            brand: "Chanel",
            image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80",
            quantity: 1,
            size: "100 ml",
            price: 14500
      },
      {
            _id: "prod_02m9z",
            name: "Oud Wood",
            brand: "Tom Ford",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=300&q=80",
            quantity: 2,
            size: "50 ml",
            price: 18200
      }
];

const orderSummary = {
      subtotal: 50900, // (14500 * 1) + (18200 * 2)
      discount: 2500,  // Promotional discount amount
      total: 48400     // subtotal - discount (shipping is free)
};

export default function Checkout() {
      const dispatch = useDispatch();


      const [isProcessing, setIsProcessing] = useState(false)
      // Grab addresses from your Redux store
      const addressesFromRedux = useSelector((state) => state.user.address);
      const { cartData } = useSelector(state => state.perfume)
      console.log(cartData)
      const cart = cartData?.cart
      console.log(cart)
      // Track selected address
      const [selectedAddressId, setSelectedAddressId] = useState(null);

      // Track whether we are editing an existing address or adding a new one
      const [editingAddressId, setEditingAddressId] = useState(null);
      const [isFormOpen, setIsFormOpen] = useState(false);

      // Initialize React Hook Form
      const {
            register,
            handleSubmit,
            reset,
            formState: { errors, isSubmitting },
      } = useForm({
            defaultValues: {
                  name: '',
                  phone: '',
                  pincode: '',
                  address: '',
                  city: '',
                  state: '',
                  country: '',
            },
      });

      // 1. Fetch addresses on mount
      useEffect(() => {
            const getAddresses = async () => {
                  try {
                        const response = await fetchAddresses();
                        if (response?.data?.address) {
                              dispatch(userstate__setAddress(response.data.address));
                              // Automatically select the first address as default if available
                              if (response.data.address.length > 0) {
                                    setSelectedAddressId(response.data.address[0]._id);
                              }
                        }
                  } catch (error) {
                        console.error("Failed to fetch addresses:", error);
                  }
            };
            getAddresses();
      }, [dispatch]);


      const [cashfree, setCashfree] = useState(null);

      useEffect(() => {

            const initializeCashfree = async () => {

                  const cashfreeSDK = await load({
                        mode: "sandbox"
                  });

                  setCashfree(cashfreeSDK);
            };

            initializeCashfree();

      }, []);

      // 2. Handle Form Submission (Add or Update)
      const onSubmit = async (data) => {

            try {
                  if (editingAddressId) {
                        // Update existing sub-document address
                        const response = await updateAddress(editingAddressId, data);
                        if (response?.data?.address) {
                              dispatch(userstate__setAddress(response.data.address));
                        }
                  } else {
                        // Add new sub-document address
                        const response = await addAddress(data);
                        if (response?.data?.address) {
                              dispatch(userstate__setAddress(response.data.address));
                              // Automatically select newly created address
                              const lastAdded = response.data.address[response.data.address.length - 1];
                              if (lastAdded) setSelectedAddressId(lastAdded._id);
                        }
                  }
                  // Reset layout state
                  reset();
                  setEditingAddressId(null);
                  setIsFormOpen(false);
            } catch (error) {
                  console.error("Error saving address:", error);
            }
      };

      // 3. Populate form fields for editing
      const handleEditClick = (e, addr) => {
            e.stopPropagation(); // Avoid triggering address selection when clicking edit
            setEditingAddressId(addr._id);
            setIsFormOpen(true);
            reset({
                  name: addr.name,
                  phone: addr.phone,
                  pincode: addr.pincode,
                  address: addr.address,
                  city: addr.city,
                  state: addr.state,
                  country: addr.country,
            });
      };

      const handleCancel = () => {
            reset();
            setEditingAddressId(null);
            setIsFormOpen(false);
      };

      const processCheckoutHandler = async (e) => {
            e.preventDefault();

            if (!cashfree) {
                  alert("Payment gateway is loading. Please try again.");
                  return;
            }

            if (!selectedAddressId) {
                  alert("Please select a delivery address.");
                  return;
            }

            try {
                  setIsProcessing(true);

                  const shippingAddress = addressesFromRedux.find(
                        addr => addr._id === selectedAddressId
                  );

                  if (!shippingAddress) {
                        throw new Error("Selected address not found");
                  }

                  const response = await initiateCheckout({
                        shippingAddress
                  });

                  const paymentSessionID =
                        response?.data?.paymentSessionID;

                  if (!paymentSessionID) {
                        throw new Error(
                              "Payment session not received from server"
                        );
                  }

                  const result = await cashfree.checkout({
                        paymentSessionId: paymentSessionID,
                        redirectTarget: "_self"
                  });

                  console.log("Cashfree checkout result:", result);

            } catch (error) {

                  console.error(
                        "Checkout Error:",
                        error.response?.data || error.message
                  );

                  alert(
                        error.response?.data?.message ||
                        error.message ||
                        "Unable to start payment"
                  );

            } finally {

                  setIsProcessing(false);
            }
      };

      return (
            <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary relative">

                  {/* --- BREADCRUMBS --- */}
                  <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 text-xs tracking-wide font-secondary text-beige-dark">
                        <Link to="/cart" className="hover:text-primary-black cursor-pointer">Shopping Bag</Link>
                        <span className="mx-2">/</span>
                        <span className="text-secondary-black font-medium">Checkout</span>
                  </div>

                  {/* --- MAIN CHECKOUT INTERFACE --- */}
                  <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* LEFT COLUMN: ADDRESSES & FORMS (Spans 7 out of 12 columns on desktop) */}
                        <div className="lg:col-span-7 space-y-6 w-full">
                              <div className="flex justify-between items-center border-b pb-4 gap-4">
                                    <h2 className="text-xl sm:text-2xl font-bold text-primary-black">Your Addresses</h2>
                                    {!isFormOpen && (
                                          <button
                                                onClick={() => setIsFormOpen(true)}
                                                className="px-4 py-2 bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-800 duration-200 text-xs sm:text-sm shrink-0"
                                          >
                                                Add New Address
                                          </button>
                                    )}
                              </div>

                              {/* Address Input Form */}
                              {isFormOpen && (
                                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 sm:p-6 border rounded-2xl space-y-2">
                                          <h3 className="text-lg font-bold text-secondary-black">
                                                {editingAddressId ? 'Edit Address' : 'Add a New Address'}
                                          </h3>

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Input
                                                      label="Full Name"
                                                      placeholder="John Doe"
                                                      error={errors.name?.message}
                                                      {...register('name', { required: 'Name is required' })}
                                                      ref={register('name').ref}
                                                />
                                                <Input
                                                      label="Phone Number"
                                                      placeholder="1234567890"
                                                      error={errors.phone?.message}
                                                      {...register('phone', { required: 'Phone number is required' })}
                                                      ref={register('phone').ref}
                                                />
                                          </div>

                                          <Input
                                                label="Street Address"
                                                placeholder="Flat, House no., Apartment, Street"
                                                error={errors.address?.message}
                                                {...register('address', { required: 'Address is required' })}
                                                ref={register('address').ref}
                                          />

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Input
                                                      label="City"
                                                      placeholder="City"
                                                      error={errors.city?.message}
                                                      {...register('city', { required: 'City is required' })}
                                                      ref={register('city').ref}
                                                />
                                                <Input
                                                      label="Pincode"
                                                      placeholder="123456"
                                                      error={errors.pincode?.message}
                                                      {...register('pincode', { required: 'Pincode is required' })}
                                                      ref={register('pincode').ref}
                                                />
                                          </div>

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Input
                                                      label="State"
                                                      placeholder="State"
                                                      error={errors.state?.message}
                                                      {...register('state', { required: 'State is required' })}
                                                      ref={register('state').ref}
                                                />
                                                <Input
                                                      label="Country"
                                                      placeholder="Country"
                                                      error={errors.country?.message}
                                                      {...register('country', { required: 'Country is required' })}
                                                      ref={register('country').ref}
                                                />
                                          </div>

                                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                                <Button
                                                      type="submit"
                                                      child={isSubmitting ? 'Saving...' : editingAddressId ? 'Update Address' : 'Save Address'}
                                                      colorSchema="bg-zinc-900 text-white rounded-2xl hover:bg-zinc-800"
                                                      className="w-full order-1 sm:order-2"
                                                />
                                                <button
                                                      type="button"
                                                      onClick={handleCancel}
                                                      className="w-full py-3 border-2 border-gray-300 rounded-2xl text-secondary-black font-medium hover:bg-gray-50 duration-200 order-2 sm:order-1"
                                                >
                                                      Cancel
                                                </button>
                                          </div>
                                    </form>
                              )}

                              {/* Address Directory Grid - Scrollable Section */}
                              <div className="max-h-125 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {addressesFromRedux.length === 0 ? (
                                          <p className="text-zinc-500 col-span-1 sm:col-span-2 py-4 text-center sm:text-left">No addresses saved yet.</p>
                                    ) : (
                                          addressesFromRedux.map((item) => {
                                                const isSelected = selectedAddressId === item._id;
                                                return (
                                                      <div
                                                            key={item._id}
                                                            onClick={() => setSelectedAddressId(item._id)}
                                                            className={`border-2 p-5 rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-200 relative bg-white ${isSelected ? 'border-beige-light' : 'border-gray-200 hover:border-zinc-400'
                                                                  }`}
                                                      >
                                                            {isSelected && (
                                                                  <div className="absolute top-4 right-4 text-blue-500">
                                                                        <FaCheckCircle className="text-lg" />
                                                                  </div>
                                                            )}
                                                            <div className="space-y-1 pr-6">
                                                                  <p className="font-bold capitalize text-primary-black">{item.name}</p>
                                                                  <p className="text-sm text-secondary-black capitalize">{item.address}</p>
                                                                  <p className="text-sm text-secondary-black capitalize">{item.city}, {item.state} - {item.pincode}</p>
                                                                  <p className="text-sm text-secondary-black capitalize">{item.country}</p>
                                                                  <p className="text-sm text-zinc-500 mt-2">Phone: {item.phone}</p>
                                                            </div>
                                                            <div className="mt-4 pt-3 border-t flex justify-end">
                                                                  <button
                                                                        onClick={(e) => handleEditClick(e, item)}
                                                                        className="text-sm font-semibold text-zinc-900 hover:underline"
                                                                  >
                                                                        Edit Details
                                                                  </button>
                                                            </div>
                                                      </div>
                                                );
                                          })
                                    )}
                              </div>
                        </div>

                        {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR (Spans 5 out of 12 columns on desktop) */}
                        <div className="lg:col-span-5 w-full space-y-6 lg:sticky lg:top-6">
                              <div className="bg-white border-2 border-beige-light/60 rounded-2xl p-4 sm:p-6 space-y-6 shadow-sm">
                                    <h3 className="font-bold text-sm tracking-wide text-primary-black font-primary uppercase border-b border-beige-light pb-3">
                                          Your Order Summary
                                    </h3>

                                    {/* Cart Items Miniature Gallery */}
                                    <div className="max-h-60 overflow-y-auto divide-y divide-beige-light/40 pr-1">
                                          {cart && cart.map((item) => (
                                                <div key={item?.perfume?._id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                                                      <div className="w-16 h-20 bg-secondary-white border border-beige-light rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1">
                                                            <img src={item?.perfume?.images[0].url} alt={item?.perfume?.name} className="w-full h-full object-cover rounded-lg" />
                                                      </div>
                                                      <div className="flex-1 min-w-0">
                                                            <span className="block font-secondary font-semibold text-[10px] uppercase tracking-wider text-beige-dark">
                                                                  {item?.perfume?.brand}
                                                            </span>
                                                            <h4 className="font-primary text-sm font-bold text-primary-black truncate capitalize">
                                                                  {item?.perfume?.name}
                                                            </h4>
                                                            <p className="text-xs text-secondary-black font-secondary mt-0.5">
                                                                  Qty: {item?.quantity} • <span className="text-beige-dark">{item?.perfume?.size}</span>
                                                            </p>
                                                      </div>
                                                      <span className="text-sm font-semibold font-secondary text-primary-black shrink-0">
                                                            Rs. {(item?.perfume?.price * item?.quantity).toLocaleString('en-IN')}
                                                      </span>
                                                </div>
                                          ))}
                                    </div>

                                    {/* Pricing Matrix */}
                                    <div className="border-t border-beige-light pt-4 space-y-2 font-secondary text-xs text-secondary-black">
                                          <div className="flex justify-between">
                                                <span>Subtotal</span>
                                                <span className="font-medium">Rs. {cartData?.currentCartState?.subtotal?.toLocaleString('en-IN')}</span>
                                          </div>
                                          <div className="flex justify-between">
                                                <span>Insured Fragrance Shipping</span>
                                                <span className="text-green-light font-bold">Free</span>
                                          </div>
                                          {cartData?.currentCartState?.discountAmount > 0 && (
                                                <div className="flex justify-between text-green-light font-bold">
                                                      <span>Promotional Discount || {cartData?.appliedCoupon?.code}  ( {cartData?.currentCartState?.discountPercentage} % )</span>
                                                      <span>- Rs. {cartData?.currentCartState?.discountAmount?.toLocaleString('en-IN')}</span>
                                                </div>
                                          )}
                                          <div className="flex justify-between items-baseline pt-4 border-t border-beige-light/60">
                                                <span className="font-primary font-bold text-sm text-primary-black uppercase tracking-wider">Total</span>
                                                <span className="font-secondary font-bold text-xl text-primary-black">
                                                      Rs. {cartData?.currentCartState?.grandTotal.toLocaleString('en-IN')}
                                                </span>
                                          </div>
                                    </div>

                                    {/* Final Checkout Form Button Action */}
                                    <div className="space-y-2">
                                          <button
                                                onClick={processCheckoutHandler}
                                                disabled={isProcessing}
                                                className={`w-full flex items-center justify-center gap-2 ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-zinc-900 hover:bg-zinc-800"
                                                      } text-white font-secondary text-xs uppercase tracking-widest font-bold py-4 px-6 rounded-xl transition-colors shadow-md`}
                                          >
                                                <FaCreditCard className="text-xs" />
                                                {isProcessing ? "Processing Vault Authorization..." : "Authorize Secured Payment"}
                                          </button>

                                          {!selectedAddressId && addressesFromRedux.length > 0 && (
                                                <p className="text-xs text-center text-red-700 mt-2">
                                                      Please select a delivery address before proceeding.
                                                </p>
                                          )}

                                          {addressesFromRedux.length === 0 && (
                                                <p className="text-xs text-center text-red-700 mt-2">
                                                      Please add an address before proceeding.
                                                </p>
                                          )}
                                    </div>
                              </div>
                        </div>
                  </main>
            </div>
      );
}