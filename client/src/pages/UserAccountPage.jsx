import React, { useEffect, useState } from 'react';
import {
      FaCalendarAlt,
      FaTimes,
      FaCheck,
      FaPen,
      FaEnvelope,
      FaPhone,
      FaShieldAlt,
      FaMapMarkerAlt,
      FaPlus,
      FaHeart,
      FaShoppingBag,
      FaSignOutAlt
} from 'react-icons/fa';
import { logoutUser } from '../apis/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authstate__logout } from '../features/authSlice';
import { userstate__setAddress } from '../features/userSlice';
import { useForm } from 'react-hook-form';
import useUserAccount from '../hooks/useUserAccount';
import { AddressCard, Input } from '../components';


export default function UserDetailsPage() {

      const {
            address: addresses = [], // Fallback to empty array if address state is null initially
            isLoading,
            showAddressForm,
            setShowAddressForm,
            isUpdatingAddress,
            addressErrors,
            registerAddress,
            handleAddressSubmit,
            addressSubmitHandler,
            startEditingAddress,
            removeAddressHandler,
            resetAddress,
            setEditingAddressId,
            setIsUpdatingAddress,
            userData,
            registeredAt,
            membershipStatus,

            // Profile Edit States & Hook Form bindings
            isEditingProfile,
            setIsEditingProfile,
            registerProfile,
            profileErrors,
            profileSubmitHandler,
            handleProfileSubmit,
            cancelProfileEditing,

            handleLogout
      } = useUserAccount();

      // 2. Handle simple form toggle for fresh submissions
      const handleAddNewClick = () => {
            resetAddress({
                  address: '',
                  city: '',
                  state: '',
                  pincode: '',
                  country: ''
            });
            setIsUpdatingAddress(false);
            setEditingAddressId(null);
            setShowAddressForm(true);
      };

      if (isLoading) {
            return (
                  <div className="flex items-center justify-center p-10 text-sm font-medium text-[#837664]">
                        Loading your address profile details...
                  </div>
            );
      }



      return (

            <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#F9FAF7] text-[#222831] font-['Alegreya_Sans',sans-serif] p-4 md:p-6 lg:p-8 flex flex-col">
                  <div className="max-w-6xl w-full mx-auto flex flex-col h-full space-y-4">

                        {/* Top Context Bar (Fixed height footprint) */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#DFD0B8]/60 flex items-center justify-between shrink-0">
                              <span className="text-sm font-medium tracking-wide uppercase text-[#837664]">Account Dashboard</span>
                              <div className="flex items-center gap-6">

                                    {/* Wishlist Tab */}
                                    <Link to={'/user/wishlist'}>
                                          <div className="relative flex items-center gap-2 cursor-pointer group" title="View Wishlist">
                                                <FaHeart className="text-red-500 text-base transition-transform group-hover:scale-110 duration-300 ease-in-out cursor-pointer" />
                                                <span className="hidden sm:inline text-sm font-semibold mt-0.5 text-[#4B5563]">Wishlist</span>
                                          </div>
                                    </Link>

                                    <div className="h-5 w-px bg-[#DFD0B8]"></div>

                                    {/* Orders Tab */}
                                    <Link to={'/user/orders'}>
                                          <div className="relative flex items-center gap-2 cursor-pointer group" title="View Orders">
                                                <FaShoppingBag className="text-[#837664] text-base transition-transform group-hover:scale-110 duration-300 ease-in-out cursor-pointer" />
                                                <span className="hidden sm:inline text-sm font-semibold mt-0.5 text-[#4B5563]">Orders</span>
                                          </div>
                                    </Link>

                                    <div className="h-5 w-px bg-[#DFD0B8]"></div>

                                    {/* Logout Button */}
                                    <button
                                          onClick={handleLogout}
                                          className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 active:text-red-950 transition-colors duration-300 ease-in-out cursor-pointer"
                                    >
                                          <FaSignOutAlt />
                                          <span>Logout</span>
                                    </button>
                              </div>
                        </div>

                        {/* Header / Profile Summary (Fixed height footprint) */}
                        <header className="bg-white rounded-2xl p-5 shadow-sm border border-[#DFD0B8] flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
                              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 w-full sm:w-auto">
                                    {/* Avatar Icon placeholder using first letter of name */}
                                    <div className="h-14 w-14 capitalize rounded-full bg-[#739072] text-white flex items-center justify-center font-secondary font-semibold text-2xl shadow-inner shrink-0">
                                          {userData?.name?.charAt(0)}
                                    </div>

                                    <div className="w-full sm:w-auto">
                                          {isEditingProfile ? (
                                                <Input
                                                      placeholder="Name"
                                                      error={profileErrors.name?.message}
                                                      {...registerProfile('name', { required: 'Name is required' })}
                                                      className="!mt-0" // override layout margin 
                                                />
                                          ) : (
                                                <h1 className="text-2xl capitalize font-artistic-secondary font-bold tracking-tight text-[#222831]">
                                                      {userData?.name}
                                                </h1>
                                          )}
                                          <p className="font-['Roboto',sans-serif] text-xs text-[#4B5563] flex items-center justify-center sm:justify-start gap-2 mt-2">
                                                <FaCalendarAlt className="text-[#948979]" /> Registered: {registeredAt}
                                          </p>
                                    </div>
                              </div>

                              {/* Dynamic Action Buttons mapping to Hook Actions */}
                              <div className="w-full sm:w-auto flex items-center gap-2">
                                    {isEditingProfile ? (
                                          <>
                                                <button
                                                      type="button"
                                                      onClick={cancelProfileEditing}
                                                      className="w-1/2 sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-sm border border-gray-300"
                                                >
                                                      <FaTimes className="text-[11px]" /> Cancel
                                                </button>
                                                <button
                                                      type="submit"
                                                      onClick={handleProfileSubmit(profileSubmitHandler)}
                                                      className="w-1/2 sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#4F6F52] hover:bg-[#739072] text-white font-medium rounded-xl transition-colors text-sm shadow-sm"
                                                >
                                                      <FaCheck className="text-[11px]" /> Save Changes
                                                </button>
                                          </>
                                    ) : (
                                          <button
                                                type="button"
                                                onClick={() => setIsEditingProfile(true)}
                                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#4F6F52] hover:bg-[#739072] text-white font-medium rounded-xl transition-colors text-sm shadow-sm"
                                          >
                                                <FaPen className="text-[11px]" /> Edit Profile
                                          </button>
                                    )}
                              </div>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:flex-1 lg:overflow-hidden pb-2">

                              {/* Left Column: Contact & Security Info */}
                              <div className="space-y-4 lg:col-span-1 lg:overflow-y-auto pr-0 lg:pr-1">

                                    {/* Contact Info Section Card */}
                                    <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#DFD0B8]">
                                          <h2 className="text-lg font-bold mb-3 border-b border-[#F0F0F0] pb-2 text-[#837664]">Contact Information</h2>
                                          <div className="space-y-3 font-['Roboto',sans-serif] text-sm text-[#4B5563]">

                                                {/* Email Fields Handling */}
                                                <div className="flex items-center gap-3 min-h-10">
                                                      <span className="w-5 flex justify-center shrink-0">
                                                            <FaEnvelope className="text-[#948979] text-base" />
                                                      </span>
                                                      {isEditingProfile ? (
                                                            <div className="w-full max-w-md">
                                                                  <Input
                                                                        type="email"
                                                                        error={profileErrors.email?.message}
                                                                        {...registerProfile('email', {
                                                                              required: 'Email is required',
                                                                              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                                                                        })}
                                                                  />
                                                            </div>
                                                      ) : (
                                                            <span className="break-all">{userData?.email}</span>
                                                      )}
                                                </div>

                                                {/* Phone Fields Handling */}
                                                <div className="flex items-center gap-3 min-h-10">
                                                      <span className="w-5 flex justify-center shrink-0">
                                                            <FaPhone className="text-[#948979] text-base" />
                                                      </span>
                                                      {isEditingProfile ? (
                                                            <div className="w-full max-w-md">
                                                                  <Input
                                                                        type="text"
                                                                        error={profileErrors.phone?.message}
                                                                        {...registerProfile('phone', { required: 'Phone number is required' })}
                                                                  />
                                                            </div>
                                                      ) : (
                                                            <span>{userData?.phone}</span>
                                                      )}
                                                </div>

                                          </div>
                                    </section>

                                    {/* Membership Premium Status Badge Card */}
                                    <section className="bg-gradient-to-br from-[#DFD0B8]/30 to-[#739072]/10 rounded-2xl p-5 border border-[#DFD0B8]">
                                          <div className="flex items-center gap-3 text-[#4F6F52] mb-1">
                                                <FaShieldAlt className="text-lg" />
                                                <h3 className="font-['Federo',cursive] text-base font-bold tracking-wider">{membershipStatus}</h3>
                                          </div>
                                          <p className="text-xs text-[#4B5563] font-['Roboto',sans-serif] leading-relaxed">
                                                You are enjoying free premium shipping and exclusive early access to seasonal drops.
                                          </p>
                                    </section>

                              </div>
                              {/* Right Column: Dynamic Address & Orders Data Area */}
                              <div className="space-y-4 lg:col-span-2 lg:overflow-y-auto pr-0 lg:pr-1 flex flex-col h-full">

                                    {/* Saved & Editable Addresses */}
                                    <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#DFD0B8] shrink-0">

                                          {/* Header Title & Add New Button */}
                                          <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-lg font-bold text-[#837664] flex items-center gap-2">
                                                      <FaMapMarkerAlt className="text-[#948979]" />
                                                      Shipping Addresses
                                                </h2>

                                                {!showAddressForm && (
                                                      <button
                                                            type="button"
                                                            onClick={handleAddNewClick}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-[#4F6F52] hover:bg-[#3d563f] transition-colors text-white rounded-lg text-xs"
                                                      >
                                                            <FaPlus />
                                                            Add New Address
                                                      </button>
                                                )}
                                          </div>

                                          {/* The Hook Form Expansion UI (Used for both Adding & Updating via the Hook) */}
                                          {showAddressForm && (
                                                <div className="mb-4 p-4 rounded-xl border border-[#DFD0B8] bg-gray-50/50">
                                                      <h3 className="text-xs font-bold text-[#837664] mb-2">
                                                            {isUpdatingAddress ? 'Modify Address Entry' : 'Create New Address Entry'}
                                                      </h3>

                                                      <form onSubmit={handleAddressSubmit(addressSubmitHandler)} className="space-y-3">
                                                            <div>
                                                                  <input
                                                                        type="text"
                                                                        placeholder="Address"
                                                                        {...registerAddress("address", {
                                                                              required: "Address is required",
                                                                              pattern: {
                                                                                    value: /^[a-zA-Z0-9\s,.()\/\\-]+$/,
                                                                                    message: "Address contains invalid characters",
                                                                              },
                                                                        })}
                                                                        className="w-full p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none focus:border-[#4F6F52]"
                                                                  />
                                                                  {addressErrors.address && <p className="text-[10px] text-red-500 mt-0.5">{addressErrors.address.message}</p>}
                                                            </div>

                                                            <div className="grid grid-cols-3 gap-2">
                                                                  <div>
                                                                        <input
                                                                              type="text"
                                                                              placeholder="City"
                                                                              {...registerAddress("city", {
                                                                                    required: "City is required",
                                                                                    pattern: { value: /^[a-zA-Z\s,-]+$/, message: "Invalid characters" },
                                                                              })}
                                                                              className="w-full p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none focus:border-[#4F6F52]"
                                                                        />
                                                                        {addressErrors.city && <p className="text-[10px] text-red-500 mt-0.5">{addressErrors.city.message}</p>}
                                                                  </div>

                                                                  <div>
                                                                        <input
                                                                              type="text"
                                                                              placeholder="State"
                                                                              {...registerAddress("state", {
                                                                                    required: "State is required",
                                                                                    pattern: { value: /^[a-zA-Z\s,-]+$/, message: "Invalid characters" },
                                                                              })}
                                                                              className="w-full p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none focus:border-[#4F6F52]"
                                                                        />
                                                                        {addressErrors.state && <p className="text-[10px] text-red-500 mt-0.5">{addressErrors.state.message}</p>}
                                                                  </div>

                                                                  <div>
                                                                        <input
                                                                              type="text"
                                                                              placeholder="Pincode"
                                                                              {...registerAddress("pincode", {
                                                                                    required: "Pincode is required",
                                                                                    pattern: { value: /^[0-9]{6}$/, message: "Must be 6 digits" },
                                                                              })}
                                                                              className="w-full p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none focus:border-[#4F6F52]"
                                                                        />
                                                                        {addressErrors.pincode && <p className="text-[10px] text-red-500 mt-0.5">{addressErrors.pincode.message}</p>}
                                                                  </div>
                                                            </div>

                                                            <div className="flex items-center justify-between gap-1.5 pt-1">
                                                                  <div>
                                                                        <input
                                                                              type="text"
                                                                              placeholder="Country"
                                                                              {...registerAddress("country", {
                                                                                    required: "Country is required",
                                                                                    pattern: { value: /^[a-zA-Z\s,-]+$/, message: "Invalid characters" },
                                                                              })}
                                                                              className="p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none focus:border-[#4F6F52]"
                                                                        />
                                                                        {addressErrors.country && <p className="text-[10px] text-red-500 mt-0.5">{addressErrors.country.message}</p>}
                                                                  </div>

                                                                  <div className="flex gap-1.5">
                                                                        <button
                                                                              type="button"
                                                                              onClick={() => {
                                                                                    resetAddress();
                                                                                    setShowAddressForm(false);
                                                                                    setEditingAddressId(null);
                                                                                    setIsUpdatingAddress(false);
                                                                              }}
                                                                              className="px-2.5 py-1 text-xs text-gray-500 hover:text-gray-700"
                                                                        >
                                                                              Cancel
                                                                        </button>
                                                                        <button
                                                                              type="submit"
                                                                              className="flex items-center gap-1 px-3 py-1 bg-[#4F6F52] hover:bg-[#3d563f] text-white rounded-md text-xs"
                                                                        >
                                                                              {isUpdatingAddress ? 'Save Changes' : 'Add Address'}
                                                                        </button>
                                                                  </div>
                                                            </div>
                                                      </form>
                                                </div>
                                          )}

                                          {/* Dynamic List Grid of Stored User Addresses */}
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {addresses?.length === 0 ? (
                                                      <p className="text-xs text-gray-400 py-4 col-span-2">No addresses saved yet.</p>
                                                ) : (
                                                      addresses?.map((addr, index) => (
                                                            <AddressCard
                                                                  key={addr._id || index}
                                                                  addr={addr}
                                                                  index={index}
                                                                  startEditingAddress={startEditingAddress}
                                                                  removeAddressHandler={removeAddressHandler}
                                                            />
                                                      ))
                                                )}
                                          </div>
                                    </section>
                              </div>
                        </div>

                  </div >
            </div >
      );
}