export type ButtonProps = {
  callback: () => void;
};
function SearchButton(props: ButtonProps) {
  return (
    <button className="button search-button" onClick={props.callback}>
      Search
    </button>
  );
}

export default SearchButton;
