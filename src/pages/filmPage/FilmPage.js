import React, { useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
// import Box from 'shared/components/common/box/Box';
import { Box } from '@mui/material';
import styles from './FilmPage.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from "../../components/Header/Header";
import Showing from './showing/showing';
import Showed from './showed/showed';
import CoomingSoon from './coomingSoon/CoomingSoon';
import FilmAction from "../../redux/film/action";
import FilmDelay from './filmDelay/FilmDelay';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useRouter from '../../hooks/use-router';
import * as RouterPath from "../../router/RouterPath"

function FilmPage() {
  const router= useRouter()

  let params = { ...router.getAll() };

  const [value, setValue] = useState(params?.pages ?? 0);

  const parentTabs = [
    {
      id: 10,
      text: 'Phim mới',
      value: '10',
      hasTabChild: false,
    },
    {
      id: 20,
      text: 'Đang chiếu',
      value: '20',
      hasTabChild: false,
    },
    {
      id: 30,
      text: 'tạm hoãn',
      value: '30',
      hasTabChild: true,
    },
    {
      id: 40,
      text: 'Đã chiếu',
      value: '40',
      hasTabChild: false,
    },
    // {
    //   id: 50,
    //   text: 'Quá thời hạn',
    //   value: '50',
    //   hasTabChild: false,
    // },
  ];

  const dispatch = useDispatch()

  const [listType, setListType] = useState([]);

  const listFilm = useSelector((state) => state?.Film);
  
  const getTypeFilm = async() => {
    dispatch({
      type: FilmAction.GET_TYPE_FILM,
      onSuccess: (data) => {
        setListType(data)
      },
    })
  }

  const getAllFilm = async(dataSearch = {}) => {
    var status = 10
    if(params?.pages == null || typeof params?.pages == 'undefined')
    {        
      status = 10
    } else {
      status = params?.pages
    }
    const dataSubmit = {
      Status: status,
      Name: dataSearch?.name,
      DateStart: dataSearch?.dateFrom,
      DateEnd: dataSearch?.dateTo,
      TypeFilm: dataSearch?.type,
    }
    dispatch({
        type: FilmAction.GET_ALL_FILM,
        params: dataSubmit,
        onSuccess: (data) => {
        },
    })
  }  
  const handleChange = (event, newValue) => {
    router.push({
        pathname: RouterPath.FILMPAGE,
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
  getAllFilm()
},[params?.pages])

  useEffect(() => {
    getTypeFilm()
  }, []);

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
            <CoomingSoon listType={listType} listFilm={listFilm} getAllFilm={getAllFilm}/>
          </TabPanel>
          <TabPanel value="20" className="custom-tabpanel">
            <Showing listType={listType} listFilm={listFilm} getAllFilm={getAllFilm}/> 
          </TabPanel>
          <TabPanel value="30" className="custom-tabpanel">
            <FilmDelay listType={listType} listFilm={listFilm} getAllFilm={getAllFilm}/>
          </TabPanel>
          <TabPanel value="40" className="custom-tabpanel">
            <Showed listType={listType} listFilm={listFilm} getAllFilm={getAllFilm}/>
          </TabPanel>
          <TabPanel value="50" className="custom-tabpanel">
            <Showed listType={listType} listFilm={listFilm} getAllFilm={getAllFilm}/>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}

export default FilmPage;
