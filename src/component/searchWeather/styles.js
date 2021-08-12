import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  root: {
    background: "rgba( 255, 255, 255, 0.30 )",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    width: "20rem",
    height: "32rem",
  },
  typography: {
    fontSize: 40,
    fontWeight: 700,
  },
});
