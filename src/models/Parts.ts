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
  constructor(
    public readonly coreNote: CoreNote,
    public readonly isMinor: boolean
  ) {}
}
