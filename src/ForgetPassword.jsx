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
import { baseUrl } from "./contants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function ForgetPassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [values, setValues] = React.useState("");
  const [processing, setProcessing] = React.useState(false);
  const navigate = useNavigate();


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    axios.post(`${baseUrl}/account/reset/password/`, values).then((res) => {
      setProcessing(false);
      console.log("res", res);
      Swal.fire({ icon: "success", html: res.data.success }).then(() => {
        navigate(`/reset-password`)
      });
      // window.location.assign("/reset-password");
    }).catch((e) => {
      setProcessing(false);
      if (e.response && e.response.status === 400) {
        Swal.fire({ icon: "error", html: e.response.data.email });
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
            <Typography variant="h5">FORGET PASSWORD</Typography>
            <br />
            <TextField margin="normal" size="small" label="Email" fullWidth onChange={handleChange("email")}
              values={values.email} />
            <br />
            <Button margin="normal" type="submit"
              fullWidth
              variant="contained"
              size="small"
              disabled={processing}
              endIcon={processing && <CircularProgress size={"small"} />}>
              Submit
            </Button>
          </Card>
        </form>
      </Grid>
      {/* <Grid item xs={3}></Grid> */}
    </Grid>
  );
}
