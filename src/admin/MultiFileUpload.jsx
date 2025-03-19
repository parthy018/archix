import { useState } from "react";
import { toast } from "react-toastify";
import { useSliderImagesMutation } from "../app/feedbackSlice";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../components/Button";

const MultiFileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadSliderImages, { isSuccess }] = useSliderImagesMutation();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    validateAndSetFiles(selectedFiles);
    console.log(selectedFiles);
  };
  const validateAndSetFiles = (selectedFiles) => {
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    const maxSize = 5 * 1024 * 1024;
    let validFiles = [];
    let errorMessage = "";

    selectedFiles.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        errorMessage = `File type not supported: ${file.name}`;
      } else if (file.size > maxSize) {
        errorMessage = `File too large: ${file.name}`;
      } else {
        validFiles.push(file);
      }
    });

    if (errorMessage) {
      setError(errorMessage);
      setTimeout(() => setError(null), 3000);
    }

    // Update the state with selected files
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    if (files.length > 3) {
      setError("You can only upload up to 3 files at a time.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    try {
      const response = await uploadSliderImages(formData).unwrap();
      console.log("Upload success:", response);
      if (isSuccess) {
        toast.success("Images uploaded successfully");
      }
      toast.success("Images uploaded successfully");
      setFiles([]);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Upload failed. Try again.");
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="p-4 border border-gray-300 rounded-md shadow-lg bg-white  mx-auto
        flex flex-col items-center justify-center w-full h-auto"
    >
      <label
        className="min-w-full flex flex-col items-center justify-center p-6 border-2 border-dashed
         border-gray-300 rounded-md cursor-pointer bg-[#eff6ff]  text-gray-500"
      >
        <FiUploadCloud className="text-4xl" />
        <span className="text-gray-500">Upload images for slider</span>
        <input
          type="file"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <div className="mt-4 w-full">
        {/* Display error message */}
        {error && (
          <div className="text-red-500 mt-2 text-sm bg-red-100 p-2 rounded-md w-full text-center">
            {error}
          </div>
        )}

        <div className="mt-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded-md mt-2"
            >
              <div className="flex items-center">
                {file.type.startsWith("image") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-10 h-10 object-cover mr-2 rounded-md"
                  />
                )}
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <AiOutlineCloseCircle
                className="h-5 w-5 text-red-500 cursor-pointer"
                onClick={() => removeFile(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <Button disabled={uploading || files.length === 0} onClick={uploadFiles}>
        {" "}
        upload
      </Button>
    </div>
  );
};

export default MultiFileUpload;
