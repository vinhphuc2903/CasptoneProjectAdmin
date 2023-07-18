import React, { useEffect, useState } from 'react';
import styles from './EditCustomer.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import EditCustomerController from './component/EditCustomerController';

function EditCustomer() {
  
  useEffect(() => {


  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <EditCustomerController />
      </div>
    </div>
  );
}

export default EditCustomer;
