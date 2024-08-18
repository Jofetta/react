import { useForm } from "react-hook-form";
import { userSchema } from "../utils/validation";
import { saveData } from "../store/ReactHookFormSlice";

import type { FormData, FormFields } from "../types/formTypes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "../store/store";

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm({ resolver: yupResolver(userSchema), mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );

  const onSubmit = async (data: FormData) => {
    const isValid = await userSchema.isValid(data);
    if (isValid) {
      const file = data.image;

      if (file instanceof File) {
        const reader = new FileReader();
        reader.onload = () => {
          const encodedImage = reader.result as string;
          const formDataEncoded: FormFields = {
            ...data,
            image: encodedImage,
          };
          dispatch(saveData(formDataEncoded));
          navigate("/");
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <h1 className="heading">React Hook Form</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-item">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            {...register("name")}
            className="text-input"
            id="name"
            type="text"
            placeholder="Enter your name"
          ></input>
          <div className="error-message">{errors.name?.message}</div>
        </div>
        <div className="form-item">
          <label htmlFor="age" className="label">
            Age
          </label>
          <input
            {...register("age")}
            className="text-input"
            id="age"
            type="text"
            placeholder="Enter your age"
          />
          <div className="error-message">{errors.age?.message}</div>
        </div>
        <div className="form-item">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            {...register("email")}
            className="text-input"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
          <div className="error-message">{errors.email?.message}</div>
        </div>
        <div className="form-item">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            {...register("password")}
            className="text-input"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <div className="error-message">{errors.password?.message}</div>
        </div>
        <div className="form-item">
          <label htmlFor="password2" className="label">
            Confirm your password
          </label>
          <input
            {...register("password2")}
            className="text-input"
            id="password2"
            type="password"
            placeholder="Confirm your password"
          />
          <div className="error-message">{errors.password2?.message}</div>
        </div>
        <fieldset className="form-item">
          <legend>Gender</legend>
          <label htmlFor="male" className="label">
            Male
          </label>
          <input
            {...register("gender")}
            className="radio-input"
            type="radio"
            id="male"
            value="male"
          />
          <label htmlFor="female" className="label">
            Female
          </label>
          <input
            {...register("gender")}
            className="radio-input"
            type="radio"
            id="female"
            value="female"
          />
          <div className="error-message">{errors.gender?.message}</div>
        </fieldset>
        <div className="form-item">
          <label htmlFor="image" className="label">
            Upload an image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                setValue("image", file);
              }
            }}
          />
          <div className="error-message">{errors.image?.message}</div>
        </div>
        <div className="form-item">
          <label className="label" htmlFor="country">
            Country
          </label>
          <input {...register("country")} list="countryOptions" id="country" />
          <datalist id="countryOptions">
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </datalist>
          <div className="error-message">{errors.country?.message}</div>
        </div>
        <div className="form-item">
          <label htmlFor="acceptTC" className="label">
            Accept Terms and Conditions
          </label>
          <input {...register("acceptTC")} type="checkbox" id="acceptTC" />
          <div className="error-message">{errors.acceptTC?.message}</div>
        </div>
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="submit-button"
        >
          Submit
        </button>
      </form>
    </>
  );
}
