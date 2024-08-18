import { useForm } from "react-hook-form";
import { userSchema } from "../utils/validation";
import { saveData } from "../store/ReactHookFormSlice";

import type { FormFields } from "../types/formTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FormFields) => {
    console.log(data);
    const isValid = await userSchema.isValid(data);
    console.log(isValid);
    if (isValid) {
      dispatch(saveData(data));
      navigate("/");
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
            name="gender"
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
            name="gender"
            type="radio"
            id="female"
            value="female"
          />
          <div className="error-message">{errors.gender?.message}</div>
        </fieldset>
        <div className="form-item">
          <label htmlFor="acceptTC" className="label">
            Accept Terms and Conditions
          </label>
          <input {...register("acceptTC")} type="checkbox" id="acceptTC" />
          <div className="error-message">{errors.acceptTC?.message}</div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
