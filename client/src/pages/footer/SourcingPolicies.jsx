import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard, FaVials, } from 'react-icons/fa';

const SourcingPolicies = () => {
      return (
            <div className="min-h-screen flex flex-col bg-secondary-white text-primary-black font-primary selection:bg-green-dark/10">

                  {/* --- CLEAN HEADER SECTION --- */}
                  <div className="bg-primary-white border-b border-beige-light py-20 px-6">
                        <div className="max-w-3xl mx-auto text-center space-y-4">
                              <span className="font-secondary text-sm font-semibold uppercase tracking-[0.2em] text-beige-dark block">
                                    Portfolio Sandbox Mechanics
                              </span>
                              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary-black">
                                    Simulated Shipping & Policies
                              </h1>
                              <p className="text-base md:text-lg font-secondary text-secondary-black max-w-2xl mx-auto leading-relaxed">
                                    This website is a personal portfolio project of a BCA student. There is <strong className="text-amber-600">no real money involved</strong>, and <strong className="text-amber-600">no physical items will ever be shipped</strong>. Feel free to click around, test the checkout, and explore the layout and functionality!
                              </p>
                        </div>
                  </div>

                  {/* --- CORE CONTENT GRID --- */}
                  <main className="grow max-w-4xl w-full mx-auto px-6 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center sm:text-left">

                              {/* BOX 1: CASHFREE GATEWAY */}
                              <div className="bg-primary-white border border-beige-light p-6 rounded-2xl space-y-3 shadow-sm">
                                    <div className="w-12 h-12 bg-secondary-white rounded-xl flex items-center justify-center text-green-dark border border-beige-light mx-auto sm:mx-0">
                                          <FaCreditCard size={20} />
                                    </div>
                                    <h3 className="font-bold font-primary text-xl text-primary-black">Sandbox Payments</h3>
                                    <p className="font-secondary text-sm text-secondary-black leading-relaxed">
                                          Integrated with the <strong>Cashfree Payment Gateway</strong> in testing mode. You can simulate checkout prompts using mock portal credentials entirely free of any financial charge.
                                    </p>
                              </div>

                              {/* BOX 2: ZERO-RISK SIMULATOR */}
                              <div className="bg-primary-white border border-beige-light p-6 rounded-2xl space-y-3 shadow-sm">
                                    <div className="w-12 h-12 bg-secondary-white rounded-xl flex items-center justify-center text-green-dark border border-beige-light mx-auto sm:mx-0">
                                          <FaVials size={20} />
                                    </div>
                                    <h3 className="font-bold font-primary text-xl text-primary-black">Zero-Risk Simulator</h3>
                                    <p className="font-secondary text-sm text-secondary-black leading-relaxed">
                                          Since there is no back-end shipment routing or real-world item delivery involved, this space functions exclusively as an interactive arena for code evaluation.
                                    </p>
                              </div>

                        </div>

                        {/* --- NAVIGATION RETREAT --- */}
                        <div className="text-center pt-16 mt-8 border-t border-beige-light/60">
                              <Link to="/perfumes" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-dark hover:text-primary-black transition-colors bg-primary-white border border-beige-light px-6 py-3 rounded-xl shadow-sm hover:shadow-md">
                                    <FaArrowLeft className="text-[9px]" /> Return to Boutique
                              </Link>
                        </div>
                  </main>
            </div>
      );
};

export default SourcingPolicies;