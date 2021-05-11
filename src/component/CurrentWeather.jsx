import React, { useEffect, useState } from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles({
  pos: {
    marginBottom: 12,
  },
  typography: {
    fontSize: 40,
    fontWeight: 700,
  },
});

const CurrentWeather = () => {
  const classes = useStyles();

  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [desc, setDesc] = useState("");
  const [feels, setFeels] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = (position) => {
    setLoading(true);
    setLon(position.coords.longitude);
    setLat(position.coords.latitude);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=6695312a562194eb90b6350b28b39779`;

    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        setCountry(response.data.sys.country);
        setCity(response.data.name);
        setDesc(response.data.weather[0].main);
        setFeels(response.data.main.feels_like);
        setHumidity(response.data.main.humidity);
        setTemperature(response.data.main.temp);
        setTempMin(response.data.main.temp_min);
        setTempMax(response.data.main.temp_max);
        setIcon(response.data.weather[0].icon);
        console.log(response);
      })
      .catch(function (error) {
        setError(error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(fetchData);
  }, []);

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
        <div style={{ marginTop: 45 }}>
          <i className="bi bi-brightness-high" style={{ fontSize: 51 }}></i>
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
                {city}, {country}
              </Typography>

              <Typography>
                {moment().format("dddd")}, {moment().format("LL")}
              </Typography>

              <Typography className={classes.typography} gutterBottom>
                {Math.ceil(temperature)}&deg;c
              </Typography>
              <Typography>Feels Like: {Math.ceil(feels)}&deg;c</Typography>

              <Typography variant="h6">
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
