import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import axios from "axios";
import { useEffect, useState } from "react";

function WeatherApp() {

  const [zone, setZone] = useState(null)
  const [search, setSearch] = useState(localStorage.getItem("fav") || "Vigo")

  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=e91cc3cd14fa4b06b01110333232101&lang=es&q=${search}&aqi=yes`)
      .then((data) => setZone(data.data))
      .catch(error => getNextKeyDef(error))
  }, [search])
  console.log(localStorage.getItem("fav"))

  const handleClick = () => {
    localStorage.setItem("fav", zone?.location.name)
    axios.get(`https://api.weatherapi.com/v1/current.json?key=e91cc3cd14fa4b06b01110333232101&lang=es&q=${search}&aqi=yes`)
    .then((data) => setZone(data.data))}


  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center text">
      {/* <div className="container mt-5 w-50 py-5 d-flex flex-column text-light rounded">
        <div className="align-self-center d-flex align-items-center mb-3">
          <input type="text" value={search} onChange={(ev) => setSearch(ev.target.value)} className="form-control"></input>
          {zone?.location.name === localStorage.getItem("fav") ? <button onClick={() => handleClick()} className="btn">❤️</button> : <button onClick={() => handleClick()} className="btn">🤍</button>}
        </div>
        <h3 className="text">{zone?.location.name}, {zone?.location.region} {zone?.location.country}</h3>
        <h3 className="text">{zone?.current.condition.text}</h3>
        <h3 className="text">Temp: {zone?.current.temp_c}º</h3>
        <h3 className="text">Sensación térmica: {zone?.current.feelslike_c}º</h3>
        <h3 className="text">Viento {zone?.current.wind_dir}, vel {zone?.current.wind_kph}km/h</h3>
        <h3 className="text">Humedad: {zone?.current.humidity}%</h3>
        <h3 className="text">Luvia: {zone?.current.precip_mm} l/m²</h3>
      </div> */}
      <div className="card text-bg-dark border-0">
        <img src="https://64.media.tumblr.com/a5cb22f7685f641f7641d2dce28765b2/tumblr_mwmwmrUYyZ1qzftf1o1_500.gif" className="card-img" alt="bg" />
        <div className="card-img-overlay mt-5">
          <div className="align-self-center d-flex align-items-center mb-3">
            <input type="text" value={search} onChange={(ev) => setSearch(ev.target.value)} className="form-control"></input>
            {zone?.location.name === localStorage.getItem("fav") ? <button onClick={() => handleClick()} className="btn">❤️</button> : <button onClick={() => handleClick()} className="btn">🤍</button>}
          </div>
          <h3 className="card-title text mt-5 ms-5">{zone?.location.name}, {zone?.location.region} {zone?.location.country}</h3>
          <h6 className="card-text text ms-5">{zone?.current.condition.text}</h6>
          <h4 className="card-text text ms-5"><small>Temp: {zone?.current.temp_c}º</small></h4>
          <h5 className="card-text text ms-5"><small>Sensación térmica: {zone?.current.feelslike_c}º</small></h5>
          <h4 className="card-text text ms-5"><small>Viento: {zone?.current.wind_dir}, vel: {zone?.current.wind_kph} km/h</small></h4>
          <h4 className="card-text text ms-5"><small>Humedad: {zone?.current.humidity}%</small></h4>
          <h4 className="card-text text ms-5"><small>Luvia: {zone?.current.precip_mm} l/m²</small></h4>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;