import { Part } from "../../models/Parts";
import ChordLine from "../ChordLine";

interface Props {
  part: Part;
}

function ChordBlock({ part }: Props) {
  return (
    <div>
      {part.lines.map((line) => (
        <ChordLine chords={line.chords} />
      ))}
    </div>
  );
}

export default ChordBlock;
