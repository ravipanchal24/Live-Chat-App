import React from "react";
const Chat = (props) => {
  const {
    username,
    room,
    message,
    setMessage,
    messageList,
    sendMessage,
    socket,
    whoIsTyping,
    isTyping,
    userJoined,
    showUserJoined,
  } = props;

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
      <div className="chat-body" style={{height:'85%'}}>
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
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Start Typing..."
          autoFocus
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit("user_typing", object);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e);
            }
          }}
        />
        <button onClick={sendMessage} id="sendMessageButton">
          <i className="fa-solid fa-arrow-right fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
