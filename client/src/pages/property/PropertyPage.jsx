import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../config";
import { ArrowLeft } from "lucide-react";
import { UserContext } from "../../UserContext";
import ContactOwner from "./_components/ContactOwner";
import Loading from "../../components/Loading";
import Breadcrumbs from "../../components/Breadcrumbs";
import PropertyHeading from "./_components/PropertyHeading";
import PhotosGallery from "./_components/PhotosGallery";
import PropertyDescription from "./_components/PropertyDescription";
import { toast } from "sonner";

const PropertyPage = () => {
  const { property_id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, [property_id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`/api/property/${property_id}`);
      setProperty(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching property:", error);
      setError("Failed to fetch property");
      setLoading(false);
    }
  };

  const deleteProperty = async () => {
    try {
      const response = await axios.delete(`/api/property/${property_id}`);
      toast.success("Property deleted successfully");
      navigate("/listings");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Error deleting property");
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto bg-white">
      <Breadcrumbs />
      <PropertyHeading property={property} />

      <div className="grid grid-cols-12 py-6">
        <div className="col-span-12 md:col-span-8">
          {/* galery */}
          <PhotosGallery property={property} />
          {/* about & amenties */}
          <PropertyDescription property={property} />
        </div>
        <div className="col-span-12 md:col-span-4 p-4">
          <div className="border-4 border-gray-100 rounded-xl p-4">
            {property.user_id !== user?._id ? (
              <ContactOwner user={user} property={property} />
            ) : (
              <>
                <h1 className="text-gray-700 text-lg font-semibold">
                  You own this property
                </h1>
                {/* <button className="btn btn-neutral w-full mt-3 rounded-full">
                  Edit this Property
                </button> */}
                <button
                  onClick={deleteProperty}
                  className="btn btn-neutral w-full mt-3 rounded-full"
                >
                  Delete this Property
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
