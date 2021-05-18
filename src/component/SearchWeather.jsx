import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  Card,
  makeStyles,
  Typography,
  CardContent,
  TextField,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: "rgba( 255, 255, 255, 0.30 )",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    width: "20rem",
    height: "33rem",
  },
  typography: {
    fontSize: 40,
    fontWeight: 700,
  },
});

const SearchWeather = () => {
  const classes = useStyles();

  const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { main = {}, wind = {}, sys = {}, weather = [], id, name: city } = data;
  const { feels_like, temp_max, temp_min, humidity, temp } = main;
  const { icon, main: description } = weather[0] || {};
  const { country } = sys;
  const { speed } = wind;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=6695312a562194eb90b6350b28b39779`;

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery("");
    setError("");
    setData({});

    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        setData(response.data);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  const inputHandler = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <>
      <Card className={classes.root}>
        <form onSubmit={submitHandler}>
          <TextField
            id="standard-basic"
            label="Search city..."
            value={query}
            onChange={inputHandler}
          />
        </form>

        <div>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        </div>

        {error && <Typography>{error}</Typography>}

        {loading && (
          <div style={{ margin: "100px" }}>
            <CircularProgress color="secondary" />
          </div>
        )}
        {id && (
          <>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {city}, {country}
              </Typography>

              <Typography>
                {moment().format("dddd")}, {moment().format("LL")}
              </Typography>

              <Typography className={classes.typography} gutterBottom>
                {Math.ceil(temp)}&deg;c
              </Typography>
              <Typography>Feels Like: {Math.ceil(feels_like)}&deg;c</Typography>

              <Typography variant="h6">
                <b>{description}</b>
              </Typography>

              <Typography>Humidity: {humidity}%</Typography>

              <Typography gutterBottom>
                Min Temperature: {Math.ceil(temp_min)}&deg;c
              </Typography>

              <Typography gutterBottom>
                Max Temperature: {Math.ceil(temp_max)}&deg;c
              </Typography>

              <Typography gutterBottom>
                Wind: {Math.ceil(speed)} km/h
              </Typography>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};

export default SearchWeather;
