import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { useState } from "react";
import contactus from "../assets/contactus.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState({});

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

    if (!formData.phone.trim()) {
      errors.phone = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone Number must be 10 digits.";
    }

    if (!formData.message.trim()) errors.message = "Message cannot be empty.";

    setError(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      alert("Message sent successfully!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setError({});
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div
        className="bg-gray-900 text-white py-20 relative"
        style={{
          backgroundImage: `url(${contactus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Adds a semi-transparent overlay
            backdropFilter: "blur(1px)", // Adds blur effect
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl font-bold mb-4 text-slate-700">Contact Us</h1>
          <p className="text-xl text-gray-800">
            Let&apos;s discuss your next project
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Get in Touch</h2>
            <form
              className="space-y-6 max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Enter your full name"
                  className="mt-1 block w-full pl-2 rounded-md h-10 border-2 shadow-sm focus:outline-none focus:border-blue-500  focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-600 transition-all"
                />
                {error.name && (
                  <p className="text-sm text-red-500 mt-1">{error.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Enter your email address"
                  className="mt-1 block w-full pl-2 rounded-md h-10 border-2 shadow-sm focus:outline-none focus:border-blue-500  focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-600 transition-all"
                />
                {error.email && (
                  <p className="text-sm text-red-500 mt-1">{error.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="mt-1 block w-full pl-2 rounded-md h-10 border-2 shadow-sm focus:outline-none focus:border-blue-500  focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-600 transition-all"
                />
                {error.phone && (
                  <p className="text-sm text-red-500 mt-1">{error.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  name="message"
                  onChange={handleChange}
                  placeholder="Write your message here"
                  className="mt-1 block w-full pl-2 rounded-md border-2 shadow-sm focus:outline-none focus:border-blue-500  focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-600 transition-all"
                ></textarea>
                {error.message && (
                  <p className="text-sm text-red-500 mt-1">{error.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <FiMapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Office Address</h3>
                  <p className="text-gray-600">
                    123 Architecture St, Design City, ST 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FiPhone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FiMail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@archix.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FiClock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 bg-gray-200 h-64 rounded-lg">
              {/* Add your map integration here */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Map Integration
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
