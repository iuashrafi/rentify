import { useContext } from "react";
import { UserContext } from "../../UserContext";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import UserDetails from "../../components/UserDetails";
import TypoGraphyH1 from "../../components/TypoGraphyH1";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return <Loading />;
  } else if (ready && !user) {
    return navigate("/login");
  }
  return (
    <div className="container mx-auto bg-red-300 min-h-screen p-4 md:p-8 xl:p-16">
      <TypoGraphyH1 title="Profile" />
      <UserDetails user={user} />
    </div>
  );
};

export default ProfilePage;
