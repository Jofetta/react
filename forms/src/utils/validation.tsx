import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/([A-Z])\w+/, "The name should start with a capital letter")
    .required(),
  age: yup
    .number()
    .positive("Age should be above 0")
    .integer()
    .max(120)
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(16).required(),
  password2: yup
    .string()
    .when("password", (password, field) =>
      password
        ? field
            .required()
            .oneOf([yup.ref("password")], "Passwords should match")
        : field,
    ),
  gender: yup.string().required(),
  acceptTC: yup
    .boolean()
    .isTrue("You should accept the Terms & Conditions")
    .required(),
});
