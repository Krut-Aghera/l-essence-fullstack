import React, { useState, useEffect } from 'react';
import {
      FaShoppingBag,
      FaUsers,
      FaBuilding,
      FaFlask,
      FaBox,
      FaArrowUp,
      FaExclamationTriangle,
      FaCheckCircle,
      FaClock
} from 'react-icons/fa';
import { Header, Footer } from '../../components';

// Mock Data matching backend models
const initialBrandMetrics = [
      { brandName: "Aura Botanicals", totalPerfumes: 14, primaryAccord: "Floral & Botanical" },
      { brandName: "Maison Verte", totalPerfumes: 9, primaryAccord: "Fresh & Citrus" },
      { brandName: "Le Bois", totalPerfumes: 12, primaryAccord: "Woody & Earth" },
      { brandName: "Serene", totalPerfumes: 6, primaryAccord: "Gourmand & Warm" }
];

const initialInventoryLedger = [
      { id: "P-101", name: "Himalayan Cedarwood", brand: "Le Bois", category: "Woody & Earth", stock: 84, status: "In Stock" },
      { id: "P-102", name: "Crushed Iris Extract", brand: "Aura Botanicals", category: "Floral & Botanical", stock: 4, status: "Low Stock" },
      { id: "P-103", name: "Bergamot Peel Horizon", brand: "Maison Verte", category: "Fresh & Citrus", stock: 120, status: "In Stock" },
      { id: "P-104", name: "Smoked Vanilla Absolute", brand: "Serene", category: "Gourmand & Warm", stock: 0, status: "Out of Stock" }
];

const recentOrders = [
      { id: "ORD-9281", customer: "Eleanor Vance", date: "June 20, 2026", amount: "$145.00", status: "Delivered" },
      { id: "ORD-9282", customer: "Julian Croft", date: "June 19, 2026", amount: "$290.00", status: "Processing" },
      { id: "ORD-9283", customer: "Sienna Ward", date: "June 18, 2026", amount: "$110.00", status: "Delivered" }
];

