import "./ClearButton.css";

const ClearButton = (props) => {
  const clearApp = () => {
    props.onClearApp();
  };
  return (
    <button className="clearButton" onClick={clearApp}>
      X
    </button>
  );
};

export default ClearButton;
