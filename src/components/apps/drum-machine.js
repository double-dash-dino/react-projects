import "./drum-machine.css";
import React, { useState, useEffect } from "react";
import ClearButton from "../UI/ClearButton.js";

const DrumMachine = (props) => {
  const sounds = [document.getElementsByClassName("clip")];

  const [activeKey, setActiveKey] = useState("");
  const [volume, setVolume] = useState(0.5);

  for (let i = 0; i < sounds[0].length; i++) {
    sounds[0][i].volume = volume;
  }

  const handleVolume = (event) => {
    setVolume(parseFloat(event.target.value));
  };
  useEffect(() => {
    const handleKeydown = (event) => {
      switch (event.key) {
        case "q":
          clickHandlerQ();
          break;
        case "w":
          clickHandlerW();
          break;
        case "e":
          clickHandlerE();
          break;
        case "a":
          clickHandlerA();
          break;
        case "s":
          clickHandlerS();
          break;
        case "d":
          clickHandlerD();
          break;
        case "z":
          clickHandlerZ();
          break;
        case "x":
          clickHandlerX();
          break;
        case "c":
          clickHandlerC();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [activeKey, volume]);

  const clickHandlerQ = () => {
    setActiveKey("q");
    document.getElementById("hi-hat-audio").play();
  };

  const clickHandlerW = () => {
    setActiveKey("w");
    document.getElementById("snare-drum-audio").play();
  };

  const clickHandlerE = () => {
    setActiveKey("e");

    document.getElementById("kick-drum-audio").play();
  };

  const clickHandlerA = () => {
    setActiveKey("a");

    document.getElementById("tom-01-audio").play();
  };

  const clickHandlerS = () => {
    setActiveKey("s");
    document.getElementById("tom-02-audio").play();
  };

  const clickHandlerD = () => {
    setActiveKey("d");
    document.getElementById("tom-03-audio").play();
  };

  const clickHandlerZ = () => {
    setActiveKey("z");
    document.getElementById("trash-cymbal-audio").play();
  };

  const clickHandlerX = () => {
    setActiveKey("x");
    document.getElementById("crash-cymbal-audio").play();
  };

  const clickHandlerC = () => {
    setActiveKey("c");
    document.getElementById("cow-bell-audio").play();
  };

  const instrumentName = (key) => {
    switch (key) {
      case "q":
        return "Hi-hat";
      case "w":
        return "Snare drum";
      case "e":
        return "Kick drum";
      case "a":
        return "Tom 1";
      case "s":
        return "Tom 2";
      case "d":
        return "Tom 3";
      case "z":
        return "Trash cymbal";
      case "x":
        return "Crash cymbal";
      case "c":
        return "Cow bell";
      default:
        return "Try pressing a key";
    }
  };

  const clearApp = () => {
    props.onClearApp();
  };

  return (
    <div className="drum-machine">
      <ClearButton onClearApp={clearApp} />
      <div id="drum-machine" className="drum-card">
        <div className="card-header">Make some noise!</div>
        <div className="card-body">
          <div className="drum-buttons">
            <button
              className="drum-pad"
              value="q"
              id="hi-hat"
              onClick={clickHandlerQ}
            >
              <audio
                className="clip"
                id="hi-hat-audio"
                src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/hi_hat.wav"
              ></audio>
              Q
            </button>
            <button
              id="snare-drum"
              className="drum-pad "
              value="w"
              onClick={clickHandlerW}
            >
              <audio
                className="clip"
                id="snare-drum-audio"
                src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/snare.wav"
                volume="0"
              ></audio>
              W
            </button>
            <button id="kick-drum" className="drum-pad" onClick={clickHandlerE}>
              E
              <audio
                className="clip"
                id="kick-drum-audio"
                src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/kick.wav"
              ></audio>
            </button>
            <button id="tom1" className="drum-pad" onClick={clickHandlerA}>
              <audio
                className="clip"
                id="tom-01-audio"
                src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/tom01.wav"
              ></audio>
              A
            </button>
            <button id="tom2" className="drum-pad" onClick={clickHandlerS}>
              <audio
                className="clip"
                id="tom-02-audio"
                src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/tom02.wav"
              ></audio>
              S
            </button>
            <button id="tom3" className="drum-pad" onClick={clickHandlerD}>
              <audio
                className="clip"
                id="tom-03-audio"
                src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/tom03.wav"
              ></audio>
              D
            </button>
            <button
              id="trash-cymbal"
              className="drum-pad"
              onClick={clickHandlerZ}
            >
              <audio
                className="clip"
                id="trash-cymbal-audio"
                src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/trash-hard.wav"
              ></audio>
              Z
            </button>
            <button
              id="crash-cymbal"
              className="drum-pad"
              onClick={clickHandlerX}
            >
              <audio
                className="clip"
                id="crash-cymbal-audio"
                src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/crash-soft.wav"
              ></audio>
              X
            </button>
            <button id="cow-bell" className="drum-pad" onClick={clickHandlerC}>
              C
              <audio
                className="clip"
                id="cow-bell-audio"
                src="https://react-course-assets.s3.eu-west-2.amazonaws.com/audio/cowbell.wav"
              ></audio>
            </button>
          </div>
          <div className="drum-settings">
            <div className="volume-setting">
              Volume
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                className="volume-slider"
                onChange={handleVolume}
              ></input>
            </div>
            <div id="display" className="sound-name">
              {instrumentName(activeKey)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
