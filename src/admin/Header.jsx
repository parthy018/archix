import { useState } from "react";
import {logout} from "../app/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };                      
  const handleLogout = () => {
    dispatch(logout());                                                                          
    navigate("/");
  }

  return (
    <header className="p-4   mx-4 mt-6">
      {/* Breadcrumb */}                                            
      <div className="flex items-center justify-between">

      <div className="flex items-center space-x-2">
        Dashboard
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="h-full sm:w-48 w-10 flex justify-between items-center">
            <div className="h-full">
              <p className="text-sm">Administrator Name</p>
              <p className="text-xs text-slate-400 text-right">Admin</p>
            </div>
            <button
              onClick={toggleDropdown}
              className="flex items-center"
              aria-label="User Menu"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                alt="User Avatar"
                className="h-10 w-10 rounded-full border-2"
              />
            </button>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-10">
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Profile
              </button>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Settings
              </button>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </header>
  );
}

export default Header;
