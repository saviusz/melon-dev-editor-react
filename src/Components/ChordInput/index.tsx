import "./style.css";
import { Chord } from "../../models/Parts";
import { useRef } from "react";

interface Props {
  onPrevInput: () => void;
  onNextInput: () => void;
  onAddChord: (chord: Chord) => void;
  onDeleteChord: () => void;
}

function ChordInput({}: Props) {
  const container = useRef<HTMLDivElement>(null);

  const handleBlur = () => {
    if (container.current == null) return;
    container.current.innerText = "";
  };

  return (
    <div
      className="chord-input"
      contentEditable="true"
      ref={container}
      onBlur={handleBlur}
    >
      <div
        className="chord-input--selection--box"
        contentEditable="false"
      >
        {[...Chord.possibleNames.keys()].map((x) => (
          <div className="chord-input--selection--option">{x}</div>
        ))}
      </div>
    </div>
  );
}

export default ChordInput;
