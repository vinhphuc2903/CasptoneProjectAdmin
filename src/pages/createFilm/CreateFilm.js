import React, { useEffect, useState } from 'react';
import styles from './CreateFilm.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header/Header';
import CreateFilmController from './component/CreateFilmController';

function CreateFilm() {
  
  useEffect(() => {


  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <CreateFilmController />
      </div>
    </div>
  );
}

export default CreateFilm;
