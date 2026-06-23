import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaChevronRight, FaRegClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Footer, Header } from '../components'; // Assuming Header is structured similarly
import { fetchOrders } from '../apis/order.api';
import { userstate__setOrders } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const Orders = () => {
      const [isLoading, setIsLoading] = useState(true);

      const dispatch = useDispatch()
      const { orders } = useSelector(state => state.user)


      useEffect(() => {

            const getAllOrders = async () => {
                  setIsLoading(true)
                  try {
                        const response = await fetchOrders()
                        console.log(response?.data)
                        dispatch(userstate__setOrders(response?.data))
                  } catch (err) {
                        console.log(err)
                        console.log(err.response)
                  } finally {
                        setIsLoading(false)
                  }
            }
            getAllOrders()
      }, [])

      
      const getStatusStyle = (status) => {
            const current = status?.toLowerCase();
            if (current === 'confirmed' || current === 'successfull') {
                  return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
            }
            if (current === 'pending' || current === 'processing') {
                  return 'bg-amber-50 text-amber-700 border-amber-200/60';
            }
            return 'bg-zinc-100 text-zinc-700 border-zinc-200';
      };

      return (
            <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary">

                  <Header />

                  {/* --- BREADCRUMBS --- */}
                  <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 text-xs tracking-wide font-secondary text-beige-dark">
                        <Link to="/" className="hover:text-primary-black cursor-pointer">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-secondary-black font-medium">My Orders</span>
                  </div>

                  {/* --- ORDERS MAIN CONTAINER --- */}
                  <main className="grow max-w-5xl w-full mx-auto px-4 sm:px-6 py-10">
                        <div className="border-b pb-5 mb-8">
                              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-black">Order History</h1>
                              <p className="text-xs sm:text-sm text-zinc-500 font-secondary mt-1">Track and manage your premium fragrance acquisitions.</p>
                        </div>

                        {isLoading ? (
                              <div className="py-20 flex flex-col items-center justify-center gap-3">
                                    <div className="w-8 h-8 border-4 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-xs font-secondary text-zinc-500 tracking-wider uppercase">Loading your ledger...</p>
                              </div>
                        ) : orders.length === 0 ? (
                              <div className="py-24 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white max-w-md mx-auto px-6">
                                    <FaShoppingBag className="mx-auto text-3xl text-zinc-300 mb-4" />
                                    <h3 className="text-base font-bold text-primary-black">No orders found</h3>
                                    <p className="text-xs font-secondary text-zinc-500 mt-1 mb-6">You haven't initiated any secure checkout operations yet.</p>
                                    <Link to="/" className="inline-block px-5 py-3 bg-zinc-900 text-white rounded-xl text-xs font-secondary font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors shadow-sm">
                                          Explore Collections
                                    </Link>
                              </div>
                        ) : (
                              // Orders list mapping wrapper
                              <div className="space-y-5">
                                    {orders.map((order) => {
                                          const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                          });

                                          return (
                                                <Link
                                                      key={order?._id}
                                                      to={`/user/orders/${order?._id}`}
                                                      className="block bg-white border border-gray-200/80 rounded-2xl hover:border-zinc-400 hover:shadow-md transition-all duration-200 group overflow-hidden"
                                                >
                                                      {/* Top Metadata Header Row */}
                                                      <div className="bg-zinc-50/70 border-b border-gray-100 px-5 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-secondary">
                                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                                                  <div>
                                                                        <span className="text-zinc-400 uppercase tracking-wider block text-[10px]">Date Placed</span>
                                                                        <span className="font-semibold text-secondary-black">{orderDate}</span>
                                                                  </div>
                                                                  <div>
                                                                        <span className="text-zinc-400 uppercase tracking-wider block text-[10px]">Order ID</span>
                                                                        <span className="font-mono font-medium text-zinc-600 uppercase">{order?._id}</span>
                                                                  </div>
                                                                  <div>
                                                                        <span className="text-zinc-400 uppercase tracking-wider block text-[10px]">Payment Method</span>
                                                                        <span className="font-semibold text-secondary-black uppercase">{order?.paymentMethod || 'N/A'}</span>
                                                                  </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 font-primary text-sm font-bold text-primary-black sm:ml-auto">
                                                                  <span className="text-xs font-secondary font-normal text-zinc-400 mr-1">Total:</span>
                                                                  Rs. {order?.totalPrice.toLocaleString('en-IN')}
                                                            </div>
                                                      </div>

                                                      {/* Main Content Area */}
                                                      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">

                                                            {/* Left side: Images & Product Titles Layout */}
                                                            <div className="flex items-center gap-5 min-w-0 flex-1">

                                                                  {/* Max 2-3 Thumbnail Images Stack */}
                                                                  <div className="flex items-center -space-x-4 shrink-0 pr-2">
                                                                        {order.products.slice(0, 3).map((item, idx) => (
                                                                              <div
                                                                                    key={idx}
                                                                                    className="w-14 h-16 bg-secondary-white border-2 border-white rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-0.5 relative"
                                                                                    style={{ zIndex: 3 - idx }}
                                                                              >
                                                                                    <img
                                                                                          src={item?.product?.images?.[0].url}
                                                                                          alt={item.name}
                                                                                          className="w-full h-full object-cover rounded-lg"
                                                                                    />
                                                                              </div>
                                                                        ))}
                                                                        {order.products.length > 3 && (
                                                                              <div className="w-14 h-16 bg-zinc-900 border-2 border-white text-white rounded-xl flex items-center justify-center text-xs font-bold font-secondary shadow-sm z-0">
                                                                                    +{order?.products?.length - 3}
                                                                              </div>
                                                                        )}
                                                                  </div>

                                                                  {/* Product names combined string preview */}
                                                                  <div className="min-w-0 space-y-1">
                                                                        <h4 className="font-bold text-sm text-primary-black truncate capitalize pr-4">
                                                                              {order.products.map(p => p.name).join(', ')}
                                                                        </h4>
                                                                        <p className="text-xs text-zinc-500 font-secondary">
                                                                              Quantity: {order?.totalQnt} {order?.totalQnt === 1 ? 'item' : 'items'}
                                                                        </p>
                                                                  </div>
                                                            </div>

                                                            {/* Right Side: Execution Status Controls */}
                                                            <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 shrink-0">

                                                                  {/* Status Indicators column */}
                                                                  <div className="flex flex-row md:flex-col gap-2">
                                                                        <div className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border capitalize flex items-center gap-1.5 ${getStatusStyle(order?.orderStatus)}`}>
                                                                              <span className="w-1 h-1 rounded-full bg-current"></span>
                                                                              Status: {order?.orderStatus}
                                                                        </div>
                                                                        <div className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border capitalize flex items-center gap-1.5 ${getStatusStyle(order?.paymentStatus)}`}>
                                                                              {order.paymentStatus === 'success' ? <FaCheckCircle className="text-[10px]" /> : <FaExclamationCircle className="text-[10px]" />}
                                                                              Payment: {order?.paymentStatus}
                                                                        </div>
                                                                  </div>

                                                                  {/* Link Visual Indicator */}
                                                                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-zinc-400 group-hover:text-primary-black group-hover:border-zinc-900 transition-colors">
                                                                        <FaChevronRight className="text-xs" />
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </Link>
                                          );
                                    })}
                              </div>
                        )}
                  </main>

                  <Footer />
            </div>
      );
}


export default Orders