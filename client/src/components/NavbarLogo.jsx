import { Link } from "react-router-dom";
import { BRANDNAME } from "../config";
const NavbarLogo = () => {
  return (
    <Link
      to="/"
      className="flex text-sm md:text-lg font-semibold cursor-pointer"
    >
      {BRANDNAME}
    </Link>
  );
};

export default NavbarLogo;
