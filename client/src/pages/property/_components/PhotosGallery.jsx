import { useState } from "react";
import { generateImageUrl } from "../../../config";

const PhotosGallery = ({ property }) => {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className="">
      <div className="bg-red-30 rounded-xl w-full p-2 flex justify-center items-center">
        <img
          src={generateImageUrl(property.photos[activeImage])}
          alt="Main property"
          className="rounded-xl object-cover h-96 w-full aspect-square"
        />
      </div>
      <div className="flex flex-nowrap space-x-4 overflow-x-auto p-2">
        {property.photos.map((photo, index) => (
          <img
            key={index}
            onClick={() => {
              setActiveImage(index);
            }}
            src={generateImageUrl(photo)}
            alt={`Property photo ${index + 2}`}
            className="object-cover h-44 aspect-square rounded-xl cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotosGallery;