const Dashboard = () => {
      // Metric Summary States
      const [metrics, setMetrics] = useState({
            totalOrders: 1482,
            totalUsers: 8430,
            totalBrands: 4,
            totalStockUnits: 3204
      });

      return (
            <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary">
                  <Header />

                  {/* --- ADMINISTRATIVE HERO STATUS --- */}
                  <div className="bg-primary-white border-b border-beige-light py-8 px-6">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                    <span className="font-artistic-secondary text-[10px] uppercase tracking-[0.25em] text-beige-dark mb-1 block">
                                          System Controller Portal
                                    </span>
                                    <h1 className="text-3xl font-bold text-primary-black tracking-tight">
                                          Maison Architecture Console
                                    </h1>
                              </div>
                              <div className="text-xs font-secondary bg-secondary-white border border-beige-light px-4 py-2 rounded-xl text-secondary-black">
                                    System Status: <span className="text-green-dark font-bold">Operational • Live</span>
                              </div>
                        </div>
                  </div>

                  {/* --- CORE METRICS CONTAINER GRID --- */}
                  <main className="grow max-w-7xl w-full mx-auto px-6 py-10 space-y-10">

                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {/* Total Orders Metric */}
                              <div className="bg-primary-white border border-beige-light rounded-2xl p-6 shadow-sm flex items-center justify-between">
                                    <div className="space-y-1">
                                          <span className="font-secondary text-xs text-secondary-black font-medium tracking-wide block">Total Formulations Ordered</span>
                                          <span className="text-3xl font-bold text-primary-black font-primary">{metrics.totalOrders}</span>
                                          <span className="flex items-center gap-1 text-[11px] text-green-dark font-secondary pt-1">
                                                <FaArrowUp size={8} /> +12.4% <span className="text-secondary-black/50">this cycle</span>
                                          </span>
                                    </div>
                                    <div className="w-12 h-12 bg-secondary-white rounded-xl flex items-center justify-center text-beige-accent">
                                          <FaShoppingBag size={18} />
                                    </div>
                              </div>

                              {/* Total Users Metric */}
                              <div className="bg-primary-white border border-beige-light rounded-2xl p-6 shadow-sm flex items-center justify-between">
                                    <div className="space-y-1">
                                          <span className="font-secondary text-xs text-secondary-black font-medium tracking-wide block">Registered Curators</span>
                                          <span className="text-3xl font-bold text-primary-black font-primary">{metrics.totalUsers}</span>
                                          <span className="flex items-center gap-1 text-[11px] text-green-dark font-secondary pt-1">
                                                <FaArrowUp size={8} /> +8.2% <span className="text-secondary-black/50">growth velocity</span>
                                          </span>
                                    </div>
                                    <div className="w-12 h-12 bg-secondary-white rounded-xl flex items-center justify-center text-beige-accent">
                                          <FaUsers size={18} />
                                    </div>
                              </div>

                              {/* Total Brands Metric */}
                              <div className="bg-primary-white border border-beige-light rounded-2xl p-6 shadow-sm flex items-center justify-between">
                                    <div className="space-y-1">
                                          <span className="font-secondary text-xs text-secondary-black font-medium tracking-wide block">Active Maisons & Houses</span>
                                          <span className="text-3xl font-bold text-primary-black font-primary">{metrics.totalBrands}</span>
                                          <span className="text-[11px] font-secondary text-beige-dark pt-1 block font-medium">
                                                1 Pending structural review
                                          </span>
                                    </div>
                                    <div className="w-12 h-12 bg-secondary-white rounded-xl flex items-center justify-center text-beige-accent">
                                          <FaBuilding size={16} />
                                    </div>
                              </div>

                              {/* Total Physical Stock Volumes */}
                              <div className="bg-primary-white border border-beige-light rounded-2xl p-6 shadow-sm flex items-center justify-between">
                                    <div className="space-y-1">
                                          <span className="font-secondary text-xs text-secondary-black font-medium tracking-wide block">Total Volume In-Stock</span>
                                          <span className="text-3xl font-bold text-primary-black font-primary">{metrics.totalStockUnits}</span>
                                          <span className="text-[11px] font-secondary text-secondary-black/60 pt-1 block">
                                                Units across all variant sizing
                                          </span>
                                    </div>
                                    <div className="w-12 h-12 bg-secondary-white rounded-xl flex items-center justify-center text-beige-accent">
                                          <FaBox size={16} />
                                    </div>
                              </div>
                        </section>

                        {/* --- SECONDARY SYSTEM DENSITIES & LEDGERS --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                              {/* Left Side: Perfume Counts Per Brand */}
                              <section className="lg:col-span-5 bg-primary-white border border-beige-light rounded-2xl p-6 shadow-sm space-y-4">
                                    <div>
                                          <h3 className="text-lg font-bold text-primary-black tracking-tight">Maison Densities</h3>
                                          <p className="font-secondary text-xs text-secondary-black">Total structural formulations categorized per individual design house.</p>
                                    </div>
                                    <div className="overflow-x-auto">
                                          <table className="w-full text-left font-secondary text-xs">
                                                <thead>
                                                      <tr className="border-b border-secondary-white text-beige-dark font-bold uppercase tracking-wider">
                                                            <th className="pb-3 font-medium">Maison Identifier</th>
                                                            <th className="pb-3 text-center font-medium">Active Extraits</th>
                                                            <th className="pb-3 text-right font-medium">Dominant Accord</th>
                                                      </tr>
                                                </thead>
                                                <tbody className="divide-y divide-secondary-white/60 text-secondary-black">
                                                      {initialBrandMetrics.map((b, i) => (
                                                            <tr key={i} className="hover:bg-secondary-white/30 transition-colors">
                                                                  <td className="py-3.5 font-semibold text-primary-black">{b.brandName}</td>
                                                                  <td className="py-3.5 text-center font-mono text-primary-black font-bold bg-secondary-white/40 rounded-md">{b.totalPerfumes}</td>
                                                                  <td className="py-3.5 text-right font-light">{b.primaryAccord}</td>
                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </div>
                              </section>

                              {/* Right Side: Recent Transfusions Ledger */}
                              <section className="lg:col-span-7 bg-primary-white border border-beige-light rounded-2xl p-6 shadow-sm space-y-4">
                                    <div>
                                          <h3 className="text-lg font-bold text-primary-black tracking-tight">Recent Dispatches</h3>
                                          <p className="font-secondary text-xs text-secondary-black">Live feed of active consumer scent curations.</p>
                                    </div>
                                    <div className="space-y-3">
                                          {recentOrders.map((order) => (
                                                <div key={order.id} className="flex items-center justify-between p-3.5 bg-secondary-white/40 border border-secondary-white rounded-xl hover:border-beige-light transition-all duration-200">
                                                      <div className="flex items-center gap-3">
                                                            <div className={`p-2 rounded-lg text-xs ${order.status === 'Delivered' ? 'bg-green-light/10 text-green-dark' : 'bg-beige-light/20 text-beige-accent'}`}>
                                                                  {order.status === 'Delivered' ? <FaCheckCircle /> : <FaClock />}
                                                            </div>
                                                            <div>
                                                                  <h4 className="font-semibold text-xs text-primary-black">{order.customer}</h4>
                                                                  <span className="text-[10px] text-secondary-black/60 font-secondary">{order.id} • {order.date}</span>
                                                            </div>
                                                      </div>
                                                      <div className="text-right">
                                                            <span className="text-xs font-bold font-primary text-primary-black block">{order.amount}</span>
                                                            <span className={`text-[9px] uppercase tracking-wider font-bold ${order.status === 'Delivered' ? 'text-green-dark' : 'text-beige-accent'}`}>
                                                                  {order.status}
                                                            </span>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </section>
                        </div>

                        {/* --- SCENT INVENTORY SYSTEM LEDGER (BOTTOM BROAD table) --- */}
                        <section className="bg-primary-white border border-beige-light rounded-2xl p-6 shadow-sm space-y-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                          <h2 className="text-xl font-bold text-primary-black tracking-tight">Active Scent Inventory & Matrix Quantities</h2>
                                          <p className="font-secondary text-xs text-secondary-black">
                                                Master tracking matrix detailing exact fluid capacities and architectural stock levels across all formulation records.
                                          </p>
                                    </div>
                                    <button className="px-4 py-2 bg-primary-black hover:bg-green-dark text-primary-white rounded-xl font-medium text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer">
                                          + Provision New Formulation
                                    </button>
                              </div>

                              <div className="overflow-x-auto w-full">
                                    <table className="w-full text-left font-secondary text-xs min-w-175">
                                          <thead>
                                                <tr className="border-b border-secondary-white text-beige-dark font-bold uppercase tracking-wider">
                                                      <th className="pb-3 font-medium">Matrix ID</th>
                                                      <th className="pb-3 font-medium">Formulation Name</th>
                                                      <th className="pb-3 font-medium">House Maison</th>
                                                      <th className="pb-3 font-medium">Scent Category</th>
                                                      <th className="pb-3 text-center font-medium">Quantity In Stock</th>
                                                      <th className="pb-3 text-right font-medium">Status Variant</th>
                                                </tr>
                                          </thead>
                                          <tbody className="divide-y divide-secondary-white/50 text-secondary-black">
                                                {initialInventoryLedger.map((item) => (
                                                      <tr key={item.id} className="hover:bg-secondary-white/20 transition-colors">
                                                            <td className="py-4 font-mono text-[11px] text-secondary-black/70">{item.id}</td>
                                                            <td className="py-4 font-primary text-sm font-bold text-primary-black">{item.name}</td>
                                                            <td className="py-4">{item.brand}</td>
                                                            <td className="py-4 font-light text-secondary-black/80">{item.category}</td>
                                                            <td className="py-4 text-center font-mono font-bold text-sm text-primary-black">
                                                                  {item.stock} <span className="text-[10px] text-secondary-black/50 font-normal">vials</span>
                                                            </td>
                                                            <td className="py-4 text-right">
                                                                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${item.stock === 0
                                                                              ? 'bg-red-100 text-red-700'
                                                                              : item.stock <= 10
                                                                                    ? 'bg-amber-100 text-amber-700'
                                                                                    : 'bg-green-100 text-green-700'
                                                                        }`}>
                                                                        {item.stock <= 10 && <FaExclamationTriangle size={8} />}
                                                                        {item.status}
                                                                  </span>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </section>

                  </main>

                  <Footer />
            </div>
      );
}


export default Dashboard