import { TextField, Button } from "@material-ui/core";
import { useForm } from "./hooks/useForm";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import { Cities } from "./components/Cities";
import { Forecast } from "./components/Forecast";
function App() {
  const [{ first_city, last_city }, handleChange, restartCity] = useForm({
    first_city: "",
    last_city: "",
  });

  // const [cities, setCities] = useState([]);
  // const [selectCity, setSelectCity] = useState({});
  const [forecast, setForecast] = useState([]);
  const [idMaxHum, setIdMaxHum] = useState(0);

  const handleSubmit = async (e) => {
    // setCities([]);
    e.preventDefault();
    const { data } = await axios.get(
      `https://search.reservamos.mx/api/v2/places?q=${last_city}&from=${first_city}`
    );
    if (data.length > 0) {
      console.log(data);
      let cityDest = data.filter((info) => info.result_type === "city");
      cityDest = cityDest.slice(0, 1);
      const information = await axios.get(
        `https://search.reservamos.mx/api/v2/places?q=${first_city}`
      );
      let cityOri = information.data.filter(
        (info) => info.result_type === "city"
      );
      cityOri = cityOri.slice(0, 1);
      // setCities([...cities, cityDest, cityOri]);
      getForeCast(cityDest[0], cityOri[0]);
    }
  };

  const getForeCast = async (cityDest, cityOri) => {
    setForecast([]);
    // reset();
    // setSelectCity(selCity);
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityDest.lat}&lon=${cityOri.long}&exclude=current,minutely,hourly,alerts&appid=a5a47c18197737e8eeca634cd6acb581&units=metric&lang=es`
    );
    console.log(data.daily);
    const information = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityOri.lat}&lon=${cityOri.long}&exclude=current,minutely,hourly,alerts&appid=a5a47c18197737e8eeca634cd6acb581&units=metric&lang=es`
    );
    console.log(information.data.daily);
    setForecast([...forecast, data, information.data]);
    // let MaxHum = {
    //   humidity: 0,
    //   idMaxHum: 0,
    // };
    // data.daily.map((forecast) => {
    //   if (forecast.humidity > MaxHum.humidity) {
    //     MaxHum = {
    //       humidity: forecast.humidity,
    //       idMaxHum: forecast.dt,
    //     };
    //   }
    // });
    // setIdMaxHum(MaxHum.idMaxHum);
  };

  // const reset = () => {
  //   setCities([]);
  //   restartCity();
  // };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <TextField
          name="first_city"
          type="text"
          value={first_city}
          onChange={handleChange}
          placeholder="Ciudad Origen"
        />
        <TextField
          name="last_city"
          type="text"
          value={last_city}
          onChange={handleChange}
          placeholder="Ciudad Destino"
        />
        <Button className="searchBtn" variant="contained" type="submit">
          Buscar
        </Button>
      </form>
      {/* <Cities cities={cities} getForeCast={getForeCast} /> */}
      <Forecast
        // idMaxHum={idMaxHum}
        forecast={forecast}
        // selectCity={selectCity}
      />
    </div>
  );
}

export default App;
