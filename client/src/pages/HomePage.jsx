import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-200 to-bg-white min-h-screen p-4 sm:p-6 md:p-8 lg:p-16">
      <div className="bg-blue-20 pt-16 pb-24">
        <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-poppins">
          We make you feel better <br className="hidden sm:block" /> than at
          home
        </h1>
        <p className="text-lg py-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
          ratione quisquam?
          <br /> Consequuntur expedita sapiente facere quo, accusantium
          distinctio perferendis eveniet.
        </p>
        <div className="mt-4">
          <Link to="/search" className="btn btn-neutral rounded-full px-8">
            Explore <ArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
