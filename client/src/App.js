import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";
import Auth from "./components/Auth";
import { useSelector, useDispatch } from 'react-redux'


let socket;

function App() {

  const { loggedIn } = useSelector((state) => state.auth)
  const CONNECTION_PORT =
    window.location.host === "localhost:3000"
      ? "localhost:3001/"
      : "https://live-chat-backend.onrender.com/";

  useEffect(() => {
    socket = io(CONNECTION_PORT);
    //eslint-disable-next-line
  }, [CONNECTION_PORT]);


  return (
    <div className="App">
      {!loggedIn && <Auth socket={socket} />}
      {loggedIn && <Chat socket={socket} />}
    </div>
  );

}

export default App;
