import React, { useEffect, useState } from 'react';
import styles from './DetailFilm.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import DetailFilmController from './component/DetailFilmController';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useRouter from '../../../hooks/use-router';
import FilmAction from '../../../redux/film/action';

function DetailFilm() {
  const dispatch = useDispatch()
  const [ Film, setFilm ] = useState()
  const router = useRouter(); 
  const getDetailFilm = () => {
    let params = { ...router.getAll() };
    dispatch({
        type: FilmAction.GET_DETAIL_FILM,
        params: { Id: params?.code },
        onSuccess: (data) => {
          setFilm(data)
        },
    })
  }
  useEffect(() => {
    getDetailFilm()
  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <DetailFilmController data={Film}/>
      </div>
    </div>
  );
}

export default DetailFilm;
