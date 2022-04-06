import React from "react";

import { Modal, ModalProps } from "antd";
import classNames from "classnames";

import { APP_INFO } from "../../constants";

export const InfoModal: React.FC<ModalProps> = ({
  prefixCls = "infomodal",
  className,
  onOk,
  onCancel,
  ...restProps
}) => {
  const compClassName = classNames(`${prefixCls}`, className);

  return (
    <Modal
      {...restProps}
      className={compClassName}
      title="About"
      onOk={onOk}
      onCancel={onCancel}
    >
      <h1>{APP_INFO.name}</h1>
      <p>author: {APP_INFO.author}</p>
      <p>Star me on Github:</p>
      <a href={APP_INFO.github}>{APP_INFO.github}</a>
    </Modal>
  );
};
