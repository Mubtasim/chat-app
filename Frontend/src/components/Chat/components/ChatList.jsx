import { Avatar, Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import { FaCircleCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";

const ChatList = ({ friend }) => {
  const { user } = useSelector((state) => state.auth);

  const formatDate = (date) => {
    const now = moment();
    const diff = now.diff(moment(date), "days");

    if (diff === 0) {
      return moment(date).format("h:mm A");
    } else if (diff === 1) {
      return "Yesterday";
    } else {
      return moment(date).format("D/MM/YYYY");
    }
  };

  return (
    <Stack
      sx={{
        cursor: "pointer",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Avatar src={friend.fndInfo.image} />
        <Box flex={5} ml={1.5}>
          <Typography variant="subtitle2">{friend.fndInfo.userName}</Typography>
          {/* <Typography variant="body2" color="textSecondary">
            {friend.msgInfo && friend.msgInfo.senderId === user.id
              ? "You"
              : friend.fndInfo.userName + " "}
          </Typography> */}
          <Typography variant="body2" color="textSecondary">
            {friend?.msgInfo?.message?.text
              ? friend.msgInfo.message.text.slice(0, 10)
              : friend?.msgInfo?.message?.image
              ? "Sent an image"
              : "Connect with you"}
          </Typography>
        </Box>
        <Stack
          flex={3}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          spacing={1}
        >
          <Typography variant="caption" color="textSecondary">
            {friend.msgInfo
              ? formatDate(friend.msgInfo.createdAt)
              : formatDate(friend.fndInfo.createdAt)}
          </Typography>
          {user.id === friend.msgInfo?.senderId ? (
            friend.msgInfo.status === "seen" ? (
              <Avatar
                src={`./image/${friend.fndInfo.image}`}
                alt=""
                sx={{ width: 24, height: 24 }}
              />
            ) : friend.msgInfo.status === "delivered" ? (
              <FaCircleCheck />
            ) : (
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "blue",
                }}
              ></Box>
            )
          ) : (
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "blue",
              }}
            ></Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChatList;
