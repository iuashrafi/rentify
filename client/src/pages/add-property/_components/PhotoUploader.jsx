import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { generateImageUrl } from "../../../config";

const PhotoUploader = ({
  photosError,
  setPhotosError,
  imageFiles,
  setImageFiles,
  existingPhotos,
  setExistingPhotos,
}) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  // useEffect(() => {
  //   console.log("imagePreviews=", imagePreviews);
  // }, [imagePreviews]);

  useEffect(() => {
    // Preload existing photos
    setImagePreviews(getExistingPhotosObjects(existingPhotos));
  }, []);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
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
      setImageFiles((prev) => [
        ...prev,
        ...newPreviews.map((preview) => preview.file),
      ]);
    }
  };

  const handleRemoveImage = (index) => {
    // console.log("removing index = ", imagePreviews[index]);
    const preview = imagePreviews[index];
    if (preview.db) {
      // if the image is from db, remove it from existing photos
      // and also from the image preview

      const updatedExistingPhotos = existingPhotos.filter(
        (_, i) => i !== index
      );
      setExistingPhotos(updatedExistingPhotos);

      setImagePreviews([
        ...updatedExistingPhotos,
        ...getImageFilesObjects(imageFiles),
      ]);
    } else {
      // else the image is from file input by user
      // so remove it from imageFiles state

      let updatedIndex = index - existingPhotos.length;
      const updateImageFiles = imageFiles.filter((_, i) => i !== updatedIndex);

      const imgFilesForPreviews = getImageFilesObjects(updateImageFiles);

      setImageFiles(updateImageFiles);

      setImagePreviews([
        ...getExistingPhotosObjects(existingPhotos),
        ...imgFilesForPreviews,
      ]);
    }
  };

  // helper functions for generating image objects
  const getImageFilesObjects = (tmp) =>
    tmp.map((file) => ({ url: URL.createObjectURL(file), file, db: false }));

  const getExistingPhotosObjects = (filenames) =>
    filenames.map((filename) => ({
      url: generateImageUrl(filename),
      file: null,
      db: true,
    }));

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
