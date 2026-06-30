import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import siteImage from "../assets/brandImage.png";
import {Input, Button} from "../components";
import { resetPassword } from "../apis/auth.api";
import { showErrorToast, showSuccessToast } from "../utils/hotToast";

const ResetPassword = () => {
      const navigate = useNavigate();
      const { resetToken } = useParams();

      const [isSubmitting, setIsSubmitting] = useState(false);

      const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
      } = useForm();

      const newPassword = watch("newPassword");

      const resetPasswordHandler = async (data) => {
            try {
                  setIsSubmitting(true);

                  const response = await resetPassword(
                        resetToken,
                        data.newPassword,
                        data.confirmPassword,
                  );

                  showSuccessToast(
                        response?.message || "Password reset successfully"
                  );

                  navigate("/auth/login");
            } catch (error) {
                  showErrorToast(
                        error?.response?.data?.message ||
                        "Failed to reset password"
                  );
            } finally {
                  setIsSubmitting(false);
            }
      };

      return (
            <div className="h-screen w-screen flex items-center justify-center bg-secondary-white p-4 sm:p-6 md:p-8 overflow-hidden">
                  <div className="w-full max-w-4xl h-[95vh] sm:h-[85vh] max-h-170 grid grid-cols-1 md:grid-cols-2 bg-primary-white rounded-2xl border border-beige-light shadow-md overflow-hidden">

                        {/* Left Panel */}
                        <div className="hidden md:block relative">
                              <img
                                    src={siteImage}
                                    alt="Reset Password"
                                    className="w-full h-full object-cover"
                              />

                              <div className="absolute inset-0 bg-linear-to-t from-primary-black/30 via-transparent to-transparent" />
                        </div>

                        {/* Right Panel */}
                        <form
                              onSubmit={handleSubmit(resetPasswordHandler)}
                              className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center"
                        >
                              <div className="mb-8">
                                    <h2 className="font-primary text-3xl font-bold">
                                          Reset Password
                                    </h2>

                                    <p className="mt-2 text-sm text-secondary-black">
                                          Enter your new password below.
                                    </p>
                              </div>

                              <div className="space-y-5">

                                    {/* New Password */}
                                    <Input
                                          type="password"
                                          label="New Password"
                                          placeholder="ab@12345"
                                          disabled={isSubmitting}
                                          error={
                                                errors.newPassword
                                                      ? errors.newPassword.message
                                                      : null
                                          }
                                          {...register("newPassword", {
                                                required:
                                                      "New password is required",
                                                pattern: {
                                                      value:
                                                            /^[A-Za-z0-9@]{6,8}$/,
                                                      message:
                                                            "Password must contain 6-8 characters and only letters, numbers or @",
                                                },
                                          })}
                                    />

                                    {/* Confirm Password */}
                                    <Input
                                          type="password"
                                          label="Confirm Password"
                                          placeholder="ab@12345"
                                          disabled={isSubmitting}
                                          error={
                                                errors.confirmPassword
                                                      ? errors.confirmPassword.message
                                                      : null
                                          }
                                          {...register("confirmPassword", {
                                                required:
                                                      "Confirm password is required",
                                                validate: (value) =>
                                                      value === newPassword ||
                                                      "Passwords do not match",
                                          })}
                                    />

                                    <Button
                                          type="submit"
                                          child={
                                                isSubmitting
                                                      ? "Updating..."
                                                      : "Update Password"
                                          }
                                          disabled={isSubmitting}
                                          colorSchema={`${isSubmitting
                                                      ? "bg-zinc-500 text-primary-white"
                                                      : "bg-primary-black hover:bg-green-dark text-primary-white"
                                                }`}
                                          className="w-full py-3 rounded-xl font-secondary font-bold text-xs uppercase"
                                    />

                                    <div className="text-center">
                                          <Link
                                                to="/auth/login"
                                                className="text-sm text-beige-dark hover:text-beige-accent underline underline-offset-4"
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

export default ResetPassword;