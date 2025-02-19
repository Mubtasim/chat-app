import { Container } from "@mui/material";
import UserProfile from "./components/UserProfile";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import notification from "../../assets/audio/notification.mp3";
import ChatContainer from "./ChatContainer";

const ChatView = () => {
  const { messages, currentFriend } = useSelector((state) => state.chat);

  const { user } = useSelector((state) => state.auth);

  const [notificationSound] = useSound(notification);

  useEffect(() => {
    messages.map((m) => {
      if (m && m.senderId !== currentFriend._id && m.receiverId === user.id) {
        notificationSound();
        toast.success(`${m.senderName} Send a New Message`);
      }
    });
  }, [messages]);

  return (
    <Container maxWidth={false} sx={{ borderRadius: 3 }}>
      <Toaster
        position={"top-right"}
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "18px",
          },
        }}
      />
      <UserProfile />
      <ChatContainer />
    </Container>
  );
};

export default ChatView;
