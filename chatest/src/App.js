import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import Side from "./Side";
import io from "socket.io-client";
function App() {
  const [clickcon, setClickcon] = useState("");
  const socket = io.connect("http://localhost:3002");
  useEffect(() => {
    socket.emit("join_room", "conversation");
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Side setClickcon={setClickcon} socket={socket} />
      <Chat clickcon={clickcon} socket={socket} />
    </Stack>
  );
}

export default App;
