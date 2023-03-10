import { AppBar, Avatar, Badge, Box, Typography } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { ColorContext } from "../Store/themeContext";
import { useOktaAuth, withOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Helper/useAxios";

const NavBar = ({ user }) => {
  const { mode, toggleMode } = ColorContext();
  const { authState, oktaAuth } = useOktaAuth();
  const userId = user && user.user_id;
  const userTag = user && `${user.firstname[0]}${user.lastname[0]}`;

  const handleLogout = async () => {
    await axios({
      method: "post",
      url: `${baseUrl}users/logout`,
      headers: {
        Authorization: `Bearer ${authState.accessToken.accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        userId,
      },
    });
    await oktaAuth.signOut({
      postLogoutRedirectUri: window.location.origin + "/",
    });
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.navBg",
        height: "10vh",
        minHeight: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Link to="/home">
          <Typography
            variant="h6"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                cursor: "pointer",
              },
              color: "text.tertiary",
            }}
          >
            Ping Me <TelegramIcon />
          </Typography>
        </Link>
        <TelegramIcon
          sx={{ display: { xs: "block", sm: "none" }, margin: 0 }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "9px" }}>
        <Badge variant="dot" color="success" overlap="circular">
          <Avatar
            sx={{
              bgcolor: "background.default",
              color: "text.primary",
              height: "30px",
              width: "30px",
            }}
          >
            <Typography>{userTag}</Typography>
          </Avatar>
        </Badge>
        {mode === "light" ? (
          <LightModeIcon
            sx={{ cursor: "pointer" }}
            onClick={() => toggleMode()}
          />
        ) : (
          <Brightness4Icon
            sx={{ cursor: "pointer" }}
            onClick={() => toggleMode()}
          />
        )}
        <LogoutIcon sx={{ cursor: "pointer" }} onClick={handleLogout} />
      </Box>
    </AppBar>
  );
};

export default withOktaAuth(NavBar);
