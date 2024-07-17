import { Stack } from "@mui/material";
import Chat from "./components/Chat";
import ChatHeader from "./components/ChatHeader";
import MessageSend from "./components/MessageSend";
import PeopleList from "./components/PeopleList";

const ChatContainer = () => {
  return (
    <Stack direction={"row"} bgcolor={"#EEF2F6"} mt={"5rem"} p={2} gap={3}>
      <PeopleList />
      <Stack flex={9.1} bgcolor={"white"} px={3} borderRadius={3}>
        <ChatHeader />
        <Chat />
        <MessageSend />
      </Stack>
    </Stack>
  );
};

export default ChatContainer;
