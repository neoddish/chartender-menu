import React, { useContext, useEffect, useRef } from "react";
import classNames from "classnames";
import { specToG2Plot } from "@antv/antv-spec";
import { ChartAdvisor } from "@antv/chart-advisor";
import { DataContext } from "../../contexts";
import { isValidJsonData } from "../../utils";

const myChartAdvisor = new ChartAdvisor();

export interface ChartViewProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  data: any;
}

export const ChartView: React.FC<ChartViewProps> = ({
  prefixCls = "chartview",
  className,
  style,
  data,
  ...restProps
}) => {
  /** Canvas for chart */
  const canvas = useRef(null);

  const compClassName = classNames(`${prefixCls}`, className);

  const compStyle = {
    ...style,
    height: style?.height || "100%",
    width: style?.width || "100%",
    margin: style?.margin || "auto",
  };

  useEffect(() => {
    if (canvas.current && isValidJsonData(data)) {
      const results = myChartAdvisor.advise({ data });
      if (results && results.length) {
        const result = results[0];
        const resultSpec = result.spec;
        specToG2Plot(resultSpec, canvas.current);
      }
    }
  });

  const { editorContent } = useContext(DataContext);

  return (
    <div {...restProps} className={compClassName}>
      <div ref={canvas} style={compStyle} />
      <div
        id="errormsg"
        className="vis-mask"
        style={!isValidJsonData(editorContent) ? { bottom: 0 } : {}}
      >
        <h2>invalid data!</h2>
      </div>
    </div>
  );
};
