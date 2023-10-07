import { FormEvent, KeyboardEvent, MutableRefObject, useRef } from "react";
import "./style.css";

export interface Params {
  content: string;
  onDelete: () => void;
  onChangeFocus: (direction: number) => void;
  onParagraphAdd: () => void;
  outRef: (elem: HTMLParagraphElement | null) => void;
}

function EditorParagraph({
  content,
  onDelete,
  onChangeFocus,
  outRef,
  onParagraphAdd,
}: Params) {
  const p = useRef<HTMLParagraphElement | null>(null);

  const handleRightArrow = (e: KeyboardEvent) => {};
  const handleBackspace = (e: KeyboardEvent) => {
    if (checkCurrentLength() == 0) {
      e.preventDefault();
      onDelete();
    }
  };

  const checkCurrentLength = () => {
    return p.current?.innerText.replace("\n", "").length;
  };

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "Backspace":
        return handleBackspace(event);
      case "RightArrow":
        return handleRightArrow(event);
      case "a":
        event.preventDefault();
        return onParagraphAdd();
    }
  }
  function handleInput(event: FormEvent<HTMLParagraphElement>) {}

  return (
    <p
      className="editor-paragraph"
      contentEditable="true"
      suppressContentEditableWarning={true}
      onKeyDown={handleKeydown}
      onInput={handleInput}
      ref={(elem) => {
        outRef(elem);
        p.current = elem;
      }}
    >
      {content}
    </p>
  );
}

export default EditorParagraph;
