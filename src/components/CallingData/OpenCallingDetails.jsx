import React from 'react';
import { Tabs } from 'antd';
import OpenCallingDetails from './OpenCallLeads';
import DeclineCallingLeads from './DeclineCallingLeads';
import SucessCallingLeads from './SucessCallingLeads';

const onChange = (key) => {
  console.log(key);
};

const OpenCallLeads = () => {
  return (
    <>
      <Tabs onChange={onChange} type="card">
        <Tabs.TabPane tab="Open Calling Status" key="1">
          <OpenCallingDetails/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Decline Calling Status" key="2">
         <DeclineCallingLeads/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Success Calling Status"key="3">
         <SucessCallingLeads/>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default OpenCallLeads;
