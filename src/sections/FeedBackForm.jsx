/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSubmitReviewMutation } from '../app/feedbackSlice';
import { useSelector } from 'react-redux';
import LoginModal from '../components/LoginModal';
import InputField from '../components/Input';
import SelectField from '../components/Select';
import TextAreaField from '../components/TextArea';
import feedback from '../assets/feedback.svg';
const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    message: '',
    rating: 0,
  });
  const { isAuth } = useSelector((state) => state.app);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitReview, { isLoading }] = useSubmitReviewMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRating = (rate) => {
    setFormData((prevData) => ({ ...prevData, rating: rate }));
  };

  const createPayload = (data) => ({
    clientName: data.name,
    reviewText: data.message,
    rating: data.rating,
    ...(data.project && { project: data.project }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth) return setIsModalOpen(true);

    try {
      await submitReview(createPayload(formData)).unwrap();
      setFormData({ name: '', project: '', message: '', rating: 0 });
      alert('Review Submitted Successfully');
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen p-8 flex items-center justify-center">
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="sm:max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden sm:flex">
        <aside className="hidden sm:flex w-1/2 flex-col bg-white items-center justify-center p-8 ">
        <div className='space-y-4'>
              <img  src={feedback} alt="Feedback" className="w-full h-[20rem] object-cover " />
          </div>
          <div className="space-y-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold">We&apos;d Love Your Feedback!</h2>
            <p className="text-lg">Your feedback helps us improve and provide the best services.</p>
          </div>
        </aside>
        <form onSubmit={handleSubmit} className="w-full sm:w-1/2 p-8 sm:p-12 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">Tell us what you think!</h3>
          <InputField label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <SelectField label="Select Project" name="project" value={formData.project} onChange={handleChange} />
          <TextAreaField label="Message" name="message" value={formData.message} onChange={handleChange} required />
          <RatingField rating={formData.rating} onRate={handleRating} />
          <SubmitButton isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

const RatingField = ({ rating, onRate }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">Rating</label>
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(star)}
          className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none`}
        >
          ★
        </button>
      ))}
    </div>
  </div>
);

const SubmitButton = ({ isLoading }) => (
  <button
    type="submit"
    className="w-full bg-[#000000] text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-blue-300"
    disabled={isLoading}
  >
    {isLoading ? 'Submitting...' : 'Submit Feedback'}
  </button>
);

export default FeedbackForm;
