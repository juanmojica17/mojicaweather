import React, { useState } from 'react';

const api = {
  key: "98a8a391dfb554c32f9bbd2ab8769e32",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
    const [conversor, setConversor] = useState('see yor weather');

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






  return (

      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 18) ? 'app warm' : 'app') : 'app'}>

          <main>
              <div className={"tittle"}><h6>MOJICAWEATHERAPP</h6></div>
          <div className="search-box">

            <input
                type="text"
                className="search-bar"
                placeholder="Search your city..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}

            />

          </div>
              <div className="tittle2">LOOK YOUR WEATHER

              </div>
          {(typeof weather.main != "undefined") ? (
              <div>
                <div className="location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>





                </div>

                <div className="weather-box">
                    <div><h6>MOJICAWEATHERAPP</h6></div>


                 <button className= "temp" onClick={()=>{
                     if(conversor === 'see yor weather'){
                         setConversor(Math.round(weather.main.temp)+'°c')
                     }
                     if(conversor === Math.round(weather.main.temp)+'°c'){
                         setConversor(Math.round((weather.main.temp)* (9/5) + 32)+'°f')
                     }
                     if(conversor === Math.round((weather.main.temp)* (9/5) + 32)+'°f'){
                         setConversor(Math.round(weather.main.temp)+'°c')
                     }
                 }} >{conversor}

                 </button>





                  <div className="weather">{weather.weather[0].main}</div>
                    <a href='https://mojicaweather.vercel.app/' className="again"><h6>see another city</h6></a>
                </div>

              </div>

          ) : ('')}

        </main>
      </div>
  );
}

export default App;
