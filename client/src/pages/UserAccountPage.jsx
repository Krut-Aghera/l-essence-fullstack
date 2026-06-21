import React, { useState } from 'react';
import {
      FaUser,
      FaPhone,
      FaEnvelope,
      FaMapMarkerAlt,
      FaHeart,
      FaShoppingBag,
      FaCalendarAlt,
      FaPen,
      FaPlus,
      FaShieldAlt,
      FaSignOutAlt,
      FaCheck,
      FaTimes
} from 'react-icons/fa';
import { logoutUser } from '../apis/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authstate__logout } from '../features/authSlice';
import { userstate__setAddress } from '../features/userSlice';
import { useForm } from 'react-hook-form';
import { addAddress, removeAddress, updateAddress } from '../apis/address.api';
import { clearCartData, clearWishlist } from '../features/perfumeSlice';
import { showSuccessToast } from '../utils/hotToast'


export default function UserDetailsPage() {

      const { userData } = useSelector(state => state.auth)
      const { address } = useSelector(state => state.user)
      const { wishlist, orders } = useSelector(state => state.perfume)

      const navigate = useNavigate()
      const dispatch = useDispatch()

      const { register, handleSubmit, reset, formState: { errors } } = useForm()

      const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
      const [editingAddressId, setEditingAddressId] = useState(null);
      const [showAddressForm, setShowAddressForm] = useState(false);

      const registeredAt = new Date(userData?.createdAt).toLocaleDateString();
      const membershipStatus = "Gold Membership";

      const addressSubmitHandler = async (data) => {

            const addressData = {
                  name: userData.name.trim(),
                  phone: userData.phone.trim(),
                  pincode: data.pincode.trim(),
                  address: data.address.trim(),
                  city: data.city.trim(),
                  state: data.state.trim(),
                  country: data.country.trim()
            };

            try {

                  if (isUpdatingAddress) {

                        const response = await updateAddress(editingAddressId, addressData);
                        dispatch(userstate__setAddress(response?.data?.address))

                  } else {

                        const response = await addAddress(addressData);
                        dispatch(userstate__setAddress(response?.data?.address))
                  }

                  reset();

                  setEditingAddressId(null);
                  setIsUpdatingAddress(false);
                  setShowAddressForm(false);

            } catch (error) {
                  console.error(error);
            }
      };


      const removeAddressHandler = async (addressID) => {

            try {

                  const response = await removeAddress(addressID);
                  dispatch(userstate__setAddress(response?.data?.address))

            } catch (error) {
                  console.error("Error removing address:", error.response);
            }
      };


      const startEditing = (address) => {

            reset({
                  address: address.address,
                  city: address.city,
                  state: address.state,
                  pincode: address.pincode,
                  country: address.country
            });

            setEditingAddressId(address._id);
            setIsUpdatingAddress(true);
      };



      const handleLogout = async () => {
            try {
                  const response = await logoutUser()
                  showSuccessToast(`${userData.name},  your are logged out..`)
                  dispatch(clearWishlist())
                  dispatch(clearCartData())
                  dispatch(authstate__logout())
                  navigate('/')
            } catch (error) {
                  console.log(error.response)
            }
      }

      return (

            <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#F9FAF7] text-[#222831] font-['Alegreya_Sans',sans-serif] p-4 md:p-6 lg:p-8 flex flex-col">
                  <div className="max-w-6xl w-full mx-auto flex flex-col h-full space-y-4">

                        {/* Top Context Bar (Fixed height footprint) */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#DFD0B8]/60 flex items-center justify-between shrink-0">
                              <span className="text-sm font-medium tracking-wide uppercase text-[#837664]">Account Dashboard</span>
                              <div className="flex items-center gap-6">
                                    <Link to={'/user/wishlist'}>
                                          <div className="relative flex items-center  gap-2 cursor-pointer group" title="View Wishlist">
                                                <FaHeart className="text-red-500 text-base transition-transform group-hover:scale-110 duration-300 ease-in-out cursor-pointer" />

                                                <span className="hidden sm:inline text-sm font-semibold mt-0.5 text-[#4B5563]">Wishlist</span>
                                          </div>
                                    </Link>
                                    <div className="h-5 w-px bg-[#DFD0B8]"></div>
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
                                    <div className="h-14 w-14 capitalize rounded-full bg-[#739072] text-white flex items-center justify-center font-secondary font-semibold text-2xl shadow-inner shrink-0">
                                          {userData?.name.charAt(0)}
                                    </div>
                                    <div>
                                          <h1 className="text-2xl capitalize font-artistic-secondary font-bold tracking-tight text-[#222831]">{userData?.name}</h1>
                                          <p className="font-['Roboto',sans-serif] text-xs text-[#4B5563] flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                                                <FaCalendarAlt className="text-[#948979]" /> Registered: {registeredAt}
                                          </p>
                                    </div>
                              </div>
                              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#4F6F52] hover:bg-[#739072] text-white font-medium rounded-xl transition-colors text-sm shadow-sm">
                                    <FaPen className="text-[11px]" /> Edit Profile
                              </button>
                        </header>

                        {/* Main Content Workspace Grid 
                          Takes up remaining screen real estate dynamically on desktop (`lg:flex-1 lg:overflow-hidden`)
                        */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:flex-1 lg:overflow-hidden pb-2">

                              {/* Left Column: Contact & Security Info */}
                              <div className="space-y-4 lg:col-span-1 lg:overflow-y-auto pr-0 lg:pr-1">
                                    {/* Contact Info */}
                                    <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#DFD0B8]">
                                          <h2 className="text-lg font-bold mb-3 border-b border-[#F0F0F0] pb-2 text-[#837664]">Contact Information</h2>
                                          <div className="space-y-3 font-['Roboto',sans-serif] text-sm text-[#4B5563]">
                                                <div className="flex items-center gap-3">
                                                      <span className="w-5 flex justify-center shrink-0">
                                                            <FaEnvelope className="text-[#948979] text-base" />
                                                      </span>
                                                      <span className="break-all">{userData?.email}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                      <span className="w-5 flex justify-center shrink-0">
                                                            <FaPhone className="text-[#948979] text-base" />
                                                      </span>
                                                      <span>{userData?.phone}</span>
                                                </div>
                                          </div>
                                    </section>

                                    {/* Membership Badge */}
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
                                          <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-lg font-bold text-[#837664] flex items-center gap-2">
                                                      <FaMapMarkerAlt className="text-[#948979]" />
                                                      Shipping Addresses
                                                </h2>

                                                <button
                                                      onClick={() => {
                                                            reset();
                                                            setShowAddressForm(true);
                                                            setEditingAddressId(null);
                                                            setIsUpdatingAddress(false);
                                                      }}
                                                      className="flex items-center gap-1 px-3 py-1.5 bg-[#4F6F52] text-white rounded-lg text-xs"
                                                >
                                                      <FaPlus />
                                                      Add New Address
                                                </button>
                                          </div>
                                          {showAddressForm && (
                                                <div className="mb-4 p-4 rounded-xl border border-[#DFD0B8]">

                                                      <form
                                                            onSubmit={handleSubmit(addressSubmitHandler)}
                                                            className="space-y-2"
                                                      >

                                                            <div>
                                                                  <input
                                                                        type="text"
                                                                        placeholder="Address"
                                                                        {...register("address", {
                                                                              required: "Address is required",
                                                                              pattern: {
                                                                                    value: /^[a-zA-Z0-9\s,.()\/\\-]+$/,
                                                                                    message: "Address contains invalid characters"
                                                                              }
                                                                        })}
                                                                        className="w-full p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                  />
                                                            </div>

                                                            <div className="grid grid-cols-3 gap-1">

                                                                  <input
                                                                        type="text"
                                                                        placeholder="City"
                                                                        {...register("city", {
                                                                              required: "City is required",
                                                                              pattern: {
                                                                                    value: /^[a-zA-Z\s,-]+$/,
                                                                                    message: "Only letters, commas and hyphens allowed"
                                                                              }
                                                                        })}
                                                                        className="p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                  />

                                                                  <input
                                                                        type="text"
                                                                        placeholder="State"
                                                                        {...register("state", {
                                                                              required: "State is required",
                                                                              pattern: {
                                                                                    value: /^[a-zA-Z\s,-]+$/,
                                                                                    message: "Only letters, commas and hyphens allowed"
                                                                              }
                                                                        })}
                                                                        className="p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                  />

                                                                  <input
                                                                        type="text"
                                                                        placeholder="Pincode"
                                                                        {...register("pincode", {
                                                                              required: "Pincode is required",
                                                                              pattern: {
                                                                                    value: /^[0-9]{6}$/,
                                                                                    message: "Enter valid pincode"
                                                                              }
                                                                        })}
                                                                        className="p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                  />

                                                            </div>

                                                            <div className="flex justify-end gap-1.5 pt-1">

                                                                  <input
                                                                        type="text"
                                                                        placeholder="Country"
                                                                        {...register("country", {
                                                                              required: "Country is required",
                                                                              pattern: {
                                                                                    value: /^[a-zA-Z\s,-]+$/,
                                                                                    message: "Only letters, commas and hyphens allowed"
                                                                              }
                                                                        })}
                                                                        className="p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                  />

                                                                  <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                              reset();
                                                                              setShowAddressForm(false);
                                                                        }}
                                                                  >
                                                                        Cancel
                                                                  </button>

                                                                  <button type="submit" className='  className="flex items-center gap-1 px-2 py-1 bg-[#4F6F52] text-white rounded-md text-[10px]"'>
                                                                        Add Address
                                                                  </button>
                                                            </div>

                                                      </form>

                                                </div>
                                          )}

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {address?.map((addr, index) => {
                                                      const isEditing = editingAddressId === addr._id;
                                                      return (
                                                            <div
                                                                  key={addr._id}
                                                                  className={`p-4 rounded-xl border relative transition-all ${addr.isDefault ? 'border-[#4F6F52] bg-[#739072]/5 shadow-inner' : 'border-[#DFD0B8] bg-white'
                                                                        }`}
                                                            >
                                                                  <div className="flex justify-between items-start mb-1">
                                                                        <h3 className="font-bold text-[#222831] text-sm"> Address {index + 1}</h3>
                                                                        <div className="flex items-center gap-2">
                                                                              {addr.isDefault && !isEditing && (
                                                                                    <span className="bg-[#4F6F52] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                                                                          Default
                                                                                    </span>
                                                                              )}
                                                                              {!isEditing && (
                                                                                    <div className='flex items-center gap-4'>
                                                                                          <button
                                                                                                onClick={() => {
                                                                                                      startEditing(addr);
                                                                                                      setShowAddressForm(false);
                                                                                                }}
                                                                                                className="p-1 text-gray-400 hover:text-green-dark transition-colors rounded-md hover:bg-gray-100"
                                                                                                title="Edit Address"
                                                                                          >
                                                                                                <FaPen className="text-[10px]" />
                                                                                          </button>
                                                                                          <button
                                                                                                onClick={() => removeAddressHandler(addr._id)}
                                                                                                className=" text-red-500"
                                                                                                title="Remove Address"
                                                                                          >
                                                                                                <FaTimes className="text-[12px]" />
                                                                                          </button>
                                                                                    </div>
                                                                              )}
                                                                        </div>
                                                                  </div>

                                                                  {isEditing ? (
                                                                        <form
                                                                              onSubmit={handleSubmit(addressSubmitHandler)}
                                                                              className="space-y-2 font-['Roboto',sans-serif] text-[11px] mt-1"
                                                                        >

                                                                              <div>
                                                                                    <input
                                                                                          type="text"
                                                                                          placeholder="Address"
                                                                                          {...register("address", {
                                                                                                required: "Address is required",
                                                                                                pattern: {
                                                                                                      value: /^[a-zA-Z0-9\s,.()\/\\-]+$/,
                                                                                                      message: "Address contains invalid characters"
                                                                                                }
                                                                                          })}
                                                                                          className="w-full p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                                    />
                                                                              </div>

                                                                              <div className="grid grid-cols-3 gap-1">

                                                                                    <input
                                                                                          type="text"
                                                                                          placeholder="City"
                                                                                          {...register("city", {
                                                                                                required: "City is required",
                                                                                                pattern: {
                                                                                                      value: /^[a-zA-Z\s,-]+$/,
                                                                                                      message: "Only letters, commas and hyphens allowed"
                                                                                                }
                                                                                          })}
                                                                                          className="p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                                    />

                                                                                    <input
                                                                                          type="text"
                                                                                          placeholder="State"
                                                                                          {...register("state", {
                                                                                                required: "State is required",
                                                                                                pattern: {
                                                                                                      value: /^[a-zA-Z\s,-]+$/,
                                                                                                      message: "Only letters, commas and hyphens allowed"
                                                                                                }
                                                                                          })}
                                                                                          className="p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                                    />

                                                                                    <input
                                                                                          type="text"
                                                                                          placeholder="Pincode"
                                                                                          {...register("pincode", {
                                                                                                required: "Pincode is required",
                                                                                                pattern: {
                                                                                                      value: /^[0-9]{6}$/,
                                                                                                      message: "Enter valid pincode"
                                                                                                }
                                                                                          })}
                                                                                          className="p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                                    />

                                                                              </div>

                                                                              <div className="flex justify-end gap-1.5 pt-1">

                                                                                    <input
                                                                                          type="text"
                                                                                          placeholder="Country"
                                                                                          {...register("country", {
                                                                                                required: "Country is required",
                                                                                                pattern: {
                                                                                                      value: /^[a-zA-Z\s,-]+$/,
                                                                                                      message: "Only letters, commas and hyphens allowed"
                                                                                                }
                                                                                          })}
                                                                                          className="p-1.5 text-xs bg-white border border-[#DFD0B8] rounded-md outline-none"
                                                                                    />

                                                                                    <button
                                                                                          type="button"
                                                                                          onClick={() => {
                                                                                                reset();

                                                                                                setEditingAddressId(null);
                                                                                                setIsUpdatingAddress(false);
                                                                                                setShowAddressForm(false);
                                                                                          }}
                                                                                    >
                                                                                          Cancel
                                                                                    </button>


                                                                                    <button
                                                                                          type="submit"
                                                                                          className="flex items-center gap-1 px-2 py-1 bg-[#4F6F52] text-white rounded-md text-[10px]"
                                                                                    >
                                                                                          Save
                                                                                    </button>

                                                                              </div>

                                                                        </form>
                                                                  ) : (
                                                                        <div className="font-['Roboto',sans-serif] text-xs text-[#4B5563]">
                                                                              <p className="text-gray-800 font-medium truncate">{addr.address}</p>
                                                                              <p className="truncate">{addr.city}, {addr.state} {addr.pincode}</p>
                                                                              <p className="truncate">{addr.country}</p>
                                                                        </div>
                                                                  )}
                                                            </div>
                                                      );
                                                })}
                                          </div>
                                    </section>

                                    {/* Recent Orders Table (Fills out flexible bottom area) */}
                                    <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#DFD0B8] flex-1 flex flex-col min-h-[220px] lg:overflow-hidden">
                                          <h2 className="text-lg font-bold mb-3 text-[#837664] flex items-center gap-2 shrink-0">
                                                <FaShoppingBag className="text-[#948979]" /> Recent Orders
                                          </h2>
                                          <div className="overflow-auto flex-1">
                                                <table className="w-full text-left font-['Roboto',sans-serif] text-xs min-w-[450px]">
                                                      <thead className="sticky top-0 bg-white z-10">
                                                            <tr className="border-b border-[#F0F0F0] text-[#948979] font-['Alegreya_Sans',sans-serif] text-sm">
                                                                  <th className="pb-2 font-semibold">Order ID</th>
                                                                  <th className="pb-2 font-semibold">Date</th>
                                                                  <th className="pb-2 font-semibold">Total</th>
                                                                  <th className="pb-2 font-semibold text-right">Status</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody className="divide-y divide-[#F0F0F0] text-[#4B5563]">
                                                            {orders?.map((order) => (
                                                                  <tr key={order?._id} className="hover:bg-[#F0F0F0]/50 transition-colors">
                                                                        <td className="py-2.5 font-medium text-[#222831]">{order?.id}</td>
                                                                        <td className="py-2.5">{order?.date}</td>
                                                                        <td className="py-2.5 font-semibold text-[#222831]">{order?.total}</td>
                                                                        <td className="py-2.5 text-right">
                                                                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${order?.status === 'Delivered'
                                                                                    ? 'bg-[#739072]/20 text-[#4F6F52]'
                                                                                    : 'bg-[#DFD0B8]/40 text-[#837664]'
                                                                                    }`}>
                                                                                    {order?.status}
                                                                              </span>
                                                                        </td>
                                                                  </tr>
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </section>

                              </div>
                        </div>

                  </div >
            </div >
      );
}