import "./ClearButton.css";

const ClearButton = (props) => {
  const clearApp = () => {
    props.onClearApp();
  };
  return (
    <button className="clear-button" onClick={clearApp}>
      X
    </button>
  );
};

export default ClearButton;
