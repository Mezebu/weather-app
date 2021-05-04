import React from "react";
import { Container, ThemeProvider, createMuiTheme } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrentWeather from "./component/CurrentWeather";
import MoscowWeather from "./component/MoscowWeather";
import LondonWeather from "./component/LondonWeather";
import NewyorkWeather from "./component/NewyorkWeather";
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
            <div className="contents">
              <div className="current-weather">
                <CurrentWeather />
              </div>
              <div className="london">
                <LondonWeather />
              </div>
              <div className="moscow">
                <MoscowWeather />
              </div>

              <div className="new-york">
                <NewyorkWeather />
              </div>
            </div>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
