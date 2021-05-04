import React, { useEffect, useState } from "react";
import { Card, makeStyles, Typography, CardContent } from "@material-ui/core";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
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

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${-33.86882}&lon=${151.20929}&units=metric&appid=6695312a562194eb90b6350b28b39779`;

const SydneyWeather = () => {
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
  const fetchData = () => {
    setLat(-33.86882);
    setLon(151.20929);

    axios.get(url).then((response) => {
      setCountry(response.data.sys.country);
      setCity(response.data.name);
      setSunrise(response.data.sys.sunrise);
      setSunset(response.data.sys.sunset);
      setTemperature(response.data.main.temp);
      setDesc(response.data.weather[0].description);
      setFeels(response.data.main.feels_like);
      setHumidity(response.data.main.humidity);
      console.log(response);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Card className={classes.root}>
        <CloudQueueIcon style={{ fontSize: 60 }} />
        <CardContent>
          <div className="one">
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
              {new Date().toLocaleString("en-GB", {
                timeZone: "Europe/London",
                timeStyle: "short",
                hourCycle: "h12",
              })}
            </Typography>

            <Typography className={classes.typography} gutterBottom>
              {temperature}&deg;c
            </Typography>
            <Typography>
              <p>Feels Like: {feels}&deg;c</p>
            </Typography>
          </div>

          <Typography>
            <h3>{desc}</h3>
            <p>Humidity: {humidity}%</p>
          </Typography>

          <Typography>
            Sunrise:{" "}
            {new Date(sunrise * 1000).toLocaleTimeString("en-AU", {
              timeZone: "Europe/London",
              timeStyle: "short",
              hourCycle: "h12",
            })}
          </Typography>

          <Typography>
            Sunset:{" "}
            {new Date(sunset * 1000).toLocaleTimeString("en-AU", {
              timeZone: "Europe/London",
              timeStyle: "short",
              hourCycle: "h12",
            })}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default SydneyWeather;
