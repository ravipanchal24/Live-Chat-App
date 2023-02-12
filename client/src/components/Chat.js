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
      <div className="chat-body">
        {messageList.map((msg, key) => (
          <p
            key={key}
            className={
              msg.author === username ? "messages right" : "messages left"
            }
            style={{ fontSize: "1rem" }}
            id={`message-${key}`}
          >
            {msg.author === username ? 'You' : msg.author}
            <br></br> <span style={{ fontSize: "1.3rem" }}>{msg.message}</span>
          </p>
        ))}
      </div>
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
