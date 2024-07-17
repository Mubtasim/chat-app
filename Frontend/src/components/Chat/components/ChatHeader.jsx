import CircleIcon from "@mui/icons-material/Circle";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import {
  IoCallOutline,
  IoChatbubblesOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const { currentFriend, activeUser } = useSelector((state) => state.chat);

  return (
    <Stack
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      py={3}
      borderBottom={"1px solid rgb(227, 232, 239)"}
    >
      <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
        <IconButton>
          <RxHamburgerMenu fontSize={20} />
        </IconButton>
        <Avatar src={`http://localhost:5000/${currentFriend.image}`} />
        <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
          <Typography variant="subtitle2" fontWeight={"bold"}>
            {currentFriend.userName}
          </Typography>
          {activeUser?.some((user) => user.userId === currentFriend._id) && (
            <CircleIcon sx={{ fontSize: "0.8rem", color: "#00C853" }} />
          )}
        </Stack>
      </Stack>
      <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
        <IconButton>
          <IoCallOutline fontSize={20} />
        </IconButton>
        <IconButton>
          <IoVideocamOutline fontSize={20} />
        </IconButton>
        <IconButton>
          <IoChatbubblesOutline fontSize={20} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ChatHeader;
