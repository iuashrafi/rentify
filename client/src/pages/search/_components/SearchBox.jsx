import { MapPin, Search, DollarSign } from "lucide-react";

const SearchBox = ({ filters, handleFilterChange }) => {
  return (
    <div className="bg-gray-300 px-4 pt-3 pb-6">
      <div className="container bg-green-30 mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Find Specific Room</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                className="grow"
                placeholder="Search"
              />
              <Search className="text-gray-600 h-5 w-5 " />
            </label>
          </label>
        </div>
        <div className="col-span-12 lg:col-span-9 grid grid-cols-3 gap-3">
          {/* Location */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <MapPin className="text-gray-600 h-5 w-5" />
              <input
                type="text"
                className="grow"
                placeholder="Address"
                name="address"
                value={filters.address}
                onChange={handleFilterChange}
              />
            </label>
          </label>
          {/* Min Price */}
          <label className="form-control w-full   ">
            <div className="label">
              <span className="label-text">Min Price</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <DollarSign className="text-gray-600 h-5 w-5" />
              <input
                type="text"
                className="grow"
                placeholder="Min Price"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </label>
          </label>

          <label className="form-control w-full  ">
            <div className="label">
              <span className="label-text">Max Price</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <DollarSign className="text-gray-600 h-5 w-5" />
              <input
                type="text"
                className="grow"
                placeholder="Max Price"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </label>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
