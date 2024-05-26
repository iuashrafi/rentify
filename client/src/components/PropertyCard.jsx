import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { BACKEND_BASE_URL, generateImageUrl } from "../config";
import { toast } from "sonner";

const PropertyCard = ({ property, currentUserId }) => {
  const [isLiked, setIsLiked] = useState(
    property.likes.includes(currentUserId)
  );

  // State to maintain the number of likes
  const [likesCount, setLikesCount] = useState(property.likes.length);

  // Function to handle like/unlike action
  const handleLike = (event) => {
    event.preventDefault();

    if (currentUserId) {
      axios
        .post(`/api/property/like`, {
          propertyId: property._id,
          userId: currentUserId,
        })
        .then((response) => {
          // Update likesCount based on response from server
          const updatedLikesCount = response.data.likesCount;

          // Update local state
          setLikesCount(updatedLikesCount);
          setIsLiked(!isLiked);
        })
        .catch((error) => {
          console.error("Error liking property", error);
          alert("Error liking property ");
        });
    } else {
      // display modal
      toast.error("You need to login to Like");
    }
  };

  return (
    <Link
      to={`/search/${property?._id}`}
      className="bg-green-30 border col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-0.5 rounded-xl cursor-pointer"
    >
      <div className="relative">
        <img
          // src={BACKEND_BASE_URL + "/uploads/" + property?.photos[0]}
          src={generateImageUrl(property?.photos[0])}
          alt="image"
          className="rounded-xl object-cover w-full h-40"
        />
        <button
          onClick={handleLike}
          className="btn absolute top-1 right-1 rounded-full bg-white/60 text-red-600"
        >
          <Heart
            className="h-5 w-5 text-red-600"
            fill={isLiked ? "red" : "transparent"}
          />
          {likesCount > 0 && <span>{likesCount}</span>}
        </button>
      </div>
      <div className="p-2">
        <span className="font-semibold text-gray-800">{property?.title}</span>
        <br />
        <span className="text-gray-500">{property?.address}</span>
        <br /> <span className="font-semibold">$ {property?.price}</span>
      </div>
    </Link>
  );
};

export default PropertyCard;
