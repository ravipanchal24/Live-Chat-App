import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";

let socket;
const CONNECTION_PORT = "localhost:3001/";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io();
    //eslint-disable-next-line
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  const connectToRoom = () => {
    if (username === "" || room === "") {
      alert("Please enter both values");
    } else {
      setLoggedIn(true);
      socket.emit("join_room", room);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    let messageContent = {
      room: room,
      content: {
        author: username,
        message: message,
      },
    };
    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="login">
          <div className="inputs">
            <input
              type="text"
              value={username}
              name=""
              placeholder="Enter your name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
            />
            <input
              type="text"
              value={room}
              name=""
              placeholder="Enter room ID"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              required
            />
          </div>
          <button onClick={connectToRoom}>Start chatting</button>
        </div>
      ) : (
        <Chat
          username={username}
          room={room}
          message={message}
          messageList={messageList}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}

export default App;
