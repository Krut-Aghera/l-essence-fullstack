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
                        setData(response.data);
                        
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
            <div className="min-h-screen bg-secondary-white text-primary-black font-primary flex flex-col">

                  <Header />


                  <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">


                        <div className="border-b border-beige-light pb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                              <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight font-primary text-primary-black">
                                          Management Dashboard
                                    </h1>
                                    <p className="font-secondary text-xs text-secondary-black/70 mt-1">
                                          Real-time system insights, sandbox mock data, and database inventory levels.
                                    </p>
                              </div>
                              <div className="self-start md:self-auto px-3 py-1 rounded-full bg-green-dark/5 text-green-dark text-[10px] font-bold tracking-wider uppercase border border-green-dark/10">
                                    MongoDB Cloud Sync Active
                              </div>
                        </div>

                        {/* --- 2. CORE OPERATIONAL METRICS --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                              {/* Revenue Card (Emerald Green) */}
                              <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl shrink-0 border border-emerald-500/10">
                                          <FaRupeeSign />
                                    </div>
                                    <div>
                                          <span className="text-[10px] font-secondary uppercase tracking-widest text-secondary-black/50 font-bold block">Gross Revenue</span>
                                          <h3 className="text-xl font-bold font-secondary mt-0.5 text-primary-black">
                                                ₹{(statistics?.totalRevenue || 0).toLocaleString('en-IN')}
                                          </h3>
                                    </div>
                              </div>

                              {/* Total Orders Card (Amber Gold) */}
                              <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl shrink-0 border border-amber-500/10">
                                          <FaShoppingBag />
                                    </div>
                                    <div>
                                          <span className="text-[10px] font-secondary uppercase tracking-widest text-secondary-black/50 font-bold block">Total Orders</span>
                                          <h3 className="text-xl font-bold font-secondary mt-0.5 text-primary-black">
                                                {statistics?.totalOrders || 0}
                                          </h3>
                                    </div>
                              </div>

                              {/* Total Perfumes Card (Purple Alchemy) */}
                              <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-xl shrink-0 border border-purple-500/10">
                                          <FaFlask />
                                    </div>
                                    <div>
                                          <span className="text-[10px] font-secondary uppercase tracking-widest text-secondary-black/50 font-bold block">Perfume SKUs</span>
                                          <h3 className="text-xl font-bold font-secondary mt-0.5 text-primary-black">
                                                {statistics?.totalPerfumes || 0}
                                          </h3>
                                    </div>
                              </div>

                              {/* Total Brands Card (Rose Crimson) */}
                              <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-xl shrink-0 border border-rose-500/10">
                                          <FaTags />
                                    </div>
                                    <div>
                                          <span className="text-[10px] font-secondary uppercase tracking-widest text-secondary-black/50 font-bold block">Active Brands</span>
                                          <h3 className="text-xl font-bold font-secondary mt-0.5 text-primary-black">
                                                {statistics?.totalBrands || 0}
                                          </h3>
                                    </div>
                              </div>

                              {/* Total Users Card (Indigo Royal) */}
                              <div className="bg-primary-white border border-beige-light p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center text-xl shrink-0 border border-indigo-500/10">
                                          <FaUsers />
                                    </div>
                                    <div>
                                          <span className="text-[10px] font-secondary uppercase tracking-widest text-secondary-black/50 font-bold block">User Registry</span>
                                          <h3 className="text-xl font-bold font-secondary mt-0.5 text-primary-black">
                                                {statistics?.totalUsers || 0}
                                          </h3>
                                    </div>
                              </div>
                        </div>

                        {/* --- 3. DATA SPLIT LAYOUT --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                              {/* Left Column: Recent Orders Table */}
                              <div className="lg:col-span-2 space-y-4">
                                    <h2 className="font-primary text-lg font-bold tracking-tight text-primary-black px-1">
                                          Recent Transactions
                                    </h2>

                                    <div className="bg-primary-white border border-beige-light rounded-2xl overflow-hidden shadow-sm">
                                          <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                      <thead>
                                                            <tr className="bg-secondary-white/80 border-b border-beige-light text-[10px] font-secondary uppercase tracking-widest text-secondary-black/70 font-bold">
                                                                  <th className="p-4">Order Details</th>
                                                                  <th className="p-4">Client</th>
                                                                  <th className="p-4">Payment</th>
                                                                  <th className="p-4 text-right text-clip">Settlement</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody className="divide-y divide-beige-light/40 text-xs font-secondary text-primary-black">
                                                            {recentOrders && recentOrders.length > 0 ? (
                                                                  recentOrders.map((order) => (
                                                                        <tr key={order._id} className="hover:bg-secondary-white/40 transition-colors">
                                                                              {/* Order Reference & Date */}
                                                                              <td className="p-4">
                                                                                    <p className="font-mono font-bold uppercase tracking-tight text-beige-dark">
                                                                                          #{order._id.slice(-8)}
                                                                                    </p>
                                                                                    <p className="text-[10px] text-secondary-black/60 mt-0.5">
                                                                                          {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                                                    </p>
                                                                              </td>

                                                                              {/* Client Identity */}
                                                                              <td className="p-4">
                                                                                    <p className="font-semibold capitalize text-primary-black">{order.user?.name || 'Anonymous'}</p>
                                                                                    <p className="text-[10px] text-secondary-black/60 normal-case font-mono">{order.user?.email}</p>
                                                                              </td>


                                                                              {/* Status Pillars */}
                                                                              <td className="p-4">
                                                                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wide font-bold border font-mono ${order.paymentStatus?.toLowerCase() === 'pending'
                                                                                          ? 'bg-amber-500/10 text-orange-400 border-orange-500/10'
                                                                                          : 'bg-emerald-500/10 text-emerald-700 border-emerald-500/10'
                                                                                          }`}>
                                                                                          {order.paymentStatus}
                                                                                    </span>
                                                                              </td>

                                                                              {/* Order Total Price */}
                                                                              <td className="p-4 text-right font-semibold text-sm text-primary-black">
                                                                                    ₹{Number(order.totalPrice).toLocaleString('en-IN')}.00
                                                                              </td>
                                                                        </tr>
                                                                  ))
                                                            ) : (
                                                                  <tr>
                                                                        <td colSpan="4" className="p-12 text-center text-secondary-black/60">
                                                                              <FaBoxOpen className="mx-auto text-2xl mb-3 text-secondary-black/30" />
                                                                              No active transactions currently recorded in the system ledger.
                                                                        </td>
                                                                  </tr>
                                                            )}
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              </div>

                              {/* Right Column: Brand Share */}
                              <div className="space-y-4">
                                    <h2 className="font-primary text-lg font-bold tracking-tight text-primary-black px-1">
                                          Brand Inventory Share
                                    </h2>

                                    <div className="bg-primary-white border border-beige-light rounded-2xl p-5 space-y-5 shadow-sm">
                                          <span className="text-[10px] font-secondary uppercase tracking-widest text-secondary-black/50 font-bold block border-b border-beige-light pb-2">
                                                SKU Concentration
                                          </span>

                                          <div className="space-y-4">
                                                {brandStats && brandStats.length > 0 ? (
                                                      brandStats.map((brandInfo, index) => {
                                                            const totalSkus = statistics?.totalPerfumes || 1;
                                                            const ratio = Math.min(((brandInfo.totalPerfumes / totalSkus) * 100), 100);

                                                            return (
                                                                  <div key={index} className="space-y-2 font-secondary text-xs">
                                                                        <div className="flex justify-between items-center text-primary-black">
                                                                              <span className="font-semibold capitalize tracking-wide text-primary-black">{brandInfo.brand}</span>
                                                                              <span className="text-secondary-black/60 font-mono text-[11px]">{brandInfo.totalPerfumes} items</span>
                                                                        </div>

                                                                        {/* Elegant Progress Tracker Bar */}
                                                                        <div className="w-full h-2 bg-secondary-white border border-beige-light/40 rounded-full overflow-hidden">
                                                                              <div
                                                                                    className="h-full bg-purple-600 rounded-full transition-all duration-500"
                                                                                    style={{ width: `${ratio}%` }}
                                                                              />
                                                                        </div>
                                                                  </div>
                                                            );
                                                      })
                                                ) : (
                                                      <p className="text-xs text-secondary-black/60 text-center py-6">No brand inventory analytics parsed.</p>
                                                )}
                                          </div>
                                    </div>
                              </div>

                        </div>
                  </div>


                  <Footer />
            </div>

      );
};

export default AdminDashboard;