import { TextField, Button } from "@material-ui/core";
import { useForm } from "./hooks/useForm";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import { Cities } from "./components/Cities";
import { Forecast } from "./components/Forecast";
function App() {
  const [{ city }, handleChange, restartCity] = useForm({
    city: "",
  });

  const [cities, setCities] = useState([]);
  const [selectCity, setSelectCity] = useState({});
  const [forecast, setForecast] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(city);
    const { data } = await axios.get(
      `https://search.reservamos.mx/api/v2/places?q=${city}`
    );
    let cities = data.filter((info) => info.result_type === "city");
    cities = cities.slice(0, 5);
    setCities(cities);
  };

  const getForeCast = async (selCity) => {
    reset();
    setSelectCity(selCity);
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${selCity.lat}&lon=${selCity.long}&exclude=current,minutely,hourly,alerts&appid=a5a47c18197737e8eeca634cd6acb581&units=metric&lang=es`
    );
    console.log(data.daily);
    setForecast(data.daily);
  };

  const reset = () => {
    setCities([]);
    restartCity();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <TextField
          name="city"
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Ciudad"
        />
        <Button className="searchBtn" variant="contained" type="submit">
          Buscar
        </Button>
      </form>
      <Cities cities={cities} getForeCast={getForeCast} />
      <Forecast forecast={forecast} selectCity={selectCity} />
    </div>
  );
}

export default App;
