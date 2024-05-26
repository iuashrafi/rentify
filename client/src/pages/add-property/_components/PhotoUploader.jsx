import { useState } from "react";
import { X } from "lucide-react";

const PhotoUploader = ({ photosError, setPhotosError, setImageFiles }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    let hasInvalidFiles = false;

    const newPreviews = files.reduce((acc, file) => {
      if (!validImageTypes.includes(file.type)) {
        setPhotosError("Only jpeg, jpg, and png files are allowed.");
        hasInvalidFiles = true;
      } else if (file.size > 5 * 1024 * 1024) {
        setPhotosError("Each file size should be less than 5 MB.");
        hasInvalidFiles = true;
      } else {
        acc.push({
          url: URL.createObjectURL(file),
          file,
          db: false,
        });
      }
      return acc;
    }, []);

    if (!hasInvalidFiles) {
      setPhotosError("");
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      //   setImageFiles((prev) => [...prev, ...newPreviews]);
      setImageFiles((prev) => [
        ...prev,
        ...newPreviews.map((preview) => preview.file),
      ]);
    }
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Add photos</span>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          multiple
          onChange={handleImageChange}
        />
        <div className="label">
          <span className="label-text-alt text-error">{photosError}</span>
        </div>
      </label>
      {/* Image Previews */}
      <div className="my-4 flex flex-wrap gap-4">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview.url}
              alt={`Preview ${index + 1}`}
              className="object-cover w-64 h-64 rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute bg-white top-0 right-0 m-1.5 rounded-full p-1 shadow-md"
            >
              <X />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PhotoUploader;
