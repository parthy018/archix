import { useState } from "react";
import { ViewIcon, LocationIcon, CalendarIcon } from "../assets/Icons"; // Import icons
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
const ProjectDetail = () => {
  // Dummy data for an architecture firm
  const project = {
    title: "Modern Residential Villa",
    projectID: "PRJ-2023-001",
    client: "John Doe",
    location: "Beverly Hills, California",
    dateCompleted: "March 2023",
    description:
      "A state-of-the-art modern villa designed to maximize natural light and space utilization. This project features cutting-edge sustainable design principles.",
    images: [
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1605146768851-eda79da39897?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1592595896616-c37162298647?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1608429835892-30be51ea4d6c?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
    ],
    features: [
      "4 Bedrooms with En-Suite Bathrooms",
      "Infinity Pool and Patio",
      "Open-Concept Living and Dining Area",
      "Energy-Efficient Solar Panels",
      "Panoramic Glass Walls",
    ],
    tags: ["Residential", "Luxury", "Sustainable", "Modern", "Beachside"],
    testimonials: [
      {
        name: "Alice Smith",
        feedback:
          "This villa exceeded all our expectations! The design is breathtaking.",
      },
      {
        name: "Bob Johnson",
        feedback:
          "Incredible attention to detail and amazing use of space. Truly a masterpiece.",
      },
    ],
  };

  const [mainImage, setMainImage] = useState(project.images[0]);
  const [testimonials, setTestimonials] = useState(project.testimonials);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    feedback: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTestimonial = () => {
    if (newTestimonial.name && newTestimonial.feedback) {
      setTestimonials((prev) => [...prev, newTestimonial]);
      setNewTestimonial({ name: "", feedback: "" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Project Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={mainImage}
              alt={project.title}
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {project.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail`}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">
              Project ID: {project.projectID}
            </p>
            <div className="flex items-center mb-4">
              <LocationIcon />
              <span className="ml-2 text-gray-700">{project.location}</span>
            </div>
            <div className="flex items-center mb-4">
              <CalendarIcon />
              <span className="ml-2 text-gray-700">
                Completed: {project.dateCompleted}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{project.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
              <h2 className="text-2xl font-semibold text-gray-700">Testimonials</h2>

              <div className="flex items-center gap-4">
                {/* Left Navigation Button */}
                <button
                  id="custom-prev"
                  className="group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 transition-all duration-500 rounded-full hover:bg-indigo-600"
                >
                  <FaArrowAltCircleLeft className="h-6 w-6 text-indigo-600 group-hover:text-white" />
                </button>

                {/* Right Navigation Button */}
                <button
                  id="custom-prev"
                  className=" group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 transition-all duration-500 rounded-full hover:bg-indigo-600"
                >
                  <FaArrowAltCircleRight className="h-6 w-6 text-indigo-600 group-hover:text-white" />
                </button>
              </div>
            </div>

            {/* Slider wrapper */}
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: "#custom-next",
                prevEl: "#custom-prev",
              }}
              pagination={{ clickable: true }}
              loop={true}
              slidesPerView={3}
              spaceBetween={28}
              centeredSlides={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  centeredSlides: false,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 28,
                  centeredSlides: true,
                },
                1024: { slidesPerView: 3, spaceBetween: 32 },
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white p-6 rounded-md shadow-md border border-gray-300">
                    <p className="text-lg font-semibold">{testimonial.name}</p>
                    <p className="text-gray-700 mt-2">{testimonial.feedback}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Add Testimonial Form */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Add a Testimonial</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={newTestimonial.name}
              placeholder="Your Name"
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <textarea
              name="feedback"
              value={newTestimonial.feedback}
              placeholder="Your Feedback"
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2"
              rows="3"
            />
            <button
              onClick={handleAddTestimonial}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
