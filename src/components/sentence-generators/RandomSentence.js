import "./RandomSentence.css";

const RandomSentence = (props) => {
  return (
    <div className="random-sentence">
      <p>{props.sentence}</p>
    </div>
  );
};

export default RandomSentence;
