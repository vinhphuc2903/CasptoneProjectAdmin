import React, { useEffect, useState } from 'react';
import styles from './CreateShowtime.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import CreateShowtimeController from './component/CreateShowtimeController';

function CreateShowtime() {
  
  useEffect(() => {


  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <CreateShowtimeController />
      </div>
    </div>
  );
}

export default CreateShowtime;
