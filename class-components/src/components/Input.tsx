import { ChangeEvent } from 'react';

export type InputProps = {
  initialState: string | undefined;
  callback: (e: ChangeEvent) => void;
};
function Input (props: InputProps) {

    return (
      <input
        defaultValue={props.initialState ? props.initialState : ''}
        className="input"
        placeholder="Enter pokemon name"
        onChange={(e) => {
          props.callback(e);
        }}
      ></input>
    );
}

export default Input;
