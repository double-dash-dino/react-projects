import React, { useState } from "react";
import ClearButton from "../UI/ClearButton.js";
import "./random-quote-app.css";

// TODO: FIX STYLING SO THAT IT WORKS WELL ON ALL DEVICES

const RandomQuoteApp = (props) => {
  const [quote, setQuote] = useState(
    "Life isn’t about getting and having, it’s about giving and being."
  );
  const [author, setAuthor] = useState("Kevin Kruse");
  const [colourNumber, setColourNumber] = useState(0);
  const [copied, setCopied] = useState(false);

  const coloursList = ["#E27D60", "#85DCB8", "#E8A87C", "#C38D9E", "#41B3A3"];

  let backgroundStyle = { backgroundColor: coloursList[colourNumber] };
  let fontStyle = { color: coloursList[colourNumber] };

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
      });

    if (colourNumber >= coloursList.length - 1) {
      setColourNumber(0);
    } else {
      setColourNumber(parseInt(colourNumber) + 1);
    }
    setCopied(false);
  };

  const linkToTweet =
    "https://twitter.com/intent/tweet?text=" +
    quote +
    "%0A%09- " +
    author +
    "%0A%0A Get more wisdom by visiting https://lionels-react-projects.netlify.app/";

  const clearApp = () => {
    props.onClearApp();
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(quote + "\n-" + author);
    setCopied(true);
  };

  return (
    <div className="random-quote-app" style={backgroundStyle}>
      <ClearButton onClearApp={clearApp} />
      <div className="quote-card" style={fontStyle}>
        <div className="quote-box">
          <p>
            <i class="fa fa-quote-left" aria-hidden="true"></i>
            {quote}
          </p>
        </div>

        <h5 className="author">- {author}</h5>
        <div className="quote-card-controls">
          <div className="sharing-buttons">
            <a className="btn" href={linkToTweet} style={backgroundStyle}>
              <i class="fa fa-twitter fa-2x"></i>
            </a>
            {copied === false && (
              <button
                className="btn"
                id="copy-quote"
                onClick={copyQuote}
                style={backgroundStyle}
              >
                <i className="fa fa-clipboard fa-2x"></i>
              </button>
            )}
            {copied === true && <p className="copied-message">Copied!</p>}
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
