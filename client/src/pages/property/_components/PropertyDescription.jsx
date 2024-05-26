const PropertyDescription = ({ property }) => {
  return (
    <div className="p-4">
      <div className="">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="text-black mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam iste
          in odit molestias quos officiis corrupti atque consectetur delectus
          explicabo saepe id nemo ad, beatae animi. Incidunt quos voluptatem
          aliquam ratione. Incidunt, praesentium eveniet. Sit, voluptatem
          placeat ut recusandae cum delectus, obcaecati accusamus ipsam eaque
          sequi, omnis eius odit voluptas.
        </p>
      </div>
      <div className="bg-gray-20 mt-4">
        <h1 className="text-2xl font-semibold">Amenities/Perks</h1>
        <ul className="flex gap-4 mt-2">
          {property.perks.map((item, index) => (
            <li key={index} className="border bg-white rounded-full px-3 py-1">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-20 mt-4">
        <h1 className="text-2xl font-semibold">Beds : {property.beds}</h1>
        <h1 className="text-2xl font-semibold">
          Price per month : $ {property.price}
        </h1>
      </div>
    </div>
  );
};

export default PropertyDescription;
