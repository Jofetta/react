import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function SelectButton(props: {
  name: string;
  callback: () => void;
}) {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  return (
    <>
      <div
        className="select-button"
        onClick={(e) => {
          e.stopPropagation();
          props.callback();
        }}
      >
        <input
          type="checkbox"
          id={props.name}
          checked={
            selectedItems.findIndex((item) => item.name === props.name) === -1
              ? false
              : true
          }
        />
        <label htmlFor={props.name}>Select</label>
      </div>
    </>
  );
}
