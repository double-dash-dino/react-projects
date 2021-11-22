import "./RandomCongratulationsGenerator.css";

const RandomCongratulationsGenerator = (props) => {
  const sentenceSnippets = {
    part1: [
      "deserving",
      "wholesome",
      "good-looking",
      "sweet-smelling",
      "long-bearded",
      "frisky",
      "overachieving",
      "enchanted",
      "vivacious",
      "board-certified",
      "morally pure",
      "immaculate",
      "charming",
      "twinkle-eyed",
      "serene",
    ],
    part2: [
      "well-adjusted",
      "very muscular",
      "disco dancing",
      "spiritually whole",
      "non-creepy",
      "spandex wearing",
      "always hygienic",
      "red hot",
      "down to party",
      "high voltage",
      "not constipated",
      "funky fresh",
      "snuggly",
      "tiger-clawed",
      "gold-plated",
    ],
    part3: [
      "earthling",
      "little flower",
      "member of society",
      "care bear",
      "love machine",
      "pillar of integrity",
      "forest elf",
      "cowgirl",
      "troublemaker",
      "sentient being",
      "gangsta",
      "miracle working",
      "bundle of joy",
      "doodlebug",
      "mofo",
    ],
  };
  const getNumber = () => {
    return Math.round(Math.random() * 14);
  };

  const getSentence = () => {
    return (
      "Congratulations! This could not have happened to a more " +
      sentenceSnippets.part1[getNumber()] +
      " and " +
      sentenceSnippets.part2[getNumber()] +
      " " +
      sentenceSnippets.part3[getNumber()] +
      "."
    );
  };

  const clickHandler = (event) => {
    props.getSentence(getSentence);
  };

  return (
    <div className="congratulations-box">
      <button className="congratulations-button" onClick={clickHandler}>
        Congratulate me!
      </button>
    </div>
  );
};

export default RandomCongratulationsGenerator;
