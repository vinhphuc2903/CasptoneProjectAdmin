import React, { useEffect, useState } from 'react';
import styles from './DetailEmployee.module.scss';
import { ToastContainer } from 'react-toastify';
import Header from '../../../components/Header/Header';
import DetailEmployeeController from './component/DetailEmployeeController';
import LoginAction from "../../../redux/login/action";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useRouter from '../../../hooks/use-router';

function DetailEmployee() {
  const dispatch = useDispatch()
  const listEmployee = useSelector((state) => state?.Login?.listEmployee);
  const router = useRouter(); 
  const getAllEmployee = () => {
    let params = { ...router.getAll() };
    dispatch({
        type: LoginAction.GET_ALL_EMPLOYEE,
        params: { EmployeeCode: params?.code },
        onSuccess: (data) => {
           
        },
    })
  }
  useEffect(() => {
    getAllEmployee()
  }, []);

  return (
    <div className={styles.FilmPage}>
      <ToastContainer />
      <div className={styles.headerContent}>
        <Header />
        <DetailEmployeeController data={listEmployee}/>
      </div>
    </div>
  );
}

export default DetailEmployee;
