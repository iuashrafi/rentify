import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import PropertyCard from "../../components/PropertyCard";
import { UserContext } from "../../UserContext";
import SearchBox from "./_components/SearchBox";

const SearchPage = () => {
  const { user } = useContext(UserContext);
  const [isFetching, setIsFetching] = useState(true);
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // basic filters ( can added more if time permits )
  const [filters, setFilters] = useState({
    title: "",
    address: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetchProperties(currentPage, filters);
  }, [currentPage, filters]);

  const fetchProperties = (page, filters) => {
    setIsFetching(true);
    axios
      .get(`/api/search`, {
        params: {
          page,
          limit: 10,
          ...filters,
        },
      })
      .then((res) => {
        // Map through the properties and add likesCount field to each property
        const propertiesWithLikesCount = res.data.properties.map(
          (property) => ({
            ...property,
            likesCount: property.likes.length, // Calculate likesCount based on the length of the likes array
          })
        );

        setProperties(propertiesWithLikesCount);
        console.log("properties=", propertiesWithLikesCount);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log("Error fetching properties, Error= ", error);
        setIsFetching(false);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Search box container */}
      <SearchBox filters={filters} handleFilterChange={handleFilterChange} />

      {/* Search contents */}
      {isFetching ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4 min-h-screen">
          {/* if there is no properties then display message, below */}
          {properties?.length === 0 && <p>No properties found</p>}

          <div className="grid grid-cols-12 gap-3">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                currentUserId={user?._id}
              />
            ))}
          </div>

          {/* pagination */}
          <div className="mt-16 join">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                className={`join-item btn ${
                  currentPage === page + 1 ? "btn-active" : ""
                }`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
