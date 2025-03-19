
import { useForm, useFieldArray } from "react-hook-form";
import {useCreateProjectMutation} from "../../app/feedbackSlice.js";
import { toast } from "react-toastify";
import Button from "../../components/Button.jsx";
const CreateProject = () => {
  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      client: "",
      location: "",
      dateCompleted: "",
      description: "",
      images: [], // Initialize as an empty array
      features: [""], // Start with one empty feature fieldy
      tags: [""], // Start with one empty tag field
    },
  });
  const [createProject, { isLoading, isError, isSuccess }] = useCreateProjectMutation();

  const {
    fields: featureFields,
    append: addFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const {
    fields: tagFields,
    append: addTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images", // Name must match the default value key
  });

  const watchImages = watch("images");
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("projectName", data.title);
    formData.append("clientName", data.client);
    formData.append("location", data.location);
    formData.append("dateCompleted", data.dateCompleted);
    formData.append("description", data.description);

    // Convert features and tags arrays to comma-separated strings
    formData.append("features", data.features.join(","));
    formData.append("tags", data.tags.join(","));

    // Append images to FormData
    data.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });

    console.log([...formData.entries()]);

    try {
      await createProject(formData).unwrap();
      alert("Project created successfully!");
      if(isSuccess){
        setValue("title", "");
        setValue("client", "");
        setValue("location", "");
        setValue("dateCompleted", "");
        setValue("description", "");
        setValue("features", [""]);
        setValue("tags", [""]);
        setValue("images", []);
        toast.success("Project created successfully!");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project.");
      toast.error(error);
    }
  };
    if(isError){
      toast.error("Failed to create project");
    }

    if(isLoading){
      return <>
         <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
        <div
            className="w-12 h-12 rounded-full animate-spin absolute  border-8 border-solid border-green-500 border-t-transparent">
        </div>
    </div>
      </>
    }

  return (
    <div className="max-w-full mx-auto">
    <div className="flex justify-between items-center mb-6">

      <h2 className="text-2xl font-bold text-gray-600 mb-6">Create Project</h2>
     
    </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              {...register("title")}
              placeholder="Enter project title"
              className="mt-2 p-2 border border-gray-300 rounded focus:ring focus:ring-sky-400 focus:outline-none"
            />
          </div>

          {/* Client */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Client</label>
            <input
              {...register("client")}
              placeholder="Enter client name"
              className="mt-2 p-2 border border-gray-300 rounded focus:ring focus:ring-sky-400 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Location
            </label>
            <input
              {...register("location")}
              placeholder="Enter location"
              className="mt-2 p-2 border border-gray-300 rounded focus:ring focus:ring-sky-400 focus:outline-none"
            />
          </div>

          {/* Date Completed */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">
              Date Completed
            </label>
            <input
              {...register("dateCompleted")}
              type="date"
              className="mt-2 p-2 border border-gray-300 rounded focus:ring focus:ring-sky-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter project description"
            className="mt-2 p-2 border border-gray-300 rounded focus:ring focus:ring-sky-400 focus:outline-none"
            rows="4"
          ></textarea>
        </div>
  
        {/* Images */}
        <div>
          <label className="text-sm font-medium text-gray-600">Images : </label>
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4 mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]; // Get the selected file
                  if (file) {
                    const updatedImages = [...watchImages];
                    updatedImages[index] = file; // Update the array with the selected file
                    setValue("images", updatedImages); // Use setValue to update the state
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-gray-700 file:bg-gray-50 hover:file:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => removeImage(index)} // Remove the image from the array
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addImage({})} // Add a placeholder null value for a new image
            className="mt-3 text-sm text-sky-600 hover:text-sky-800"
          >
            + Add Another Image
          </button>

          {/* Render Image Previews */}
          {watchImages.some((image) => image instanceof File) && ( // Check if there's any valid File object
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {watchImages.map(
                (image, index) =>
                  image instanceof File && ( // Ensure it's a File before rendering
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)} // Create object URL
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-32 object-cover border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)} // Remove the image
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  )
              )}
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Features :{" "}
          </label>
          {featureFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4 mt-2">
              <input
                {...register(`features.${index}`)} // Ensure dynamic fields are correctly registered
                placeholder="Enter feature"
                className="flex-1 p-2 border border-gray-300 rounded focus:ring focus:ring-sky-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addFeature("")}
            className="mt-3 text-sm text-sky-600 hover:text-sky-800"
          >
            + Add Another Feature
          </button>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600 ">Tags : </label>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4 mt-2">
              <input
                {...register(`tags.${index}`)}
                placeholder="Enter tag"
                className="flex-1 p-2 border border-gray-300 rounded focus:ring focus:ring-sky-400 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addTag("")}
            className="mt-3 text-sm text-sky-600 hover:text-sky-800"
          >
            + Add Another Tag
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className=" bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 transition-colors"
        >
          Submit
        </Button>
      
      </form>
    </div>
  );
};

export default CreateProject;
