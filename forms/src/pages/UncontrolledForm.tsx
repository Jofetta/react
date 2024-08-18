import { useRef } from "react";
import { userSchema } from "../utils/validation";
import { saveData } from "../store/UncontrolledComponentsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";

export default function UncontrolledForm() {
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const password2Input = useRef<HTMLInputElement>(null);
  const genderMaleInput = useRef<HTMLInputElement>(null);
  const genderFemaleInput = useRef<HTMLInputElement>(null);
  const acceptTCInput = useRef<HTMLInputElement>(null);
  const nameError = useRef<HTMLDivElement | null>(null);
  const ageError = useRef<HTMLDivElement | null>(null);
  const emailError = useRef<HTMLDivElement | null>(null);
  const passwordError = useRef<HTMLDivElement | null>(null);
  const password2Error = useRef<HTMLDivElement | null>(null);
  const genderError = useRef<HTMLDivElement | null>(null);
  const acceeptTCError = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function clearAllErrors() {
    if (nameError.current) nameError.current.textContent = "";
    if (ageError.current) ageError.current.textContent = "";
    if (emailError.current) emailError.current.textContent = "";
    if (passwordError.current) passwordError.current.textContent = "";
    if (password2Error.current) password2Error.current.textContent = "";
    if (genderError.current) genderError.current.textContent = "";
    if (acceeptTCError.current) acceeptTCError.current.textContent = "";
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const data = {
      name: nameInput.current?.value || "",
      age: Number(ageInput.current?.value) || 0,
      email: emailInput.current?.value || "",
      password: passwordInput.current?.value || "",
      password2: password2Input.current?.value || "",
      gender: genderMaleInput.current?.checked
        ? "male"
        : genderFemaleInput.current?.checked
          ? "female"
          : "",
      acceptTC: acceptTCInput.current?.checked || false,
    };

    try {
      await userSchema.validate(data);
      dispatch(saveData(data));
      console.log(data);
      navigate("/");
    } catch (err) {
      if (err instanceof ValidationError) {
        clearAllErrors();
        if (err.path === "name" && nameError.current)
          nameError.current.textContent = err.errors[0];
        if (err.path === "age" && ageError.current)
          ageError.current.textContent = err.errors[0];
        if (err.path === "email" && emailError.current)
          emailError.current.textContent = err.errors[0];
        if (err.path === "password" && passwordError.current)
          passwordError.current.textContent = err.errors[0];
        if (err.path === "password2" && password2Error.current)
          password2Error.current.textContent = err.errors[0];
        if (err.path === "gender" && genderError.current)
          genderError.current.textContent = err.errors[0];
        if (err.path === "acceptTC" && acceeptTCError.current)
          acceeptTCError.current.textContent = err.errors[0];
      }
    }
  }

  return (
    <>
      <h1 className="heading">Uncontrolled Approach Form</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-item">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            className="text-input"
            id="name"
            type="text"
            placeholder="Enter your name"
            ref={nameInput}
          ></input>
          <div className="error-message" ref={nameError}></div>
        </div>
        <div className="form-item">
          <label htmlFor="age" className="label">
            Age
          </label>
          <input
            className="text-input"
            id="age"
            type="text"
            placeholder="Enter your age"
            ref={ageInput}
          />
          <div className="error-message" ref={ageError}></div>
        </div>
        <div className="form-item">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="text-input"
            id="email"
            type="email"
            placeholder="Enter your email"
            ref={emailInput}
          />
          <div className="error-message" ref={emailError}></div>
        </div>
        <div className="form-item">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="text-input"
            id="password"
            type="password"
            placeholder="Enter your password"
            ref={passwordInput}
          />
          <div className="error-message" ref={passwordError}></div>
        </div>
        <div className="form-item">
          <label htmlFor="password2" className="label">
            Confirm your password
          </label>
          <input
            className="text-input"
            id="password2"
            type="password"
            placeholder="Confirm your password"
            ref={password2Input}
          />
          <div className="error-message" ref={password2Error}></div>
        </div>
        <fieldset className="form-item">
          <legend>Gender</legend>
          <label htmlFor="male" className="label">
            Male
          </label>
          <input
            className="radio-input"
            type="radio"
            name="gender"
            id="male"
            value="male"
            ref={genderMaleInput}
          />
          <label htmlFor="female" className="label">
            Female
          </label>
          <input
            className="radio-input"
            type="radio"
            name="gender"
            id="female"
            value="female"
            ref={genderFemaleInput}
          />
          <div className="error-message" ref={genderError}></div>
        </fieldset>
        <div className="form-item">
          <label htmlFor="acceptTC" className="label">
            Accept Terms and Conditions
          </label>
          <input type="checkbox" id="acceptTC" ref={acceptTCInput} />
          <div className="error-message" ref={acceeptTCError}></div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
