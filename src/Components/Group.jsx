import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import Groups2Icon from '@mui/icons-material/Groups2';

import { SubContext } from "../Store/Context";

const Group = ({ friend }) => {
  const { messageBoxHandler, friendHandler } = SubContext();
  const openMessageHandler = (friend) => {
    const ctx = {...friend, isGroup: true}
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
      <Avatar
        sx={{
          bgcolor: "background.hover",
          color: "text.primary",
        }}
      >
        <Groups2Icon />
      </Avatar>
      <Typography>{friend.group_name}</Typography>
    </Box>
  );
};

export default Group;
