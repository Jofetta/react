import { useSelector } from "react-redux";
import { FormFields } from "../types/formTypes";

import { Link } from "react-router-dom";
import { RootState } from "../store/store";

export default function MainPage() {
  const uncontrolledFormData: FormFields = useSelector(
    (state: RootState) => state.uncontrolledComponent,
  );
  const reactHookFormData: FormFields = useSelector(
    (state: RootState) => state.reactHook,
  );

  return (
    <>
      <h1 className="heading">Main Page</h1>
      <nav className="nav-container">
        <Link className="nav-link" to={"/uncontrolled"}>
          Uncontrolled Components Form
        </Link>
        <Link className="nav-link" to={"/react-hook"}>
          React Hook Form
        </Link>
      </nav>
      <div className="form-data-container">
        {uncontrolledFormData.name && (
          <div className="data-block">
            <h3> Uncontrolled Components Form Data</h3>
            <p>Name: {uncontrolledFormData.name}</p>
            <p>Age: {uncontrolledFormData.age}</p>
            <p>Email: {uncontrolledFormData.email}</p>
            <p>Gender: {uncontrolledFormData.gender}</p>
          </div>
        )}
        {reactHookFormData.name && (
          <div className="data-block">
            <h3> React Hook Form Data</h3>
            <p>Name: {reactHookFormData.name}</p>
            <p>Age: {reactHookFormData.age}</p>
            <p>Email: {reactHookFormData.email}</p>
            <p>Gender: {reactHookFormData.gender}</p>
          </div>
        )}
      </div>
    </>
  );
}
