import "./style.css";
import EditorParagraph from "../EditorParagraph";
import { useImmer } from "use-immer";
import { useEffect, useRef, useState } from "react";
import { Part, PartType } from "../../models/Parts";
import { selectStart, selectEnd } from "../../helpers/select";
import TempChordBlock from "../TempChordBlock";

interface Params {
  content: Part[];
  onSave: (data: Part[]) => void;
}

function SongEditor({ content: initContent }: Params) {
  const [content, updateContent] = useImmer(initContent);
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
      draft.push(new Part(PartType.Verse, []));
    });
    handleFocusChange(content.length);
  };

  const handleContentChange = (id: number, content: Part) => {
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
        const range = focus.isSelectionOnEnd ? selectEnd(p) : selectStart(p);
        document.getSelection()?.removeAllRanges();
        document.getSelection()?.addRange(range);
        setFocus(undefined);
      }
    }
  }, [focus]);

  return (
    <div className="song-editor">
      {content.map((p, index) => (
        <>
          <EditorParagraph
            key={index}
            content={p}
            onDelete={() => handleParagraphDeletion(index)}
            onAddNewPart={() => handleParagraphAddition()}
            onContentUpdate={(c) => handleContentChange(index, c)}
            outRef={(elem: HTMLParagraphElement | null) =>
              (paragraphs.current[index] = elem)
            }
          />
          <TempChordBlock
            part={p}
            onUpdate={(p) => {
              handleContentChange(index, p);
            }}
            // outRef={() => {}}
          />
        </>
      ))}
    </div>
  );
}

export default SongEditor;
