import React, { useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
// import Box from 'shared/components/common/box/Box';
import { Box } from '@mui/material';
import styles from './Customer.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from "../../components/Header/Header";
import CustomerController from './component/CustomerController';

function Customer() {
  const parentTabs = [
    {
      id: 1,
      text: 'Danh sách khách hàng',
      value: '1',
      hasTabChild: false,
    },
  ];

  const [parentTab, setParentTab] = useState(parentTabs[0].value.toString());

  const changeParentTab = (tabValue) => {
    const urlParams = { tab: tabValue };
    setParentTab(tabValue);
  };
  useEffect(() => {


  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <TabContext value={parentTab} className="tab-content">
          <Box className="custom-box">
            <TabList
              onChange={(e, tc) => changeParentTab(tc)}
              className="tab-list"
            >
              {parentTabs?.map((item) => (
                <Tab
                  sx={{
                    backgroundColor: 'white'
                  }}
                  key={item.id}
                  label={item.text}
                  value={item.value}
                  className="tab-list-item"
                />
              ))}
            </TabList>
          </Box>
          <TabPanel value="1" className="custom-tabpanel">
            <CustomerController />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default Customer;
