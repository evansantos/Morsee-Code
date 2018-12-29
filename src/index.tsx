import * as React from "react";
import { render } from "react-dom";
import { encode } from "morsee";

import "./styles.css";

const convertCodeToAudio = ({
  value = null,
  shouldPlay = false
}: {
  value?: String;
  shouldPlay?: Boolean;
}) => {
  if (!value || !shouldPlay) {
    return false;
  }

  const AudioContext: any = window.AudioContext || window.webkitAudioContext;
  const ctx: AudioContext = new AudioContext();
  const dot: Number = 1.2 / 15;

  let t: Number = ctx.currentTime;

  const oscillator: any = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 600;

  const gainNode: any = ctx.createGain();
  gainNode.gain.setValueAtTime(0, t);

  value.split("").forEach(function(letter: String) {
    switch (letter) {
      case ".":
        gainNode.gain.setValueAtTime(1, t);
        t += dot;
        gainNode.gain.setValueAtTime(0, t);
        t += dot;
        break;
      case "-":
        gainNode.gain.setValueAtTime(1, t);
        t += 3 * dot;
        gainNode.gain.setValueAtTime(0, t);
        t += dot;
        break;
      case " ":
        t += 7 * dot;
        break;
    }
  });

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();

  return false;
};

const TextEditor: FunctionComponent<{ onChangeHandler?: Function }> = ({
  onChangeHandler
}) => {
  return (
    <textarea
      placeholder="Insert your text here"
      rows="25"
      cols="50"
      onChange={(evt: FormEvent<HTMLSelectElement>) =>
        onChangeHandler(encode(evt.currentTarget.value))
      }
    />
  );
};

const MorseeContent: FunctionComponent<{ updatedCode?: string }> = ({
  updatedCode = ""
}) => {
  return (
    <div>
      <h3>Converted Code Morsee:</h3>
      <p>{updatedCode}</p>
      <button
        onClick={(evt: React.MouseEvent<HTMLElement>) =>
          convertCodeToAudio({ value: updatedCode, shouldPlay: true })
        }
      >
        Play it
      </button>
    </div>
  );
};

const App: FunctionComponent<{ initial?: string }> = ({ initial = "" }) => {
  const [code, setCode] = React.useState(initial);

  return (
    <div className="App">
      <h1>Code Morsee Converter</h1>
      <TextEditor onChangeHandler={setCode} />

      <MorseeContent updatedCode={code} />
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
