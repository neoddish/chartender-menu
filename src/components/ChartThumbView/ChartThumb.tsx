import React from "react";

import classNames from "classnames";
import { Thumbnail } from "@antv/thumbnails-component";

import { CompProps } from "../../interfaces";

interface ChartThumbProps extends CompProps {
  chartType: string;
  onClick: () => void;
}

export const ChartThumb: React.FC<ChartThumbProps> = ({
  prefixCls = "chartthumb",
  className,
  style,
  chartType,
  onClick,
  ...restProps
}) => {
  const compClassName = classNames(`${prefixCls}`, className);

  const compStyle: React.CSSProperties = {
    ...style,
  };

  return (
    <div
      {...restProps}
      className={compClassName}
      style={compStyle}
      onClick={onClick}
    >
      <Thumbnail className="thumb" chart={chartType as any} />
    </div>
  );
};
