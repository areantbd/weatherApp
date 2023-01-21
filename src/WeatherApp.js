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
  console.log(zone?.location.name)

  const handleClick = () => localStorage.setItem("fav", zone?.location.name)


  return (
    <>
    <input type="text" value={search} onChange={(ev) => setSearch(ev.target.value)}></input>
    <h3>{zone?.location.name}, {zone?.location.region} {zone?.location.country}</h3>
    <h3>{zone?.current.condition.text}</h3>
    <h3>Temp: {zone?.current.temp_c}º Sensación térmica: {zone?.current.feelslike_c}</h3>
    <h3>Vientos de {zone?.current.wind_kph} km/h, dirección {zone?.current.wind_dir} </h3>
    {/* <h3>{zone?.current?.air_quality}</h3> */}
    <h3>Humedad: {zone?.current.humidity}%</h3>
    <h3>Luvia: {zone?.current.precip_mm} l/m²</h3>
    <button onClick={() => handleClick()}>favorito</button>
    </>
  );
}

export default WeatherApp;