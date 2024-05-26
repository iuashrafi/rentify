import * as Yup from "yup";

// validation schema for User Registeration
export const RegisterSchema = Yup.object({
  fname: Yup.string()
    .min(3, "Must be atleast 3 characters")
    .required("Required"),
  lname: Yup.string()
    .min(1, "Must be atleast 1 character")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be atleast 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Retype your password.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phone: Yup.string().min(10, "Must be 10 digits").required("Required"),
});

// validation schema for User login
export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be atleast 6 characters")
    .required("Required"),
});
