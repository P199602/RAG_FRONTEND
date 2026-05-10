import { useEffect, useState } from "react"
import API from "../api"

import {
  FiSend,
  FiPaperclip,
  FiFileText,
  FiMessageSquare,
  FiMenu,
  FiX
} from "react-icons/fi"

export default function Home() {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [pdfs, setPdfs] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)



  // LOAD PDFS

  const loadPdfs = async () => {

    try {

      const response = await API.get("/pdfs")

      setPdfs(response.data.pdfs)

    } catch (error) {

      console.log(error)
    }
  }



  useEffect(() => {

    loadPdfs()

  }, [])



  // UPLOAD PDF

  const uploadPdf = async (file) => {

    if (!file) return

    const formData = new FormData()

    formData.append("file", file)

    try {

      setLoading(true)

      await API.post(
        "/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      loadPdfs()

      const aiMessage = {
        sender: "ai",
        text: `${file.name} uploaded successfully`
      }

      setMessages(prev => [
        ...prev,
        aiMessage
      ])

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }



  // SEND MESSAGE

  const sendMessage = async () => {

    if (!message.trim()) return

    const userMessage = {
      sender: "user",
      text: message
    }

    setMessages(prev => [
      ...prev,
      userMessage
    ])

    try {

      setLoading(true)

      const response = await API.post(
        `/chat?message=${message}`
      )

      const aiMessage = {
        sender: "ai",
        text: response.data.response
      }

      setMessages(prev => [
        ...prev,
        aiMessage
      ])

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
      setMessage("")
    }
  }



  return (

    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-[#eef4ff] via-[#f7f9fc] to-[#ffffff]">


      {/* SIDEBAR */}

      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-2xl z-50 transition-all duration-300 ${
          showSidebar
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* TOP */}

        <div className="p-5 border-b flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white">

              <FiMessageSquare size={22} />
            </div>

            <div>

              <h1 className="text-lg font-semibold italic text-gray-700">
                AI PDF Chat
              </h1>

              <p className="text-xs italic text-gray-400">
                Smart Assistant
              </p>
            </div>
          </div>



          <button
            onClick={() =>
              setShowSidebar(false)
            }
            className="text-gray-500"
          >

            <FiX size={24} />
          </button>
        </div>



        {/* UPLOAD */}

        <div className="p-4">

          <label className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-3xl cursor-pointer shadow-lg font-medium">

            <FiPaperclip size={18} />

            <span className="italic text-sm">
              Upload PDF
            </span>

            <input
              type="file"
              hidden
              onChange={(e) => {

                const file = e.target.files[0]

                uploadPdf(file)
              }}
            />
          </label>
        </div>



        {/* PDF LIST */}

        <div className="px-4 overflow-y-auto h-full pb-40">

          <h2 className="text-xs italic text-gray-400 mb-4">
            Uploaded PDFs
          </h2>

          <div className="space-y-3">

            {
              pdfs.map((pdf, index) => (

                <div
                  key={index}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-3 flex items-center gap-3"
                >

                  <div className="bg-red-100 text-red-500 p-2 rounded-xl">

                    <FiFileText />
                  </div>

                  <p className="text-sm italic text-gray-600 truncate">
                    {pdf}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>



      {/* MAIN */}

      <div className="flex-1 flex flex-col">


        {/* TOPBAR */}

        <div className="h-[75px] px-6 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                setShowSidebar(true)
              }
              className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-gray-700"
            >

              <FiMenu size={24} />
            </button>



            <div>

              <h1 className="text-xl italic font-semibold text-gray-700">
                AI Assistant
              </h1>

              <p className="text-sm italic text-gray-400">
                Chat with your PDFs
              </p>
            </div>
          </div>
        </div>



        {/* CHAT */}

        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">


          {
            messages.length === 0 && (

              <div className="h-full flex flex-col items-center justify-center text-center">

                <div className="w-28 h-28 rounded-[32px] bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-2xl mb-8">

                  <FiMessageSquare size={50} />
                </div>

                <h1 className="text-5xl italic font-semibold text-gray-700">
                  AI PDF Chat
                </h1>

                <p className="text-gray-400 mt-4 text-lg italic max-w-2xl leading-9">
                  Upload PDFs and ask questions in Hindi,
                  English or Hinglish.
                </p>
              </div>
            )
          }



          {
            messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] px-6 py-5 rounded-[28px] shadow-md text-[15px] leading-8 italic ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      : "bg-white text-gray-600 border border-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          }



          {
            loading && (

              <div className="text-gray-400 italic">
                AI Thinking...
              </div>
            )
          }
        </div>



        {/* INPUT */}

        <div className="px-6 pb-8">

          <div className="max-w-4xl mx-auto bg-white border border-gray-100 shadow-2xl rounded-[35px] px-8 py-5 flex items-center gap-5">


            <label className="cursor-pointer text-blue-500 text-2xl">

              <FiPaperclip />

              <input
                type="file"
                hidden
                onChange={(e) => {

                  const file = e.target.files[0]

                  uploadPdf(file)
                }}
              />
            </label>



            <input
              type="text"
              placeholder="Message AI Assistant..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }

              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  sendMessage()
                }
              }}

              className="flex-1 bg-transparent outline-none text-gray-600 italic placeholder:text-gray-400 text-lg"
            />



            <button
              onClick={sendMessage}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg"
            >

              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}