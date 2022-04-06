import React, { useState } from "react";

import classNames from "classnames";
import { Layout, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import { InfoModal } from "../InfoModal";

import logoWithText from "../../assets/textlogo.svg";

import "./index.less";

const { Header } = Layout;

export interface NavHeaderProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  onDataClick: () => void;
  onChartClick: () => void;
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  prefixCls = "header",
  className,
  style,
  onDataClick,
  onChartClick,
  ...restProps
}) => {
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);

  const compClassName = classNames(`${prefixCls}`, className);

  const headerStyle = {
    // background: "lightsteelblue",
    padding: "0 16px",
  };

  const compStyle = {
    ...headerStyle,
    ...style,
  };

  return (
    <Header {...restProps} className={compClassName} style={{ ...compStyle }}>
      <div className="logo corner left">
        <img className="logo-image" src={logoWithText} />
      </div>
      <div className="tabs top-center">
        <Button
          className="btn"
          type="default"
          shape="round"
          style={{ width: "100px" }}
          ghost
          onClick={onDataClick}
        >
          Data
        </Button>
        <Button
          className="btn"
          type="default"
          shape="round"
          style={{ width: "100px" }}
          ghost
          onClick={onChartClick}
        >
          Chart
        </Button>
      </div>
      <div className="btns corner right">
        <Button
          shape="circle"
          icon={<InfoCircleOutlined />}
          onClick={() => setInfoModalVisible(true)}
        />
      </div>
      <InfoModal
        visible={infoModalVisible}
        onOk={() => setInfoModalVisible(false)}
        onCancel={() => setInfoModalVisible(false)}
      />
    </Header>
  );
};
