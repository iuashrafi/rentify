import { Facebook, Instagram } from "lucide-react";
import NavbarLogo from "./NavbarLogo";
const Footer = () => {
  return (
    <div className="bg-gray-600 p-9 text-white flex items-center justify-between">
      <div className="">
        <NavbarLogo />
        <span className="text-sm font-semibold">
          Developed By :&nbsp;
          <a
            href="https://www.linkedin.com/in/iuashrafi/"
            target="_blank"
            className="hover:underline"
          >
            Imtiaz Uddin
          </a>
        </span>
      </div>

      <div className="flex space-x-4">
        <Facebook />
        <Instagram />
      </div>
    </div>
  );
};

export default Footer;
