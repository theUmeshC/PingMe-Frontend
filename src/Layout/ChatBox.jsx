import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import { Rings } from "react-loader-spinner";
import Picker from "emoji-picker-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";

import { ColorContext } from "../Store/themeContext";
import { SubContext } from "../Store/Context";
import Groups2Icon from "@mui/icons-material/Groups2";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MessageWrapper from "../Components/MessageWrapper";
import { baseUrl } from "../Helper/useAxios";

const ChatBox = ({ user, socket }) => {
  const { mode } = ColorContext();
  const [messageToSend, setMessageToSend] = useState("");
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const { messageBoxHandler, friend } = SubContext();
  const { authState } = useOktaAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (friend && socket) {
      socket.emit("join room", friend.chat_id);
      return () => socket.emit("leave room", friend.chat_id);
    }
  }, [friend, socket]);

  useEffect(() => {
    socket?.on("receive message", (data) => {
      console.log(data);
      setMessages((prev) => [
        ...prev,
        {
          messages: data.newMessage,
          senderId: data.senderId,
          timeStamp: data.timeStamp,
          sender_name: data.username,
        },
      ]);
    });
  }, [socket]);

  useEffect(() => {
    if (friend) {
      const response = axios({
        method: "post",
        url: `${baseUrl}chat/getMessages`,
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          chatId: friend.chat_id,
        },
      });
      response.then((messages) => {
        console.log(messages);
        setMessages(messages.data);
      });
    }
  }, [authState, friend]);

  const handleEmojiBox = () => {
    setEmojiOpen((prev) => !prev);
  };

  const handleEmojiSelect = (object) => {
    setMessageToSend((prev) => `${prev}${object.emoji}`);
  };

  const handleMessageChange = (e) => {
    setMessageToSend(e.target.value);
  };

  const handleFocus = () => {
    setEmojiOpen(false);
  };

  const handleSendMessage = () => {
    try {
      const body = {
        chatId: friend.chat_id,
        senderId: user.user_id,
        message: messageToSend,
        sender_name: user.username,
      };
      const response = axios({
        method: "post",
        url: `${baseUrl}chat/sendMessage`,
        headers: {
          Authorization: `Bearer ${authState.accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
        data: body,
      });
      response.then((messages) => {
        setMessages(messages.data);
      });
    } catch (err) {
      console.log(err);
    }
    socket.emit(
      "send message",
      messageToSend,
      friend.chat_id,
      friend.user_id,
      user.username
    );
    setMessageToSend("");
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    try {
      if (e.target.files[0]) {
        var bodyFormData = new FormData();
        bodyFormData.append("file", e.target.files[0]);
        bodyFormData.append("chatId", friend.chat_id);
        bodyFormData.append("sender_id", user.user_id);
        bodyFormData.append("sender_name", user.username);
        const response = axios({
          method: "post",
          url: `${baseUrl}chat/sendFile`,
          headers: {
            Authorization: `Bearer ${authState.accessToken.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          data: bodyFormData,
        });
        response.then((messages) => {
          console.log(messages);
          setMessages(messages.data);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {friend && (
        <Box flex={3} sx={{ bgcolor: "background.default" }}>
          <AppBar
            position="static"
            sx={{
              bgcolor: "background.hover",
              height: "10%",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              padding: "0 20px",
              borderBottom: "1px solid purple",
            }}
          >
            <ArrowBackIcon
              sx={{ display: { sm: "none", xs: "flex", cursor: "pointer" } }}
              onClick={() => messageBoxHandler(null)}
            />
            {friend.isGroup && (
              <>
                <Avatar
                  sx={{ bgcolor: "background.selected", color: "text.primary" }}
                >
                  <Groups2Icon />
                </Avatar>
                <Typography color={"text.primary"}>
                  {friend.group_name}
                </Typography>
              </>
            )}
            {!friend.isGroup && (
              <>
                <Avatar
                  sx={{ bgcolor: "background.selected", color: "text.primary" }}
                >
                  {`${friend.firstname[0]}${friend.lastname[0]}`}
                </Avatar>
                <Typography color={"text.primary"}>
                  {friend.username}
                </Typography>
              </>
            )}
          </AppBar>
          <Box
            sx={{
              height: "80%",
              bgcolor: "background.default",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages &&
              messages.map((message) => (
                <div key={uuidv4()}>
                  <MessageWrapper message={message} user={user} />
                </div>
              ))}
          </Box>
          <Box
            sx={{
              height: "10%",
              bgcolor: "background.default",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                bgcolor: "background.hover",
                color: "text.primary",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                position: "relative",
              }}
            >
              <SentimentSatisfiedAltIcon onClick={() => handleEmojiBox()} />
              {isEmojiOpen === true ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: "-350px",
                    left: "10px",
                  }}
                >
                  <Picker
                    height={350}
                    width="300px"
                    onEmojiClick={handleEmojiSelect}
                    theme={mode}
                  />
                </Box>
              ) : null}
              <IconButton variant="contained" component="label">
                <AttachFileIcon />
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                />
              </IconButton>
              <TextField
                value={messageToSend}
                size="small"
                variant="standard"
                sx={{
                  width: "80%",
                  bgcolor: "background.selected",
                  padding: "7px",
                  borderRadius: "5px",
                }}
                onChange={handleMessageChange}
                onFocus={handleFocus}
              />
              <SendIcon
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleSendMessage();
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
      {!friend && (
        <Box
          flex={3}
          sx={{
            bgcolor: "background.default",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "text.primary",
          }}
        >
          <Rings
            height="80"
            width="80"
            color="#4fa94d"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
          <Typography>Select a Friend / Group</Typography>
        </Box>
      )}
    </>
  );
};

export default ChatBox;
