import { Heart } from "lucide-react";

const PropertyHeading = ({ property }) => {
  return (
    <div className="bg-pink-300 px-4 py-4">
      <h1 className="text-3xl font-semibold text-gray-900">{property.title}</h1>
      <p className="text-gray-800">{property.address}</p>
      <span className="flex items-center space-x-2 mt-1">
        <Heart className="text-red-500" fill="red" />
        <span>{property.likes.length} Likes</span>
      </span>
    </div>
  );
};

export default PropertyHeading;
