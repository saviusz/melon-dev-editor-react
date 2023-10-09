import "./style.css";
import EditorParagraph from "../EditorParagraph";
import { useImmer } from "use-immer";
import { useEffect, useRef, useState } from "react";

function SongEditor() {
  const [content, updateContent] = useImmer(["line 1", "line 2"]);

  const paragraphs = useRef<Array<HTMLParagraphElement | null>>([]);

  const [focus, setFocus] = useState<
    { id: number; isSelectionOnEnd: boolean } | undefined
  >(undefined);

  const handleParagraphDeletion = (index: number) => {
    if (content.length > 1) {
      updateContent(content.filter((_value, i) => i != index));
      handleFocusChange(index - 1, true);
    }
  };

  const handleParagraphAddition = () => {
    updateContent((draft) => {
      draft.push("");
    });
    handleFocusChange(content.length);
  };

  const handleContentChange = (id: number, content: string) => {
    updateContent((draft) => {
      draft[id] = content;
    });
  };

  const handleFocusChange = (index: number, end: boolean = false) => {
    setFocus({ id: index, isSelectionOnEnd: end });
  };

  useEffect(() => {
    if (focus) {
      const p = paragraphs.current[focus.id];
      if (p) {
        p.focus();
        const range = new Range();
        range.setStart(
          (!focus.isSelectionOnEnd ? p.firstChild : p.lastChild) ?? p,
          focus.isSelectionOnEnd ? p.lastChild?.textContent?.length ?? 1 : 0
        );
        range.setEnd(
          (!focus.isSelectionOnEnd ? p.firstChild : p.lastChild) ?? p,
          focus.isSelectionOnEnd ? p.lastChild?.textContent?.length ?? 1 : 0
        );
        document.getSelection()?.removeAllRanges();
        document.getSelection()?.addRange(range);
        setFocus(undefined);
      }
    }
  }, [focus]);

  return (
    <div className="song-editor">
      {content.map((p, index) => (
        <EditorParagraph
          key={index}
          content={p}
          onChangeFocus={(dir: number) =>
            handleFocusChange(index + dir, dir > 0)
          }
          onDelete={() => handleParagraphDeletion(index)}
          onParagraphAdd={() => handleParagraphAddition()}
          onContentChange={(c) => handleContentChange(index, c)}
          outRef={(elem: HTMLParagraphElement | null) =>
            (paragraphs.current[index] = elem)
          }
        />
      ))}
    </div>
  );
}

export default SongEditor;
