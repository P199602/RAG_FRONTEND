export default function Sidebar() {
  return (
    <div className="bg-zinc-900 text-white h-full p-6">
      <h2 className="text-xl font-bold mb-6">
        Features
      </h2>

      <div className="space-y-4 text-gray-300">
        <p>• PDF Upload</p>
        <p>• AI Chat</p>
        <p>• RAG Search</p>
        <p>• Persistent Memory</p>
        <p>• FastAPI Backend</p>
      </div>
    </div>
  )
}