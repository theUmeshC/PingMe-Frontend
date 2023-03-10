import {
  AppBar,
  Box,
  Divider,
  Stack,
  Typography,
  SpeedDial,
} from "@mui/material";
import React from "react";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { LineWave } from "react-loader-spinner";

import useAxios, { baseUrl } from "../Helper/useAxios";
import Contacts from "../Components/Contact";
import Group from "../Components/Group";

const SideBar = ({ user, socket }) => {
  const userId =
    JSON.parse(localStorage.getItem("user"))?.user_id || user.user_id;
  const history = useHistory();

  const { data: friends } = useAxios(`${baseUrl}chat/getFriends`, {
    userId,
  });

  const { data: groups } = useAxios(`${baseUrl}chat/getGroups`, {
    userId,
  });

  return (
    <>
      {friends && groups && (
        <Box
          flex={1}
          sx={{
            bgcolor: "background.default",
            minWidth: "250px",
            height: "100%",
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, left: 16 }}
            icon={<SpeedDialIcon />}
          >
            <SpeedDialAction
              sx={{ bgcolor: "background.hover" }}
              key="addUser"
              icon={<AccountCircleIcon sx={{ color: "text.primary" }} />}
              tooltipTitle="Add Contact"
              onClick={() => history.replace("/addContact")}
            />
            <SpeedDialAction
              sx={{ bgcolor: "background.hover" }}
              key="addGroup"
              icon={<GroupsIcon sx={{ color: "text.primary" }} />}
              tooltipTitle="Create Group"
              onClick={() => history.replace("/addGroup")}
            />
          </SpeedDial>
          <AppBar
            position="static"
            sx={{
              bgcolor: "background.hover",
              height: "10%",
              borderBottom: "1px solid purple",
              minHeight: "50px",
            }}
          >
            <Typography
              color={"text.primary"}
              sx={{
                margin: "auto",
              }}
            >
              Contacts
            </Typography>
          </AppBar>
          <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            sx={{ height: "90%", overflow: "auto" }}
          >
            {friends.map((friend) => (
              <Contacts key={uuidv4()} friend={friend} socket={socket} />
            ))}
            {groups.map((group) => (
              <Group key={uuidv4()} friend={group} socket={socket} />
            ))}
          </Stack>
        </Box>
      )}
      {!friends || !groups ? (
        <LineWave
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave"
          visible={true}
        />
      ) : null}
    </>
  );
};

export default SideBar;
