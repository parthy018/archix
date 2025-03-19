import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { useGetAllProjectQuery } from "../app/authSlice";
import SkeletonCard from "./SkeletonCard";

const Projects = () => {
  const { data: projectsData, isLoading, error } = useGetAllProjectQuery();
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 6;
  const navigate = useNavigate();

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl">Failed to load projects. Please try again.</p>;
  }

  const pageCount = Math.ceil((projectsData?.length || 0) / projectsPerPage);
  const displayedProjects = projectsData?.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  ) || [];

  return (
    <div className="container mx-auto max-w-7xl py-6 px-6">
      <h1 className="text-4xl mt-10 font-bold text-center mb-8 text-gray-800">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {displayedProjects.map((project) => (
          <div
            className="relative mb-6 group overflow-hidden min-h-[400px] rounded-md shadow-md bg-white transition-transform transform hover:scale-105"
            key={project._id}
          >
            <img
              src={project.images[0]}
              alt={project.projectName}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900">{project.projectName}</h3>
              <p className="mt-3 text-gray-600 text-sm">{project.description}</p>
              <button
                onClick={() =>
                  navigate(`/project-detail/${project._id}`, { state: { project } })
                }
                className="mt-5 bg-blue-600 hover:bg-blue-800 text-white py-2 px-5 rounded-lg transition-colors"
              >
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"flex justify-center mt-8 space-x-3"}
        activeClassName={"font-bold text-blue-600"}
        pageClassName={"px-4 py-2 border rounded-lg"}
      />
    </div>
  );
};

export default Projects;
