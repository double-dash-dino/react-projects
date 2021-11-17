import React, { useState } from "react";
import "./random-quote-app.css";

// TODO: FIX STYLING SO THAT IT WORKS WELL ON ALL DEVICES
// ADD MORE / BETTER COLOURS
// MAKE IT IMPOSSIBLE TO GET THE SAME QUOTE / COLOUR TWICE IN A ROW

const RandomQuoteApp = () => {
  const [quote, setQuote] = useState(
    "Life isn’t about getting and having, it’s about giving and being."
  );
  const [author, setAuthor] = useState("Kevin Kruse");
  const [colour, setColour] = useState("#E27D60");

  const colours = ["#E27D60", "#85DCB8", "#E8A87C", "#C38D9E", "#41B3A3"];

  let backgroundStyle = { backgroundColor: colour };
  let fontStyle = { color: colour };

  const getRandomNumber = (listLength) => {
    return Math.round(Math.random() * listLength);
  };

  const clickHandler = () => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        let quoteNumber = getRandomNumber(101);
        setQuote(responseJson.quotes[quoteNumber].quote);
        setAuthor(responseJson.quotes[quoteNumber].author);
        setColour(colours[getRandomNumber(colours.length - 1)]);
      });
  };

  const linkToTweet =
    "https://twitter.com/intent/tweet?text=" +
    quote +
    "%0A%09- " +
    author +
    "%0A%0A Get more wisdom by visiting https://codepen.io/double-dash-dino/pen/ZEeyKYP";

  return (
    <div className="main-page" style={backgroundStyle}>
      <div className="quote-card" style={fontStyle}>
        <h2 className="quote">
          <i class="fa fa-quote-left" aria-hidden="true"></i>
          {quote}
        </h2>

        <h5 className="author">- {author}</h5>
        <div className="quote-card-controls">
          <div className="sharing-buttons">
            <a className="btn" href={linkToTweet} style={backgroundStyle}>
              <i class="fa fa-twitter fa-2x"></i>
            </a>
            <a className="btn" href="#" style={backgroundStyle}>
              <i class="fa fa-facebook fa-2x"></i>
            </a>
          </div>
          <div className="new-quote">
            <button
              className="new-quote-button"
              onClick={clickHandler}
              style={backgroundStyle}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuoteApp;
