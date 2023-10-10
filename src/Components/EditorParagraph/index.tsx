import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import "./style.css";
import { Part, PartType } from "../../models/Parts";

export interface Params {
  content: Part;
  onDelete: () => void;
  onAddNewPart: () => void;
  onContentUpdate: (newConent: Part) => void;
  outRef: (elem: HTMLParagraphElement | null) => void;
}

function getStyle(type: PartType) {
  switch (type) {
    case PartType.Chorus:
      return "part--chorus";
    case PartType.Verse:
      return "part--verse";
    default:
      return "part--unknown";
  }
}

function EditorParagraph({
  content: initContent,
  onDelete,
  outRef,
  onAddNewPart,
  onContentUpdate,
}: Params) {
  const p = useRef<HTMLParagraphElement | null>(null);
  const [content, setContent] = useState<Part>(initContent);

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
      onAddNewPart();
    }
  };

  const allowedTypes = [PartType.Verse, PartType.Chorus];

  const switchType = (dir: number) => {
    const currentIndex = allowedTypes.findIndex((x) => content.type == x);
    const selectedIndex = (currentIndex + dir) % allowedTypes.length;
    const selected = allowedTypes[selectedIndex];
    setContent(content.copyWith({ type: selected }));
  };

  const checkCurrentLength = () => {
    return p.current?.innerText.replace("\n", "").length;
  };

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "Backspace":
        return handleBackspace(event);
      case "Enter":
        return handleEnter(event);
      case "]":
        if (event.ctrlKey) return switchType(1);
        return;
      case "[":
        if (event.ctrlKey) return switchType(-1);
        return;
    }
  }
  function handleBlur() {
    onContentUpdate(content);
  }

  return (
    <p
      contentEditable="true"
      suppressContentEditableWarning={true}
      className={["editor-paragraph", getStyle(content.type)].join(" ")}
      onKeyDown={handleKeydown}
      onBlur={handleBlur}
      ref={(elem) => {
        outRef(elem);
        p.current = elem;
      }}
    >
      {content.lines.map((x) => x.text).join("\n")}
    </p>
  );
}

export default EditorParagraph;
