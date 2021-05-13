import React, { useState } from "react";
import {
  Card,
  makeStyles,
  Typography,
  CardContent,
  TextField,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import axios from "axios";

const useStyles = makeStyles({
  pos: {
    marginBottom: 12,
  },
  typography: {
    fontSize: 40,
    fontWeight: 700,
  },
});

const SearchWeather = () => {
  const classes = useStyles();

  const [input, setInput] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [desc, setDesc] = useState("");
  const [temperature, setTemperature] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [feels, setFeels] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=6695312a562194eb90b6350b28b39779`;

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setInput("");
    setError("");

    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        setCountry(response.data.sys.country);
        setCity(response.data.name);
        setDesc(response.data.weather[0].main);
        setTemperature(response.data.main.temp);
        setTempMin(response.data.main.temp_min);
        setTempMax(response.data.main.temp_max);
        setFeels(response.data.main.feels_like);
        setHumidity(response.data.main.humidity);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
        console.log(response);
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  const inputHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <>
      <Card
        className="card"
        style={{
          background: "rgba( 255, 255, 255, 0.30 )",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        }}
      >
        <form onSubmit={submitHandler}>
          <TextField
            id="standard-basic"
            label="Search city..."
            value={input}
            onChange={inputHandler}
          />
        </form>

        <div>
          <i className="bi bi-brightness-high" style={{ fontSize: 50 }}></i>
        </div>

        {error && <Typography>{error}</Typography>}

        {loading ? (
          <div style={{ margin: "100px" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {city} {country}
              </Typography>

              <Typography>
                {moment().format("dddd")}, {moment().format("LL")}
              </Typography>

              <Typography className={classes.typography} gutterBottom>
                {Math.ceil(temperature)}&deg;c
              </Typography>
              <Typography>Feels Like: {Math.ceil(feels)}&deg;c</Typography>

              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <b>{desc}</b>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt=""
                  className="icon"
                />
              </Typography>

              <Typography>Humidity: {humidity}%</Typography>

              <Typography gutterBottom>
                Min Temperature: {Math.ceil(tempMin)}&deg;c
              </Typography>

              <Typography gutterBottom>
                Max Temperature: {Math.ceil(tempMax)}&deg;c
              </Typography>

              <Typography gutterBottom>Wind: {Math.ceil(wind)} km/h</Typography>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};

export default SearchWeather;
