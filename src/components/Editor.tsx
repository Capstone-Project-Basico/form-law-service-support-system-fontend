import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface EditorProps {
  onChange: (data: string) => void;
  initialData?: string; // Optional prop for initial data
}

const Editor: React.FC<EditorProps> = ({ onChange, initialData = "" }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={initialData}
      onReady={(editor) => {}}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
};

export default Editor;
