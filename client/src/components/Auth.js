import React from 'react';
import io from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, setUsername, setRoom } from '../reducers/auth/authSlice';
import { useEffect } from 'react';


const Auth = ({ socket }) => {

    const { username, room } = useSelector(state => state.auth);
    const dispatch = useDispatch()

    const setLoggedIn = () => dispatch(login(true));

    const setUserNameFunc = (value) => dispatch(setUsername(value));


    const setRoomFunc = (value) => dispatch(setRoom(value));
    const connectToRoom = () => {
        if (username === "" || room === "") {
            alert("Please enter both values");
        } else {
            setLoggedIn(true);
            socket.emit("join_room", room, username);
        }
    };

    return (
        <>
            <div className="info">
                <p>
                    {" "}
                    <i className="fa-solid fa-circle-info fa-lg"></i> Enter any room
                    id and share the same with your friends or family to chat with
                    them
                </p>
                <p>
                    Happy Chatting!! <i className="fa-regular fa-face-smile fa-lg"></i>
                </p>
            </div>
            <div className="login">
                <div className="inputs">
                    <input
                        type="text"
                        value={username}
                        name=""
                        placeholder="Enter your name"
                        onChange={(e) => {
                            setUserNameFunc(e.target.value);
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
                            setRoomFunc(e.target.value);
                        }}
                        required
                    />
                </div>
                <button onClick={connectToRoom}>Start chatting</button>
            </div>
        </>
    );
}

export default Auth;