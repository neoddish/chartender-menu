import React, { useContext, useEffect } from "react";
import classNames from "classnames";

import { dataPresets } from "../../presets";
import { EditorView } from "../EditorView";
import { ChartThumbView } from "../ChartThumbView";
import { formatJSONObject } from "../../utils";
import { MetaContext } from "../../contexts";

import "./index.less";

export interface DataViewProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const DataView: React.FC<DataViewProps> = ({
  prefixCls = "dataview",
  className,
  style,
  ...restProps
}) => {
  /** Default placeholder in json data editor */
  const jsonDataEditorPlaceholder = (dataPresets as any)[
    Object.keys(dataPresets)[0]
  ];

  const { dataInString, setDataInString } = useContext(MetaContext);

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
      <EditorView className="editor" />
      <ChartThumbView className="chart-thumb" />
    </div>
  );
};
