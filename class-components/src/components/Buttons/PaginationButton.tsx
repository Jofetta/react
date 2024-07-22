import { useEffect, useState } from 'react';

export default function PaginationButton(props: {
  classList: string;
  callback: () => void;
  currentPage: number;
}) {
  const [classes, setClasses] = useState(props.classList);
  let buttonContent = '<';
  if (props.classList === 'pagination-forward') {
    buttonContent = '>';
  }

  useEffect(() => {
    if (props.currentPage === 1 && props.classList === 'pagination-back') {
      setClasses(props.classList + ' disabled');
    } else {
      setClasses(props.classList);
    }
  }, [props.classList, props.currentPage]);
  return (
    <div className={classes} onClick={props.callback}>
      {buttonContent}
    </div>
  );
}
