import { useState } from 'react'

import API from '../services/api'

import MessageBubble from './MessageBubble'

export default function ChatBox() {

  const [message, setMessage] = useState('')

  const [messages, setMessages] = useState([])

  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {

    if (!message) return

    const userMessage = {
      sender: 'user',
      text: message
    }

    setMessages(prev => [...prev, userMessage])

    try {

      setLoading(true)

      const response = await API.post(
        '/chat',
        null,
        {
          params: {
            message: message
          }
        }
      )

      const aiMessage = {
        sender: 'ai',
        text: response.data.response
      }

      setMessages(prev => [...prev, aiMessage])

    } 
    catch (error) {

      console.log(error)

      alert('Error while chatting')

    }

    setLoading(false)

    setMessage('')
  }

  return (

    <div className="bg-white rounded-2xl shadow border flex flex-col h-[700px]">

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">

        {
          messages.map((msg, index) => (

            <MessageBubble
              key={index}
              sender={msg.sender}
              message={msg.text}
            />

          ))
        }

        {
          loading && (

            <p className="text-gray-500">
              AI Thinking...
            </p>

          )
        }

      </div>

      <div className="p-4 border-t flex gap-3">

        <input
          type="text"
          placeholder="Ask question from uploaded PDF..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-3 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-6 rounded-xl"
        >
          Send
        </button>

      </div>

    </div>

  )
}