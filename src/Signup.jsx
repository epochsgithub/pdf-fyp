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
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "./contants";
export default function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const [values, setValues] = React.useState("");
  const [processing, setProcessing] = React.useState(false);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password.length < 8) {
      Swal.fire({ icon: "error", html: "Password must be 8 character long" });
      return;
    }
    if (values.password !== values.confirm_password) {
      Swal.fire({ icon: "error", html: "Password does not match" });
      return;
    }
    setProcessing(true);
    axios
      .post(`${baseUrl}/account/signup/`, values)
      .then((res) => {
        setProcessing(false);
        console.log(res);
      })
      .catch((e) => {
        setProcessing(false);
        console.log(e.response);
        if (e.response && e.response.status === 400) {
          Swal.fire({ icon: "error", html: e.response.data.error });
        }
      });
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
            <Typography variant="h5">Signup</Typography>
            <br />

            <TextField
              size="small"
              label="Name"
              fullWidth
              onChange={handleChange("name")}
              values={values.email}
              required
            />
            <br />
            <TextField
              size="small"
              label="Phone"
              fullWidth
              onChange={handleChange("phone")}
              values={values.phone}
              required
              type="number"
            />
            <br />
            <TextField
              size="small"
              label="Email"
              fullWidth
              onChange={handleChange("email")}
              values={values.email}
              required
              type="email"
            />
            <br />
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                required
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
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword2 ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm password"
                onChange={handleChange("confirm_password")}
                values={values.confirm_password}
                required
              />
            </FormControl>
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              disabled={processing}
              endIcon={processing && <CircularProgress size={"small"} />}
            >
              Sign up
            </Button>
          </Card>
        </form>
      </Grid>
      {/* <Grid item xs={3}></Grid> */}
    </Grid>
  );
}
