import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { verifyPayment } from "../apis/order.api";
import { clearCartData } from "../features/perfumeSlice";

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const orderID = searchParams.get("order_id");

        //////////////////////////////////////////////////////////
        // Invalid URL
        //////////////////////////////////////////////////////////

        if (!orderID) {
            setPaymentSuccess(false);
            setMessage("Invalid payment request.");
            setLoading(false);

            setTimeout(() => {
                navigate("/", { replace: true });
            }, 2500);

            return;
        }

        //////////////////////////////////////////////////////////
        // Already verified earlier
        //////////////////////////////////////////////////////////

        const alreadyVerified = sessionStorage.getItem(`payment_verified_${orderID}`);

        if (alreadyVerified) {
            navigate(`/user/orders/${orderID}`, {
                replace: true,
            });
            return;
        }

        //////////////////////////////////////////////////////////
        // Verify Payment
        //////////////////////////////////////////////////////////

        const verifyUserPayment = async () => {
            try {
                const response = await verifyPayment(orderID);

                setMessage(response.message || "Payment verified successfully.");

                dispatch(clearCartData());
                setPaymentSuccess(true);

                sessionStorage.setItem(`payment_verified_${orderID}`, "true");

                setTimeout(() => {
                    navigate(`/user/orders/${orderID}`, { replace: true });
                }, 2000);
            } catch (error) {
                console.error("Payment Verification Error:", error);

                setPaymentSuccess(false);

                setMessage(error.response?.data?.message || "Unable to verify payment.");
            } finally {
                setLoading(false);
            }
        };

        verifyUserPayment();
    }, [searchParams, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
                {loading ? (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="h-14 w-14 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Verifying Payment
                            </h2>

                            <p className="mt-3 text-gray-500">
                                Please wait while we securely verify your payment.
                            </p>
                        </div>
                    </div>
                ) : paymentSuccess ? (
                    <div className="space-y-6">
                        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                                className="h-8 w-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-green-700">
                                Payment Successful
                            </h2>

                            <p className="mt-3 text-gray-600">{message}</p>

                            <p className="mt-4 text-sm text-gray-400">
                                Redirecting to your order...
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                            <svg
                                className="h-8 w-8 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-red-600">Payment Failed</h2>

                            <p className="mt-3 text-gray-600">{message}</p>

                            <button
                                onClick={() => navigate("/user/cart")}
                                className="mt-6 px-6 py-3 rounded-xl bg-black text-white hover:opacity-90 transition"
                            >
                                Return to Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentStatus;
