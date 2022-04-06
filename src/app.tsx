import React, { useState, useEffect, useRef, useMemo } from "react";

import { Layout, Drawer, Button } from "antd";

import { dataPresets } from "./presets";
import { ChartView, EditorView, NavHeader } from "./components";
import { DataContext } from "./contexts";
import { isValidJsonData, formatJSONObject } from "./utils";

import "./index.less";

const { Content } = Layout;

export default function App() {
  /** Main DOM Container */
  const mainContainer = useRef<HTMLDivElement>(null);

  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const [currentDataPreset, setCurrentDataPreset] = useState<string>(
    Object.keys(dataPresets)[0]
  );

  const defaultEditorContent = (dataPresets as any)[currentDataPreset];

  const [lastEditorContent, setLastEditorContent] =
    useState<any>(defaultEditorContent);
  const [editorContent, _setEditorContent] = useState<string>(
    formatJSONObject(defaultEditorContent)
  );

  const setEditorContent = (editorContent: string) => {
    if (isValidJsonData(editorContent)) {
      setLastEditorContent(JSON.parse(editorContent));
    }
    _setEditorContent(editorContent);
  };

  const editorChange = (newContent: string) => {
    setEditorContent(newContent);
  };

  const dataStates = useMemo(() => ({ editorContent }), [editorContent]);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <DataContext.Provider value={dataStates}>
      <Layout className="the-layout">
        <NavHeader
          className="the-header"
          onDataClick={onClose}
          onChartClick={showDrawer}
        />
        <Content className="the-content">
          <div className="main-content" ref={mainContainer}>
            <EditorView onChange={editorChange} />

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
              <ChartView
                data={lastEditorContent}
                className="vis"
                style={!isValidJsonData(editorContent) ? { opacity: 0.4 } : {}}
              />
            </Drawer>
          </div>
        </Content>
      </Layout>
    </DataContext.Provider>
  );
}
