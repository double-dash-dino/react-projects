import "./random-sentence-generator.css";
import React, { useState } from "react";
import ClearButton from "../UI/ClearButton.js";

import RandomPepTalkGenerator from "../sentence-generators/RandomPepTalkGenerator";
import RandomShakespeareInsultGenerator from "../sentence-generators/RandomShakespeareInsultGenerator.js";
import RandomSentence from "../sentence-generators/RandomSentence.js";
import RandomThankYouGenerator from "../sentence-generators/RandomThankYouGenerator.js";
import RandomBirthdayWishGenerator from "../sentence-generators/RandomBirthdayWishGenerator.js";
import RandomCongratulationsGenerator from "../sentence-generators/RandomCongratulationsGenerator.js";

const RandomSentenceGenerator = (props) => {
  const [sentence, setSentence] = useState("");
  const onGetSentence = (sentence) => {
    setSentence(sentence);
  };

  const clearApp = () => {
    props.onClearApp();
  };

  return (
    <div className="App">
      <ClearButton onClearApp={clearApp} />
      <h2>What do you need?</h2>
      <br />
      <div className="generator-controls">
        <RandomPepTalkGenerator getSentence={onGetSentence} />
        <RandomShakespeareInsultGenerator getSentence={onGetSentence} />
        <RandomThankYouGenerator getSentence={onGetSentence} />
        <RandomBirthdayWishGenerator getSentence={onGetSentence} />
        <RandomCongratulationsGenerator getSentence={onGetSentence} />
      </div>

      <RandomSentence sentence={sentence} />
    </div>
  );
};

export default RandomSentenceGenerator;
