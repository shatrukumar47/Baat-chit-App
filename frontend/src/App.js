import './App.css';
import {io} from "socket.io-client"
import Logo from './components/Logo';
import RoomForm from './components/RoomForm';
import ChatInterface from './components/ChatInterface';
import {  useState } from 'react';
import { getCurrentISTTime } from './utility/utility';

const socket = io("http://localhost:8080/");

function App() {
  const [isRoomJoined, setIsRoomJoined] = useState(true);
  const [user, setUser] = useState({})

  const getFormDetails = (username, roomNo)=>{
    const time = getCurrentISTTime();
    setUser({username, roomNo, time, msgPosition: "center", type: "joined-room"})
    socket.emit("join-room", {username, roomNo, time, msgPosition: "center"})
    setIsRoomJoined(true);
  }

  return (
    <div className="App">
     { !isRoomJoined && (
      <>
       <Logo />
       <RoomForm getFormDetails={getFormDetails} />
      </>
      )}
      {isRoomJoined && <ChatInterface socket={socket} user={user} />}
    </div>
  );
}

export default App;
