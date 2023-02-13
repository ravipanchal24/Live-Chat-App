import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../reducers/auth/authSlice"; // import reducer from auth slice

import {
  setIsTyping,
  setWhoIsTyping,
  setMessage,
  setMessageList,
  setUserJoined,
  setShowUserJoined,
  setUserDisconnected,
  setShowUserDisconnected,
} from "../reducers/chat/chatSlice"; // import reducer from chat slice

const Chat = ({ socket }) => {
  const {
    isTyping,
    whoIsTyping,
    message,
    messageList,
    userJoined,
    showUserJoined,
    userDisconnected,
    showUserDisconnected,
  } = useSelector((state) => state.chat); //extraxt states from chat (slice)

  const { username, room } = useSelector((state) => state.auth); //extraxt states from auth (slice)
  const dispatch = useDispatch();

  const unloadFunc = () => {
    if (socket) {
      socket.emit("disconnected", room, username);
    }
  };

  // to check if user disconnected on component will unmount
  // useEffect(() => {
  //   return () => {
  //     console.log('outside socket');
  //     if (socket) {
  //       console.log(username);
  //       socket.emit("disconnected", room, username);
  //     }
  //   }
  // }, [socket, room, username])

  const sendMessageFunc = async (e) => {
    if (message !== "") {
      e.preventDefault();

      let messageContent = {
        room: room,
        content: {
          author: username,
          message: message,
        },
      };
      await socket.emit("send_message", messageContent);
      dispatch(setMessageList([...messageList, messageContent.content]));
      dispatch(setMessage(""));
    }
  };

  if (socket) {
    socket.on("other_user_typing", (data) => {
      dispatch(setWhoIsTyping(data));
      dispatch(setIsTyping(true));
    });

    socket.on("user_joined_room_alert", (data) => {
      dispatch(setUserJoined(data));
      dispatch(setShowUserJoined(true));
    });

    socket.on("user_disconnect", (data) => {
      dispatch(setUserDisconnected(data));
      dispatch(setShowUserDisconnected(true));
    });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(setMessageList([...messageList, data]));
      dispatch(setIsTyping(false));
    });
    if (messageList.length)
      document
        .getElementById(`message-${messageList.length - 1}`)
        .scrollIntoView(); //scroll down to latest chat
  }, [messageList, dispatch, socket]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsTyping(false));
    }, 5000);
  }, [isTyping, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowUserJoined(false));
    }, 2000);
  }, [showUserJoined, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowUserDisconnected(false));
    }, 2000);
  }, [showUserDisconnected, dispatch]);

  const object = {
    room: room,
    sentence: `${username} is typing...`,
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header">
          <h3>Live Chat</h3>
          <div className={`isTyping ${isTyping ? "visible" : "hidden"}`}>
            {whoIsTyping}
          </div>
        </div>
        <p>
          Username: <br></br>
          {username}
        </p>
        <p>
          Room ID: <br />
          {room}
        </p>
      </div>
      <div className="chat-body" style={{ height: "85%" }}>
        {messageList.map((msg, key) => (
          <div
            key={key}
            className={`chat-messages ${
              msg.author === username
                ? "chat-messages-right"
                : "chat-messages-left"
            }`}
          >
            <p
              className={`chat-username ${
                msg.author === username
                  ? "chat-username-right"
                  : "chat-username-left"
              }`}
              id={`message-${key}`}
            >
              {msg.author === username ? "You" : msg.author}
            </p>
            <p
              className={`chat-message ${
                msg.author === username
                  ? "chat-message-right"
                  : "chat-message-left"
              }`}
            >
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      {userJoined !== username && showUserJoined && (
        <div className="room-join-msg">{userJoined} has joined the room</div>
      )}
      {showUserDisconnected && (
        <div className="room-join-msg">
          {userDisconnected} has left the room
        </div>
      )}
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Start Typing..."
          autoFocus
          onChange={(e) => {
            dispatch(setMessage(e.target.value));
            socket.emit("user_typing", object);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessageFunc(e);
            }
          }}
        />
        <button onClick={sendMessageFunc} id="sendMessageButton">
          <i className="fa-solid fa-arrow-right fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
