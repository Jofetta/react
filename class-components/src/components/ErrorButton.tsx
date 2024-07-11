import { useState } from "react";

export default function ErrorButton () {

  const [errorState, setErrorState] = useState(false);

  function throwError() {
    setErrorState(true);
  }

    if (errorState) {
      throw new Error('User generated an error');
    } else {
      return (
        <button
          className="search-button error-button"
          onClick={() => throwError()}
        >
          Throw an Error
        </button>
      );
    }
  
}
