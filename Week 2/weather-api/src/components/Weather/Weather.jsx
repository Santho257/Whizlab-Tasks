import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from './Weather.module.css';
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import Forecast from "../ForecastArea/Forecast";
import { API_KEY } from "../../private.js"
import { BASE_URL } from "../../constants.js"
import Loading from "../Loading/Loading.jsx";
import Error from "../Error/Error.jsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Weather = () => {
    const { location } = useParams();
    const navigator = useNavigate();
    const [searchTerm, setSearchTerm] = useSearchParams({ search: "" });
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [weatherDetails, setWeatherDetails] = useState({});

    useEffect(() => {
        fetchData();
    }, [location])

    const fetchData = async () => {
        setError({});
        setLoading(true);
        if (!location) {
            try {
                const ip = await axios("https://ipinfo.io/json");
                if (ip.data) {
                    fetchContent(ip.data.ip);
                }
                else {
                    setError({ message: "Cannot fetch IP!" });
                    setLoading(false)
                    return;
                }
            }
            catch (err) {
                setError({ ...err });
                setLoading(false)
                return;
            }
        }
        else fetchContent(location);
    }

    const fetchContent = async location => {
        try {
            const result = await axios(`${BASE_URL}/forecast.json?q=${location}&days=${3}&key=${API_KEY}`);
            if (result.data) {
                setWeatherDetails(result.data);
                setLoading(false);
            }
        }
        catch (err) {
            setError({ ...(err?.response?.data || err) });
            setLoading(false)
        }
    }

    const searchLocation = async e => {
        e.preventDefault();
        navigator(`/${searchValue}`);
    }
    return (
        loading
            ? <Loading />
            : <>
                <form onSubmit={searchLocation} className={styles.searchForm}>
                    <input className={styles.input} placeholder="search..." type="search" value={searchTerm.search} onChange={
                        e => {
                            setSearchValue(e.target.value)
                            setSearchTerm({ search: e.target.value })
                        }
                    } />
                    <button className={styles.button} type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
                            <path fill="#616161" d="M34.6 28.1H38.6V45.1H34.6z" transform="rotate(-45.001 36.586 36.587)"></path>
                            <path fill="#616161" d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z"></path>
                            <path fill="#37474F" d="M36.2 32.1H40.2V44.400000000000006H36.2z" transform="rotate(-45.001 38.24 38.24)"></path>
                            <path fill="#FFF" d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z"></path>
                            <path fill="#FFF" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
                        </svg>
                    </button>
                </form>
                {(Object.keys(error).length != 0)
                    ? <Error error={error} />
                    : (<section className={styles.flexArea}>
                        <section className={styles.current}>
                            {weatherDetails?.current && <CurrentWeather current={weatherDetails.current} location={weatherDetails.location} />}
                        </section>
                        {weatherDetails?.forecast && <Forecast forecast={weatherDetails.forecast} time={weatherDetails.current.last_updated} />}
                    </section>)}
            </>
    )
}

export default Weather