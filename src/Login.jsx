import {
  Button,
  Card,
  CircularProgress,
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
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./contants";
import Swal from "sweetalert2";
export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [values, setValues] = React.useState("");
  const [processing, setProcessing] = React.useState(false);



  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    axios.post(`${baseUrl}/account/signin/`, values).then((res) => {
      setProcessing(false);
      localStorage.setItem("accessToken", res.data.access_token);
      localStorage.setItem("refreshToken", res.data.refresh_token);
      localStorage.setItem("name", res.data.name);
      window.location.assign("/app/dashboard");
      console.log("res", res)
    }).catch((e) => {
      setProcessing(false);
      if (e.response && e.response.status === 400 && e.response.data.error) {
        Swal.fire({ icon: "error", html: e.response.data.error });
      }
      if (e.response && e.response.status === 400 && e.response.data.password) {
        Swal.fire({ icon: "error", html: e.response.data.password });
      }
    })
  };
  return (
    <Grid
      container
      spacing={2}
      style={{
        backgroundSize: "cover",
        background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(https://cutewallpaper.org/28/darwin-laptop-wallpaper/brand-managers-rely-on-thought-leadership-press-by-trudy-darwin-communications-medium.jpeg)`,
      }}
    >
      <Grid item xs={8}></Grid>
      <Grid item xs={4}>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <TextField size="small" label="Email" fullWidth onChange={handleChange("email")}
              values={values.email} margin="normal" />
            <br />
            <FormControl margin="normal" fullWidth variant="outlined" size="small">
              <InputLabel margin="normal" htmlFor="outlined-adornment-password">
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
                onChange={handleChange("password")}
                values={values.password}
              />
            </FormControl>
            <br />
            <Button
              margin="normal"
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              disabled={processing}
              endIcon={processing && <CircularProgress size={"small"} />}
            >
              Login
            </Button>
            <br />
            <div style={{ justifyContent: "space-between", display: "flex", width: "100%" }}>
              <div>
                <Link to="/sign-up">Don't have an account?</Link>
              </div>
              <div>
                <Link to="/forget-password">Forget password</Link>
              </div>
            </div>
          </Card>
        </form>
      </Grid>
      {/* <Grid item xs={3}></Grid> */}
    </Grid >
  );
}
