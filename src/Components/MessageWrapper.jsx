import { Box, Typography } from "@mui/material";
import React from "react";

const MessageWrapper = ({ message, user }) => {
  if (message.sender_name === user.username)
    return (
      <>
        {message.messages && (
          <Box
            sx={{
              margin: "10px",
              bgcolor: "background.selected",
              padding: "5px",
              color: "text.primary",
              width: "70%",
              position: "relative",
              left: "30%",
              transform: "translateX(-20px)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6" align="right" sx={{ fontSize: "16px" }}>
              {message.messages}
            </Typography>
          </Box>
        )}
        {message.sender_name === user.username && !message.messages && (
          <Box
            sx={{
              margin: "10px",
              padding: "5px",
              color: "text.primary",
              width: "70%",
              position: "relative",
              left: "30%",
              transform: "translateX(-20px)",
              borderRadius: "5px",
            }}
          >
            {message.type === "image" && (
              <>
                <img
                  alt="sent Images"
                  align="right"
                  src={message.file_url}
                  style={{
                    width: "150px",
                  }}
                />
              </>
            )}
            {message.type === "application" && message.file_url && (
              <>
                <object
                  data={message.file_url}
                  type="application/pdf"
                  style={{
                    width: "85%",
                  }}
                  align="right"
                >
                  {""}
                </object>
              </>
            )}
          </Box>
        )}
      </>
    );
  if (message.sender_name !== user.username)
    return (
      <>
        {message.messages && (
          <Box
            sx={{
              margin: "10px",
              bgcolor: "background.hover",
              padding: "5px",
              color: "text.primary",
              width: "70%",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "16px" }}>
              {message.messages}
            </Typography>
            <Typography variant="h6" align="right" sx={{ fontSize: "10px" }}>
              {message.timestamp}
            </Typography>
          </Box>
        )}
        {!message.messages && (
          <Box
            sx={{
              margin: "10px",
              padding: "5px",
              color: "text.primary",
              width: "70%",
              borderRadius: "5px",
            }}
          >
            {message.type === "image" && (
              <>
                <img
                  alt="sent Images"
                  align="left"
                  src={message.file_url}
                  style={{
                    width: "150px",
                  }}
                />
              </>
            )}
            {message.type === "application" && message.file_url && (
              <>
                <object
                  data={message.file_url}
                  type="application/pdf"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  align="right"
                >
                  {""}
                </object>
              </>
            )}
          </Box>
        )}
      </>
    );
};

export default MessageWrapper;
