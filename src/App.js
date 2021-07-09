import React, { useEffect , useState } from 'react';
import {findAllByDisplayValue} from "@testing-library/react";
const api = {
  key: "98a8a391dfb554c32f9bbd2ab8769e32",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {


    const [lat, setlat] = useState();
    const [long, setlong] = useState();
    const [query, setQuery] = useState();
    const [weather, setWeather] = useState({});
    const [conversor, setConversor] = useState('see other weather');
    const [conversor2, setConversor2] = useState('your weather');
    const [cityname, setcityname] = useState();
    const [countryname, setcountryname] = useState();
    const [hum, sethum] = useState();
    const [we, setwe] = useState();
    const [icon, seticon] = useState();
    const search = a => {
        if (a.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);

                });
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            setlat(position.coords.latitude)
            setlong(position.coords.longitude)

        })

    }, [])

    useEffect(() => {
        const miFunc = async () => {
            const x = `https://api.weatherapi.com/v1/current.json?key=854564a8afbd4d9fa9b32359210907&q=${lat},${long}&aqi=no`
            const res = await fetch(x).then(res => res.json())

            console.log(res)
            setcityname(res.location.name)
            setcountryname(res.location.country)
            setwe(res.current.temp_c)
            sethum(res.current.humidity)
            seticon(res.current.condition.text)
        }
        if (lat && long) {
            miFunc()
        }
    }, [lat, long])
    return (

        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 18) ? 'app warm' : 'app') : 'app'}>

            <main>
                <div className={"tittle"}><h6>MOJICAWEATHERAPP</h6></div>
<div className="locationinfodad">
    <div>
                <div className="locationinfo">you are in {cityname}</div>
                <div className="locationinfo">{countryname}</div>
                <div>humedad: {hum}%</div>
                <button className="locationinfo" onClick={() => {
                    if (conversor2 === 'your weather') {
                        setConversor2(Math.round(we) + '°c')
                    }
                    if (conversor2 === Math.round(we) + '°c') {
                        setConversor2(Math.round((we) * (9 / 5) + 32) + '°f')
                    }
                    if (conversor2 === Math.round((we) * (9 / 5) + 32) + '°f') {
                        setConversor2(Math.round(we) + '°c')
                    }
                }}>{conversor2}

                </button>
    </div>
    <div >{icon}</div>
</div>
                <div className="search-box">

                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search other city..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}

                    />

                </div>

                <div className="tittle2">LOOK OTHER WEATHER

                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>


                        </div>

                        <div className="weather-box">
                            <div><h6>MOJICAWEATHERAPP</h6></div>


                            <button className="temp" onClick={() => {
                                if (conversor === 'see other weather') {
                                    setConversor(Math.round(weather.main.temp) + '°c')
                                }
                                if (conversor === Math.round(weather.main.temp) + '°c') {
                                    setConversor(Math.round((weather.main.temp) * (9 / 5) + 32) + '°f')
                                }
                                if (conversor === Math.round((weather.main.temp) * (9 / 5) + 32) + '°f') {
                                    setConversor(Math.round(weather.main.temp) + '°c')
                                }
                            }}>{conversor}

                            </button>


                            <div className="weather">{weather.weather[0].main}</div>
                            <a href='#' className="again"><h6>see another city</h6></a>
                        </div>

                    </div>

                ) : ('')}

            </main>
        </div>
    );
}

export default App;
