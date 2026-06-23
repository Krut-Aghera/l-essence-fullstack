import React, { useState, useEffect } from 'react';
import {
      FaRupeeSign,
      FaShoppingBag,
      FaTags,
      FaFlask,
      FaUsers,
      FaSpinner,
      FaBoxOpen,
      FaExternalLinkAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fetchDashboardStats } from '../../apis/dashboard.api';
import { Footer, Header } from '../../components';

const AdminDashboard = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            const getDashboardData = async () => {
                  try {
                        setLoading(true);
                        setError(null);
                        const response = await fetchDashboardStats();

                        // Adjust this if your API wraps data inside response.data or response.data.data
                        if (response?.success || response?.statusCode === 200) {
                              setData(response.data);
                        } else {
                              setData(response); // Fallback if data is directly on response
                        }
                  } catch (err) {
                        console.error("Error fetching admin metrics ledger:", err);
                        setError("Unable to retrieve dashboard analytics registry.");
                  } finally {
                        setLoading(false);
                  }
            };

            getDashboardData();
      }, []);

      if (loading) {
            return (
                  <div className="min-h-screen bg-secondary-white text-primary-black font-primary flex flex-col justify-center items-center">
                        <FaSpinner className="w-6 h-6 text-green-dark animate-spin mb-2" />
                        <p className="text-xs tracking-wider uppercase text-secondary-black font-secondary">Compiling Ledger Analytics...</p>
                  </div>
            );
      }

      if (error || !data) {
            return (
                  <div className="min-h-screen bg-secondary-white text-primary-black font-primary flex flex-col justify-center items-center space-y-4">
                        <p className="text-sm font-secondary text-secondary-black">{error || "No dashboard registry found."}</p>
                        <button
                              onClick={() => window.location.reload()}
                              className="text-xs font-semibold text-green-dark bg-primary-white border border-beige-light px-4 py-2 rounded-xl hover:bg-secondary-white transition-all"
                        >
                              Retry Connection
                        </button>
                  </div>
            );
      }

      const { statistics, recentOrders, brandStats } = data;

      return (
            <div className="min-h-screen bg-secondary-white text-primary-black font-primary px-4 sm:px-6 py-10 max-w-7xl mx-auto space-y-8">

                  <Header />

                  {/* 1. Header Meta Title Row */}
                  <div className="border-b border-beige-light/40 pb-5">
                        <h1 className="text-3xl font-bold tracking-tight font-artistic-secondary text-primary-black">
                              Executive Registry
                        </h1>
                        <p className="font-secondary text-xs text-secondary-black mt-1">
                              Real-time performance ledger & olfactive asset tracking.
                        </p>
                  </div>

                  {/* 2. Core Operational Metrics (Grid Metrics) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                        {/* Revenue Card */}
                        <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-green-dark/10 text-green-dark flex items-center justify-center text-lg shrink-0">
                                    <FaRupeeSign />
                              </div>
                              <div>
                                    <span className="text-[10px] font-secondary uppercase tracking-widest text-beige-dark font-bold block">Gross Revenue</span>
                                    <h3 className="text-lg font-bold font-secondary mt-0.5">₹{(statistics?.totalRevenue || 0).toLocaleString('en-IN')}</h3>
                              </div>
                        </div>

                        {/* Total Orders Card */}
                        <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-beige-accent/10 text-beige-accent flex items-center justify-center text-lg shrink-0">
                                    <FaShoppingBag />
                              </div>
                              <div>
                                    <span className="text-[10px] font-secondary uppercase tracking-widest text-beige-dark font-bold block">Total Orders</span>
                                    <h3 className="text-lg font-bold font-secondary mt-0.5">{statistics?.totalOrders || 0}</h3>
                              </div>
                        </div>

                        {/* Total Perfumes Card */}
                        <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary-black/5 text-primary-black/70 flex items-center justify-center text-lg shrink-0">
                                    <FaFlask />
                              </div>
                              <div>
                                    <span className="text-[10px] font-secondary uppercase tracking-widest text-beige-dark font-bold block">Perfume SKUs</span>
                                    <h3 className="text-lg font-bold font-secondary mt-0.5">{statistics?.totalPerfumes || 0}</h3>
                              </div>
                        </div>

                        {/* Total Brands Card */}
                        <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-beige-dark/10 text-beige-dark flex items-center justify-center text-lg shrink-0">
                                    <FaTags />
                              </div>
                              <div>
                                    <span className="text-[10px] font-secondary uppercase tracking-widest text-beige-dark font-bold block">Active Brands</span>
                                    <h3 className="text-lg font-bold font-secondary mt-0.5">{statistics?.totalBrands || 0}</h3>
                              </div>
                        </div>

                        {/* Total Users Card */}
                        <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-lg shrink-0">
                                    <FaUsers />
                              </div>
                              <div>
                                    <span className="text-[10px] font-secondary uppercase tracking-widest text-beige-dark font-bold block">Clients Registry</span>
                                    <h3 className="text-lg font-bold font-secondary mt-0.5">{statistics?.totalUsers || 0}</h3>
                              </div>
                        </div>
                  </div>

                  {/* 3. Data Split Layout: Recent Orders & Brand Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* Left Side Block: Recent Orders Table */}
                        <div className="lg:col-span-2 space-y-4">
                              <h2 className="font-artistic-secondary text-xl font-bold tracking-wide px-1">
                                    Recent Transactions
                              </h2>

                              <div className="bg-primary-white border border-beige-light rounded-2xl overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                          <table className="w-full text-left border-collapse">
                                                <thead>
                                                      <tr className="bg-secondary-white/60 border-b border-beige-light/40 text-[10px] font-secondary uppercase tracking-widest text-beige-dark font-bold">
                                                            <th className="p-4">Order Details</th>
                                                            <th className="p-4">Client</th>
                                                            <th className="p-4">Payment</th>
                                                            <th className="p-4 text-right">Settlement</th>
                                                            <th className="p-4 text-center">Action</th>
                                                      </tr>
                                                </thead>
                                                <tbody className="divide-y divide-beige-light/20 text-xs font-secondary text-primary-black">
                                                      {recentOrders && recentOrders.length > 0 ? (
                                                            recentOrders.map((order) => (
                                                                  <tr key={order._id} className="hover:bg-secondary-white/30 transition-colors">
                                                                        {/* Order Reference & Date */}
                                                                        <td className="p-4">
                                                                              <p className="font-mono font-bold uppercase tracking-tight text-beige-accent">
                                                                                    #{order._id.slice(-8)}
                                                                              </p>
                                                                              <p className="text-[10px] text-secondary-black mt-0.5">
                                                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                                              </p>
                                                                        </td>

                                                                        {/* Client Identity */}
                                                                        <td className="p-4">
                                                                              <p className="font-semibold capitalize">{order.user?.name || 'Anonymous'}</p>
                                                                              <p className="text-[10px] text-secondary-black normal-case font-mono">{order.user?.email}</p>
                                                                        </td>

                                                                        {/* Status Pillars */}
                                                                        <td className="p-4 space-y-1">
                                                                              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wide font-bold bg-green-dark/10 text-green-dark">
                                                                                    {order.orderStatus}
                                                                              </span>
                                                                              <span className="block text-[9px] uppercase font-mono tracking-wider font-semibold text-secondary-black">
                                                                                    {order.paymentStatus}
                                                                              </span>
                                                                        </td>

                                                                        {/* Order Total Price */}
                                                                        <td className="p-4 text-right font-semibold text-sm">
                                                                              ₹{Number(order.totalPrice).toLocaleString('en-IN')}.00
                                                                        </td>

                                                                        {/* Target Route Action Link */}
                                                                        <td className="p-4 text-center">
                                                                              <Link
                                                                                    to={`/admin/orders/${order._id}`}
                                                                                    className="inline-flex items-center justify-center p-2 text-green-dark hover:bg-green-dark/5 rounded-lg transition-colors"
                                                                                    title="Inspect Order Log"
                                                                              >
                                                                                    <FaExternalLinkAlt className="text-[11px]" />
                                                                              </Link>
                                                                        </td>
                                                                  </tr>
                                                            ))
                                                      ) : (
                                                            <tr>
                                                                  <td colSpan="5" className="p-8 text-center text-secondary-black">
                                                                        <FaBoxOpen className="mx-auto text-lg mb-2 opacity-40" />
                                                                        No active transactions currently in ledger.
                                                                  </td>
                                                            </tr>
                                                      )}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>

                        {/* Right Side Block: Scent Volume Distribution Share */}
                        <div className="space-y-4">
                              <h2 className="font-artistic-secondary text-xl font-bold tracking-wide px-1">
                                    Brand Olfactive Share
                              </h2>

                              <div className="bg-primary-white border border-beige-light rounded-2xl p-5 space-y-4 shadow-sm">
                                    <span className="text-[10px] font-secondary uppercase tracking-widest text-beige-dark font-bold block border-b border-beige-light/30 pb-2">
                                          SKU Volumetric Share
                                    </span>

                                    <div className="space-y-4">
                                          {brandStats && brandStats.length > 0 ? (
                                                brandStats.map((brandInfo, index) => {
                                                      // Percentage bar calculation context
                                                      const totalSkus = statistics?.totalPerfumes || 1;
                                                      const ratio = Math.min(((brandInfo.totalPerfumes / totalSkus) * 100), 100);

                                                      return (
                                                            <div key={index} className="space-y-1.5 font-secondary text-xs">
                                                                  <div className="flex justify-between items-center text-primary-black">
                                                                        <span className="font-semibold capitalize tracking-wide">{brandInfo.brand}</span>
                                                                        <span className="text-secondary-black font-mono">{brandInfo.totalPerfumes} Perfumes</span>
                                                                  </div>

                                                                  {/* Visual Graphic Representation Progress Tracker */}
                                                                  <div className="w-full h-2 bg-secondary-white border border-beige-light/30 rounded-full overflow-hidden">
                                                                        <div
                                                                              className="h-full bg-green-dark rounded-full transition-all duration-500"
                                                                              style={{ width: `${ratio}%` }}
                                                                        />
                                                                  </div>
                                                            </div>
                                                      );
                                                })
                                          ) : (
                                                <p className="text-xs text-secondary-black text-center py-4">No active brand distributions initialized.</p>
                                          )}
                                    </div>
                              </div>
                        </div>

                  </div>

                  <Footer />

            </div>

      );
};

export default AdminDashboard;