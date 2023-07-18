import React, { useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
// import Box from 'shared/components/common/box/Box';
import { Box } from '@mui/material';
import styles from './ReportList.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from "../../components/Header/Header";
import useRouter from '../../hooks/use-router';
import * as RouterPath from "../../router/RouterPath"
import RevenueDayMonth from './RevenueDayMonth';
import ReportBranch from './ReportBranch';
import TicketRevenue from './TicketRevenue';
import ReportFilm from './ReportFilm';

function Reportage() {
  const router= useRouter()

  let params = { ...router.getAll() };

  const [value, setValue] = useState(params?.pages ?? 0);

  const parentTabs = [
    {
      id: 10,
      text: 'DT theo ngày/tháng',
      value: '10',
      hasTabChild: false,
    },
    {
      id: 20,
      text: 'DT theo chi nhánh',
      value: '20',
      hasTabChild: false,
    },
    {
      id: 30,
      text: 'DT theo vé',
      value: '30',
      hasTabChild: true,
    },
    {
      id: 40,
      text: 'DT theo phim',
      value: '40',
      hasTabChild: true,
    },
  ];
  const handleChange = (event, newValue) => {
    // setValue(newValue);
    router.push({
        pathname: RouterPath.REPORT_LIST,
        // page: newValue,
        params: {
          pages: newValue,
        }
    })
    };
    useEffect(() => {
        if(params?.pages == null || typeof params?.pages == 'undefined')
        {        
            setValue(10)
        } else {
            setValue(params?.pages)
        }
      },[params?.pages])

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <TabContext value={value} className="tab-content">
          <Box className="custom-box">
            <TabList
              onChange={handleChange}
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
          <TabPanel value="10" className="custom-tabpanel">
          <RevenueDayMonth/>
          </TabPanel>
          <TabPanel value="20" className="custom-tabpanel">
            <ReportBranch/>
          </TabPanel>
          <TabPanel value="30" className="custom-tabpanel">
            <TicketRevenue/>
          </TabPanel>
          <TabPanel value="40" className="custom-tabpanel">
            <ReportFilm/>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default Reportage;
