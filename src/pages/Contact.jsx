import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { useState } from "react";
import { useRequirementsMutation } from "../app/authSlice";
import { toast } from "react-toastify";
import InputField from "../components/Input";
import TextAreaField from "../components/TextArea";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    requirement: "",
  });

  const [error, setError] = useState({});
  const [requirements] = useRequirementsMutation();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim()) errors.name = "Full Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid.";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "phoneNumber Number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "phoneNumber Number must be 10 digits.";
    }

    if (!formData.requirement.trim())
      errors.requirement = "requirement cannot be empty.";

    setError(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all the required fields.");
      return; // Stop execution if validation fails
    }

    // eslint-disable-next-line no-unused-vars
    const { email, ...data } = formData;
    setLoading(true);

    try {
      await requirements(data).unwrap();
      toast.success("Requirement submitted successfully");

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        requirement: "",
      });
    } catch (error) {
      toast.error(error.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h1 className="text-4xl font-bold mb-4 text-slate-700">Contact Us</h1>
        <p className="text-xl text-gray-800">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 shadow-xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 ">
          {/* Contact Information */}
          <div className="bg-[#000000] p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-white">
              Contact Information
            </h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <FiMapPin className="w-6 h-6 text-white flex-shrink-0" />
                <div>
                  <h3 className="font-semibold  text-white">Office Address</h3>
                  <p className="text-white">
                    123 Architecture St, Design City, ST 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FiPhone className="w-6 h-6 text-white flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">phoneNumber</h3>
                  <p className="text-white">+91 93020 26604</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FiMail className="w-6 h-6 text-white flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-white">info@archix.com</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-4 bg-gray-200 h-64 rounded-lg">
              <div className="overflow-hidden rounded-lg lg:col-span-2 h-uato lg:h-auto">
                <iframe
                  width="100%"
                  height="100%"
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.01374200854204!2d75.899400129882!3d22.720067640777202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd32d8c9023d%3A0xece9755366afdcf5!2sTilak%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452018!5e0!3m2!1sen!2sin&zoom=15"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <div>
            <form
              className="space-y-6 max-w-xl mx-auto  bg-white dark:bg-gray-800 py-4 "
              onSubmit={handleSubmit}
            >
            <div className="grid grid-cols-2 gap-4">
              <InputField  label={"Full Name" } name={"name"} value={formData.name} onChange={handleChange} error={error.name} />
              <InputField  label={"Email" } type={"email"} name={"email"} value={formData.email} onChange={handleChange} error={error.email} />
            </div>
              <InputField  label={"Contact Number"} type={"tel"} name={"phoneNumber"} value={formData.phoneNumber} onChange={handleChange} error={error.phoneNumber} />

              <TextAreaField label={"Requirement"} name={"requirement"} value={formData.requirement} onChange={handleChange} error={error.requirement} />
              {/* <div>
                <label
                  htmlFor="requirement"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  requirement
                </label>
                <textarea
                  id="requirement"
                  rows={5}
                  value={formData.requirement}
                  name="requirement"
                  onChange={handleChange}
                  placeholder="Write your requirement here"
                  className="mt-1 block w-full pl-2 rounded-md border-2 shadow-sm focus:outline-none focus:border-blue-500  focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-600 transition-all"
                ></textarea>
                {error.requirement && (
                  <p className="text-sm text-red-500 mt-1">
                    {error.requirement}
                  </p>
                )}
              </div> */}

              <button
                type="submit"
                className="w-full lg:w-1/2 bg-[#000000] text-white py-3 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
                disabled={loading}
              >
                Send requirement
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
