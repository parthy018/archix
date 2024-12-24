  import  { useState } from 'react';

  const FeedbackForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        project:"",
        message: '',
        rating: 0
    })

    const handleChange=(e)=>{
      const {name,value}=e.target;
      setFormData((prevData)=>{
          return {
              ...prevData,
              [name]:value
          }
      })
    }
    const handleRating = (rate) => {
      setFormData((prevData) => ({
        ...prevData,
        rating: rate,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      alert('Feedback submitted!');
      // Optionally, reset form data after submission:
      setFormData({
        name: '',
        email: '',
        message: '',
        rating: 0,
      });
    };

    return (
      <div
        className="w-full min-h-screen p-8 flex items-center justify-center"
      >
        <div className="sm:max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden sm:flex">
          {/* Left Side: Information Section */}
          <div className="hidden sm:flex w-1/2 bg-blue-500 items-center justify-center p-8">
            <div className="text-white space-y-4">
              <h2 className="text-3xl font-bold">We&apos;d Love Your Feedback!</h2>
              <p className="text-lg">
                Share your experience with us! Your feedback helps us improve and
                deliver the best architectural services tailored to your needs.
              </p>
              <p>
                Whether it&apos;s a suggestion, a compliment, or constructive criticism,
                we value your voice in shaping our future.
              </p>
            </div>
          </div>

          {/* Right Side: Feedback Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-1/2 p-8 sm:p-12 space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              Tell us what you think!
            </h3>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name='email'
                className="w-full border-b border-gray-300 p-2 focus:border-blue-500  focus:outline-none"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="project" className="block text-gray-700 font-medium mb-1">
                Select Project
              </label>
              <select
                id="project"
                name="project"
                className="w-full border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                required
                value={formData.project}
                onChange={handleChange}
                placeholder="Select Project"
              >
                <option value="" disabled>Select Project</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 2">Project 2</option>
                <option value="Project 3">Project 3</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                name='message'
                className="w-full border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="Your Feedback"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Rating Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    className={`text-2xl ${
                      star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                    } focus:outline-none`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default FeedbackForm;
