import { Link } from "react-router-dom";

const UnauthorizedPage403 = () => {
      return (
            <section className="min-h-screen flex justify-center items-center px-4 sm:px-6">

                  <div className="w-full max-w-md sm:max-w-lg xl:max-w-xl border border-beige-light p-6 sm:p-8 md:p-12 text-center">

                        <h1 className="font-bold text-green-dark text-5xl sm:text-6xl md:text-7xl">
                              403
                        </h1>

                        <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-primary-black">
                              Access Restricted
                        </h2>

                        <p className="mt-4 text-sm sm:text-base md:text-lg text-secondary-black leading-relaxed">
                              This collection is reserved for authorized guests.
                              You don't currently have permission to view this page.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                              <Link
                                    to="/"
                                    className="px-6 py-3 bg-beige-dark text-primary-white hover:bg-beige-accent duration-300"
                              >
                                    Go Home
                              </Link>

                              <Link
                                    to="/auth/login"
                                    className="px-6 py-3 border border-green-dark text-green-dark hover:bg-green-dark hover:text-primary-white duration-300"
                              >
                                    Sign In
                              </Link>

                        </div>

                  </div>

            </section>
      );
};

export default UnauthorizedPage403;