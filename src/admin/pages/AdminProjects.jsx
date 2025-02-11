import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { useNavigate,useLocation } from 'react-router-dom';
import { MdPersonAddAlt1 } from 'react-icons/md';
const Projects = () => {
  const navigate=useNavigate();
  const location=useLocation();

  const isRootPath=location.pathname=== "/admin/project";
  const projects = [
    { id: 1, name: 'Project Alpha', status: 'Completed', client: 'Client A', email: 'clientA@example.com', role: 'Admin' },
    { id: 2, name: 'Project Beta', status: 'In Progress', client: 'Client B', email: 'clientB@example.com', role: 'Manager' },
    { id: 3, name: 'Project Gamma', status: 'Pending', client: 'Client C', email: 'clientC@example.com', role: 'Developer' },
  ];

  return (
    <div className="p-4">
     {isRootPath ? 
     (<>
       <div className='flex items-center justify-between'>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <button
              className="bg-transparent flex items-center justify-center border border-sky-500 text-sky-500 font-semibold 
              py-2 px-6  hover:bg-sky-500 hover:text-white transition-colors shadow-sm"
              onClick={()=>navigate('/admin/project/create')}
            >
                  <MdPersonAddAlt1 className="mr-2" size={18} /> Add New
            </button>
      </div>
       <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto mt-3">
          <thead className="bg-gray-50">
            <tr className="bg-gray-800 text-white">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Project Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{project.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{project.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{project.client}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/update-project/${project.id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <FaEdit className="inline-block" /> Edit
                  </Link>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
     </>
     ):(
      <div>
          <Outlet />
      </div>
     )
     }
    </div>
  );
};

export default Projects;
