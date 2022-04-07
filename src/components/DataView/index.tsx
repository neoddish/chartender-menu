import React, { useContext, useEffect } from "react";
import classNames from "classnames";

import { dataPresets } from "../../presets";
import { EditorView } from "../EditorView";
import { formatJSONObject } from "../../utils";
import { DataContext } from "../../contexts";

export interface DataViewProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const DataView: React.FC<DataViewProps> = ({
  prefixCls = "editorview",
  className,
  style,
  ...restProps
}) => {
  /** Default placeholder in json data editor */
  const jsonDataEditorPlaceholder = (dataPresets as any)[
    Object.keys(dataPresets)[0]
  ];

  const { dataInString, setDataInString } = useContext(DataContext);

  useEffect(() => {
    if (!dataInString) {
      setDataInString(formatJSONObject(jsonDataEditorPlaceholder));
    }
  }, []);

  const compClassName = classNames(`${prefixCls}`, className);

  const compStyle = {
    ...style,
    height: style?.height || "100%",
    width: style?.width || "100%",
    margin: style?.margin || "auto",
  };

  return (
    <div {...restProps} className={compClassName} style={compStyle}>
      <EditorView />
    </div>
  );
};
