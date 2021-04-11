import React, { Fragment, useEffect, useState, useRef } from "react";
import '../css/style.css';
import _ from 'lodash';
const URL = 'https://api.openweathermap.org/data/2.5/weather?q=%s&units=metric&appid=8a2a5d308223fc6eaa8944c411e8b55c';

const TempApp = () => {

    const [city, setCity] = useState(' ');
    const [search, setSearch] = useState("Mumbai");
    const inputRef = useRef();

    useEffect(() => {
        handleSearchText(search);
        inputRef.current = _.debounce(handleSearchText, 500);
    }, []);

    const handleSearchText = (serachValue) => {
        const fetchApi = async () => {
            const url = URL.replace('%s', serachValue);
            const response = await fetch(url);
            const resJson = await response.json();
            setCity(resJson.main);
        };
        fetchApi();
    }

    const handleChange = (event) => {
        let input = event.target.value;
        setSearch(event.target.value);
        inputRef.current(input);
    }

    return (
        <Fragment>
            <div className="box">
                <div className="inputData">
                    <input type="search"
                        className="inputField"
                        value={search}
                        onChange={(event) => handleChange(event)} />
                </div>
                {!city ? (
                    <p className="errorMsg"> No Data Found</p>
                ) : (
                    <div>
                        <div className="info">
                            <h2 className="location">
                                <i className="fas fa-street-view"></i>{search}
                            </h2>
                            <h1 className="temp">
                                {city.temp}°Cel
                            </h1>
                            <h3 className="tempmin_max">
                                Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel
                            </h3>
                        </div>
                        <div className="wave -one"></div>
                        <div className="wave -two"></div>
                        <div className="wave -three"></div>
                    </div>
                )

                }
            </div>
        </Fragment>
    )
}

export default TempApp;