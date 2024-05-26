import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserContext } from "../../UserContext";
import Loading from "../../components/Loading";
import TypoGraphyH1 from "../../components/TypoGraphyH1";
import { PropertySchema } from "../../lib/schema";
import { amenities } from "../../config";
import PhotoUploader from "./_components/PhotoUploader";
import { toast } from "sonner";
import axios from "axios";

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const { user, ready } = useContext(UserContext);

  const [imageFiles, setImageFiles] = useState([]);
  const [photosError, setPhotosError] = useState(""); // for photos validation

  // check for authorization
  useEffect(() => {
    if (ready && !user) {
      return navigate("/login");
    }
  }, [user, ready]);

  // form handling
  const formik = useFormik({
    initialValues: {
      title: "",
      address: "",
      description: "",
      perks: [],
      beds: 0,
      price: 0,
    },
    validationSchema: PropertySchema,
    onSubmit: async (values, formikBag) => {
      alert(JSON.stringify(values, null, 2));

      console.log(imageFiles);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("address", values.address);
      formData.append("description", values.description);
      formData.append("beds", values.beds);
      formData.append("price", values.price);
      formData.append("perks", JSON.stringify(values.perks));

      // adding photos to formData
      imageFiles.forEach((file) => {
        formData.append("photos", file);
      });

      // posting to the database
      try {
        // creating a new property
        const response = await axios.post("/api/property", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Property Added successfully");
        console.log("property added successfully=", response.data);
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      }
    },
  });

  if (!ready) {
    return <Loading />;
  }
  return (
    <div className="default-container">
      <TypoGraphyH1 title="Add a Property" />

      <form onSubmit={formik.handleSubmit} className="bg-green-300">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Ex - Modern double room in friendly flat"
            className="input input-bordered w-full max-w-xs"
            {...formik.getFieldProps("title")}
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {formik.touched.title && formik.errors.title
                ? formik.errors.title
                : " "}
            </span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            placeholder="Ex - SouthFields Uk"
            className="input input-bordered w-full max-w-xs"
            {...formik.getFieldProps("address")}
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {formik.touched.address && formik.errors.address
                ? formik.errors.address
                : " "}
            </span>
          </div>
        </label>
        {/* Photos upload file input and Previews */}
        <PhotoUploader
          photosError={photosError}
          setPhotosError={setPhotosError}
          setImageFiles={setImageFiles}
        />

        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24 max-w-xl"
            placeholder="Your room description goes here"
            {...formik.getFieldProps("description")}
          ></textarea>
          <div className="label">
            <span className="label-text-alt text-error">
              {formik.touched.description && formik.errors.description
                ? formik.errors.description
                : " "}
            </span>
          </div>
        </label>

        {/* Amenities */}
        <div className="form-control my-3">
          <div>Amenities</div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {amenities.map((item, index) => (
              <label
                key={index}
                className="label cursor-pointer bg-white py-2 px-4 border rounded-lg hover:bg-gray-100"
              >
                <span className="label-text">{item}</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  name="perks"
                  value={item}
                  checked={formik.values.perks.includes(item)}
                  onChange={formik.handleChange}
                />
              </label>
            ))}
          </div>
          {formik.touched.perks && formik.errors.perks ? (
            <div className="text-error">{formik.errors.perks}</div>
          ) : null}
        </div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">No of beds</span>
          </div>
          <input
            type="number"
            placeholder="1"
            className="input input-bordered w-full max-w-xs"
            {...formik.getFieldProps("beds")}
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {formik.touched.beds && formik.errors.beds
                ? formik.errors.beds
                : " "}
            </span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Price per month</span>
          </div>
          <input
            type="number"
            placeholder="10"
            className="input input-bordered w-full max-w-xs"
            {...formik.getFieldProps("price")}
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {formik.touched.price && formik.errors.price
                ? formik.errors.price
                : " "}
            </span>
          </div>
        </label>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="my-3 btn btn-neutral px-8 rounded-full"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
