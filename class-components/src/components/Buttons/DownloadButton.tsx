import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import convertArrayToCSV from '../../utils/convertToCSV';

export default function DownloadButton() {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  function downloadCSV() {
    const csv = convertArrayToCSV(selectedItems);
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute(
      'download',
      `${selectedItems.length}_pokemon${selectedItems.length > 1 ? 's' : ''}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return <button onClick={() => downloadCSV()}>Download All</button>;
}
