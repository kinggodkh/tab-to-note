import React, { useState } from "react";
import "./App.css";

const noteNames = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];
const standardTuning = [
  { note: "E", octave: 4 }, // String 1
  { note: "B", octave: 3 }, // String 2
  { note: "G", octave: 3 }, // String 3
  { note: "D", octave: 3 }, // String 4
  { note: "A", octave: 2 }, // String 5
  { note: "E", octave: 2 }, // String 6
];

const noteToIndex = {
  A: 0,
  "A#": 1,
  B: 2,
  C: 3,
  "C#": 4,
  D: 5,
  "D#": 6,
  E: 7,
  F: 8,
  "F#": 9,
  G: 10,
  "G#": 11,
};

const StringInput = ({ stringNumber, onChange, value, notes }) => {
  return (
    <div className="string-input">
      <label htmlFor={`string-${stringNumber}`}>String {stringNumber}:</label>
      <input
        type="text"
        id={`string-${stringNumber}`}
        onChange={(e) => onChange(stringNumber, e.target.value)}
        value={value}
      />
      <div className="notes-output">{notes}</div>
    </div>
  );
};

function App() {
  const [inputs, setInputs] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const handleInputChange = (stringNumber, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [stringNumber]: value,
    }));
  };

  const handleReset = () => {
    setInputs({
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
    });
  };

  const getNotesForString = (stringNumber, frets) => {
    const fretNumbers = frets.split(",").map((fret) => parseInt(fret.trim()));
    if (fretNumbers.some(isNaN)) {
      return "-";
    }

    const stringTuning = standardTuning[stringNumber - 1];
    const startIndex = noteToIndex[stringTuning.note];
    const startOctave = stringTuning.octave;

    return fretNumbers
      .map((fret) => {
        const noteIndex = (startIndex + fret) % 12;
        const noteName = noteNames[noteIndex];
        const octave = startOctave + Math.floor((startIndex + fret) / 12);
        return `${noteName}${octave}`;
      })
      .join(", ");
  };

  return (
    <div className="container">
      <h1>Guitar Tab to Note Converter</h1>
      <div className="input-container">
        {Object.keys(inputs).map((stringNumber) => (
          <StringInput
            key={stringNumber}
            stringNumber={stringNumber}
            value={inputs[stringNumber]}
            onChange={handleInputChange}
            notes={getNotesForString(
              parseInt(stringNumber),
              inputs[stringNumber]
            )}
          />
        ))}
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
