import React, { useEffect, useRef, useState } from 'react'
import { Button, FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react"
import 'animate.css';

const RoomForm = ({getFormDetails}) => {
    const [username, setUsername] = useState("");
    const [roomNo, setRoomNo] = useState("");
    const usernameRef = useRef()

    useEffect(()=>{
        usernameRef.current.focus()
    }, [])

    const handleJoinRoom = ()=>{
        if(username && roomNo){
            getFormDetails(username, roomNo)
        }
    }

    
  return (
    <div className='room-input-cont animate__animated animate__backInUp'>
        <div>
            <FormControl>
                <FormLabel color={"#0bf8a9"}>Username</FormLabel>
                <Input type='text' ref={usernameRef} value={username} placeholder='Enter your username' color={"white"} onChange={(e)=> setUsername(e.target.value)} />
            </FormControl>
    
            <FormControl>
                <FormLabel color={"#0bf8a9"}>Room No.</FormLabel>
                <Input type='number' value={roomNo} placeholder='Enter room number e.g 123' color={"white"} onChange={(e)=> setRoomNo(e.target.value)} />
                <FormHelperText color={"white"} textAlign={"left"} fontWeight={"500"}>Enter the room number you want to join</FormHelperText>
            </FormControl>

            <Button colorScheme='red' margin={"30px 0px"} onClick={handleJoinRoom}>Join Room</Button>
        </div>
    </div>
  )
}

export default RoomForm;
