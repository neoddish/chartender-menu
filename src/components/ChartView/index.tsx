import React, { useContext, useEffect, useRef } from "react";

import classNames from "classnames";
import { specToG2Plot, ChartAntVSpec } from "@antv/antv-spec";

import { MetaContext } from "../../contexts";
import { isValidJsonData } from "../../utils";
import { CompProps } from "../../interfaces";
import { ChartToolbar } from "./ChartToolbar";

import "./index.less";

export const ChartView: React.FC<CompProps> = ({
  prefixCls = "chartview",
  className,
  style,
  ...restProps
}) => {
  /** Canvas for chart */
  const canvas = useRef(null);

  const { dataInString, advicesList, selectedAdviceIndex } =
    useContext(MetaContext);

  const isValidDataStr = isValidJsonData(dataInString);

  const compClassName = classNames(`${prefixCls}`, className);
  const compStyle = {
    ...style,
  };
  if (!isValidDataStr) {
    compStyle.opacity = 0.4;
  }

  useEffect(() => {
    if (canvas.current) {
      if (
        advicesList &&
        selectedAdviceIndex >= 0 &&
        advicesList.length > selectedAdviceIndex
      ) {
        const currentAdvice = advicesList[selectedAdviceIndex];
        const { spec } = currentAdvice;

        specToG2Plot(spec as ChartAntVSpec, canvas.current);
      }
    }
  });

  return (
    <div {...restProps} className={compClassName} style={compStyle}>
      <ChartToolbar />
      <div ref={canvas} className="chartview-canvas" />
    </div>
  );
};
