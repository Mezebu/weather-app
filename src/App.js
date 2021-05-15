import React from "react";
import {
  Container,
  ThemeProvider,
  createMuiTheme,
  Typography,
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrentWeather from "./component/CurrentWeather";
import SearchWeather from "./component/SearchWeather";
import "./App.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Container>
            <Typography
              variant="h4"
              className="hd-text animate__animated animate__fadeInDown animate__delay-2s"
            >
              Today's Weather Forecast
            </Typography>
            <div className="contents">
              <div className="current-weather">
                <CurrentWeather />
              </div>

              <div className="search">
                <SearchWeather />
              </div>
            </div>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
