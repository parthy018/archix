import { useEffect, useState } from "react";
import { useGetReviewQuery } from "../app/authSlice";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { data, isError, isLoading } = useGetReviewQuery();

  useEffect(() => {
    if (data) {
      setTestimonials(data);
    }
  }, [data, isError, isLoading]);

  const getRandomAvatar = (id) => `https://randomuser.me/api/portraits/men/${id % 99}.jpg`;

  const renderRating = (rating) => "⭐️".repeat(rating);

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl animate-pulse">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="text-gray-600 dark:text-gray-300 pt-8 my-5 mb-5 bg-white dark:bg-gray-900" id="reviews">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-10 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            We have some Client.
          </h2>
        </div>

        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            : testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl"
                >
                  <div className="flex gap-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={getRandomAvatar(index)}
                      alt="user avatar"
                      width="400"
                      height="400"
                      loading="lazy"
                    />
                    <div>
                      <h6 className="text-lg font-medium text-gray-700 dark:text-white">
                        {testimonial.clientName || "Anonymous"}
                      </h6>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {testimonial?.role || "Viewer"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {renderRating(testimonial.rating)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-8">{testimonial.reviewText}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
