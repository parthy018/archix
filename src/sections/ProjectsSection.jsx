import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulating API call using axios
    const fetchProjects = async () => {
      try {
        // Replace this with your actual API endpoint
        // const response = await axios.get('API_ENDPOINT');
        const response = {
          data: [
            {
              id: 1,
              image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
              title: "Modern Villa",
              category: "Residential",
            },
            {
              id: 2,
              image:  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
              title: "Corporate Office",
              category: "Commercial",
            },
            {
              id: 3,
              image:   "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
              title: "Eco Home",
              category: "Sustainable",
            },
            {
              id: 4,
              image:   "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
              title: "Luxury Apartment",
              category: "Residential",
            },
          ],
        };
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Projects
          </h2>
          <p className="text-gray-600">
            Discover our most recent architectural achievements
          </p>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm text-blue-600 font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mt-2">{project.title}</h3>
                  <button className="mt-4 flex items-center text-blue-600 hover:text-blue-700">
                    View Project <FiArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectsSection;
