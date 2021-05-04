import React, { useEffect, useState } from "react";
import { Card, makeStyles, Typography, CardContent } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    minHeight: 500,
  },
  pos: {
    marginBottom: 12,
  },
  typography: {
    fontSize: 40,
    fontWeight: 700,
  },
});

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${55.755825}&lon=${37.617298}&units=metric&appid=6695312a562194eb90b6350b28b39779`;

const MoscowWeather = () => {
  const classes = useStyles();

  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [desc, setDesc] = useState([]);
  const [sunrise, setSunrise] = useState([]);
  const [sunset, setSunset] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [feels, setFeels] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setLat(55.755825);
    setLon(37.617298);

    axios

      .get(url)
      .then((response) => {
        setLoading(false);
        setCountry(response.data.sys.country);
        setCity(response.data.name);
        setSunrise(response.data.sys.sunrise);
        setSunset(response.data.sys.sunset);
        setTemperature(response.data.main.temp);
        setDesc(response.data.weather[0].description);
        setFeels(response.data.main.feels_like);
        setHumidity(response.data.main.humidity);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card
        className={classes.root}
        style={{
          background: "rgba( 255, 255, 255, 0.30 )",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        }}
      >
        <i class="bi bi-brightness-high" style={{ fontSize: 50 }}></i>
        {loading ? (
          <div style={{ margin: "100px" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {country}
              </Typography>

              <Typography variant="h3" gutterBottom>
                {city}
              </Typography>

              <Typography>
                {moment().format("dddd")}, {moment().format("LL")}
              </Typography>

              <Typography gutterBottom>
                Time:{" "}
                {new Date().toLocaleString("ru-RU", {
                  timeZone: "Europe/Moscow",
                  timeStyle: "short",
                  hourCycle: "h12",
                })}
              </Typography>

              <Typography className={classes.typography} gutterBottom>
                {Math.ceil(temperature)}&deg;c
              </Typography>
              <Typography>Feels Like: {Math.ceil(feels)}&deg;c</Typography>

              <Typography variant="h6">
                <b>{desc}</b>
              </Typography>
              <Typography>Humidity: {humidity}%</Typography>

              <Typography gutterBottom>
                Sunrise:{" "}
                {new Date(sunrise * 1000).toLocaleTimeString("ru-RU", {
                  timeZone: "Europe/Moscow",
                  timeStyle: "short",
                  hourCycle: "h12",
                })}
              </Typography>

              <Typography gutterBottom>
                Sunset:{" "}
                {new Date(sunset * 1000).toLocaleTimeString("ru-RU", {
                  timeZone: "Europe/Moscow",
                  timeStyle: "short",
                  hourCycle: "h12",
                })}
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

export default MoscowWeather;
