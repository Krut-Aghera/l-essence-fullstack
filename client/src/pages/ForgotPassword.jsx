import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import siteImage from "../assets/brandImage.png";
import { Button, Input } from "../components";
import { requestPasswordReset } from "../apis/auth.api";
import { showErrorToast } from "../utils/hotToast";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const forgotPasswordHandler = async (data) => {
        setIsSubmitting(true);

        try {
            await requestPasswordReset(data.email);

            navigate("/auth/pass/forgot/sent", {
                state: {
                    email: data.email,
                },
            });
        } catch (error) {
            showErrorToast(error?.response?.data?.message || "Failed to send password reset link");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-secondary-white p-4 sm:p-6 md:p-8 overflow-hidden">
            <div className="w-full max-w-4xl h-[95vh] sm:h-[85vh] max-h-170 grid grid-cols-1 md:grid-cols-2 bg-primary-white rounded-2xl border border-beige-light shadow-md overflow-hidden items-stretch">
                {/* Left Panel */}
                <div className="hidden md:block relative h-full w-full overflow-hidden bg-beige-light">
                    <img
                        src={siteImage}
                        alt="Forgot password"
                        className="w-full h-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-primary-black/30 via-transparent to-transparent" />
                </div>

                {/* Right Panel */}
                <form
                    onSubmit={handleSubmit(forgotPasswordHandler)}
                    className="h-full w-full p-6 sm:p-10 lg:p-12 bg-primary-white flex flex-col justify-center overflow-y-auto custom-scrollbar"
                >
                    {/* Header */}
                    <div className="mb-8 space-y-2 text-center md:text-left">
                        <h2 className="font-primary text-2xl lg:text-3xl font-bold tracking-tight text-primary-black">
                            Forgot Password?
                        </h2>

                        <p className="font-secondary text-sm text-secondary-black leading-relaxed">
                            Enter the email address associated with your account and we'll send you
                            a link to reset your password.
                        </p>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-6">
                        <Input
                            type="email"
                            label="Email Address"
                            autocomplete="off"
                            disabled={isSubmitting}
                            placeholder="john@example.com"
                            error={errors.email ? errors.email.message : null}
                            {...register("email", {
                                required: "Email address is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Please enter a valid email address",
                                },
                            })}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            child={isSubmitting ? "Sending..." : "Send Reset Link"}
                            colorSchema={`${
                                isSubmitting
                                    ? "bg-zinc-500 text-primary-white shadow-sm"
                                    : "bg-primary-black hover:bg-green-dark text-primary-white shadow-sm"
                            }`}
                            className="w-full py-3 rounded-xl transition-all font-secondary font-bold text-xs tracking-wider uppercase"
                            disabled={isSubmitting}
                        />

                        {/* Back to Login */}
                        <div className="text-center">
                            <Link
                                to="/auth/login"
                                className="text-sm font-secondary text-beige-dark hover:text-beige-accent underline underline-offset-4 transition-colors duration-300"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
