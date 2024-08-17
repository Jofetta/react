import { useForm } from "react-hook-form";

type FormFields = {
  name: string;
  age: number;
  email: string;
  password: string;
  password2: string;
  gender: string;
  acceptTC: boolean;
  country: string;
};

export default function ReactHookForm() {
  const { register } = useForm<FormFields>();
  return (
    <>
      <h1 className="heading">React Hook Form</h1>
      <form className="form">
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
        </fieldset>
        <div className="form-item">
          <label htmlFor="acceptTC" className="label">
            Accept Terms and Conditions
          </label>
          <input {...register("acceptTC")} type="checkbox" id="acceptTC" />
        </div>
      </form>
    </>
  );
}
