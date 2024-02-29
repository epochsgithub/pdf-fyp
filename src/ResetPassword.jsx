import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormGroup,
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
import OtpInput from "react-otp-input";
import { Label } from "@mui/icons-material";
import axios from "axios";
import { baseUrl } from "./contants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



export default function ResetPassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);
  const [values, setValues] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowCPassword((show) => !show);

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
      .post(`${baseUrl}/account/reset/password/complete/`, values)
      .then((res) => {
        setProcessing(false);
        Swal.fire({ icon: "success", html: res.data.success }).then(() => {
          navigate(`/`)
        });
        console.log(res);
      })
      .catch((e) => {
        setProcessing(false);
        console.log(e.response);
        if (e.response && e.response.status === 400 && e.response.data.password) {
          Swal.fire({ icon: "error", html: e.response.data.password });
        }
        if (e.response && e.response.status === 400 && e.response.data.error) {
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
            <Typography variant="h5">Reset Password</Typography>
            <br />
            <TextField margin="normal" size="small" label="OTP" fullWidth onChange={handleChange("otp")}
              values={values.otp}
              required />
            <br />
            <FormControl margin="normal" fullWidth variant="outlined" size="small">
              <InputLabel margin="normal" htmlFor="outlined-adornment-password">
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
            <FormControl margin="normal" fullWidth variant="outlined" size="small">
              <InputLabel margin="normal" htmlFor="outlined-adornment-password">
                Confirm password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showCPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showCPassword ? <VisibilityOff /> : <Visibility />}
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
            <Button margin="normal" type="submit"
              fullWidth
              variant="contained"
              size="small"
              disabled={processing}
              endIcon={processing && <CircularProgress size={"small"} />}>
              Reset password
            </Button>
          </Card>
        </form>
      </Grid>
      {/* <Grid item xs={3}></Grid> */}
    </Grid>
  );
}
