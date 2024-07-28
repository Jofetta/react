import { clearItems } from '../../store/selectedItemsSlice';
import { useDispatch } from 'react-redux';

export default function UnselectButton() {
  const dispatch = useDispatch();
  return (
    <button
      className="button unselect-button"
      onClick={() => dispatch(clearItems())}
    >
      Unselect All
    </button>
  );
}
