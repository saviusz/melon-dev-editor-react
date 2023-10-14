import "./style.css";
import { Chord, Line, Part } from "../../models/Parts";
import { useRef } from "react";

interface Props {
  part: Part;
  onUpdate: (p: Part) => void;
  outRef?: (elem: HTMLDivElement | null) => void;
}

function ChordBlock({ part, onUpdate, outRef }: Props) {
  const container = useRef<HTMLDivElement | null>(null);

  const handleBlur = () => {
    const newLines = [];
    const chordLines = container.current?.innerText.split("\n") ?? [];
    for (const [i, line] of part.lines.entries()) {
      const newChords = chordLines[i]
        .split(" ")
        .map((x) => Chord.fromString(x));
      newLines.push(new Line(line.text, newChords));
    }
    onUpdate(part.copyWith({ lines: newLines }));
  };

  return (
    <div
      className="t--chord-block"
      contentEditable="true"
      onBlur={handleBlur}
      ref={(e) => {
        if (outRef) outRef(e);
        container.current = e;
      }}
    >
      {part.lines
        .map((line) => line.chords.map((c) => c.getPolishNotation()).join(" "))
        .join("\n")}
    </div>
  );
}

export default ChordBlock;
