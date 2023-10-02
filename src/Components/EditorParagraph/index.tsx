import { FormEvent, KeyboardEvent } from "react";
import "./style.css";

export interface Params {
  content: string;
  onDelete: () => void;
  onChangeFocus: (direction: number) => void;
}

function EditorParagraph({ content, onDelete, onChangeFocus }: Params) {
  function handleRightArrow(e: KeyboardEvent) {}
  function handleBackspace(e: KeyboardEvent) {
    if (content.length == 0) {
      e.preventDefault();
      onChangeFocus(-1);
      onDelete();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "Backspace":
        return handleBackspace(event);
      case "RightArrow":
        return handleRightArrow(event);
    }
  }
  function handleInput(event: FormEvent<HTMLParagraphElement>) {}

  return (
    <p
      className="editor-paragraph"
      contentEditable="true"
      onKeyDown={handleKeydown}
      onInput={handleInput}
    >
      {content}
    </p>
  );
}

export default EditorParagraph;
