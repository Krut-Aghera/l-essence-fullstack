import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
      FaLock,
      FaTruck,
      FaCreditCard,
      FaPlus,
      FaMapMarkerAlt,
      FaEdit,
      FaCheckCircle,
} from "react-icons/fa";
import { Button, Footer, Input } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, updateAddress, fetchAddresses, removeAddress } from "../apis/address.api";
import { userstate__setAddress } from "../features/userSlice";
import { useForm } from "react-hook-form";
import { initiateCheckout } from "../apis/order.api";
import { load } from "@cashfreepayments/cashfree-js";
import { showErrorToast } from "../utils/hotToast";

const Checkout = () => {
      const dispatch = useDispatch();

      const [cashfree, setCashfree] = useState(null);
      const [isProcessing, setIsProcessing] = useState(false);

      const addressesFromRedux = useSelector((state) => state.user.address) || [];
      const [selectedAddressId, setSelectedAddressId] = useState(null);
      const [editingAddressId, setEditingAddressId] = useState(null);

      const [isFormOpen, setIsFormOpen] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [isDeletingId, setIsDeletingId] = useState(null);
      const [isSubmitting, setIsSubmitting] = useState(false);

      const { cartData } = useSelector((state) => state.perfume);
      const cart = cartData?.cart;

      const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
      } = useForm({
            defaultValues: {
                  name: "",
                  phone: "",
                  pincode: "",
                  address: "",
                  city: "",
                  state: "",
                  country: "India",
            },
      });

      useEffect(() => {
            const initializeCashfree = async () => {
                  const cashfreeSDK = await load({
                        mode: "sandbox",
                  });

                  setCashfree(cashfreeSDK);
            };

            initializeCashfree();
      }, []);

      useEffect(() => {
            const getAddresses = async () => {
                  setIsLoading(true);

                  try {
                        const response = await fetchAddresses();
                        if (response?.data?.address) {
                              const fetchedAddresses = response.data.address;
                              dispatch(userstate__setAddress(fetchedAddresses));

                              // Auto-select first address if none is selected yet
                              if (fetchedAddresses.length > 0 && !selectedAddressId) {
                                    setSelectedAddressId(fetchedAddresses[0]._id);
                              }
                        }
                  } catch (error) {
                        console.error("Failed to fetch addresses:", error);
                  } finally {
                        setIsLoading(false);
                  }
            };

            getAddresses();
      }, [dispatch]);

      const onSubmit = async (data) => {
            try {
                  if (editingAddressId) {
                        const response = await updateAddress(editingAddressId, data);

                        if (response?.data?.address) {
                              dispatch(userstate__setAddress(response.data.address));
                              setSelectedAddressId(editingAddressId); // Keep edited item active
                        }
                  } else {
                        const response = await addAddress(data);

                        if (response?.data?.address) {
                              const currentAddresses = response.data.address;
                              dispatch(userstate__setAddress(currentAddresses));

                              const lastAdded = currentAddresses[currentAddresses.length - 1];
                              if (lastAdded) setSelectedAddressId(lastAdded._id);
                        }
                  }
                  closeAndResetForm();
            } catch (error) {
                  console.error("Error saving address:", error);
            }
      };

      const handleDelete = async (e, id) => {
            e.stopPropagation();
            setIsDeletingId(id);

            try {
                  const response = await removeAddress(id);
                  if (response?.data?.address) {
                        const updatedAddresses = response.data.address;
                        dispatch(userstate__setAddress(updatedAddresses));

                        if (selectedAddressId === id) {
                              setSelectedAddressId(
                                    updatedAddresses.length > 0 ? updatedAddresses[0]._id : null
                              );
                        }
                  }
            } catch (error) {
                  console.error("Error deleting address:", error);
            } finally {
                  setIsDeletingId(null);
            }
      };

      const handleEditClick = (e, addr) => {
            e.stopPropagation();
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

      const closeAndResetForm = () => {
            reset({
                  name: "",
                  phone: "",
                  pincode: "",
                  address: "",
                  city: "",
                  state: "",
                  country: "India",
            });
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
                  showErrorToast("Select ( or Add ) the address first");
                  return;
            }

            try {
                  setIsProcessing(true);

                  const shippingAddress = addressesFromRedux.find(
                        (addr) => addr._id === selectedAddressId
                  );

                  if (!shippingAddress) {
                        throw new Error("Selected address not found");
                  }

                  const response = await initiateCheckout({
                        shippingAddress,
                  });

                  const paymentSessionID = response?.data?.paymentSessionID;

                  if (!paymentSessionID) {
                        throw new Error("Payment session not received from server");
                  }

                  const result = await cashfree.checkout({
                        paymentSessionId: paymentSessionID,
                        redirectTarget: "_self",
                  });

            } catch (error) {
                  console.error("Checkout Error:", error.response?.data || error.message);

                  alert(error.response?.data?.message || error.message || "Unable to start payment");
            } finally {
                  setIsProcessing(false);
            }
      };

      return (
            <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary relative">
                  {/* --- BREADCRUMBS --- */}
                  <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 text-xs tracking-wide font-secondary text-beige-dark">
                        <Link to="/cart" className="hover:text-primary-black cursor-pointer">
                              Shopping Bag
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-secondary-black font-medium">Checkout</span>
                  </div>

                  {/* --- MAIN CHECKOUT INTERFACE --- */}
                  <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* LEFT COLUMN: SHIPPING ADDRESSES */}
                        <div className="font-primary lg:col-span-7 space-y-6 w-full text-primary-black">
                              {/* Header Row */}
                              <div className="flex justify-between items-center border-b border-secondary-white pb-4 gap-4">
                                    <h2 className="text-xl sm:text-2xl font-bold text-primary-black">
                                          Your Addresses
                                    </h2>
                                    {!isFormOpen && (
                                          <button
                                                onClick={() => setIsFormOpen(true)}
                                                className="cursor-pointer px-4 py-2 bg-secondary-black text-primary-white font-medium rounded-xl hover:bg-primary-black duration-200 text-xs sm:text-sm shrink-0 shadow-xs"
                                          >
                                                Add New Address
                                          </button>
                                    )}
                              </div>

                              {/* Address Input Form */}
                              {isFormOpen && (
                                    <form
                                          onSubmit={handleSubmit(onSubmit)}
                                          className="bg-primary-white p-4 sm:p-6 border border-beige-light rounded-2xl space-y-4 shadow-xs"
                                    >
                                          <h3 className="text-lg font-bold text-secondary-black">
                                                {editingAddressId ? "📝 Edit Address" : "🏠 Add a New Address"}
                                          </h3>

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Input
                                                      label="Full Name"
                                                      placeholder="John Doe"
                                                      error={errors.name?.message}
                                                      {...register("name", { required: "Name is required" })}
                                                      ref={register("name").ref}
                                                />
                                                <Input
                                                      label="Phone Number"
                                                      placeholder="1234567890"
                                                      error={errors.phone?.message}
                                                      {...register("phone", { required: "Phone number is required" })}
                                                      ref={register("phone").ref}
                                                      className="font-secondary"
                                                />
                                          </div>

                                          <Input
                                                label="Street Address"
                                                placeholder="Flat, House no., Apartment, Street"
                                                error={errors.address?.message}
                                                {...register("address", { required: "Address is required" })}
                                                ref={register("address").ref}
                                          />

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Input
                                                      label="City"
                                                      placeholder="City"
                                                      error={errors.city?.message}
                                                      {...register("city", { required: "City is required" })}
                                                      ref={register("city").ref}
                                                />
                                                <Input
                                                      label="Pincode"
                                                      placeholder="123456"
                                                      error={errors.pincode?.message}
                                                      {...register("pincode", { required: "Pincode is required" })}
                                                      ref={register("pincode").ref}
                                                      className="font-secondary"
                                                />
                                          </div>

                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Input
                                                      label="State"
                                                      placeholder="State"
                                                      error={errors.state?.message}
                                                      {...register("state", { required: "State is required" })}
                                                      ref={register("state").ref}
                                                />
                                                <Input
                                                      label="Country"
                                                      placeholder="Country"
                                                      error={errors.country?.message}
                                                      {...register("country", { required: "Country is required" })}
                                                      ref={register("country").ref}
                                                />
                                          </div>

                                          {/* Form Actions */}
                                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                                <Button
                                                      type="submit"
                                                      child={
                                                            isSubmitting
                                                                  ? "Saving..."
                                                                  : editingAddressId
                                                                        ? "Update Address"
                                                                        : "Save Address"
                                                      }
                                                      colorSchema="bg-green-dark text-primary-white rounded-xl hover:bg-primary-black"
                                                      className="cursor-pointer w-full order-1 sm:order-2 font-bold"
                                                />
                                                <button
                                                      type="button"
                                                      onClick={closeAndResetForm}
                                                      className="cursor-pointer w-full py-3 border-2 border-beige-light rounded-xl text-beige-accent font-medium hover:border-beige-accent duration-300 ease-in-out order-2 sm:order-1 bg-primary-white"
                                                >
                                                      Cancel
                                                </button>
                                          </div>
                                    </form>
                              )}

                              {/* Address Selection Grid */}
                              <div className="max-h-125 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 gap-4 custom-scrollbar">
                                    {addressesFromRedux?.length === 0 ? (
                                          <p className="text-secondary-black col-span-1 sm:col-span-2 py-8 text-center font-medium bg-secondary-white/30 rounded-xl border border-dashed border-beige-light">
                                                No addresses saved yet.
                                          </p>
                                    ) : (
                                          addressesFromRedux?.map((item) => {
                                                const isSelected = selectedAddressId === item._id;
                                                return (
                                                      <div
                                                            key={item._id}
                                                            onClick={() => setSelectedAddressId(item._id)}
                                                            className={`border-2 p-5 rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-200 relative bg-primary-white shadow-xs
                                          ${isSelected
                                                                        ? "border-green-dark bg-secondary-white/40 ring-2 ring-green-light/10"
                                                                        : "border-beige-light hover:border-beige-dark"
                                                                  }`}
                                                      >
                                                            {isSelected && (
                                                                  <div className="absolute top-4 right-4 text-green-dark bg-green-light/10 px-2 py-0.5 rounded text-xs font-bold tracking-wide">
                                                                        ✓ SELECTED
                                                                  </div>
                                                            )}

                                                            <div className="space-y-1 pr-6">
                                                                  <p className="font-bold capitalize text-primary-black text-lg">
                                                                        {item.name}
                                                                  </p>
                                                                  <p className="text-sm text-secondary-black leading-relaxed capitalize">
                                                                        {item.address}
                                                                  </p>
                                                                  <p className="text-sm text-secondary-black capitalize">
                                                                        {item.city}, {item.state} - {item.pincode}
                                                                  </p>
                                                                  <p className="text-sm text-secondary-black capitalize">
                                                                        {item.country}
                                                                  </p>
                                                                  <p className="text-xs text-beige-accent font-secondary mt-3 flex items-center gap-1">
                                                                        <span>📞</span> {item.phone}
                                                                  </p>
                                                            </div>

                                                            {/* Action row at the bottom */}
                                                            <div className="mt-4 pt-3 border-t border-secondary-white flex justify-end gap-4 text-sm">
                                                                  <button
                                                                        onClick={(e) => handleEditClick(e, item)}
                                                                        className="cursor-pointer font-semibold text-green-light hover:text-green-dark transition-colors"
                                                                  >
                                                                        Edit Details
                                                                  </button>
                                                                  <button
                                                                        onClick={(e) => handleDelete(e, item._id)}
                                                                        className="cursor-pointer font-semibold text-red-600 hover:text-red-800 transition-colors"
                                                                  >
                                                                        Delete
                                                                  </button>
                                                            </div>
                                                      </div>
                                                );
                                          })
                                    )}
                              </div>
                        </div>

                        {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR */}
                        <div className="lg:col-span-5 w-full space-y-6 lg:sticky lg:top-6">
                              <div className="bg-white border-2 border-beige-light/60 rounded-2xl p-4 sm:p-6 space-y-6 shadow-sm">
                                    <h3 className="font-bold text-sm tracking-wide text-primary-black font-primary uppercase border-b border-beige-light pb-3">
                                          Your Order Summary
                                    </h3>

                                    {/* Product List */}
                                    <div className="max-h-60 overflow-y-auto divide-y divide-beige-light/40 pr-1">
                                          {cart &&
                                                cart?.map((item) => (
                                                      <div
                                                            key={item?.perfume?._id}
                                                            className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                                                      >
                                                            <div className="w-18 h-18 bg-secondary-white border border-beige-light rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1">
                                                                  <img
                                                                        src={item?.perfume?.images[0].url}
                                                                        alt={item?.perfume?.name}
                                                                        className="w-full h-full object-cover rounded-lg"
                                                                  />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                  <span className="block font-secondary font-semibold text-[10px] uppercase tracking-wider text-beige-dark">
                                                                        {item?.perfume?.brand}
                                                                  </span>
                                                                  <h4 className="font-primary text-sm font-bold text-primary-black truncate capitalize">
                                                                        {item?.perfume?.name}
                                                                  </h4>
                                                                  <p className="text-xs text-secondary-black font-secondary mt-0.5">
                                                                        Qty: {item?.quantity} •{" "}
                                                                        <span className="text-beige-dark">
                                                                              {item?.perfume?.size}
                                                                        </span>
                                                                  </p>
                                                            </div>
                                                            <span className="text-sm font-semibold font-secondary text-primary-black shrink-0">
                                                                  Rs.{" "}
                                                                  {(item?.perfume?.price * item?.quantity).toLocaleString(
                                                                        "en-IN"
                                                                  )}
                                                            </span>
                                                      </div>
                                                ))}
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="border-t border-beige-light pt-4 space-y-2 font-secondary text-xs text-secondary-black">
                                          <div className="flex justify-between">
                                                <span>Subtotal</span>
                                                <span className="font-medium">
                                                      Rs.{" "}
                                                      {cartData?.currentCartState?.subtotal?.toLocaleString("en-IN")}
                                                </span>
                                          </div>
                                          <div className="flex justify-between">
                                                <span>Shipping</span>
                                                <span className="text-green-light font-bold">Free</span>
                                          </div>
                                          {cartData?.currentCartState?.discountAmount > 0 && (
                                                <div className="flex justify-between text-green-light font-bold">
                                                      <span>
                                                            Coupon Discount ({cartData?.appliedCoupon?.code}) &bull;{" "}
                                                            {cartData?.currentCartState?.discountPercentage}%
                                                      </span>
                                                      <span>
                                                            - Rs.{" "}
                                                            {cartData?.currentCartState?.discountAmount?.toLocaleString(
                                                                  "en-IN"
                                                            )}
                                                      </span>
                                                </div>
                                          )}
                                          <div className="flex justify-between items-baseline pt-4 border-t border-beige-light/60">
                                                <span className="font-primary font-bold text-sm text-primary-black uppercase tracking-wider">
                                                      Total
                                                </span>
                                                <span className="font-secondary font-bold text-xl text-primary-black">
                                                      Rs.{" "}
                                                      {cartData?.currentCartState?.grandTotal.toLocaleString("en-IN")}
                                                </span>
                                          </div>
                                    </div>

                                    {/* Checkout Action Button */}
                                    <div className="space-y-2">
                                          <button
                                                onClick={processCheckoutHandler}
                                                disabled={isProcessing}
                                                className={`w-full flex items-center justify-center gap-2 ${isProcessing
                                                            ? "bg-gray-400 cursor-not-allowed"
                                                            : "bg-green-dark hover:bg-primary-black cursor-pointer"
                                                      } text-white font-secondary text-xs uppercase tracking-widest font-bold py-4 px-6 rounded-xl transition-colors shadow-md`}
                                          >
                                                <FaCreditCard className="text-xs" />
                                                {isProcessing
                                                      ? "Processing Payment..."
                                                      : "Proceed to Secure Payment"}
                                          </button>

                                          <p className="text-[16px] text-center text-zinc-500 mt-5">
                                                Use test OTP{" "}
                                                <span className="font-mono font-bold text-primary-black bg-secondary-white px-1.5 py-0.5 mx-2 rounded border border-gray-300">
                                                      111000
                                                </span>{" "}
                                                on the payment gateway screen.
                                          </p>

                                          {!selectedAddressId && addressesFromRedux?.length > 0 && (
                                                <p className="text-14px text-center text-red-700 mt-2">
                                                      Please select a delivery address before proceeding.
                                                </p>
                                          )}

                                          {addressesFromRedux?.length === 0 && (
                                                <p className="text-14px text-center text-red-700 mt-2">
                                                      Please add an address before proceeding.
                                                </p>
                                          )}
                                    </div>
                              </div>
                        </div>
                  </main>
            </div>
      );
};

export default Checkout;
