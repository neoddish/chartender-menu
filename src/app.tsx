import React, { useState, useRef, useEffect } from "react";

import { Layout, Drawer } from "antd";
import { Advice, ChartAdvisor } from "@antv/chart-advisor";

import { DataView, ChartView, NavHeader } from "./components";
import { MetaContext, UiContext } from "./contexts";
import { JsonData } from "./interfaces";

import "./index.less";
import { isValidJsonData } from "./utils";

const { Content } = Layout;

const myChartAdvisor = new ChartAdvisor();

export default function App() {
  /** Main DOM Container */
  const mainContainer = useRef<HTMLDivElement>(null);

  /** is Chart Drawer visible */
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  /** Active dataset of the whole app as string, string for editor changing */
  const [dataInString, setDataInString] = useState<string>("");

  /** Advices list from ChartAdvisor */
  const [advicesList, setAdvicesList] = useState<Advice[]>([]);
  /** Index of UI selected advice in the list */
  const [selectedAdviceIndex, setSelectedAdviceIndex] = useState<number>(-1);

  const getAdvices = () => {
    if (!isValidJsonData(dataInString)) return [];

    const data: JsonData = JSON.parse(dataInString);
    const advices = myChartAdvisor.advise({ data });
    if (advices && advices.length) {
      return advices;
    }

    return [];
  };

  useEffect(() => {
    setAdvicesList(getAdvices());
  }, [dataInString]);

  return (
    <MetaContext.Provider
      value={{
        dataInString,
        setDataInString,
        advicesList,
        selectedAdviceIndex,
        setSelectedAdviceIndex,
      }}
    >
      <UiContext.Provider value={{ drawerVisible, setDrawerVisible }}>
        <Layout className="the-layout">
          <NavHeader className="the-header" />
          <Content className="the-content">
            <div className="main-content" ref={mainContainer}>
              <DataView />

              <Drawer
                title="ChartForYou"
                placement="left"
                width={(mainContainer.current?.offsetWidth || 600) * 0.75}
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                getContainer={false}
                style={{ position: "absolute" }}
                bodyStyle={{ padding: 0 }}
              >
                <ChartView className="vis" />
              </Drawer>
            </div>
          </Content>
        </Layout>
      </UiContext.Provider>
    </MetaContext.Provider>
  );
}
