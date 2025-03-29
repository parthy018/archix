import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const {isAuth}=useSelector((state)=>state.app);
  console.log(isAuth);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
    className={`fixed w-full z-50 transition-all duration-300 h-18 ${
      isScrolled ? 'bg-white bg-opacity-90 shadow-lg' : ''
    }`}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <Link
          to="/"
          className={`text-2xl font-bold ${
            isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'
          } transition-colors duration-200`}
        >
          ARCHIX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/about" isActive={location.pathname === '/about'} isScrolled={isScrolled} isHomePage={isHomePage}>
            About
          </NavLink>
          <NavLink to="/projects" isActive={location.pathname === '/projects'} isScrolled={isScrolled} isHomePage={isHomePage}>
            Our Projects
          </NavLink>
          <NavLink to="/contact" isActive={location.pathname === '/contact'} isScrolled={isScrolled} isHomePage={isHomePage}>
            Contact Us
          </NavLink>
         {!isAuth && <NavLink to="/login" isActive={location.pathname === '/login'} isScrolled={isScrolled} isHomePage={isHomePage}>
            Login 
          </NavLink>}
        {!isAuth &&   <NavLink to="/signup" isActive={location.pathname === '/signup'} isScrolled={isScrolled} isHomePage={isHomePage}>
            Sign Up
          </NavLink>}
         {isAuth && <NavLink to="/login" isActive={location.pathname === '/login'} isScrolled={isScrolled} isHomePage={isHomePage}>
          logout
          </NavLink>}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'
            } transition-colors duration-200 `}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-md shadow-lg">
            <MobileNavLink to="/about" setIsOpen={setIsOpen} isActive={location.pathname === '/about'}>
              About
            </MobileNavLink>
            <MobileNavLink to="/projects" setIsOpen={setIsOpen} isActive={location.pathname === '/projects'}>
              Our Projects
            </MobileNavLink>
            <MobileNavLink to="/contact" setIsOpen={setIsOpen} isActive={location.pathname === '/contact'}>
              Contact Us
            </MobileNavLink>
          </div>
        </div>
      )}
    </div>
  </nav>
  );
};

const NavLink = ({ to, children, isScrolled, isHomePage, isActive }) => (
  <Link
    to={to}
    className={`font-medium transition-colors duration-200 ${
      isScrolled || !isHomePage
        ? 'text-gray-800'
        : 'text-white'
    } ${
      isActive ? 'border-b-2 border-blue-500 pb-1' : ''
    }`}
  >
    {children}
  </Link>
);
NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isScrolled: PropTypes.bool,
  isHomePage: PropTypes.bool,
  isActive: PropTypes.bool,
};


const MobileNavLink = ({ to, children, setIsOpen, isActive }) => (
  <Link
    to={to}
    className={`block px-3 py-2 text-base font-medium ${
      isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-800'
    } hover:text-gray-600 hover:bg-gray-100 rounded-md`}
    onClick={() => setIsOpen(false)}
  >
    {children}
  </Link>
);

MobileNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default Navbar;
