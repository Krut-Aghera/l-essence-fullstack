import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Input from '../Input'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { authstate__login } from '../../features/authSlice'
import { loginUser } from '../../apis/auth.api'
import siteImage from '../../assets/brandImage.png'
import { showCustomToast, showSuccessToast } from '../../utils/hotToast'

const Login = () => {

      const navigate = useNavigate()
      const location = useLocation()
      const dispatch = useDispatch()

      const from = location.state?.from?.pathname || '/'

      const { register, handleSubmit, control, formState: { errors } } = useForm()
      const [isSubmitting, setIsSubmitting] = useState(false)

      const loginHandler = async (data) => {
            setIsSubmitting(true)
            showCustomToast("Trying to log in", "Hold a second 😊")
            try {
                  const response = await loginUser(
                        data.identifier,
                        data.password
                  );

                  const user = response?.data?.user

                  dispatch(authstate__login(user))
                  showSuccessToast("Login successfull ✅")

                  navigate(from, { replace: true })
            } catch (error) {
                  console.error(
                        "Login Failed:",
                        error.response?.data?.message || error.message
                  )
            } finally {
                  setIsSubmitting(false)
            }
      }

      return (

            <div className="h-screen w-screen flex items-center justify-center bg-secondary-white p-4 sm:p-6 md:p-8 overflow-hidden">

                  {/* 2-Column Split Screen Container */}
                  <div className="w-full max-w-4xl h-[95vh] sm:h-[85vh] max-h-170 grid grid-cols-1 md:grid-cols-2 bg-primary-white rounded-2xl border border-beige-light shadow-md overflow-hidden items-stretch">

                        {/* LEFT COLUMN: Editorial Branding Image Panel (Hidden on Mobile) */}
                        <div className="hidden md:block relative h-full w-full overflow-hidden bg-beige-light">
                              <img
                                    src={siteImage}
                                    alt="wibsite login form image"
                                    className="w-full h-full object-cover object-center transform hover:scale-105 duration-700 ease-in-out"
                              />
                              {/* Subtle elegant overlay scrim */}
                              <div className="absolute inset-0 bg-linear-to-t from-primary-black/30 via-transparent to-transparent pointer-events-none" />

                              {/* Floating artistic logo branding water mark */}
                              <div className="absolute bottom-6 left-6 text-primary-white font-artistic-secondary text-xl tracking-widest opacity-90">
                                    AURA<span className="text-green-light">.</span>
                              </div>
                        </div>

                        {/* RIGHT COLUMN: Interactive Login Handling Panel */}
                        <form
                              onSubmit={handleSubmit(loginHandler)}
                              className="h-full w-full p-6 sm:p-10 lg:p-12 bg-primary-white flex flex-col justify-center overflow-y-auto custom-scrollbar"
                        >
                              {/* Header Message Block */}
                              <div className="mb-6 space-y-1 text-center md:text-left">
                                    <h2 className="font-primary text-2xl lg:text-3xl font-bold tracking-tight text-primary-black">
                                          Welcome back
                                    </h2>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-xs sm:text-sm font-secondary">
                                          <span className="text-secondary-black">Don't have an account?</span>
                                          <Link
                                                className="font-medium text-beige-dark hover:text-beige-accent transition-colors duration-300 ease-in-out underline underline-offset-4"
                                                to="/auth/signup"
                                          >
                                                Register here
                                          </Link>
                                    </div>
                              </div>

                              {/* Form Action Field Element Wrapper Container */}
                              <div className="w-full flex flex-col gap-4">

                                    {/* Input Element: Identifier Field */}
                                    <Input
                                          type="text"
                                          label="Email Or Phone"
                                          autocomplete="off"
                                          disabled={isSubmitting}
                                          placeholder="john@example.com or 9876543210"
                                          error={errors.identifier ? errors.identifier.message : null}
                                          {...register("identifier", {
                                                required: "Email or Phone number is required",
                                                pattern: {
                                                      value: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}|(?:\+91)?[6-9]\d{9})$/,
                                                      message: "Invalid credential"
                                                }
                                          })}
                                    />

                                    {/* Input Element: Password Field */}
                                    <div className="space-y-1">
                                          <Input
                                                type="password"
                                                label="Password"
                                                disabled={isSubmitting}
                                                autocomplete="off"
                                                placeholder="ab@12345"
                                                error={errors.password ? errors.password.message : null}
                                                {...register("password", {
                                                      required: "Password is required",
                                                      pattern: {
                                                            value: /^[A-Za-z0-9@]{6,8}$/,
                                                            message: "Invalid credential"
                                                      }
                                                })}
                                          />

                                          {/* Lost Pass Control Anchor Link */}
                                          <div className="flex justify-end pt-0.5">
                                                <Link
                                                      to="/auth/pass/forgot"
                                                      className="text-beige-dark hover:text-beige-accent font-secondary text-xs font-medium cursor-pointer transition-colors duration-300 ease-in-out"
                                                >
                                                      Forgot password?
                                                </Link>
                                          </div>
                                    </div>

                                    {/* Core Action Submit Trigger */}
                                    <div className="pt-4 mt-2">
                                          <Button
                                                type="submit"
                                                child="Log in"
                                                colorSchema={`${isSubmitting ? 'bg-zinc-500 text-primary-white shadow-sm' : 'bg-primary-black hover:bg-green-dark text-primary-white shadow-sm'}`}
                                                className="w-full py-3 rounded-xl transition-all font-secondary font-bold text-xs tracking-wider uppercase"
                                                disabled={isSubmitting}
                                          />
                                    </div>

                              </div>

                              {
                                    isSubmitting &&
                                    <div className='h-full w-full absolute z-40 t-0 l-0 bg-black/20 flex justify-center items-center text-beige-dark font-primary font-semibold'>
                                          Loading... ⏳
                                    </div>
                              }

                        </form>

                  </div>
            </div>
      )
}

export default Login