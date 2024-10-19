'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import io, { Socket } from 'socket.io-client'
import { userAtom } from '../Login/Login'
import { useAtomValue } from 'jotai'

type Message = {
  id: number
  text: string
  sender: string
}

export default function Chatroom() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<Socket | null>(null)
  const userId = useAtomValue(userAtom);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('https://b84e-182-173-75-102.ngrok-free.app') // Replace with your server URL

    // Listen for incoming messages
    socketRef.current.on('message', (data: { text: string, sender: string }) => {
      const receivedMessage: Message = {
        id: Date.now(),
        text: data.text,
        sender: data.sender
      }
      setMessages(prevMessages => [...prevMessages, receivedMessage])
    })

    // Clean up the socket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  const sendMessage = () => {
    if (inputMessage.trim() !== '' && socketRef.current) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: userId
      }
      setMessages([...messages, newMessage])
      
      // Emit the message through the socket
      socketRef.current.emit('message', { text: inputMessage })
      
      setInputMessage('')
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="w-full max-w-md mx-auto h-[500px] border rounded-lg shadow-lg flex flex-col">
      <div className="bg-black text-primary-foreground p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Chatroom</h2>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === userId ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className={`flex items-start ${message.sender === userId ? 'flex-row-reverse' : 'flex-row'}`}>
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.sender === userId ? '/placeholder.svg?height=32&width=32' : '/placeholder.svg?height=32&width=32'} />
                <AvatarFallback>{message.sender === userId ? 'U' : 'O'}</AvatarFallback>
              </Avatar>
              <div
                className={`mx-2 p-3 rounded-lg ${
                  message.sender === userId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex space-x-2"
        >
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  )
}