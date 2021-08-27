import React from "react";
// prettier-ignore
import { Container, ThemeProvider, createMuiTheme, Typography, Grid,} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";

import CurrentWeather from "./component/currentWeather/CurrentWeather";
import SearchWeather from "./component/searchWeather/SearchWeather";
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
          <Container maxWidth="md">
            <Typography
              variant="h4"
              className="hd-text animate__animated animate__fadeInDown animate__delay-2s"
            >
              Today's Weather Forecast
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6} className="contents">
                <CurrentWeather />
              </Grid>
              <Grid item xs={12} sm={6} md={6} className="contents">
                <SearchWeather />
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
