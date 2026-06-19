import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axiosClient from '../../api/axiosClient'; // Import your configured axios client

// --- BRANDED DUMMY ORDERS PORTFOLIO ---
const DUMMY_ORDERS = [
      {
            _id: 'ORD-98432',
            createdAt: '2026-05-14T10:30:00.000Z',
            totalAmount: 335.50,
            status: 'Delivered',
            items: [
                  { image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=200&auto=format&fit=crop' },
                  { image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200&auto=format&fit=crop' },
                  { image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=200&auto=format&fit=crop' },
                  { image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=200&auto=format&fit=crop' } // 4th item to trigger "..."
            ]
      },
      {
            _id: 'ORD-44109',
            createdAt: '2026-06-02T14:15:00.000Z',
            totalAmount: 145.00,
            status: 'In Transit',
            items: [
                  { image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200&auto=format&fit=crop' }
            ]
      },
      {
            _id: 'ORD-11024',
            createdAt: '2026-06-10T18:45:00.000Z',
            totalAmount: 85.00,
            status: 'Processing',
            items: [
                  { image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=200&auto=format&fit=crop' },
                  { image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=200&auto=format&fit=crop' }
            ]
      }
];

export default function OrdersHistory() {
      const [orders, setOrders] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const getOrderHistory = async () => {
                  try {
                        setIsLoading(true);
                        // --- AXIOS INTEGRATION LINE (UN-COMMENT WHEN READY) ---
                        // const response = await axiosClient.get('/api/v1/orders/my-orders');
                        // setOrders(response.data.orders || response.data);

                        // Using dummy data as an immediate placeholder fallback:
                        setOrders(DUMMY_ORDERS);
                  } catch (error) {
                        console.error("Order history fetch failed:", error);
                  } finally {
                        setIsLoading(false);
                  }
            };
            getOrderHistory();
      }, []);

      // Simple clean helper to format timestamp ISO lines elegantly
      const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
            });
      };

      // Status badge dynamic theme styling map
      const getStatusStyles = (status) => {
            switch (status.toLowerCase()) {
                  case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
                  case 'in transit': return 'bg-blue-50 text-blue-700 border-blue-200';
                  default: return 'bg-amber-50 text-amber-700 border-amber-200'; // Processing/Pending
            }
      };

      return (
            <div className="min-h-screen w-full bg-secondary-white py-12 px-4 sm:px-6 lg:px-8 font-secondary">
                  <div className="max-w-4xl mx-auto">

                        {/* Editorial Content Header Block */}
                        <div className="border-b border-beige-light/60 pb-5 mb-8">
                              <h1 className="text-3xl font-primary font-bold text-primary-black tracking-tight">
                                    Order History
                              </h1>
                              <p className="text-xs sm:text-sm text-secondary-black/70 mt-1">
                                    Track your luxury shipments, trace past olfactory acquisitions, and manage invoices.
                              </p>
                        </div>

                        {isLoading ? (
                              /* State A: Loading structural skeleton arrays */
                              <div className="space-y-4">
                                    {[1, 2].map((n) => (
                                          <div key={n} className="h-32 bg-primary-white border border-beige-light/40 rounded-2xl animate-pulse" />
                                    ))}
                              </div>
                        ) : orders.length === 0 ? (
                              /* State B: Empty historical logs view wrapper */
                              <div className="bg-primary-white rounded-2xl border border-beige-light/60 p-12 text-center shadow-sm">
                                    <p className="text-sm font-medium text-secondary-black">No legacy orders established yet.</p>
                                    <Link to="/shop" className="text-xs font-bold text-beige-dark underline mt-2 inline-block uppercase tracking-wider">
                                          Explore Fragrances
                                    </Link>
                              </div>
                        ) : (
                              /* State C: Active List Component Tree Rendering */
                              <div className="space-y-4">
                                    {orders.map((order) => (
                                          <Link
                                                key={order._id}
                                                to={`/orders/${order._id}`}
                                                className="block bg-primary-white border border-beige-light/60 hover:border-primary-black rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-md relative group overflow-hidden"
                                          >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                                      {/* Info Meta Group Block */}
                                                      <div className="space-y-1.5">
                                                            <div className="flex items-center gap-3 flex-wrap">
                                                                  <span className="font-primary font-bold text-sm text-primary-black tracking-tight group-hover:text-beige-accent transition-colors">
                                                                        {order._id}
                                                                  </span>
                                                                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border tracking-wide uppercase ${getStatusStyles(order.status)}`}>
                                                                        {order.status}
                                                                  </span>
                                                            </div>
                                                            <p className="text-xs text-secondary-black/60">
                                                                  Placed on <span className="font-semibold text-primary-black">{formatDate(order.createdAt)}</span>
                                                            </p>
                                                            <p className="text-sm font-primary font-bold text-primary-black pt-1">
                                                                  Total Paid: <span className="text-base">${order.totalAmount.toFixed(2)}</span>
                                                            </p>
                                                      </div>

                                                      {/* 3-Image Product Matrix Grid Row with trailing truncation display logic */}
                                                      <div className="flex items-center gap-2 mt-2 sm:mt-0 self-start sm:self-center">
                                                            <div className="flex -space-x-3 overflow-hidden">
                                                                  {order.items.slice(0, 3).map((item, idx) => (
                                                                        <div
                                                                              key={idx}
                                                                              className="w-14 h-16 bg-secondary-white rounded-lg overflow-hidden border border-primary-white shadow-sm shrink-0"
                                                                        >
                                                                              <img
                                                                                    src={item.image}
                                                                                    alt="Ordered fragrance preview thumbnail"
                                                                                    className="w-full h-full object-cover object-center"
                                                                              />
                                                                        </div>
                                                                  ))}
                                                            </div>

                                                            {/* Appending Ellipsis indicator elements if items array boundary count exceeds 3 */}
                                                            {order.items.length > 3 && (
                                                                  <span className="text-xs font-bold text-secondary-black/40 pl-1 select-none font-primary">
                                                                        + {order.items.length - 3} more
                                                                  </span>
                                                            )}
                                                      </div>

                                                </div>

                                                {/* Subtle minimalist bottom hover border strip */}
                                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                                          </Link>
                                    ))}
                              </div>
                        )}

                  </div>
            </div>
      );
}