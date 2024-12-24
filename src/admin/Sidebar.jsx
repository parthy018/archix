import { Link } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { SiGooglemessages } from "react-icons/si";
import { GoProject } from "react-icons/go";
import { MdOutlineReviews } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const MenuItems = [
  { name: "Dashboard", path: "/admin", icon: <LuLayoutDashboard size={22} /> },
  { name: "Messages", path: "/admin/messages", icon: <SiGooglemessages size={22} /> },
  { name: "Projects", path: "/admin/project", icon: <GoProject size={22}/> },
  { name: "Reviews", path: '/admin/reviews', icon: <MdOutlineReviews size={22}/> }
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
    <div className='flex justify-end max-h-screen overflow-y-hidden '>
    <div className="w-64 bg-[#F8F9FA] p-4">
      <div className='w-full h-full bg-grey-200 '>
        <div className="flex items-center space-x-4 border-b-2 border-gray-300 p-4">
          <img
            src="https://media.licdn.com/dms/image/v2/D560BAQHXhkZ0xbIpCg/company-logo_200_200/company-logo_200_200/0/1727959404888/shiavnski_technologies_llp_logo?e=1739404800&v=beta&t=xqLLTILcEIIZkUFet319WGSyL4FjjKKyQNDjuyPod7I"
            alt="Logo"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <h3 className="text-lg font-bold">Shiavnski</h3>
        </div>
        <nav className='flex flex-col mt-4 '>
          {MenuItems.map((item, index) => (
            <div className='flex items-center space-x-4 py-2' key={index}>
              <Link
                to={item.path}
                className={`text-gray-700 p-2 rounded-lg  w-full
                ${isActive(item.path) ? 'bg-white text-gray-500 font-semibold shadow-xl'
                 : ''} transition-colors duration-200 flex justify-start items-center`}
              >
                <span className={`mr-2 p-2 rounded-md shadow-xl ${isActive(item.path) ?
                   'bg-gradient-to-tr from-[#3b82ed] via-[#797df2] to-[#f95ad5] text-white' : ''}`}>{item.icon}</span>
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
    <div className='h-screen w-[.1rem] bg-gray-600 opacity-5 my-10'>
    </div>
    </div>
     
    </>
   
  );
};

export default Sidebar;
