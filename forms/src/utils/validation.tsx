import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/([A-Z])\w+/, "The name should start with a capital letter")
    .required(),
  age: yup
    .number()
    .positive("Age should be above 0")
    .integer("Please enter a number")
    .max(120)
    .required("Please enter a number")
    .typeError("Please enter a number"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6)
    .max(16)
    .required()
    .matches(/^(?=.*[0-9])/, "Weak password: include at least one number")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])/,
      "Weak password: include at least one lowercase letter",
    )
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
      "Weak password: include at least one uppercase letter",
    )
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
      "Medium password: include at least one special symbol",
    ),
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
  image: yup
    .mixed()
    .required()
    .test("fileSize", "Your file is too big", (value: unknown) => {
      if (value instanceof File) {
        return value.size <= 2000000;
      }
    })
    .test("fileType", "Please upload a jpg or png file", (value: unknown) => {
      if (!(value instanceof File)) {
        return false;
      }
      const fileName = value.name;
      const validExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = fileName.split(".").pop()?.toLowerCase();
      return validExtensions.includes(fileExtension || "");
    }),
  country: yup.string().required(),
});
