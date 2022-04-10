import React, { useState } from "react";

import classNames from "classnames";
import { Layout, Button } from "antd";
import {
  InfoCircleOutlined,
  PushpinOutlined,
  PushpinFilled,
} from "@ant-design/icons";

import { InfoModal } from "../InfoModal";
import { CompProps } from "../../interfaces";
import logoWithText from "../../assets/textlogo.svg";

import "./index.less";

const { Header } = Layout;

export const NavHeader: React.FC<CompProps> = ({
  prefixCls = "header",
  className,
  style,
  ...restProps
}) => {
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(false);

  const compClassName = classNames(`${prefixCls}`, className);

  const headerStyle = {
    // background: "lightsteelblue",
    padding: "0 16px",
  };

  const compStyle = {
    ...headerStyle,
    ...style,
  };

  const switchPin = () => {
    const newPinState = !isPinned;
    setIsPinned(newPinState);
    window.Main.switchPin(newPinState);
  };

  return (
    <Header {...restProps} className={compClassName} style={{ ...compStyle }}>
      <div className="logo corner left">
        <img className="logo-image" src={logoWithText} />
      </div>
      <div className="tabs top-center"></div>
      <div className="btns corner right">
        <Button
          shape="circle"
          icon={<InfoCircleOutlined />}
          onClick={() => setInfoModalVisible(true)}
        />
        <Button
          shape="circle"
          icon={isPinned ? <PushpinFilled /> : <PushpinOutlined />}
          onClick={switchPin}
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
