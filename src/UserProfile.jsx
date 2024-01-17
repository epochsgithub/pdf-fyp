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
import { AccountCircle } from "@mui/icons-material";
export default function UserProfile() {
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
        backgroundSize: "cover",
        background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(https://cutewallpaper.org/28/darwin-laptop-wallpaper/brand-managers-rely-on-thought-leadership-press-by-trudy-darwin-communications-medium.jpeg)`,
      }}
    >
      <Grid item xs={4}></Grid>
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
          <img
            style={{ width: 150, height: 150 }}
            src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
            alt=""
          />
          <br />
          <Typography>
            <strong>First name:</strong> Ayaz
          </Typography>
          <Typography>
            <strong>Last name:</strong> Hassan
          </Typography>
          <Typography>
            <strong>Username:</strong> ayaz-hassan
          </Typography>
          <Typography>
            <strong>Email:</strong> ayaz@gmail.com
          </Typography>
        </Card>
      </Grid>
      {/* <Grid item xs={3}></Grid> */}
    </Grid>
  );
}
