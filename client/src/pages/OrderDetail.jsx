import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import axiosClient from '../../api/axiosClient'; // Import your configured axios client

// --- DETAILED EXPANDED DUMMY OBJECT TARGET ---
const DUMMY_ORDER_DETAIL = {
      _id: 'ORD-98432',
      createdAt: '2026-05-14T10:30:00.000Z',
      status: 'Delivered',
      trackingNumber: 'TRK-AURA-8839210',
      subtotal: 315.00,
      tax: 20.50,
      shipping: 0.00,
      totalAmount: 335.50,
      shippingAddress: {
            fullName: 'Alexander Mercer',
            street: '742 Evergreen Terrace',
            city: 'Springfield',
            postalCode: '90210',
            country: 'United States'
      },
      items: [
            {
                  _id: 'p1',
                  name: 'Mystique Bouquet',
                  brand: 'AFNAN',
                  concentration: 'Eau de Parfum',
                  size: '100ml',
                  price: 85.00,
                  quantity: 2,
                  image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=200&auto=format&fit=crop'
            },
            {
                  _id: 'p2',
                  name: 'Noir Absolute',
                  brand: 'TOM FORD',
                  concentration: 'Parfum',
                  size: '50ml',
                  price: 145.00,
                  quantity: 1,
                  image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200&auto=format&fit=crop'
            }
      ]
};

