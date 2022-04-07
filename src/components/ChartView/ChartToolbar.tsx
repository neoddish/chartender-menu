import React, { useState } from "react";

import classNames from "classnames";
import { Button, Popover, Tooltip, message } from "antd";
import {
  SettingOutlined,
  PictureOutlined,
  CodeOutlined,
} from "@ant-design/icons";

// import { MetaContext } from "../../contexts";
import { CompProps } from "../../interfaces";

import "./index.less";

const comingSoonInfo = () => {
  message.warning("Coming Soon!...");
};

export const ChartToolbar: React.FC<CompProps> = ({
  prefixCls = "charttoolbar",
  className,
  style,
  ...restProps
}) => {
  /** whether picExportBtn's tooltip active. It's inactive while picPopover is active.  */
  const [picTooltipActive, setPicTooltipActive] = useState<boolean>(true);
  const picBtnConditionalProps = !picTooltipActive ? { visible: false } : {};

  const picExportContent = (
    <div className="pic-export-popover">
      <Button shape="round" onClick={comingSoonInfo}>
        PNG
      </Button>
      <Button shape="round" onClick={comingSoonInfo}>
        SVG
      </Button>
    </div>
  );

  const compClassName = classNames(`${prefixCls}`, className);
  const compStyle: React.CSSProperties = {
    ...style,
  };

  return (
    <div {...restProps} className={compClassName} style={compStyle}>
      <div className="left">
        <Tooltip title="Chart configs">
          <Button
            shape="circle"
            className="setting-btn"
            icon={<SettingOutlined />}
            onClick={comingSoonInfo}
          />
        </Tooltip>
      </div>
      <div className="right">
        <Tooltip title="Export code">
          <Button
            shape="circle"
            className="code-export-btn"
            icon={<CodeOutlined />}
            onClick={comingSoonInfo}
          />
        </Tooltip>
        <Popover
          content={picExportContent}
          trigger="focus"
          onVisibleChange={(popVisible) => {
            setPicTooltipActive(!popVisible);
          }}
        >
          <Tooltip title="Export as images" {...picBtnConditionalProps}>
            <Button
              shape="circle"
              className="picture-export-btn"
              icon={<PictureOutlined />}
            />
          </Tooltip>
        </Popover>
      </div>
    </div>
  );
};
