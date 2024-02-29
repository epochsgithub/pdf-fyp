// ** react-imports
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React, { Fragment, useState } from "react";
// ** icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// ** reactstrap

export default function PasswordToggler({
  placeholder,
  value,
  onChange,
  name,
  onKeyDown,
  autoFocus,
}) {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      {/* <InputGroup className="input_merge">
        <Input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
        />
        <InputGroupText onClick={() => setShow(!show)}>
          {show ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
        </InputGroupText>
      </InputGroup> */}

      <OutlinedInput
        autoFocus={autoFocus}
        // focused
        notched
        variant="outlined"
        label={name}
        size="small"
        id="outlined-adornment-password"
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShow(!show)}
              edge="end"
            >
              {show ? (
                <VisibilityOff size={20} />
              ) : (
                <Visibility size={20} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </Fragment>
  );
}
