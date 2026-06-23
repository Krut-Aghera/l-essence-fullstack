// import React, { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { verifyPayment } from '../apis/order.api'
// import { useDispatch } from 'react-redux';
// import { clearCartData } from '../features/perfumeSlice';

// const PaymentStatus = () => {

//       const [searchParams] = useSearchParams();
//       const navigate = useNavigate()

//       const [loading, setLoading] = useState(true);
//       const [paymentSuccess, setPaymentSuccess] = useState(false);
//       const [message, setMessage] = useState("");

//       const dispatch = useDispatch()

//       useEffect(() => {
//             window.history.pushState(null, "", window.location.href);

//             const handleBack = () => {
//                   window.location.replace("/");
//             };

//             window.addEventListener("popstate", handleBack);

//             return () => {
//                   window.removeEventListener(
//                         "popstate",
//                         handleBack
//                   );
//             };
//       }, []);


//       useEffect(() => {

//             const verifyUserPayment = async () => {

//                   try {

//                         const orderID =
//                               searchParams.get("order_id");

//                         if (!orderID) {
//                               setPaymentSuccess(false);
//                               setMessage("Order ID not found.");
//                               setLoading(false);
//                               return;
//                         }

//                         const response =
//                               await verifyPayment(orderID);


//                         dispatch(clearCartData())
//                         setPaymentSuccess(true);
//                         setMessage(
//                               response.message ||
//                               "Payment successful."
//                         );


//                         setTimeout(() => {
//                               navigate('/user/orders')
//                         }, 1500)


//                   } catch (error) {

//                         console.log(error)
//                         console.log(error.response)
//                         setPaymentSuccess(false);

//                         setMessage(
//                               error.response?.data?.message ||
//                               "Payment verification failed."
//                         );

//                   } finally {

//                         setLoading(false);
//                   }
//             };

//             verifyUserPayment();

//       }, [searchParams]);

//       return (
//             <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100/50 px-4 py-12 sm:px-6 lg:px-8">
//                   <div className="max-w-md w-full bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 sm:p-10 text-center transition-all duration-300 ease-in-out hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">

//                         {loading ? (
//                               <div className="flex flex-col items-center space-y-6 animate-fade-in">
//                                     {/* Classy Animated Spinner */}
//                                     <div className="relative flex items-center justify-center h-16 w-16">
//                                           <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20"></div>
//                                           <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                           </svg>
//                                     </div>

//                                     <div className="space-y-2">
//                                           <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
//                                                 Verifying Payment
//                                           </h2>
//                                           <p className="text-sm sm:text-base text-slate-500 max-w-xs mx-auto leading-relaxed">
//                                                 Please wait a moment while we safely confirm your transaction details.
//                                           </p>
//                                     </div>
//                               </div>
//                         ) : paymentSuccess ? (
//                               <div className="flex flex-col items-center space-y-6">
//                                     {/* Elegant Success Badge */}
//                                     <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
//                                           <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                                           </svg>
//                                     </div>

//                                     <div className="space-y-2">
//                                           <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
//                                                 Payment Successful
//                                           </h2>
//                                           <p className="text-sm sm:text-base text-slate-500 max-w-xs mx-auto leading-relaxed">
//                                                 {message || "Thank you! Your transaction went through seamlessly."}
//                                           </p>
//                                     </div>

//                               </div>
//                         ) : (
//                               <div className="flex flex-col items-center space-y-6">
//                                     {/* Elegant Error Badge */}
//                                     <div className="flex items-center justify-center h-16 w-16 rounded-full bg-rose-50 border border-rose-100 text-rose-600">
//                                           <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                           </svg>
//                                     </div>

//                                     <div className="space-y-2">
//                                           <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
//                                                 Payment Failed
//                                           </h2>
//                                           <p className="text-sm sm:text-base text-slate-500 max-w-xs mx-auto leading-relaxed">
//                                                 {message || "We couldn't process your payment. Please check your details and try again."}
//                                           </p>
//                                     </div>


//                               </div>
//                         )}

//                   </div>
//             </div>
//       );
// };

// export default PaymentStatus;



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

            const alreadyVerified =
                  sessionStorage.getItem(
                        `payment_verified_${orderID}`
                  );

            if (alreadyVerified) {
                  navigate(`/user/orders/${orderID}`, {
                        replace: true
                  });
                  return;
            }

            //////////////////////////////////////////////////////////
            // Verify Payment
            //////////////////////////////////////////////////////////

            const verifyUserPayment = async () => {

                  try {

                        const response =
                              await verifyPayment(orderID);


                        setMessage(
                              response.message ||
                              "Payment verified successfully."
                        );

                        dispatch(clearCartData());
                        setPaymentSuccess(true);

                        sessionStorage.setItem(
                              `payment_verified_${orderID}`,
                              "true"
                        );

                        setTimeout(() => {

                              navigate(
                                    `/user/orders/${orderID}`,
                                    { replace: true }
                              );

                        }, 2000);

                  } catch (error) {

                        console.error("Payment Verification Error:", error);

                        setPaymentSuccess(false);

                        setMessage(
                              error.response?.data?.message ||
                              "Unable to verify payment."
                        );

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
                                                Please wait while we securely
                                                verify your payment.
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

                                          <p className="mt-3 text-gray-600">
                                                {message}
                                          </p>

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

                                          <h2 className="text-3xl font-bold text-red-600">
                                                Payment Failed
                                          </h2>

                                          <p className="mt-3 text-gray-600">
                                                {message}
                                          </p>

                                          <button
                                                onClick={() =>
                                                      navigate("/user/cart")
                                                }
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