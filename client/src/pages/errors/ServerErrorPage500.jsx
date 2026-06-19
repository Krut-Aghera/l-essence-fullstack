import { Link } from "react-router-dom";

const ServerErrorPage500 = () => {
      return (
            <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
                  <h1 className="text-8xl md:text-9xl font-bold text-green-dark">
                        500
                  </h1>

                  <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-primary-black">
                        A Temporary Disturbance
                  </h2>

                  <p className="mt-4 max-w-lg text-secondary-black text-lg leading-relaxed">
                        Our perfumers are working behind the scenes.
                        Something unexpected occurred, but we're already restoring the experience.
                  </p>

                  <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-8 py-3 bg-green-dark text-primary-white hover:bg-green-light duration-300 cursor-pointer"
                  >
                        Try Again
                  </button>

                  <Link
                        to="/"
                        className="mt-4 text-beige-dark font-medium hover:text-beige-accent"
                  >
                        Back to Home
                  </Link>
            </section>
      );
};

export default ServerErrorPage500;