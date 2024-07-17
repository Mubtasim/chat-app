import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFriend } from "../../../store/reducers/chatReducer";
import ActivePeople from "./ActivePeople";
import ChatList from "./ChatList";

const PeopleList = () => {
  const { chatList } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const { activeUser } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  return (
    <Stack spacing={4} flex={2.9} bgcolor={"white"} borderRadius={3}>
      <ActivePeople key={user.id} activeUser={activeUser} />
      <Box
        sx={{
          height: "500px",
          // overflow: "hidden",
          "&:hover": {
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "hsl(240, 12%, 80%)",
              // borderRadius: 0.5rem;
            },
          },
          overflowY: "scroll",
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            // borderRadius: 0.5rem;
          },
        }}
        px={3}
      >
        {chatList.friends && chatList.friends.length > 0 ? (
          <Stack spacing={3}>
            {chatList.friends.map((friend) => (
              <Box
                key={friend.fndInfo._id}
                onClick={() => dispatch(setCurrentFriend(friend.fndInfo))}
              >
                <ChatList friend={friend} />
              </Box>
            ))}
          </Stack>
        ) : (
          <></>
        )}
      </Box>
    </Stack>
  );
};

export default PeopleList;
