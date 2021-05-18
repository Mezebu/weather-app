import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  Card,
  CardContent,
  makeStyles,
  Typography,
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

const CurrentWeather = () => {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [coords, setCoords] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { main = {}, sys = {}, weather = [], name: city, id } = data;
  const { feels_like, humidity, temp, temp_min, temp_max } = main;
  const { icon, main: description } = weather[0] || {};
  const { lat, lon } = coords;
  const { country } = sys;

  const fetchData = (position) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=6695312a562194eb90b6350b28b39779`;

    setLoading(true);
    setCoords(position.coords);
    setError("");
    setCoords({});
    setData({});

    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        setData(response.data);
        console.log(response);
      })
      .catch(function (error) {
        setLoading(false);
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(fetchData);
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <div style={{ marginTop: 45 }}>
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
                Time: {moment().format(" h:mm a")}
              </Typography>

              <Typography style={{ display: "none" }}>
                {lat}/{lon}
              </Typography>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};

export default CurrentWeather;
