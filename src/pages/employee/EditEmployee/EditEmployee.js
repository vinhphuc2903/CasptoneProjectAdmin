import React, { useEffect, useState } from 'react';
import styles from './EditEmployee.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import EditEmployeeController from './component/EditEmployeeController';

function EditEmployee() {
  
  useEffect(() => {


  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <EditEmployeeController />
      </div>
    </div>
  );
}

export default EditEmployee;
