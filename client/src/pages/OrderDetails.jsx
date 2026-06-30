import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchCurrentOrder } from "../apis/order.api";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCurrentOrder = async () => {
            try {
                setLoading(true);
                const response = await fetchCurrentOrder(id);
                console.log(response);
                setOrder(response.data);
            } catch (err) {
                console.error("Error retrieving sandbox data layer record:", err);
                setError("Unable to recover transaction data registry.");
            } finally {
                setLoading(false);
            }
        };

        getCurrentOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary-white text-primary-black font-primary flex flex-col justify-center items-center">
                <div className="w-6 h-6 border-2 border-green-dark border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-xs tracking-wider uppercase text-secondary-black font-secondary">
                    Retrieving Ledger Record...
                </p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-secondary-white text-primary-black font-primary flex flex-col justify-center items-center space-y-4">
                <p className="text-sm font-secondary text-secondary-black">
                    {error || "Order data matching this identifier was not found."}
                </p>
                <Link
                    to="/orders"
                    className="text-xs font-semibold text-green-dark flex items-center gap-1.5 hover:underline underline-offset-4"
                >
                    <FaArrowLeft className="text-[10px]" /> Return to Purchase History
                </Link>
            </div>
        );
    }

    // Format ISO Date for presentation
    const formattedDate = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "N/A";

    return (
        <div className="min-h-screen bg-secondary-white text-primary-black font-primary flex flex-col">
            <Header />

            <main className="grow max-w-5xl w-full mx-auto px-6 pt-12 pb-24 space-y-8">
                {/* 1. Page Header */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-beige-light/40 pb-6">
                    <div className="space-y-1">
                        <Link
                            to="/user/orders"
                            className="text-xs font-semibold text-green-dark flex items-center gap-1.5 hover:underline underline-offset-4 mb-2"
                        >
                            <FaArrowLeft className="text-[10px]" /> Back to Orders
                        </Link>

                        <h1 className="text-3xl font-bold tracking-tight font-artistic-secondary capitalize">
                            Order #{order.cashfreeOrderID || id}
                        </h1>
                        <p className="font-secondary text-xs text-secondary-black">
                            Placed on {formattedDate} &bull; Payment status:{" "}
                            <span className="font-semibold text-green-dark">
                                {order.paymentStatus}
                            </span>
                        </p>
                    </div>
                </div>

                {/* 2. Order Status Banner */}
                <div className="bg-primary-white border border-beige-light rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-green-dark/10 flex items-center justify-center text-green-dark shrink-0">
                            <FaCheckCircle className="text-lg" />
                        </div>
                        <div>
                            <span className="text-[10px] font-secondary uppercase font-bold tracking-widest text-beige-dark block mb-0.5">
                                Order Status
                            </span>
                            <h3 className="font-artistic-secondary font-bold text-xl text-primary-black leading-none capitalize">
                                {order.orderStatus}
                            </h3>
                        </div>
                    </div>

                    <div className="text-xs font-secondary bg-secondary-white/70 px-4 py-2.5 rounded-xl border border-beige-light/30 sm:text-right">
                        <p className="text-secondary-black">Payment Confirmation:</p>
                        <p className="font-mono font-bold text-green-dark uppercase text-[10px] tracking-wider mt-0.5">
                            Payment Received Successfully
                        </p>
                    </div>
                </div>

                {/* 3. Main Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Block: Items Purchased */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="font-artistic-secondary text-xl font-bold tracking-wide px-1">
                            Items Ordered ({order.products?.length || 0})
                        </h2>

                        <div className="bg-primary-white border border-beige-light rounded-3xl divide-y divide-beige-light/30 overflow-hidden">
                            {order.products?.map((item) => {
                                const productImg =
                                    item.product?.images?.[0]?.url ||
                                    "https://via.placeholder.com/150";

                                return (
                                    <div
                                        key={item._id}
                                        className="p-5 flex gap-4 items-center group"
                                    >
                                        {/* Product Image */}
                                        <div className="w-20 h-20 bg-secondary-white rounded-xl overflow-hidden border border-beige-light/40 shrink-0">
                                            <img
                                                src={productImg}
                                                alt={item.name}
                                                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                        </div>

                                        {/* Item Details */}
                                        <div className="grow space-y-0.5">
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-beige-accent block">
                                                {item.brand}
                                            </span>
                                            <h4 className="font-artistic-secondary text-base font-bold text-primary-black leading-tight capitalize">
                                                {item.name}
                                            </h4>
                                            <p className="font-secondary text-xs text-secondary-black">
                                                Size: {item.size || item.product?.size || "N/A"}{" "}
                                                &bull; Qty: {item.quantity}
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right shrink-0 font-secondary text-sm font-semibold text-primary-black">
                                            ₹{Number(item.price).toLocaleString("en-IN")}.00
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Block: Summary & Shipping */}
                    <div className="space-y-6">
                        <h2 className="font-artistic-secondary text-xl font-bold tracking-wide px-1">
                            Order Summary
                        </h2>

                        {/* Shipping & Payment Details */}
                        <div className="bg-primary-white border border-beige-light rounded-3xl p-6 space-y-4 text-xs font-secondary">
                            <div className="space-y-1.5">
                                <h4 className="font-primary font-bold text-sm uppercase text-beige-accent tracking-wider">
                                    Shipping Address
                                </h4>
                                {order.shippingAddress && (
                                    <div className="text-secondary-black leading-relaxed capitalize">
                                        <p className="font-semibold text-primary-black">
                                            {order.shippingAddress.name}
                                        </p>
                                        <p>{order.shippingAddress.address}</p>
                                        <p>
                                            {order.shippingAddress.city},{" "}
                                            {order.shippingAddress.state} -{" "}
                                            {order.shippingAddress.pincode}
                                        </p>
                                        <p className="uppercase">{order.shippingAddress.country}</p>
                                        {order.shippingAddress.phone && (
                                            <p className="normal-case mt-1 text-beige-dark">
                                                Phone: {order.shippingAddress.phone}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <hr className="border-beige-light/30" />

                            <div className="space-y-1.5">
                                <h4 className="font-primary font-bold text-sm uppercase text-beige-accent tracking-wider">
                                    Payment Method
                                </h4>
                                <p className="text-secondary-black uppercase font-mono tracking-wider">
                                    {order.paymentMethod}
                                </p>
                            </div>
                        </div>

                        {/* Cost Breakdown */}
                        <div className="bg-primary-white border border-beige-light rounded-3xl p-6 space-y-3 font-secondary text-xs">
                            <div className="flex justify-between text-secondary-black">
                                <span>Subtotal</span>
                                <span>
                                    ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}.00
                                </span>
                            </div>
                            <div className="flex justify-between text-secondary-black">
                                <span>Shipping</span>
                                <span className="text-green-dark uppercase text-[10px] tracking-wider font-semibold">
                                    Free
                                </span>
                            </div>

                            <hr className="border-beige-light/40 my-1" />

                            <div className="flex justify-between items-baseline text-primary-black">
                                <span className="font-artistic-secondary text-sm font-bold uppercase tracking-wider">
                                    Total
                                </span>
                                <span className="text-lg font-bold font-secondary">
                                    ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}.00
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderDetails;
