import { useState } from "react";
import "./App.css";
import SongEditor from "./Components/SongEditor";
import { Part, PartType, Line, CoreNote, Chord } from "./models/Parts";

const chord = new Chord(CoreNote.a, false);

const initialContent = [
  new Part(PartType.Verse, [
    new Line("Linijka 1", [chord]),
    new Line("Linijka 2", [chord]),
    new Line("Linijka 3", [chord]),
    new Line("Linijka 4", [chord]),
  ]),
  new Part(PartType.Chorus, [
    new Line("Linijka 1", [chord]),
    new Line("Linijka 2", [chord]),
    new Line("Linijka 3", [chord]),
    new Line("Linijka 4", [chord]),
  ]),
];

const handleSave = (content: Part[]) => {
  console.log(`Saved: `, content);
};

function App() {
  return (
    <SongEditor
      content={initialContent}
      onSave={handleSave}
    />
  );
}

export default App;
