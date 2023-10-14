export enum PartType {
  Note = "note",
  Bridge = "bridge",
  Verse = "verse",
  Chorus = "chorus",
  Ornament = "ornament",
}

export class Part {
  constructor(
    public readonly type: PartType,
    public readonly lines: Line[],
    public readonly name?: String
  ) {}

  copyWith(change: { type?: PartType; lines?: Line[]; name?: string }) {
    return new Part(
      change.type ?? this.type,
      change.lines ?? this.lines,
      change.name ?? this.name
    );
  }
}

export class Line {
  constructor(public readonly text: String, public readonly chords: Chord[]) {}
}

export enum CoreNote {
  a = "a",
  b = "b",
  h = "h",
  c = "c",
  d = "d",
  e = "e",
  f = "f",
  g = "g",
}

export class Chord {
  private static listOfNames: Map<string, Chord>;
  static get possibleNames() {
    if (this.listOfNames) return this.listOfNames;
    const map = new Map<string, Chord>();
    for (const note of Object.keys(CoreNote)) {
      const keyNote = note as keyof typeof CoreNote;
      const variations = [
        new Chord(CoreNote[keyNote], false),
        new Chord(CoreNote[keyNote], true),
      ];
      variations.forEach((v) => {
        map.set(v.getPolishNotation(), v);
      });
    }
    this.listOfNames = map;
    return this.listOfNames;
  }

  static fromString(input: string) {
    return this.possibleNames.get(input) as Chord;
  }

  constructor(
    public readonly coreNote: CoreNote,
    public readonly isMinor: boolean
  ) {}

  getPolishNotation() {
    const output = this.isMinor
      ? this.coreNote.toString()
      : this.coreNote.toString().toUpperCase();
    return output;
  }
}
