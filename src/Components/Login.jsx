import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Login = ({ handleLogin }) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: "28px",
          },
        }}
      >
        Welcome to Ping Me
      </Typography>
      <Typography variant="h5" mb={5}>
        An Awesome Chatting App!!{" "}
      </Typography>
      <Button
        variant="contained"
        className="loginBtn"
        onClick={() => handleLogin()}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
