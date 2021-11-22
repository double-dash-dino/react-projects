import "./RandomThankYouGenerator.css";

const RandomThankYouGenerator = (props) => {
  const sentenceSnippets = {
    part1: [
      "so insanely",
      "unbelievably",
      "gosh darn",
      "110%",
      "mostly",
      "forever",
      "uncommonly",
      "undeniably",
      "full-on",
      "stubbornly",
      "officially",
      "quite seriously",
      "shockingly",
      "scandalously",
      "effortlessly",
    ],
    part2: [
      "majestic",
      "warm and shiny",
      "crazy generous",
      "hip to the funky jive",
      "mysterious & magical",
      "all-knowing & mighty",
      "overflowing with joy",
      "bright in the darkness",
      "full of rainbows",
      "my secret hero",
      "rocking it",
      "drop dead fantastic",
      "in tune with my chakras",
      "lion-hearted",
      "transcendental",
    ],
    part3: [
      "and a solid hugger",
      "my little muffin",
      "and a chipper as well",
      "in such cute outfits",
      "and nice smelling",
      "in a saucy way",
      "when I needed it",
      "like a soaring eagle",
      "despite my defects",
      "for free",
      "you human miracle",
      "like a box of kittens",
      "you foxy thang",
      "like springtime",
      "for the heck of it",
    ],
  };

  const getNumber = () => {
    return Math.round(Math.random() * 14);
  };

  const getSentence = () => {
    return (
      "Thank you for being " +
      sentenceSnippets.part1[getNumber()] +
      " " +
      sentenceSnippets.part2[getNumber()] +
      ", " +
      sentenceSnippets.part3[getNumber()] +
      "."
    );
  };

  const onClickHandler = (event) => {
    props.getSentence(getSentence);
  };

  return (
    <div>
      <button className="button-thank-you" onClick={onClickHandler}>
        Show me some gratitude!
      </button>
    </div>
  );
};

export default RandomThankYouGenerator;
