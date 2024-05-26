import { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import UserDetails from "../../components/UserDetails";
import TypoGraphyH1 from "../../components/TypoGraphyH1";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, ready } = useContext(UserContext);

  // check for authorization
  useEffect(() => {
    if (ready && !user) {
      return navigate("/login");
    }
  }, [user, ready]);

  if (!ready) {
    return <Loading />;
  }
  return (
    <div className="default-container">
      <TypoGraphyH1 title="Profile" />
      <UserDetails user={user} />
    </div>
  );
};

export default ProfilePage;
