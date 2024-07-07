import React, { ChangeEvent } from "react";

export type InputProps = {
  initialState: string;
  callback: (e: ChangeEvent) => void;
};
class Input extends React.Component {
  handleUpdate: (e: ChangeEvent) => void;
  constructor(props: InputProps) {
    super(props);
    this.handleUpdate = (e) => props.callback(e);
  }

  updateValue(e: ChangeEvent) {
    this.handleUpdate(e);
  }
  render() {
    return (
      <input
        className="input"
        placeholder="Enter pokemon name"
        onChange={(e) => {
          this.updateValue(e);
        }}
      ></input>
    );
  }
}

export default Input;
