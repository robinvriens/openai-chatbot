import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

function Message({ msg, type, time }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center ${
        type === 'bot' ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`flex flex-col items-start justify-center text-white rounded-xl p-4 ${
          type === 'bot'
            ? 'bg-[#3A3F47] rounded-tl-none'
            : 'bg-[#8AA1FF] rounded-br-none'
        }`}
      >
        <p>{msg}</p>
        <span className={`text-xs mt-2 ${type === 'bot' && 'text-[#949494]'}`}>
          {time}
        </span>
      </div>
    </motion.div>
  );
}

export default function Messages({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="w-[600px] max-h-96 overflow-y-scroll scrollbar-hide space-y-4">
      {messages.length ? (
        messages.map((message, index) => <Message key={index} {...message} />)
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-sm">Ask the bot anything...</p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
