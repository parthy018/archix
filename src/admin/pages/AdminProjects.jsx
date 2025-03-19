import { Link, Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { useGetAllProjectQuery } from '../../app/authSlice';
import TableSkeleton from '../TableSkeleton';

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPath = location.pathname === '/admin/project';
  
  const { data, error, isLoading } = useGetAllProjectQuery();
  
  if(isLoading) {
    return <TableSkeleton />
  }
  return (
    <div className="p-4">
      {isRootPath ? (
        <>
          <div className='flex items-center justify-between'>
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <button
              className="bg-transparent flex items-center justify-center border border-sky-500 text-sky-500 font-semibold 
              py-2 px-6  hover:bg-sky-500 hover:text-white transition-colors shadow-sm"
              onClick={() => navigate('/admin/project/create')}
            >
              <MdPersonAddAlt1 className="mr-2" size={18} /> Add New
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto mt-3">
              <thead className="bg-gray-50">
                <tr className="bg-gray-800 text-white">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              {error && (
                <p>An error occurred while fetching projects: {error}</p>
              )}
              <tbody className="bg-white divide-y divide-gray-200">
                  {data?.map((project, index) => (
                    <tr key={project._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{project.projectName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{project.clientName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button   className='bg-sky-100 px-2 py-1 rounded-sm text-sky-600 hover:text-sky-900 mr-2'
                          onClick={() => navigate(`/admin/project/${project._id}`, {state: {project}})} >
                          Edit
                        </button>
                        <button className="bg-red-100 px-2 py-1 rounded-sm text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Projects;
