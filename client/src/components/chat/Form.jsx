import axios from 'axios';
import { formatRelative } from 'date-fns';
import { useState } from 'react';

const SendIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

export default function Form({ setMessages,persona }) {
  const [message, setMessage] = useState('');

  const messageResponse = async () => {
    const { data } = await axios.post('http://localhost:4000/message', {
      message,
      persona
    });

    setMessages(prev => [
      ...prev,
      {
        msg: data.message,
        type: 'bot',
        time: formatRelative(new Date(), new Date())
      }
    ]);
  };

  const sendMessage = async e => {
    e.preventDefault();

    if (!message) return;

    setMessages(prev => [
      ...prev,
      {
        msg: message,
        type: 'user',
        time: formatRelative(new Date(), new Date())
      }
    ]);
    setMessage('');

    await messageResponse();
  };

  return (
    <form className="relative flex items-center">
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="bg-[#3A3F47] text-white placeholder:text-[#949494] text-sm rounded-2xl p-4 w-full outline-none"
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        onClick={sendMessage}
        className="absolute right-0 mr-2 bg-white hover:opacity-50 active:opacity-100 transition-colors py-2 px-3 rounded-xl"
      >
        <SendIcon className="w-5 h-5 fill-[#3A3F47]" />
      </button>
    </form>
  );
}
