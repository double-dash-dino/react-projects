import "./RandomShakespeareInsultGenerator.css";

const RandomShakespeareInsultGenerator = (props) => {
  const shakespeare1 = [
    "gorbellied",
    "roguish",
    "impertinent",
    "frothy",
    "bawdy",
    "lascivious",
    "surly",
    "spleeny",
    "mumbling",
    "withered",
  ];
  const shakespeare2 = [
    "bacon-fed",
    "clapper-clawed",
    "beef-witted",
    "urchin-snouted",
    "onion-eyed",
    "rough-hewn",
    "pottle-deep",
    "toad-spotted",
    "clay-brained",
    "boil-brained",
  ];
  const shakespeare3 = [
    "fishmonger",
    "coxcomb",
    "miscreant",
    "bag of guts",
    "wagtail",
    "lewdster",
    "bugbear",
    "horn-beast",
    "horn-beast",
    "scurvy-knave",
    "malt-worm",
  ];

  const getNumber = () => {
    return Math.round(Math.random() * 9);
  };

  const getSentence = () => {
    return (
      "I miss thee greatly, thou " +
      shakespeare1[getNumber()] +
      ", " +
      shakespeare2[getNumber()] +
      " " +
      shakespeare3[getNumber()] +
      "!"
    );
  };

  const clickHandler = (event) => {
    props.getSentence(getSentence);
  };

  return (
    <div className="shakespeare-box">
      <button onClick={clickHandler} className="button-shakespeare">
        Insult me in the style of Shakespeare!
      </button>
    </div>
  );
};

export default RandomShakespeareInsultGenerator;
