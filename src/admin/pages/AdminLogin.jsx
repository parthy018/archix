import { useState } from "react";
import BackgroundImage from "../../assets/Login.jpg";
import { useAdminloginMutation } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin as adminLoginAction } from "../../app/appSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [adminLogin, { isLoading, error, isSuccess }] = useAdminloginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear specific error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const payload={
      username:formData.email,
      password:formData.password
    }
    try {
      const result = await adminLogin(payload).unwrap(); // Calls the mutation and handles the response
      console.log("Login successful:", result);
      const { token, role } = result;
      dispatch(adminLoginAction({ token, role }));
      navigate("/admin");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="w-full m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${BackgroundImage})`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex justify-center">
            <h2 className="font-semibold text-3xl text-gray-800">ARCHIX</h2>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-1">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign in with your E-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input
                  className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
                <input
                  className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
                <button
                  className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
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
                  <span className="ml-2">
                    {isLoading ? "Signing In..." : "Sign In"}
                  </span>
                </button>
                {error && (
                  <p className="mt-4 text-xs text-red-500 text-center">
                    {error.data?.message || "An error occurred during login."}
                  </p>
                )}
                {isSuccess && (
                  <p className="mt-4 text-xs text-green-500 text-center">
                    Login successful!
                  </p>
                )}
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to ARCHIX{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
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

export default SignIn;
