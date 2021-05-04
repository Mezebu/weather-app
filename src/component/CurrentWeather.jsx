import React, { useEffect, useState } from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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

const CurrentWeather = () => {
  const classes = useStyles();

  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [desc, setDesc] = useState([]);
  const [feels, setFeels] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [sunrise, setSunrise] = useState([]);
  const [sunset, setSunset] = useState([]);
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
        setDesc(response.data.weather[0].description);
        setFeels(response.data.main.feels_like);
        setHumidity(response.data.main.humidity);
        setTemperature(response.data.main.temp);
        setSunrise(response.data.sys.sunrise);
        setSunset(response.data.sys.sunset);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(fetchData);
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
                Time: {moment().format(" h:mm a")}
              </Typography>

              <Typography className={classes.typography} gutterBottom>
                {temperature}&deg;c
              </Typography>
              <Typography>Feels Like: {feels}&deg;c</Typography>

              <Typography variant="h6">
                <b>{desc}</b>
              </Typography>
              <Typography>Humidity: {humidity}%</Typography>

              <Typography gutterBottom>
                Sunrise:{" "}
                {new Date(sunrise * 1000).toLocaleTimeString("en-GB", {
                  timeZone: "Africa/Lagos",
                  timeStyle: "short",
                  hourCycle: "h12",
                })}
              </Typography>

              <Typography gutterBottom>
                Sunset:{" "}
                {new Date(sunset * 1000).toLocaleTimeString("en-GB", {
                  timeZone: "Africa/Lagos",
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

export default CurrentWeather;
