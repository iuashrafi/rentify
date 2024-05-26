import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import axios from "axios";
import Loading from "../../components/Loading";
import ListedItem from "./_components/ListedItem";
import TypoGraphyH1 from "../../components/TypoGraphyH1";

const ListingsPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const { user, ready } = useContext(UserContext);

  useEffect(() => {
    if (ready && !user) {
      navigate("/login");
    }
  }, [user, ready]);

  useEffect(() => {
    fetchPropertiesByUser();
  }, []);
  const fetchPropertiesByUser = () => {
    axios
      .get("/api/property")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((error) => {
        console.log("Error fetching properties, Error= ", error);
      });
  };

  if (!ready) {
    return <Loading />;
  }

  return (
    <div className="default-container">
      <TypoGraphyH1 title="My Listings" />
      <div className="bg-white">
        {properties.length === 0 && (
          <p className="mt-4">You haven't listed any property.</p>
        )}
        {properties.map((property) => (
          <ListedItem key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
