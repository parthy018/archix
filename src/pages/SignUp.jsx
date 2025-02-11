import { useState } from "react";
import { useRegisterMutation } from "../app/authSlice";
import BackgroundImage from "../assets/Login.jpg";
import { signup } from "../app/appSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [register, { isLoading, isError, error: apiError, isSuccess }] = useRegisterMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.fullname.trim()) newErrors.fullname = "Full Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      const result = await register(formData).unwrap();
      alert("Registration successful!");
      setFormData({ fullname: "", email: "", password: "" });
      signup({ role: result.role, token: result.token });
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="w-full m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex justify-center">
            <h2 className="font-semibold text-3xl text-gray-800">ARCHIX</h2>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-1">
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
                {error.fullname && <p className="text-red-500 text-xs mt-1">{error.fullname}</p>}

                <input
                  className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}

                <input
                  className="w-full px-8 py-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}

                <button
                  className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-2">Sign Up</span>
                    </>
                  )}
                </button>

                {isError && (
                  <p className="mt-2 text-sm text-red-500">
                    {apiError?.data?.message || "An error occurred. Please try again."}
                  </p>
                )}
                {isSuccess && <p className="mt-2 text-sm text-green-500">Registration successful!</p>}

                <p className="mt-6 text-xs text-gray-600 text-center">
                  By signing up, you agree to ARCHIX{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
