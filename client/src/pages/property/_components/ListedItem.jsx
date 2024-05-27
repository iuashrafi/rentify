import { Link } from "react-router-dom";
import { generateImageUrl } from "../../../config";
import { MapPin, Pencil, ArrowUpRight } from "lucide-react";

const ListedItem = ({ property }) => {
  return (
    <div className="flex border-b last:border-none first:pt-0 last:pb-0 py-4">
      <figure>
        <img
          src={generateImageUrl(property.photos[0])}
          alt="listing thumbnail"
          className="h-32 w-32 lg:h-40 lg:w-44 rounded-xl object-cover border"
        />
      </figure>
      <div className="flex-grow py-2 px-3 md:p-4">
        <div className="">
          <span className="text-base md:text-lg font-semibold text-gray-800">
            {property.title}
          </span>
          <br />
          <span className="text-sm md:text-base text-gray-600 flex items-center space-x-2">
            <MapPin className="h-4 w-4 md:h-5 md:w-5" />
            <span>{property.address}</span>
          </span>
        </div>

        <div className="flex items-center justify-start space-x-2 md:space-x-3 mt-3">
          <Link
            to={`/edit-property/${property._id}`}
            className="btn rounded-full border bg-white btn-sm flex items-center"
          >
            <span>Edit</span>
            <Pencil className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
          {/* <button
            onClick={() => {
              alert("TODO : if time permits");
            }}
            className="btn rounded-full border bg-white btn-sm flex items-center"
          >
            <span>Edit</span>
            <Pencil className="h-4 w-4 md:h-5 md:w-5" />
          </button> */}
          <Link
            to={`/listings/${property._id}`}
            className="btn rounded-full btn-neutral btn-sm flex items-center"
          >
            <span>View</span>
            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListedItem;
