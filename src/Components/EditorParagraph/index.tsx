import { FormEvent, KeyboardEvent, MutableRefObject, useRef } from "react";
import "./style.css";

export interface Params {
  content: string;
  onDelete: () => void;
  onChangeFocus: (direction: number) => void;
  onParagraphAdd: () => void;
  onContentChange: (newConent: string) => void;
  outRef: (elem: HTMLParagraphElement | null) => void;
}

function EditorParagraph({
  content,
  onDelete,
  onChangeFocus,
  outRef,
  onParagraphAdd,
  onContentChange,
}: Params) {
  const p = useRef<HTMLParagraphElement | null>(null);

  const handleRightArrow = (e: KeyboardEvent) => {};

  const handleBackspace = (e: KeyboardEvent) => {
    if (checkCurrentLength() == 0) {
      e.preventDefault();
      onDelete();
    }
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (!p.current) return;
    if (p.current?.innerText.endsWith("\n")) {
      p.current.innerText = p.current.innerText.trim();
      e.preventDefault();
      onParagraphAdd();
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
      case "Enter":
        return handleEnter(event);
    }
  }
  function handleInput(event: FormEvent<HTMLParagraphElement>) {
    onContentChange(p.current?.innerText ?? "");
  }

  return (
    <p
      className="editor-paragraph"
      contentEditable="true"
      suppressContentEditableWarning={true}
      onKeyDown={handleKeydown}
      onBlur={handleInput}
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
