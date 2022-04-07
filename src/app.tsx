import React, { useState, useRef } from "react";

import { Layout, Drawer } from "antd";

import { DataView, ChartView, NavHeader } from "./components";
import { DataContext } from "./contexts";

import "./index.less";

const { Content } = Layout;

export default function App() {
  /** Main DOM Container */
  const mainContainer = useRef<HTMLDivElement>(null);

  /** is Chart Drawer visible */
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  /** Active dataset of the whole app as string, string for editor changing */
  const [dataInString, setDataInString] = useState<string>("");

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <DataContext.Provider value={{ dataInString, setDataInString }}>
      <Layout className="the-layout">
        <NavHeader
          className="the-header"
          onDataClick={onClose}
          onChartClick={showDrawer}
        />
        <Content className="the-content">
          <div className="main-content" ref={mainContainer}>
            <DataView />

            <Drawer
              title="ChartForYou"
              placement="right"
              width={(mainContainer.current?.offsetWidth || 200) - 100}
              closable={false}
              onClose={onClose}
              visible={drawerVisible}
              getContainer={false}
              style={{ position: "absolute" }}
            >
              <ChartView className="vis" />
            </Drawer>
          </div>
        </Content>
      </Layout>
    </DataContext.Provider>
  );
}
