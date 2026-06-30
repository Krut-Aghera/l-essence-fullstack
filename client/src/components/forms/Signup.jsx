import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { loginUser, registerUser } from "../../apis/auth.api";
import siteImage from "../../assets/brandImage.png";
import { showErrorToast, showSuccessToast } from "../../utils/hotToast";
import { authstate__login } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const signupHandler = async (data) => {
        setIsSubmitting(true);

        try {
            await registerUser(data.name, data.email, data.phone, data.password);

            showSuccessToast("Registration successful");

            const loggedInResponse = await loginUser(data.email, data.password);

            const user = loggedInResponse?.data?.user;

            dispatch(authstate__login(user));

            showSuccessToast(`Welcome to L'essence ${user.name}`);

            navigate("/");
        } catch (error) {
            console.error("Signup Failed:", error.response?.data?.message || error.message);

            showErrorToast(error.response?.data?.message || "Registration failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-secondary-white p-4 sm:p-6 md:p-8 overflow-hidden">
            {/* 2-Column Split Screen Container */}
            <div className="w-full max-w-4xl h-[95vh] sm:h-[85vh] max-h-180 grid grid-cols-1 md:grid-cols-2 bg-primary-white rounded-2xl border border-beige-light shadow-md overflow-hidden items-stretch">
                {/* LEFT COLUMN: Editorial Branding Image Panel (Hidden on Mobile) */}
                <div className="hidden md:block relative h-full w-full overflow-hidden bg-beige-light">
                    <img
                        src={siteImage}
                        alt="wibsite signup form image"
                        className="w-full h-full object-cover object-center transform hover:scale-105 duration-700 ease-in-out"
                    />
                    {/* Elegant dark overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-primary-black/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* RIGHT COLUMN: Interactive Signup Form Panel */}
                <form
                    onSubmit={handleSubmit(signupHandler)}
                    className="h-full w-full p-6 sm:p-10 lg:p-12 bg-primary-white flex flex-col justify-center overflow-hidden"
                >
                    {/* Header Message Block */}
                    <div className="mb-5 space-y-1 text-center md:text-left shrink-0">
                        <h2 className="font-primary text-2xl lg:text-3xl font-bold tracking-tight text-primary-black">
                            Create an account
                        </h2>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-xs sm:text-sm font-secondary">
                            <span className="text-secondary-black">Already have an account?</span>
                            <Link
                                className="font-medium text-beige-dark hover:text-beige-accent transition-colors duration-300 ease-in-out underline underline-offset-4"
                                to="/auth/login"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>

                    {/* Scrollable Input Field Wrapper Container (Guards against vertical overflow) */}
                    <div className="grow overflow-y-auto pr-1 custom-scrollbar space-y-4 py-1">
                        {/* Input 1: Fullname Field */}
                        <Input
                            type="text"
                            label="Fullname"
                            placeholder="john doe"
                            autocomplete="off"
                            disabled={isSubmitting}
                            error={errors.name ? errors.name.message : null}
                            {...register("name", {
                                required: "Name is required",
                                pattern: {
                                    value: /^[A-Za-z]+(?: [A-Za-z]+){0,2}$/,
                                    message: "Name must contain only letters and up to 3 words",
                                },
                            })}
                        />

                        {/* Input 2: Email Field */}
                        <Input
                            type="text"
                            label="Email"
                            autocomplete="off"
                            placeholder="ex : johndoe@gmail.com"
                            disabled={isSubmitting}
                            error={errors.email ? errors.email.message : null}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: "Enter valid email address",
                                },
                            })}
                        />

                        {/* Input 3: Contact Field */}
                        <Input
                            type="text"
                            label="Contact"
                            placeholder="ex : 9811005522"
                            autocomplete="off"
                            disabled={isSubmitting}
                            error={errors.phone ? errors.phone.message : null}
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Enter a valid 10-digit Indian mobile number",
                                },
                            })}
                        />

                        {/* Input 4: Password Field */}
                        <Input
                            type="password"
                            label="Password"
                            autocomplete="off"
                            placeholder="ab@12345"
                            disabled={isSubmitting}
                            error={errors.password ? errors.password.message : null}
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^[A-Za-z0-9@]{6,8}$/,
                                    message:
                                        "Password must be 6-8 characters and can contain only letters, numbers, and @",
                                },
                            })}
                        />
                    </div>

                    {/* Action Footer Submit Block */}
                    <div className="pt-4 shrink-0 mt-2 border-t border-beige-light/30">
                        <Button
                            type="submit"
                            child="Register"
                            colorSchema={` ${isSubmitting ? "bg-zinc-500 text-primary-white shadow-sm" : "bg-primary-black hover:bg-green-dark text-primary-white shadow-sm"}`}
                            className="w-full py-3 rounded-xl transition-all font-secondary font-bold text-xs tracking-wider uppercase"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
