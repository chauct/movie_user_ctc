import React, { useState } from "react";
import styles from "./style.module.css";
import { Radio, Space, Tabs } from "antd";

const { TabPane } = Tabs;
function Theater() {
  const [tabPosition, setTabPosition] = useState("left");

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  return (
    <div className="container">
      <Tabs tabPosition={tabPosition} className={styles.tabs}>
        <TabPane
          tab={
            <img
              width={50}
              src="https://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
              alt=""
            />
          }
          key="1"
        >
          Content of Tab 1
        </TabPane>
        <TabPane
          tab={
            <img
              width={50}
              src="https://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
              alt=""
            />
          }
          key="2"
        >
          Content of Tab 2
        </TabPane>
        <TabPane
          tab={
            <img
              width={50}
              src="https://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
              alt=""
            />
          }
          key="3"
        >
          Content of Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Theater;
