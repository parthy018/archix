import { useState } from "react";
import { useGetAdminReviewsQuery , useSelectHomeReviewsMutation} from "../../app/feedbackSlice";
import Button from "../../components/Button";
import { toast } from "react-toastify";

const Review = () => {
  const { data: reviews = [], isLoading, isError } = useGetAdminReviewsQuery();
  const [selectHomeReviews, { isLoading: isSelecting }] = useSelectHomeReviewsMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const [selectedReviews, setSelectedReviews] = useState([]);

  // Calculate pagination indexes
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Handle pagination
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Toggle review selection
  const handleCheckboxChange = (reviewId) => {
    setSelectedReviews((prevSelected) =>
      prevSelected.includes(reviewId)
        ? prevSelected.filter((id) => id !== reviewId)
        : [...prevSelected, reviewId]
    );
  };

  // Handle delete button click
  const handleDeleteSelected = () => {
    console.log("Selected review IDs:", selectedReviews);
    // You can implement API call to delete reviews here
  };
  const handleHomeReviews=async()=>{
  if(selectedReviews.length===0) {
    toast.error("Please select reviews to select as home reviews");
    return;
  }
  try {
    await selectHomeReviews(selectedReviews);
    toast.success("Selected reviews as home reviews");
    
  } catch (error) {
    toast.error(error);
    console.log(error);
  }
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg relative">
      <h2 className="text-2xl font-semibold mb-4">Admin Reviews</h2>

      {isLoading && <p>Loading reviews...</p>}
      {isError && <p className="text-red-500">Something went wrong</p>}

      {!isLoading && !isError && reviews.length === 0 && (
        <p>No reviews found</p>
      )}

      {!isLoading && !isError && reviews.length > 0 && (
        <>
          {selectedReviews.length > 0 && (
            <div className="flex justify-end items-center mb-4 gap-4">
            <Button onClick={handleHomeReviews} variant="success" size="sm" disabled={isSelecting}>
                {isSelecting ? "Selecting..." : "Select Home Reviews"}
              </Button>
              <Button onClick={handleDeleteSelected} variant="danger" size="sm">
                Delete Selected ({selectedReviews.length})
              </Button>
            </div>
          )}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedReviews(currentReviews.map((r) => r._id));
                      } else {
                        setSelectedReviews([]);
                      }
                    }}
                    checked={
                      selectedReviews.length === currentReviews.length &&
                      currentReviews.length > 0
                    }
                  />
                </th>
                <th className="border border-gray-300 px-4 py-2">Client</th>
                <th className="border border-gray-300 px-4 py-2">Review</th>
                <th className="border border-gray-300 px-4 py-2">Rating</th>
                <th className="border border-gray-300 px-4 py-2">Selected</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={selectedReviews.includes(review._id)}
                        onChange={() => handleCheckboxChange(review._id)}
                        className="text-blue-600"
                      />
                    </div>
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {review.clientName || "Anonymous"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {review.reviewText}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {review.rating} ⭐
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {review.isSelected ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Floating Delete Button (Appears When Reviews are Selected) */}
        </>
      )}
    </div>
  );
};

export default Review;
