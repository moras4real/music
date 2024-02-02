"use client"
import { useState, useEffect } from 'react';
import style from '../styles/Navbar.module.css'

export async function getUsers() {
    const songUrl = 'https://musicapi-19wk.onrender.com/music/myAPI'
    const res = await fetch(songUrl)
    const response = await res.json()
    return response;
}          

const Welcome = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stopIndex, setStopIndex] = useState(0);
    const [timer, setTimer] = useState(null);

    // useEffect(() => {
        const fetchData = async () => {
            const userData = await getUsers();
            setData(userData);
        };

        fetchData();
    // }, []);

    useEffect(() => {
        if (timer === null) return;

        const interval = setInterval(() => {
            if (currentIndex === stopIndex) {
                clearInterval(timer);
                setTimer(null);
            } else {
                setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, currentIndex, stopIndex, data.length]);

    const changeIndex = newIndex => {
        setCurrentIndex(newIndex);
    };

    const startTimer = () => {
        if (timer === null && stopIndex !== currentIndex) {
            const newTimer = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
            }, 1000);
            setTimer(newTimer);
        }
    };

    const stopTimer = () => {
        if (timer !== null) {
            clearInterval(timer);
            setTimer(null);
        }
    };

    const handleIndexChange = newIndex => {
        setCurrentIndex(newIndex);
        stopTimer();
    };

    return (
        <>
            <div className="container mx-auto shadow-lg p-5">
                    <div>               
                        <button onClick={startTimer} style={{ display: 'none' }}>Start Timer</button>
                        <button onClick={stopTimer} style={{ display: 'none' }}>Stop Timer</button>
                        <input style={{ display: 'none' }} type="number" value={stopIndex} onChange={e => setStopIndex(parseInt(e.target.value))} />
                        <button onClick={() => handleIndexChange(stopIndex)} style={{ display: 'none' }} >Go to Stop Index</button>
                    </div>
                <div className="row">
                    <div className="col-12 col-md-6 bg-primary d-md-flex">
                        <div className="d-flex flex-column justify-content-between">
                            <div className={style.card}>
                                <h2 className="ps-3 pe-3 pt-3 pb-3 text-center">Welcome To My Music App</h2>
                            </div>
                            {data.map((user, index) => (
                                <div key={user.id} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                                    <h1 className="ps-5">{user.id}</h1>
                                    <h4 className="text-danger ms-2">Artist Name: {user.artistName}</h4>
                                    <h4 className="text-white ms-2">Song Title: {user.songTitle}</h4>
                                    <h4 className="ms-2">Album Name: {user.albumName}</h4>
                                    <h4 className="text-white ms-2">Release Date: {user.releaseDate}</h4>
                                </div>
                            ))}
                            <h4 className="fw-bold text-center pt-3">Make the best choice today!</h4>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 bg-info d-md-flex">
                        <div className="d-flex flex-column justify-content-between">
                            {data.map((user, index) => (
                                <div key={user.id} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                                    <h4 className="ps-3 pt-3 text-white"> Album Image:
                                        <img src={user.songImage} alt="profile picture" width={150} height={150} blurDataURL="data" placeholder="blur"/>
                                    </h4>
                                    <h4 className="ps-5">{user.id}</h4>

                                    <div className="ps-5 pt-3 pb-3">
                                        <h4 className="ms-2">Album Name: {user.albumName}</h4>
                                        <audio controls className="w-100 w-sm-auto">
                                            <source src={user.songUrl} type="audio/mp3"/>
                                        </audio>
                                    </div>
                                </div>
                            ))}

                    <div class="d-flex gap-5">
                            <button class="btn btn-warning fw-bold mb-3" onClick={() => handleIndexChange((currentIndex + 1) % data.length)}>Click Next Music</button>
                            <button class="btn btn-primary fw-bold mb-3" onClick={() => handleIndexChange((currentIndex - 1 + data.length) % data.length)}>Previous Music</button>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default Welcome;