export default function OrderDetail() {
      const { orderId } = useParams(); // Grabs route token id parameter dynamically
      const [order, setOrder] = useState(null);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const fetchSpecificOrderDetails = async () => {
                  try {
                        setIsLoading(true);
                        // --- AXIOS INTEGRATION LINE (UN-COMMENT WHEN READY) ---
                        // const response = await axiosClient.get(`/api/v1/orders/detail/${orderId}`);
                        // setOrder(response.data.order || response.data);

                        // Simulated processing state delay
                        setOrder(DUMMY_ORDER_DETAIL);
                  } catch (error) {
                        console.error("Order details retrieval crashed:", error);
                  } finally {
                        setIsLoading(false);
                  }
            };
            fetchSpecificOrderDetails();
      }, [orderId]);

      if (isLoading) {
            return (
                  <div className="min-h-screen w-full bg-secondary-white flex items-center justify-center font-secondary">
                        <p className="text-xs font-bold uppercase tracking-widest text-secondary-black/40 animate-pulse">Loading Fragrance Logistics Matrix...</p>
                  </div>
            );
      }

      if (!order) {
            return (
                  <div className="min-h-screen w-full bg-secondary-white flex flex-col items-center justify-center font-secondary">
                        <p className="text-sm font-semibold text-red-600">⚠️ Order Manifest profile not located.</p>
                        <Link to="/orders" className="text-xs font-bold uppercase underline mt-2 text-primary-black">Return to summary listings</Link>
                  </div>
            );
      }

      return (
            <div className="min-h-screen w-full bg-secondary-white py-12 px-4 sm:px-6 lg:px-8 font-secondary text-primary-black">
                  <div className="max-w-4xl mx-auto space-y-6">

                        {/* Top Breadcrumb Navigation Anchor line */}
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-black/50">
                              <Link to="/orders" className="hover:text-primary-black transition-colors">Orders</Link>
                              <span>/</span>
                              <span className="text-primary-black">{order._id}</span>
                        </div>

                        {/* Headline Dashboard Meta Segment Banner Card */}
                        <div className="bg-primary-white border border-beige-light/60 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                              <div>
                                    <h1 className="font-primary font-bold text-xl md:text-2xl tracking-tight">Order {order._id}</h1>
                                    <p className="text-xs text-secondary-black/60 mt-0.5">
                                          Processed on {new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
                                    </p>
                              </div>
                              <div className="flex flex-col md:items-end gap-1">
                                    <span className="text-xs font-bold font-primary uppercase tracking-wider text-secondary-black/40">Status</span>
                                    <span className="text-sm font-bold text-beige-dark uppercase tracking-widest font-primary">{order.status}</span>
                              </div>
                        </div>

                        {/* 2-Column Split Details Grid Area */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                              {/* LEFT SUBGRID: Item Streams List Matrix Column (Spans 2 columns) */}
                              <div className="md:col-span-2 bg-primary-white border border-beige-light/60 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
                                    <h2 className="font-primary font-bold text-base border-b border-beige-light/30 pb-3">Manifest Content Items</h2>

                                    <div className="divide-y divide-beige-light/30">
                                          {order.items.map((item) => (
                                                <div key={item._id} className="flex gap-4 py-4 first:pt-0 last:pb-0 group">
                                                      <div className="w-16 h-20 bg-secondary-white border border-beige-light/30 rounded-xl overflow-hidden shrink-0">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
                                                      </div>
                                                      <div className="grow flex flex-col justify-between py-0.5">
                                                            <div className="flex justify-between items-start gap-2">
                                                                  <div>
                                                                        <span className="text-[9px] font-bold tracking-wider uppercase text-beige-dark block">{item.brand}</span>
                                                                        <h3 className="font-primary font-bold text-sm text-primary-black tracking-tight">{item.name}</h3>
                                                                        <p className="text-[11px] font-medium text-secondary-black/50 mt-0.5">{item.concentration} • {item.size}</p>
                                                                  </div>
                                                                  <p className="font-primary font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                                            </div>
                                                            <p className="text-xs font-medium text-secondary-black/60">Qty: <span className="font-bold text-primary-black">{item.quantity}</span> @ ${item.price.toFixed(2)}</p>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              </div>

                              {/* RIGHT SUBGRID: Logistics Summary + Financial Balance sheet block */}
                              <div className="space-y-6 md:col-span-1">

                                    {/* Delivery address module segment */}
                                    <div className="bg-primary-white border border-beige-light/60 rounded-2xl p-5 shadow-sm space-y-3">
                                          <h2 className="font-primary font-bold text-sm border-b border-beige-light/30 pb-2 uppercase tracking-wide text-secondary-black/60">Shipping Destination</h2>
                                          <div className="text-xs font-semibold space-y-1 text-secondary-black/80">
                                                <p className="font-bold text-primary-black text-sm">{order.shippingAddress.fullName}</p>
                                                <p>{order.shippingAddress.street}</p>
                                                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                                <p className="tracking-wide text-[10px] text-primary-black/50 uppercase">{order.shippingAddress.country}</p>
                                          </div>
                                          {order.trackingNumber && (
                                                <div className="pt-2 border-t border-beige-light/30 mt-2">
                                                      <span className="text-[10px] font-bold block text-secondary-black/40 uppercase">Tracking Ref</span>
                                                      <code className="text-xs font-mono font-bold text-primary-black bg-secondary-white px-2 py-0.5 rounded border border-beige-light/60 inline-block mt-0.5">{order.trackingNumber}</code>
                                                </div>
                                          )}
                                    </div>

                                    {/* Financial Ledger Subtotal Sheet */}
                                    <div className="bg-primary-white border border-beige-light/60 rounded-2xl p-5 shadow-sm space-y-3">
                                          <h2 className="font-primary font-bold text-sm border-b border-beige-light/30 pb-2 uppercase tracking-wide text-secondary-black/60">Payment Ledger</h2>
                                          <div className="space-y-2 text-xs font-medium text-secondary-black/80">
                                                <div className="flex justify-between">
                                                      <span>Subtotal</span>
                                                      <span className="font-semibold text-primary-black">${order.subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                      <span>Shipping Fees</span>
                                                      <span className="font-semibold text-primary-black">
                                                            {order.shipping === 0 ? <span className="text-green-dark font-bold">FREE</span> : `$${order.shipping.toFixed(2)}`}
                                                      </span>
                                                </div>
                                                <div className="flex justify-between">
                                                      <span>Tax Allocation</span>
                                                      <span className="font-semibold text-primary-black">${order.tax.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between border-t border-beige-light/40 pt-2 text-sm font-bold text-primary-black font-primary">
                                                      <span>Total Settled</span>
                                                      <span className="text-base">${order.totalAmount.toFixed(2)}</span>
                                                </div>
                                          </div>
                                    </div>

                              </div>

                        </div>

                  </div>
            </div>
      );
}