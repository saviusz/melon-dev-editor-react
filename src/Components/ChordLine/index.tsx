import "./style.css";
import { Chord } from "../../models/Parts";
import ChordChip from "../ChordChip";
import ChordInput from "../ChordInput";

interface Props {
  chords: Chord[];
}

function ChordLine({ chords }: Props) {
  console.log(Chord.possibleNames);
  return (
    <div className="chord-line">
      {chords.map((chord) => (
        <>
          <ChordInput
            onPrevInput={() => {}}
            onNextInput={() => {}}
            onAddChord={() => {}}
            onDeleteChord={() => {}}
          />
          <ChordChip chord={chord} />
        </>
      ))}
    </div>
  );
}

export default ChordLine;
