import "./clearButton.css";

const clearButton = (props) => {
  const clearApp = () => {
    props.onClearApp();
  };
  return (
    <button className="clearButton" onClick={clearApp}>
      X
    </button>
  );
};

export default clearButton;
