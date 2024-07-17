import { Avatar, Box, InputAdornment, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getChatList } from "../../../store/actions/chatAction";
import { setActiveUser } from "../../../store/reducers/chatReducer";
const UserProfile = () => {
  const dispatch = useDispatch();
  const socket = io("http://localhost:7000");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getChatList());
  }, []);

  useEffect(() => {
    socket.emit("addActiveUser", user.id, user);
  }, []);

  useEffect(() => {
    socket.on("getActiveUser", (users) => {
      const filterUser = users.filter((u) => u.userId !== user.id);

      dispatch(setActiveUser(filterUser));
    });
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={10}
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      px={3}
      zIndex={1000}
      bgcolor={"white"}
      height={"5rem"}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CiSearch />
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: "#F8FAFC", width: "50rem" }}
      />
      <Box
        bgcolor={"rgb(227, 242, 253)"}
        p={1}
        borderRadius={"50%"}
        sx={{
          transition: "background-color 0.2s linear",
          "&:hover": {
            backgroundColor: "#2196F3",
          },
          cursor: "pointer",
        }}
      >
        <Avatar
          src={`http://localhost:5000/${user.image}`}
          sx={{ height: "30px", width: "30px" }}
        />
      </Box>
    </Stack>
  );
};

export default UserProfile;
