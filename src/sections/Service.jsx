import { Link } from "react-router-dom";
import { BuildingDesignIcon, RenovationIcon, MasterPlanningIcon } from "../assets/Icons.jsx"; 

const Service = () => {
  return (
    <>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Our Architectural Services</h2>
            <p className="mt-4 text-gray-300">
              We offer a wide range of architectural services to bring your vision to life.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Link
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              to="#"
            >
              <BuildingDesignIcon />
              <h2 className="mt-4 text-xl font-bold text-white">Building Design</h2>
              <p className="mt-1 text-sm text-gray-300">
                We specialize in designing modern and functional buildings that meet your unique needs.
              </p>
            </Link>

            <Link
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              to="#"
            >
              <RenovationIcon />
              <h2 className="mt-4 text-xl font-bold text-white">Renovation & Restoration</h2>
              <p className="mt-1 text-sm text-gray-300">
                Transform your space with our expert renovation services, preserving history while updating for the future.
              </p>
            </Link>

            <Link
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              to="#"
            >
              <MasterPlanningIcon />
              <h2 className="mt-4 text-xl font-bold text-white">Master Planning</h2>
              <p className="mt-1 text-sm text-gray-300">
                Our master planning services ensure thoughtful, long-term development for any project or site.
              </p>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
