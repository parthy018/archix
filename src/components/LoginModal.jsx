import PropTypes from "prop-types";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { useLoginMutation } from "../app/authSlice";
import { useDispatch } from "react-redux";
import { login } from "../app/appSlice";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [loginUser, { isLoading }] = useLoginMutation();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate user input
  const validateData = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateData()) return; // Prevent submission if validation fails
    setError({}); // Reset errors

    try {
      const result = await loginUser(formData).unwrap(); // Unwrap handles errors properly
      dispatch(login(result)); // Dispatch login action if successful
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Login failed:", err);
      setError({
        api: err.data?.message || "Login failed. Please try again.",
      });
    }
  };

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50 backdrop-blur-sm">
      <div className="relative mx-auto px-6 max-w-lg">
        <button className="absolute -top-4 -right-2" onClick={onClose}>
          <IoMdClose className="w-6 h-6 text-gray-600 dark:text-white" />
        </button>
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl">
          <div className="p-8">
            <div className="text-center space-y-4">
              <img
                src="https://www.svgrepo.com/show/448248/slack.svg"
                loading="lazy"
                className="w-12 mx-auto"
                alt="WebMasterTools logo"
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Sign in to access <br /> all the content.
              </h2>
            </div>
            <div className="mt-8 space-y-4">
              {/* Email Input */}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                className="block w-full px-4 py-3 border border-gray-300 rounded-full hover:border-blue-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {error?.email && <p className="text-red-500 text-xs">{error.email}</p>}

              {/* Password Input */}
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                className="block w-full px-4 py-3 border border-gray-300 rounded-full hover:border-blue-500
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {error?.password && <p className="text-red-500 text-xs">{error.password}</p>}

              {/* API Error Message */}
              {error?.api && <p className="text-red-500 text-xs">{error.api}</p>}

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`group w-full h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-500
                  focus:bg-blue-50 active:bg-blue-100 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center justify-center space-x-4">
                  {isLoading ? (
                    <span className="animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-5 h-5"></span>
                  ) : (
                    <span className="font-semibold text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600">
                      Login
                    </span>
                  )}
                </div>
              </button>

              {/* Google Login Button */}
              <button className="group w-full h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-500 focus:bg-blue-50 active:bg-blue-100">
                <div className="flex items-center justify-center space-x-4">
                  <FcGoogle className="w-6 h-6" />
                  <span className="font-semibold text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600">
                    Continue with Google
                  </span>
                </div>
              </button>
            </div>

            <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
              <p className="text-xs">
                By proceeding, you agree to our{" "}
                <a href="/terms-of-service/" className="underline text-blue-600">
                  Terms of Service
                </a>{" "}
                and confirm you have read our{" "}
                <a href="/privacy-policy/" className="underline text-blue-600">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
