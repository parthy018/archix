import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useUpdateProjectMutation } from "../../app/feedbackSlice";
import { toast } from "react-toastify";

export const UpdateProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { project } = location.state || {};
  console.log("Project Data:", project);

  const originalProject = useRef(null);
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const { register, handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: {
      projectName: "",
      clientName: "",
      location: "",
      dateCompleted: "",
      description: "",
      status: "",
      features: [""],
      tags: [""],
      images: [],
    },
  });

  const {
    fields: featureFields,
    append: addFeature,
    remove: removeFeature,
  } = useFieldArray({ control, name: "features" });
  const {
    fields: tagFields,
    append: addTag,
    remove: removeTag,
  } = useFieldArray({ control, name: "tags" });
  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });

  useEffect(() => {
    if (project) {
      const initialData = {
        projectName: project.projectName || "",
        clientName: project.clientName || "",
        location: project.location || "",
        dateCompleted: project.dateCompleted || "",
        description: project.description || "",
        status: project.status || "",
        features: project.features?.length
          ? project.features[0].split(",")
          : [""],
        tags: project.tags?.length ? project.tags[0].split(",") : [""],
        images: project.images?.map((img) => ({ url: img })) || [],
      };

      originalProject.current = initialData;
      reset(initialData);
    }
  }, [project, reset]);

  const watchImages = watch("images");

  const onSubmit = async (data) => {
    if (JSON.stringify(originalProject.current) === JSON.stringify(data)) {
      toast.error("No changes made to the project.");
      return;
    }

    const formData = new FormData();
    formData.append("projectName", data.projectName);
    formData.append("clientName", data.clientName);
    formData.append("location", data.location);
    formData.append("dateCompleted", data.dateCompleted);
    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append("features", data.features.join(","));
    formData.append("tags", data.tags.join(","));

    data.images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      } else if (image.url) {
        formData.append("existingImages", image.url);
      }
    });

    console.log("Form Data:", Array.from(formData.entries()));
    console.log("Project ID:", id); // Debugging output

    try {
      await updateProject({ projectID: id, payload: formData }).unwrap();
      toast.success("Project updated successfully!");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update project.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-600 mb-6">Update Project</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Project Name */}
        <div className="flex flex-col md:flex-row space-x-4 w-full md:flex-fill my-4" >
            <div className="w-full flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Project Name
              </label>
              <input
                {...register("projectName")}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Client Name */}
            <div className="w-full flex flex-col">
              <label className="text-sm font-medium text-gray-600"> Client Name</label>
              <input{...register("clientName")} className="mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
        </div>

    <div className="flex flex-col md:flex-row space-x-4 w-full md:flex-fill my-4" >
        <div className="w-full flex flex-col">
          <label className="text-sm font-medium text-gray-600">Location</label>
          <input
            {...register("location")}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Date Completed */}
        <div className="w-full flex flex-col">
          <label className="text-sm font-medium text-gray-600">
            Date Completed
          </label>
          <input
            type="date"
            {...register("dateCompleted")}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
    </div>
        {/* Location */}

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            {...register("description")}
            className="mt-2 p-2 border border-gray-300 rounded"
            rows="4"
          ></textarea>
        </div>

        {/* Status */}
        {/* Status - Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Status</label>
          <select
            {...register("status")}
            className="mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="text-sm font-medium text-gray-600">Images</label>
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4 mt-2">
              {field.url && (
                <img
                  src={field.url}
                  alt="Existing"
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const updatedImages = [...watchImages];
                    updatedImages[index] = {
                      file,
                      url: URL.createObjectURL(file),
                    };
                    setValue("images", updatedImages);
                  }
                }}
                className="block w-full text-sm text-gray-500"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addImage({})}
            className="mt-3 text-sm text-sky-600 hover:text-sky-800"
          >
            + Add Another Image
          </button>
        </div>

        {/* Features */}
        <div>
          <label className="text-sm font-medium text-gray-600">Features</label>
          {featureFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4 mt-2">
              <input
                {...register(`features.${index}`)}
                className="p-2 border border-gray-300 rounded w-full"
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
        <div>
          <label className="text-sm font-medium text-gray-600">Tags</label>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4 mt-2">
              <input
                {...register(`tags.${index}`)}
                className="p-2 border border-gray-300 rounded w-full"
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
        <button
          type="submit"
          className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600"
        >
          {isLoading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
