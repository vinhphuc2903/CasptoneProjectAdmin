import React, { useEffect, useState } from 'react';
import styles from './UpdateFilm.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header/Header';
import UpdateFilmController from './component/UpdateFilmController';

function UpdateFilm() {
  
  useEffect(() => {


  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <UpdateFilmController />
      </div>
    </div>
  );
}

export default UpdateFilm;
