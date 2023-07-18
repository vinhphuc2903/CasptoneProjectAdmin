import React, { useEffect, useState } from 'react';
import styles from './DetailCustomer.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import DetailCustomerController from './component/DetailCustomerController';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useRouter from '../../../hooks/use-router';
import CustomerAction from '../../../redux/customer/action';

function DetailCustomer() {
  const dispatch = useDispatch()
  const router = useRouter(); 
  const [listCustomer, setListCustomer] = useState()
  const getAllCustomer = () => {
    let params = { ...router.getAll() };
    dispatch({
        type: CustomerAction.GET_ALL_CUSTOMER,
        params: { Id: params?.id },
        onSuccess: (data) => {
          if(data?.data?.length)
          {
            setListCustomer(data?.data[0])
          }
        },
    })
  }
  useEffect(() => {
    getAllCustomer()
  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <DetailCustomerController data={listCustomer}/>
      </div>
    </div>
  );
}

export default DetailCustomer;
