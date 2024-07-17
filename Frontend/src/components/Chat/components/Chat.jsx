import { Avatar, Box, Chip, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import "../../../assets/css/MessageSend.css";

const Chat = () => {
  const socket = io("http://localhost:7000");
  const scrollRef = useRef();

  const [typingMsg, setTypingMsg] = useState("");

  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const { currentFriend } = useSelector((state) => state.chat);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.emit("join", user.id);
    socket.on("receiveTypingMsg", (msg) => {
      setTypingMsg(msg);
    });
    return () => {
      socket.off("receiveTypingMsg");
    };
  }, [user.id]);

  return (
    <Box sx={{ padding: 2, height: "400px", overflowY: "auto", mb: 2 }}>
      {/* Sent Message */}

      {messages && messages.length > 0 ? (
        messages.map((m) =>
          m.senderId === user.id ? (
            <Box
              ref={scrollRef}
              key={m._id}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: "60%",
                  bgcolor: "#E3F2FD",
                  p: 2,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "flex-end",
                  minWidth: "5rem",
                  gap: 0.7,
                }}
              >
                {m.message.text === "" ? (
                  <img
                    src={`http://localhost:5000/${m.message.image}`}
                    style={{ maxWidth: "250px", maxHeight: "250px" }}
                  />
                ) : (
                  <Typography variant="body2">{m.message.text}</Typography>
                )}

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ alignSelf: "flex-end" }}
                  fontSize={12}
                >
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
              <Avatar
                src={`http://localhost:5000/${user.image}`}
                sx={{ ml: 2, alignSelf: "flex-start" }}
              />
            </Box>
          ) : (
            <Box
              ref={scrollRef}
              key={m._id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                mb: 2,
              }}
            >
              <Avatar
                alt={`http://localhost:5000/${currentFriend.userName}`}
                src={`http://localhost:5000/${currentFriend.image}`}
                sx={{ mr: 2, alignSelf: "flex-start" }}
              />
              <Box
                sx={{
                  maxWidth: "60%",
                  bgcolor: "#EDE7F6",
                  p: 2,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "flex-start",
                  gap: 0.7,
                  minWidth: "5rem",
                }}
              >
                {m.message.text === "" ? (
                  <img
                    src={`http://localhost:5000/${m.message.image}`}
                    style={{ maxWidth: "250px", maxHeight: "250px" }}
                  />
                ) : (
                  <Typography variant="body2">{m.message.text}</Typography>
                )}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ alignSelf: "flex-end" }}
                  fontSize={12}
                >
                  {/* {currentFriend.userName},{" "} */}
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
            </Box>
          )
        )
      ) : (
        <Typography variant="body2" color="textSecondary">
          No messages yet.
        </Typography>
      )}

      {typingMsg &&
      typingMsg.msg &&
      typingMsg.senderId === currentFriend._id ? (
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            mb: 2,
          }}
        >
          <Avatar
            alt={`http://localhost:5000/${currentFriend.userName}`}
            src={`http://localhost:5000/${currentFriend.image}`}
            sx={{ mr: 2, alignSelf: "flex-start" }}
          />
          <Chip label="Typing..." />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Chat;
