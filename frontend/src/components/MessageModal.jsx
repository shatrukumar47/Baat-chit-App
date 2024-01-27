import { Button, Heading, Modal, ModalBody,  ModalContent, ModalFooter,  ModalOverlay, Text, } from '@chakra-ui/react'
import React from 'react'

const MessageModal = ({ isOpen, onOpen, onClose }) => {
    
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Heading size={"md"} textAlign={"center"} color={"red"}>DO NOT REFRESH</Heading>
            <Text marginTop={"10px"} textAlign={"center"} fontWeight={"bold"}>Else You will lose the connection and all the messages will be cleared.</Text>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            <Button colorScheme= "red" onClick={onClose}>
              Got it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default MessageModal
