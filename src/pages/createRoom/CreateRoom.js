import React, { useEffect, useState } from 'react';
import styles from './CreateRoom.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header/Header';
import CreateRoomController from './component/CreateRoomController';

function CreateRoom() {
  
  useEffect(() => {


  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <CreateRoomController />
      </div>
    </div>
  );
}

export default CreateRoom;
