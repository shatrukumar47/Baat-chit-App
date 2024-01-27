import React, { useEffect, useRef, useState } from 'react'
import { Input, InputGroup, InputRightAddon, Switch, useDisclosure } from "@chakra-ui/react"
import { FaMoon, FaPaperPlane } from "react-icons/fa";
import { getCurrentISTTime } from '../utility/utility';
import { FaCircleCheck , FaClock, FaClockRotateLeft  } from "react-icons/fa6";
import 'animate.css';
import sendAudio from "../assets/sounds/send_sms.mp3"
import joinAudio from "../assets/sounds/join.mp3"
import MessageModal from './MessageModal';

const ChatInterface = ({socket, user}) => {
  const [message, setMessage] = useState("")
  const [allMessagesStore, setAllMessagesStore] = useState([{...user}]);
  const messageInputRef = useRef(null);
  const chatMessagesRef = useRef(null)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const joinAudioRef = useRef(null)
  const sendAudioRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(()=>{
    onOpen()
  }, [])

  useEffect(()=>{

    messageInputRef?.current?.focus()
    scrollToBottom()

    socket.on("join-room", (data)=>{
      joinAudioRef.current.play()
      setAllMessagesStore((prev)=> [...prev, {...data}])
    })

    socket.on("new-person", (data)=>{
      joinAudioRef.current.play()
      setAllMessagesStore((prev)=>{
        return [...prev, {...data, msgPosition: "center", type: "joined-room"}]
      })
      scrollToBottom()
    })

    socket.on("received-message", (data)=>{
      joinAudioRef.current.play()
      setAllMessagesStore((prev)=>{
        return [...prev, {...data, msgPosition: "right"}]
      })
      sendAudioRef.current.play();
      scrollToBottom()
    })

    socket.on("left-room", (data)=>{
      joinAudioRef.current.play()
      setAllMessagesStore((prev)=>{
        return [...prev, {...data, msgPosition: "center", type: "left-room"}]
      })
      scrollToBottom()
    })

  }, [socket])

  const handleInputSend = (e)=>{
    if(e.key === "Enter" && e.keyCode === 13 && message){
      handleSendMessage()
      setMessage("")
      messageInputRef?.current?.focus()
    }
  }

  const handleSendMessage = ()=>{
    const time = getCurrentISTTime();
    setAllMessagesStore((prev)=>{
      return [...prev, {username: user?.username, message: message, msgPosition: "left", time: time}]
    })
    socket.emit("send-message", {...user , time: time, message: message  })
    sendAudioRef.current.play()
    scrollToBottom()
  }

  const scrollToBottom = ()=>{
    if(chatMessagesRef.current){
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }

  const handleModeChange = (e)=>{
    setIsDarkMode(e.target.checked)
  }


  return (
    <div className='chat-interface-container'>

      <MessageModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <audio src={joinAudio} ref={joinAudioRef}></audio>
      <audio ref={sendAudioRef} src={sendAudio}></audio>
        {/* Header  */}
      <div className='chat-header'>
        <h1>Room-{user?.roomNo}</h1>
        <div className='camera-module'><div></div></div>
        <div className='theme-mode'>
          <FaMoon color={"white"} />
          <Switch size='sm' isChecked={isDarkMode} onChange={handleModeChange} />
        </div>
      </div>
        {/* Chats  */}
      <div className='chat-messages' style={{background: isDarkMode ? "#343541" : "white", color: isDarkMode ? "white" : "black"}} ref={chatMessagesRef}>
        {
          allMessagesStore.length > 0 && allMessagesStore?.map((item, index)=>{
            if(item?.msgPosition === "center" && item?.type === "joined-room"){
              return <div className='room-joined-message animate__animated animate__backInUp' key={index}>
                <div>{item?.username === user?.username ? "You" : item?.username} joined this room</div>
                <div>
                  <FaClock />
                  <span>{item?.time}</span>
                </div>
              </div>
            }else
            if(item?.msgPosition === "center" && item?.type === "left-room"){
              return <div className='room-left-message animate__animated animate__backInUp' key={index}>
                <div>{item?.username} left the room</div>
                <div>
                  <FaClockRotateLeft  />
                  <span>{item?.time}</span>
                </div>
              </div>
            }else
            if(item?.msgPosition === "left"){
              return <div key={index} className='left-box animate__animated animate__fadeIn'>
                  <div>
                      <p>{item?.time}</p>
                      <p>{item?.message}</p>
                      <div>
                        <FaCircleCheck />
                        You
                      </div>
                  </div>
              </div>
            }else
            if(item?.msgPosition === "right"){
              return <div key={index} className='right-box animate__animated animate__fadeIn'>
                  <div>
                    <p>{item?.time}</p>
                    <p>{item?.message}</p>
                    <div>
                        <FaCircleCheck />
                        {item?.username}
                      </div>
                </div>
              </div>
            }
          })
        }
         
      </div>

        {/* Input Field  */}
      <div className='send-message'>
        <InputGroup size='md' border={"1px solid black"} borderRadius={"0px 0px 10px 10px"}>
            <Input ref={messageInputRef} onKeyDown={handleInputSend} value={message} onChange={(e)=> setMessage(e.target.value)} placeholder='Message' bg={"black"} color={"white"} />
            <InputRightAddon bg={"#F50057"} cursor={"pointer"} onClick={handleSendMessage}>
                <FaPaperPlane color='white'   />
            </InputRightAddon>
        </InputGroup>
      </div>
    </div>
  )
}

export default ChatInterface
