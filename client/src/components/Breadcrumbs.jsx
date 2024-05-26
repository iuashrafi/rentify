import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (value, index, isLast) => {
    if (index === pathnames.length - 1 && isLast) {
      // return value; // Display the ID as is
      return "Property";
    }
    switch (value) {
      case "listings":
        return "Listings";
      default:
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
  };
  return (
    <div className="py-3 px-3 bg-red-30 text-sm breadcrumbs flex space-x-3">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={to}>
              {isLast ? (
                getBreadcrumbName(value, index, isLast)
              ) : (
                <Link to={to}>{getBreadcrumbName(value, index, isLast)}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
