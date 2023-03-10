import { Avatar, Badge, Box, Typography } from "@mui/material";
import React from "react";

import { SubContext } from "../Store/Context";

const Contacts = ({ friend }) => {
  const { messageBoxHandler, friendHandler } = SubContext();
  const openMessageHandler = (friend) => {
    const ctx = { ...friend, isGroup: false };
    messageBoxHandler();
    friendHandler(ctx);
  };
  return (
    <Box
      sx={{
        bgcolor: "background.selected",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "5px",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "background.hover",
        },
      }}
      onClick={() => {
        openMessageHandler(friend);
      }}
    >
      {friend.status === "online" ? (
        // <Badge variant="dot" color="success" overlap="circular">
        <Avatar
          sx={{
            bgcolor: "background.hover",
            color: "text.primary",
          }}
        >
          {`${friend.firstname[0]}${friend.lastname[0]}`}
        </Avatar>
        // </Badge>
      ) : (
        <Badge variant="dot" color="error" overlap="circular">
          <Avatar
            sx={{
              bgcolor: "background.hover",
              color: "text.primary",
            }}
          >
            {`${friend.firstname[0]}${friend.lastname[0]}`}
          </Avatar>
        </Badge>
      )}
      <Typography>{friend.username}</Typography>
    </Box>
  );
};

export default Contacts;
