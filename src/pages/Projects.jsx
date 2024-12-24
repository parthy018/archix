import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const projectsData = [
  {
    id: 1,
    name: "Modern Office Building",
    description:
      "A modern, sustainable office building with cutting-edge design and energy-efficient features.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVhbCUyMHN0YXRlfGVufDB8fDB8fHww",
    location: "New York, USA",
    year: 2023,
    tags: ["Commercial", "Modern", "Sustainability"],
    url: "https://example.com/projects/modern-office-building",
  },
  {
    id: 2,
    name: "Urban Residential Complex",
    description:
      "A residential complex that combines urban living with green spaces and modern amenities.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMHN0YXRlfGVufDB8fDB8fHww",
    location: "Los Angeles, USA",
    year: 2022,
    tags: ["Residential", "Urban", "Green Spaces"],
    url: "https://example.com/projects/urban-residential-complex",
  },
  {
    id: 3,
    name: "Contemporary Art Museum",
    description:
      "A new art museum designed with open spaces and natural lighting, offering a rich cultural experience.",
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    location: "Paris, France",
    year: 2021,
    tags: ["Cultural", "Museum", "Contemporary"],
    url: "https://example.com/projects/contemporary-art-museum",
  },
  {
    id: 4,
    name: "Eco-Friendly Skyscraper",
    description:
      "An eco-friendly skyscraper with green technologies and rooftop gardens.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    location: "London, UK",
    year: 2024,
    tags: ["Commercial", "Skyscraper", "Sustainability"],
    url: "https://example.com/projects/eco-friendly-skyscraper",
  },
  {
    id: 5,
    name: "Futuristic Sports Arena",
    description:
      "A futuristic arena with advanced design and high-tech facilities.",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    location: "Tokyo, Japan",
    year: 2023,
    tags: ["Sports", "Futuristic", "Arena"],
    url: "https://example.com/projects/futuristic-sports-arena",
  },
  {
    id: 6,
    name: "Luxury Beachside Resort",
    description:
      "A luxurious beachside resort offering stunning views and world-class amenities.",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    location: "Malibu, USA",
    year: 2022,
    tags: ["Resort", "Luxury", "Beachside"],
    url: "https://example.com/projects/luxury-beachside-resort",
  },
  {
    id: 7,
    name: "Smart City Hub",
    description:
      "A central hub for smart city technologies and urban innovation.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    location: "Singapore",
    year: 2024,
    tags: ["Smart City", "Technology", "Innovation"],
    url: "https://example.com/projects/smart-city-hub",
  },
  {
    id: 8,
    name: "Smart City Hub",
    description:
      "A central hub for smart city technologies and urban innovation.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    location: "Singapore",
    year: 2024,
    tags: ["Smart City", "Technology", "Innovation"],
    url: "https://example.com/projects/smart-city-hub",
  },
  {
    id: 9,
    name: "Smart City Hub",
    description:
      "A central hub for smart city technologies and urban innovation.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    location: "Singapore",
    year: 2024,
    tags: ["Smart City", "Technology", "Innovation"],
    url: "https://example.com/projects/smart-city-hub",
  },

  {
    id: 10,
    name: "Smart City Hub",
    description:
      "A central hub for smart city technologies and urban innovation.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    location: "Singapore",
    year: 2024,
    tags: ["Smart City", "Technology", "Innovation"],
    url: "https://example.com/projects/smart-city-hub",
  },
  {
    id: 11,
    name: "Smart City Hub",
    description:
      "A central hub for smart city technologies and urban innovation.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    location: "Singapore",
    year: 2024,
    tags: ["Smart City", "Technology", "Innovation"],
    url: "https://example.com/projects/smart-city-hub",
  },

];

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 6; // Number of projects per page
  const pageCount = Math.ceil(projectsData.length / projectsPerPage);
  const navigate=useNavigate();
  const displayedProjects = projectsData.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
 

  return (
    <div className="container mx-auto p-6"> {/* Adjust spacing using mt-* */}
      <h1 className="text-3xl mt-10 font-bold text-center mb-6 text-gray-700">Projects</h1>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
        {displayedProjects.map((project) => (
          <div
            className="relative mb-4 break-inside-avoid group overflow-hidden rounded-lg shadow-lg"
            key={project.id}
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="mt-2 text-sm">{project.description}</p>
              <p className="mt-2 text-xs">{project.location}</p>
              <Link to={`/projects/${project.id}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              View Project
              </Link>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"flex justify-center mt-6 space-x-2"}
        activeClassName={"font-bold text-blue-500"}
        pageClassName={"px-3 py-1 border rounded"}
      />
    </div>

  
      
  );
};

export default Projects;

