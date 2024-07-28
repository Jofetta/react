import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import UnselectButton from '../Buttons/UnselectButton';

export default function Flyout() {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  return (
    <>
      <div className={selectedItems.length > 0 ? 'fly-out' : 'fly-out hidden'}>
        <h1>{`You have selected ${selectedItems.length} pokemon${selectedItems.length > 1 ? 's' : ''}`}</h1>
        <UnselectButton />
      </div>
    </>
  );
}
