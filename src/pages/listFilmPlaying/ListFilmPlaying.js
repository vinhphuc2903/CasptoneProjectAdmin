/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import styles from './ListFilmPlaying.module.scss'
import Header from "../../components/Header/Header";
import { useDispatch } from 'react-redux';
import useRouter from "../../hooks/use-router";
import { ToastContainer } from 'react-toastify';
import { MatNaQuy } from "../../assets/images";
import FilmHover from "../../components/FilmHover/FilmHover";
import FilmAction from "../../redux/film/action";
import { useSelector } from "react-redux";
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';

function ListFilmPlaying(props) 
{
    const dispatch = useDispatch()
    const router = useRouter();
    const listFilm = useSelector((state) => state?.Film?.film);
    const getAllFilm = async() => {
        dispatch({
            type: FilmAction.GET_ALL_FILM,
            onSuccess: (data) => {
            },
        })
    }   

    useEffect(() => {
        getAllFilm()
    }, [])

    var daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

    // Lấy ngày hiện tại
    var now = new Date();

    // Tạo mảng chứa 7 ngày bắt đầu từ ngày hiện tại
    var days = [];
    for (var i = 0; i < 2; i++) {
        var date = new Date(now);
        date.setDate(now.getDate() + i);
        days.push({
            day: daysOfWeek[date.getDay()],
            dateMonth: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() 
        });
    }
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.listFilmPlaying}>
            <ToastContainer />
            <div className={styles.headerContent}>
                <Header />
                <div>
                    {/* <FilmItem /> */}
                </div>
                <div
                    className={styles.filmItem}
                    style={{
                        
                    }}
                >
                    {listFilm.map((item, index) => (
                        <FilmHover imageUrl={MatNaQuy} data={item} id={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListFilmPlaying

