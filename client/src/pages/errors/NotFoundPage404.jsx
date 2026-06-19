import { Link } from "react-router-dom";

const NotFoundPage404 = () => {
      return (
            <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 text-center bg-primary-white">

                  <h1 className="font-primary font-bold text-beige-dark text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                        404
                  </h1>

                  <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-primary-black">
                        Fragrance Not Found
                  </h2>

                  <p className="mt-4 max-w-md sm:max-w-lg xl:max-w-xl text-sm sm:text-base md:text-lg text-secondary-black leading-relaxed">
                        The scent you're searching for seems to have faded into the air.
                        The page may have been moved, removed, or never existed.
                  </p>

                  <Link
                        to="/"
                        className="mt-8 px-6 sm:px-8 py-3 bg-beige-dark text-primary-white hover:bg-beige-accent duration-300"
                  >
                        Return Home
                  </Link>

            </section>
      );
};

export default NotFoundPage404;