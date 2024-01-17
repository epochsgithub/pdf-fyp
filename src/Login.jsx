import {
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid
      container
      spacing={2}
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(https://cutewallpaper.org/28/darwin-laptop-wallpaper/brand-managers-rely-on-thought-leadership-press-by-trudy-darwin-communications-medium.jpeg)`,
      }}
    >
      <Grid item xs={8}></Grid>
      <Grid item xs={4}>
        <Card
          elevation={10}
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0px 20px",
          }}
        >
          <Typography variant="h5">Login</Typography>
          <br />
          <TextField size="small" label="Email" fullWidth />
          <br />
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <br />
          <Button fullWidth variant="contained" size="small">
            Login
          </Button>
        </Card>
      </Grid>
      {/* <Grid item xs={3}></Grid> */}
    </Grid>
  );
}
