import React, { useEffect, useState } from 'react';
import styles from './CreateEmployee.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import CreateEmployeeController from './component/CreateEmployeeController';

function CreateEmployee() {
  
  useEffect(() => {


  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <CreateEmployeeController />
      </div>
    </div>
  );
}

export default CreateEmployee;
