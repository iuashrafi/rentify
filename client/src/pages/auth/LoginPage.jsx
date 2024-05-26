import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { LoginSchema } from "../../lib/schema";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();

  const { user, ready, setUser } = useContext(UserContext);

  // check for authorization
  useEffect(() => {
    if (ready && user) {
      return navigate("/");
    }
  }, [user, ready]);

  // Initializing formik for form management
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, formikBag) => {
      // for debugging
      // alert(JSON.stringify(values, null, 2));
      axios
        .post("/api/auth/login", values)
        .then((response) => {
          // for debugging
          // console.log("User registered successfully:", response.data);
          // Displaying error toast and resetting form submission state
          toast.success("Logged in Successfully! Redirecting...");
          setUser(response.data);
          navigate("/");
        })
        .catch((error) => {
          // for debugging
          // console.error("Error during login: ", error.response.data.message);
          toast.error(error.response.data.message);
          formikBag.setSubmitting(false);
        });
    },
  });

  return (
    <div className="container mx-auto pt-16 pb-8 px-4 w-full md:max-w-lg lg:max-w-xl">
      <div className="bg-white border shadow-md p-8 rounded-xl">
        <h1 className="font-semibold text-2xl text-center">Login</h1>
        <form onSubmit={formik.handleSubmit} noValidate className="mt-4">
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

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="my-3 btn btn-neutral w-full rounded-full"
          >
            Login
          </button>

          <div className="text-center text-sm py-2 text-gray-600">
            Don't have an account yet ?{" "}
            <Link to="/register" className="underline text-gray-600">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
