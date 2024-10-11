import React, { useState } from 'react';
import { Send, ThumbsUp, Smile, Crown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: number;
  user: {
    name: string;
    avatar: string;
    isVip: boolean;
  };
  content: string;
  timestamp: Date;
  likes: number;
  reactions: number;
}

interface MessageAreaProps {
  channel: string;
}

const MessageArea: React.FC<MessageAreaProps> = ({ channel }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: {
        name: 'Alice',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
        isVip: true,
      },
      content: 'Hello everyone! :wave: \n\nCheck out this **cool** markdown support!',
      timestamp: new Date(),
      likes: 5,
      reactions: 3,
    },
    {
      id: 2,
      user: {
        name: 'Bob',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=faces',
        isVip: false,
      },
      content: 'That\'s awesome! Here\'s a list:\n\n- Item 1\n- Item 2\n- Item 3',
      timestamp: new Date(),
      likes: 2,
      reactions: 1,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        user: {
          name: 'Current User',
          avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=faces',
          isVip: false,
        },
        content: newMessage,
        timestamp: new Date(),
        likes: 0,
        reactions: 0,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-6">
            <div className="flex items-start mb-2">
              <img
                src={message.user.avatar}
                alt={message.user.name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="font-semibold mr-2 text-indigo-300">{message.user.name}</span>
                  {message.user.isVip && (
                    <Crown size={16} className="text-yellow-400 mr-2" />
                  )}
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-gray-200 mb-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <button className="flex items-center mr-4 hover:text-indigo-400 transition-colors">
                    <ThumbsUp size={14} className="mr-1" />
                    {message.likes}
                  </button>
                  <button className="flex items-center hover:text-indigo-400 transition-colors">
                    <Smile size={14} className="mr-1" />
                    {message.reactions}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message #${channel}`}
            className="flex-1 bg-gray-700 text-gray-100 rounded-l-md p-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageArea;