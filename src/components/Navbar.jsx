export default function Navbar() {
  return (
    <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        AI RAG Chatbot
      </h1>

      <button className="bg-white text-black px-4 py-2 rounded-lg">
        New Chat
      </button>
    </div>
  )
}