export default function MessageBubble({ message, sender }) {

  return (
    <div
      className={`flex ${
        sender === 'user'
          ? 'justify-end'
          : 'justify-start'
      }`}
    >

      <div
        className={`max-w-xl px-5 py-3 rounded-2xl shadow ${
          sender === 'user'
            ? 'bg-black text-white'
            : 'bg-white border'
        }`}
      >
        {message}
      </div>
    </div>
  )
}