import  React,{ useState, useEffect } from "react";
import PropTypes from "prop-types";
const LazyLoadSection = ({ services, ServiceImage }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = ServiceImage;
    img.onload = () => setIsImageLoaded(true);
  }, [ServiceImage]);

  return (
    <section
      className="py-20 relative"
      style={{
        backgroundImage: isImageLoaded
          ? `url(${ServiceImage})`
          : "linear-gradient(to right, #e3e3e3, #cfcfcf)", // Placeholder while loading
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Adds a semi-transparent overlay
          backdropFilter: "blur(5px)", // Adds blur effect
        }}
      ></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600">
            Comprehensive architectural solutions for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
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
