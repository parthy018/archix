import { Link } from "react-router-dom";
import { BuildingDesignIcon, RenovationIcon, MasterPlanningIcon } from "../assets/Icons.jsx";

const Service = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white lg:text-4xl">
          Our Architectural Services
        </h1>
        <div className="mt-2 flex justify-center">
          <span className="inline-block w-40 h-1 bg-pink-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 ml-1 bg-pink-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 ml-1 bg-pink-500 rounded-full"></span>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-1/2">
          <img
            className="w-full h-80 object-cover rounded-lg shadow-lg"
            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Architecture"
          />
        </div>

        <div className="mt-8 lg:mt-0 lg:w-1/2">
          <p className="text-gray-600 dark:text-gray-300">
            We offer a wide range of architectural services to bring your vision to life.
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-block rounded bg-pink-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Link
          className="p-6 rounded-xl border border-gray-300 shadow-lg transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          to="#"
        >
          <span className="inline-block p-3 text-pink-500 bg-pink-100 rounded-xl dark:text-white dark:bg-pink-500">
            <BuildingDesignIcon />
          </span>
          <h1 className="mt-4 text-xl font-semibold text-gray-700 capitalize dark:text-white">Building Design</h1>
          <p className="text-gray-500 dark:text-gray-300">
            We specialize in designing modern and functional buildings that meet your unique needs.
          </p>
        </Link>

        <Link
          className="p-6 rounded-xl border border-gray-300 shadow-lg transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          to="#"
        >
          <span className="inline-block p-3 text-pink-500 bg-pink-100 rounded-xl dark:text-white dark:bg-pink-500">
            <RenovationIcon />
          </span>
          <h1 className="mt-4 text-xl font-semibold text-gray-700 capitalize dark:text-white">Renovation & Restoration</h1>
          <p className="text-gray-500 dark:text-gray-300">
            Transform your space with our expert renovation services, preserving history while updating for the future.
          </p>
        </Link>

        <Link
          className="p-6 rounded-xl border border-gray-300 shadow-lg transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          to="#"
        >
          <span className="inline-block p-3 text-pink-500 bg-pink-100 rounded-xl dark:text-white dark:bg-pink-500">
            <MasterPlanningIcon />
          </span>
          <h1 className="mt-4 text-xl font-semibold text-gray-700 capitalize dark:text-white">Master Planning</h1>
          <p className="text-gray-500 dark:text-gray-300">
            Our master planning services ensure thoughtful, long-term development for any project or site.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Service;
