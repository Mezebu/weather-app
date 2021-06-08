import React from "react";
import {
  Container,
  ThemeProvider,
  createMuiTheme,
  Typography,
  Grid,
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
            <Grid container spacing={1} maxWidth="sm">
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
