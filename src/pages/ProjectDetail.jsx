import { useRef, useState } from "react";
import { LocationIcon, CalendarIcon } from "../assets/Icons"; // Import icons
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLocation } from "react-router-dom";

const ProjectDetail = () => {
  const location = useLocation();
  const projectRef = useRef(location.state?.project);
  const project = projectRef.current;

  const [mainImage, setMainImage] = useState(project?.images?.[0] || "");

  if (!project) {
    return <p className="text-center text-red-500 text-xl">No project data available.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10  ">
      <div className="flex flex-col md:flex-row gap-8 my-10 ">
        {/* Left Side - Project Images */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src={mainImage}
              alt={project.title}
              className="w-full object-cover rounded-lg shadow-md transition-all duration-300 ease-in-out 
                         aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/8]"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {project.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-md cursor-pointer 
                          opacity-60 hover:opacity-100 transition duration-300"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Project Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{project.title}</h2>


          {/* Location */}
          <div className="flex items-center space-x-2">
            <LocationIcon />
            <span className="text-gray-700">{project.location}</span>
          </div>

          {/* Completion Date */}
          <div className="flex items-center space-x-2">
            <CalendarIcon />
            <span className="text-gray-700">Completed: {project.dateCompleted}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700">{project.description}</p>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold">Tags:</h3>
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
    </div>
  );
};

export default ProjectDetail;
