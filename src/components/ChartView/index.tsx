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
}

export const ChartView: React.FC<ChartViewProps> = ({
  prefixCls = "chartview",
  className,
  style,
  ...restProps
}) => {
  /** Canvas for chart */
  const canvas = useRef(null);

  const { dataInString } = useContext(DataContext);

  const isValidDataStr = isValidJsonData(dataInString);

  const compClassName = classNames(`${prefixCls}`, className);

  const compStyle = {
    ...style,
    height: style?.height || "100%",
    width: style?.width || "100%",
    margin: style?.margin || "auto",
  };
  if (!isValidDataStr) {
    compStyle.opacity = 0.4;
  }

  useEffect(() => {
    if (canvas.current && isValidDataStr) {
      const results = myChartAdvisor.advise({ data: JSON.parse(dataInString) });
      if (results && results.length) {
        const result = results[0];
        const resultSpec = result.spec;
        specToG2Plot(resultSpec, canvas.current);
      }
    }
  });

  return (
    <div {...restProps} className={compClassName}>
      <div ref={canvas} style={compStyle} />
      <div
        id="errormsg"
        className="vis-mask"
        style={!isValidDataStr ? { bottom: 0 } : {}}
      >
        <h2>invalid data!</h2>
      </div>
    </div>
  );
};
