import { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { RegisterSchema } from "../../lib/schema";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, ready } = useContext(UserContext);
  // check for authorization
  useEffect(() => {
    if (ready && user) {
      return navigate("/");
    }
  }, [user, ready]);

  // Initialize formik for form management
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, formikBag) => {
      // for debugging
      // alert(JSON.stringify(values, null, 2));
      axios
        .post("/api/auth/register", values)
        .then((response) => {
          console.log("User registered successfully:", response.data);
          toast.success(
            "Account Created Successfully! Redirecting to Login Page"
          );
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
  });
  // Render the registration form
  return (
    <div className="container mx-auto pt-16 pb-8 px-4 w-full md:max-w-lg lg:max-w-xl">
      <div className="bg-white border shadow-md p-8 rounded-xl">
        <h1 className="text-3xl font-semibold text-center mb-4">Register</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-3 bg-green-30 space-y-3"
        >
          <div className="flex space-x-3">
            <label className="form-control w-full">
              <input
                type="text"
                placeholder="First name"
                className="input input-bordered w-full"
                {...formik.getFieldProps("fname")}
              />
              <div className="label">
                <span className="label-text-alt text-error">
                  <span>
                    {formik.touched.fname && formik.errors.fname
                      ? formik.errors.fname
                      : " "}
                  </span>
                </span>
              </div>
            </label>
            <label className="form-control w-full">
              <input
                type="text"
                placeholder="Last name"
                className="input input-bordered w-full"
                {...formik.getFieldProps("lname")}
              />
              <div className="label">
                <span className="label-text-alt text-error">
                  <span>
                    {formik.touched.lname && formik.errors.lname
                      ? formik.errors.lname
                      : " "}
                  </span>
                </span>
              </div>
            </label>
          </div>
          <label className="form-control w-full">
            <input
              type="text"
              placeholder="Email address"
              className="input input-bordered w-full"
              {...formik.getFieldProps("email")}
            />
            <div className="label">
              <span className="label-text-alt text-error">
                <span>
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : " "}
                </span>
              </span>
            </div>
          </label>

          <label className="form-control w-full">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...formik.getFieldProps("password")}
            />

            <div className="label">
              <span className="label-text-alt text-error">
                <span>
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : " "}
                </span>
              </span>
            </div>
          </label>

          <label className="form-control w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              {...formik.getFieldProps("confirmPassword")}
            />

            <div className="label">
              <span className="label-text-alt text-error">
                <span>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : " "}
                </span>
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <input
              type="text"
              placeholder="Phone"
              className="input input-bordered w-full"
              {...formik.getFieldProps("phone")}
            />

            <div className="label">
              <span className="label-text-alt text-error">
                <span>
                  {formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : " "}
                </span>
              </span>
            </div>
          </label>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="my-3 btn btn-neutral w-full rounded-full"
          >
            Register
          </button>

          <div className="text-center text-sm py-2 text-gray-600">
            Already a Member ?&nbsp;
            <Link to="/login" className="underline text-gray-600">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
