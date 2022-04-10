import React, { useContext, useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { specToG2Plot, ChartAntVSpec } from "@antv/antv-spec";
import { Advice } from "@antv/chart-advisor";

import { MetaContext } from "../../contexts";
import { CHART_CONTAINER_ID } from "../../constants";
import { isValidJsonData } from "../../utils";
import { ChartConfig, CompProps } from "../../interfaces";
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

  /** Current advice on ChartView */
  const [currentChartConfig, setCurrentChartConfig] = useState<ChartConfig>({
    chartType: "unknownChart",
    chartSpec: null,
  });

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
        const { spec, type } = currentAdvice;
        specToG2Plot(spec as ChartAntVSpec, canvas.current);

        setCurrentChartConfig({ chartType: type, chartSpec: spec });
      }
    }
  }, [advicesList, selectedAdviceIndex]);

  return (
    <div {...restProps} className={compClassName} style={compStyle}>
      <ChartToolbar chartConfig={currentChartConfig} />
      <div ref={canvas} className="chartview-canvas" id={CHART_CONTAINER_ID} />
    </div>
  );
};
