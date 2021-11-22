import "./RandomBirthdayWishGenerator.css";

const RandomBirthdayWishGenerator = (props) => {
  const sentenceSnippets = {
    // TODO: SORT OUT PUNCTUATION AT THE END
    part1: [
      "totally",
      "seriously",
      "legitimately",
      "pretty much",
      "like,",
      "flippin'",
      "really, really,",
      "wholeheartedly",
      "fully",
      "gently & firmly",
      "flat out",
      "thoroughly",
      "publicly",
      "secretly",
      "most definitely",
    ],

    part2: [
      "rocks the Casbah",
      "rains pure magic",
      "turns water into wine",
      "confirms your genius",
      "is the bee's knees",
      "is visible from space",
      "makes kittens purr",
      "deserves slow claps",
      "works up a sweat",
      "has all the feels",
      "reaches for the stars",
      "lets its hair down",
      "is a dance marathon",
      "sweeps the Nation",
      "pumps up the volume",
    ],

    part3: [
      "big time",
      "4-ever",
      "right?",
      "end of story",
      "you feel me?",
      "'til dawn",
      "with sparkles",
      "period",
      "based on science",
      "like no tomorrow",
      "to the max",
      "no apologies",
      "for 20 minutes",
      "like a boss",
      "because it's ON",
    ],
  };

  const getNumber = () => {
    return Math.round(Math.random() * 14);
  };

  const getSentence = () => {
    return (
      "I hope your birthday " +
      sentenceSnippets.part1[getNumber()] +
      " " +
      sentenceSnippets.part2[getNumber()] +
      ", " +
      sentenceSnippets.part3[getNumber()] +
      "."
    );
  };

  const clickHandler = (event) => {
    props.getSentence(getSentence);
  };

  return (
    <div className="birtday-wish-box">
      <button onClick={clickHandler} className="birthday-wish-button">
        Wish me a happy birthday!
      </button>
    </div>
  );
};

export default RandomBirthdayWishGenerator;
