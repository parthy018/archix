import {
  useGetSliderImagesQuery,
} from "../app/authSlice";
import { useDeleteSliderImagesMutation } from "../app/feedbackSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useState } from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg h-48 w-full"></div>
  );
};

const SliderImages = () => {
  const { data: images = [], isLoading, isError } = useGetSliderImagesQuery();
  const [deleteSliderImages, { isLoading: isDeleting }] =
    useDeleteSliderImagesMutation();
  const [selectedImages, setSelectedImages] = useState([]);


  const toggleImageSelection=(id)=>{
    setSelectedImages((prev)=>prev.includes(id)?prev.filter((item)=>item!==id):[...prev,id])
  }
  const handleDelete = async () => {
    if (selectedImages.length === 0) {
      toast.error("No images selected");
      return;
    }
    const ids=selectedImages;
    try {
      await deleteSliderImages(ids).unwrap();
      toast.success("Images deleted successfully!");
      setSelectedImages([]); // Clear selected images after successful deletion
    } catch (error) {
      toast.error(error.data.error);
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
        {isError && <p className="text-red-500">Something went wrong</p>}

        {images &&
          images.map((image) => (
            <div key={image._id} className="relative group">
              <img
                src={image.imageUrl}
                alt="Slider"
                className="w-full h-48 object-cover rounded transition-opacity duration-300 group-hover:opacity-80"
              />
              {/* Cross Icon on Hover */}
              <AiOutlineCloseCircle
                className="absolute top-2 right-2 text-red-600 text-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => toggleImageSelection(image._id)}
              />
            </div>
          ))}
      </div>

      {/* Selected Images Section */}
      {selectedImages.length > 0 && (
        <div className="p-4 border border-gray-300 rounded-md shadow-lg bg-white">
          <h3 className="text-lg font-semibold mb-2">Selected Images</h3>
          <div className="flex gap-4 flex-wrap">
            {images
              .filter((image) => selectedImages.includes(image._id))
              .map((image) => (
                <img
                  key={image._id}
                  src={image.imageUrl}
                  alt="Selected"
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition disabled:bg-gray-400"
          >
            {isDeleting ? "Deleting..." : "Delete Selected"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SliderImages;
