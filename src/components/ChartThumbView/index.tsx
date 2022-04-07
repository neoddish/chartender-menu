import React, { useContext } from "react";

import classNames from "classnames";

import { MetaContext, UiContext } from "../../contexts";
import { CompProps } from "../../interfaces";
import { ChartThumb } from "./ChartThumb";

import "./index.less";

export const ChartThumbView: React.FC<CompProps> = ({
  prefixCls = "chartthumbview",
  className,
  style,
  ...restProps
}) => {
  const { advicesList, setSelectedAdviceIndex } = useContext(MetaContext);
  const { setDrawerVisible } = useContext(UiContext);

  const handleChartThumbClick = (index: number) => {
    setSelectedAdviceIndex(index);
    setDrawerVisible(true);
  };

  const compClassName = classNames(`${prefixCls}`, className);
  const compStyle: React.CSSProperties = {
    ...style,
  };

  return (
    <div {...restProps} className={compClassName} style={compStyle}>
      {advicesList.map((advice, index) => {
        const { type } = advice;
        return (
          <ChartThumb
            key={`${index}-${advice.type}`}
            chartType={type}
            onClick={() => handleChartThumbClick(index)}
          />
        );
      })}
    </div>
  );
};
