import "./style.css";
import EditorParagraph from "../EditorParagraph";
import { useImmer } from "use-immer";
import { useEffect, useRef, useState } from "react";

function SongEditor() {
  const [content, updateContent] = useImmer(["line 1", "line 2"]);
  const paragraphs = useRef<Array<HTMLParagraphElement>>([]);
  const [focus, setFocus] = useState<number | undefined>(undefined);

  const handleParagraphDeletion = (index: number) => {
    if (content.length > 1) {
      updateContent(content.filter((_value, i) => i != index));
      handleFocusChange(index - 1);
    }
  };

  const handleParagraphAddition = () => {
    updateContent((draft) => {
      draft.push("");
    });
    handleFocusChange(content.length);
  };

  const handleFocusChange = (index: number) => {
    setFocus(index);
  };

  useEffect(() => {
    if (focus) {
      paragraphs.current[focus].focus();
      setFocus(undefined);
    }
  }, [focus]);

  return (
    <div className="song-editor">
      {content.map((p, index) => (
        <EditorParagraph
          key={index}
          content={p}
          onChangeFocus={(dir: number) => handleFocusChange(index + dir)}
          onDelete={() => handleParagraphDeletion(index)}
          onParagraphAdd={() => handleParagraphAddition()}
          outRef={(elem: HTMLParagraphElement) => {
            paragraphs.current[index] = elem;
          }}
        />
      ))}
    </div>
  );
}

export default SongEditor;
