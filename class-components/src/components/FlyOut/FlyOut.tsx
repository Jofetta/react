import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import UnselectButton from '../Buttons/UnselectButton';
import DownloadButton from '../Buttons/DownloadButton';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

export default function Flyout() {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const darkTheme = useContext(ThemeContext);

  return (
    <>
      <div
        className={
          selectedItems.length < 1
            ? 'fly-out hidden'
            : darkTheme.darkTheme
              ? 'fly-out dark'
              : 'fly-out'
        }
      >
        <h1>{`You have selected ${selectedItems.length} pokemon${selectedItems.length > 1 ? 's' : ''}`}</h1>
        <UnselectButton />
        <DownloadButton />
      </div>
    </>
  );
}
