import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";

let socket;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [whoIsTyping, setWhoIsTyping] = useState('');
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const CONNECTION_PORT = window.location.host === "localhost:3000" ? 'localhost:3001/' : 'https://live-chat-backend.onrender.com/'
  const [userJoined, setUserJoined] = useState('');
  const [showUserJoined, setShowUserJoined] = useState(false);


  useEffect(() => {
    socket = io(CONNECTION_PORT);
    //eslint-disable-next-line
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
      setIsTyping(false);
    });
    if (messageList.length)
      document.getElementById(`message-${messageList.length - 1}`).scrollIntoView(); //scroll down to latest chat
  }, [messageList]);

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(false);
    }, 5000);
  }, [isTyping])

  useEffect(() => {
    setTimeout(() => {
      setShowUserJoined(false);
    }, 2000);
  }, [showUserJoined])

  if (socket) {
    socket.on("other_user_typing", (data) => {
      setWhoIsTyping(data);
      setIsTyping(true);
    });
  }

  if (socket) {
    socket.on("user_joined_room_alert", (data) => {
      setUserJoined(data);
      setShowUserJoined(true);
    });
  }

  const connectToRoom = () => {
    if (username === "" || room === "") {
      alert("Please enter both values");
    } else {
      setLoggedIn(true);
      socket.emit("join_room", room, username);
      setUserJoined(username);
    }
  };

  const sendMessage = async (e) => {
    if (message !== '') {
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
    }
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
              autoFocus
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
          socket={socket}
          isTyping={isTyping}
          whoIsTyping={whoIsTyping}
          userJoined={userJoined}
          showUserJoined={showUserJoined}
          setShowUserJoined={setShowUserJoined}

        />
      )}
    </div>
  );
}

export default App;
