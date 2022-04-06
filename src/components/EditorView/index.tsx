import React, { useContext, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import classNames from "classnames";

import jsondataSchema from "../../jsondataSchema.json";
import { DataContext } from "../../contexts";

export interface EditorViewProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange: (str: string) => void;
}

function editorWillMount(monaco: any) {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: true,
    schemas: [
      {
        schema: jsondataSchema,
      },
    ],
  });
}

export const EditorView: React.FC<EditorViewProps> = ({
  prefixCls = "editorview",
  className,
  style,
  onChange,
  ...restProps
}) => {
  const compClassName = classNames(`${prefixCls}`, className);

  const compStyle = {
    ...style,
    height: style?.height || "100%",
    width: style?.width || "100%",
    margin: style?.margin || "auto",
  };

  const { editorContent } = useContext(DataContext);

  return (
    <div {...restProps} className={compClassName} style={compStyle}>
      <MonacoEditor
        height="100%"
        language="json"
        value={editorContent}
        editorWillMount={editorWillMount}
        onChange={onChange}
      />
    </div>
  );
};
