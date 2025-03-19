import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LazyLoadSection = ({ services, ServiceImage }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = ServiceImage;
    img.onload = () => setIsImageLoaded(true);
  }, [ServiceImage]);

  return (
    <section className="py-20 relative">
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600">
            Comprehensive architectural solutions for every need
          </p>
        </div>

        {/* Grid with Image and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Div - Image */}
          <div className="flex justify-center items-center">
            {isImageLoaded ? (
              <img
                src={ServiceImage}
                alt="Services"
                className="w-full h-full object-cover rounded-lg shadow-lg"
                style={{ height: "100%" }} // Ensure image height matches the right div
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            )}
          </div>

          {/* Right Div - Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl
                hover:shadow-lg transition duration-300 ease-in-out group" 
              >
                <span className="inline-block text-blue-500 dark:text-blue-400">
                  {service.icon}
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  {service.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white 
                  hover:underline hover:text-blue-600 dark:hover:text-blue-500 group-hover:bg-blue-200 dark:group-hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

LazyLoadSection.propTypes = {
  services: PropTypes.array.isRequired,
  ServiceImage: PropTypes.string.isRequired,
};

export default React.memo(LazyLoadSection);