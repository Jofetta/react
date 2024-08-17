import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/([A-Z])\w+/)
    .required(),
  age: yup.number().positive().integer().max(120).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(16).required(),
  password2: yup
    .string()
    .when("password", (password, field) =>
      password ? field.required().oneOf([yup.ref("password")]) : field,
    ),
  gender: yup.string().required(),
  acceptTC: yup.boolean().required(),
});
