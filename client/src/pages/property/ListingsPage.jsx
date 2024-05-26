import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import Loading from "../../components/Loading";
import ListedItem from "./_components/ListedItem";
import TypoGraphyH1 from "../../components/TypoGraphyH1";

const ListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const { user, ready } = useContext(UserContext);

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
  } else if (ready && !user) {
    return navigate("/login");
  }
  return (
    <div className="default-container">
      <TypoGraphyH1 title="My Listings" />
      <div className="bg-white">
        {properties.map((property) => (
          <ListedItem key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
