import React, { useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
// import Box from 'shared/components/common/box/Box';
import { Box } from '@mui/material';
import styles from './ForecastPageMain.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from "../../components/Header/Header";
import useRouter from '../../hooks/use-router';
import ForecastPageMain from './ForecastPageMain';
 
function ForecastPage() {
  const router= useRouter()


  const [value, setValue] = useState(10);

  const parentTabs = [
    {
      id: 10,
      text: 'Dự đoán doanh thu phim mới',
      value: '10',
      hasTabChild: false,
    },
  
  ];

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <TabContext value={value} className="tab-content">
          <Box className="custom-box">
            <TabList
            //   onChange={handleChange}
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
          <TabPanel value={10} className="custom-tabpanel">
          <ForecastPageMain/>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default ForecastPage;
