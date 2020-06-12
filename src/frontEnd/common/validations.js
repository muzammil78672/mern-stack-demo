import * as Yup from "yup";

const RegisterFormSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Required"),
  dob: Yup.date().max(new Date()),
  email: Yup.string().trim().email("Invalid email").required("Required"),
  password: Yup.string().min(3, "too short").required("Required"),
  profileImage: Yup.string().trim(),
});

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email").required("Required"),
  password: Yup.string().min(3, "too short").required("Required"),
});

export { RegisterFormSchema, LoginFormSchema };
