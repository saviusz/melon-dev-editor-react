import "./style.css";
import EditorParagraph from "../EditorParagraph";
import { useImmer } from "use-immer";

function SongEditor() {
  const [content, updateContent] = useImmer(["line 1", "line 2"]);

  const handleParagraphDeletion = (index: number) => {
    updateContent(content.filter((_value, i) => i != index));
  };

  return (
    <div className="song-editor">
      {content.map((p, index) => (
        <EditorParagraph
          key={index}
          content={p}
          onDelete={() => handleParagraphDeletion(index)}
        />
      ))}
    </div>
  );
}

export default SongEditor;
