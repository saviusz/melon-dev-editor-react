import "./style.css";
import { Chord } from "../../models/Parts";

interface Props {
  chord: Chord;
}

function ChordChip({ chord }: Props) {
  return <span className="chord-chip">{chord.getPolishNotation()}</span>;
}

export default ChordChip;
