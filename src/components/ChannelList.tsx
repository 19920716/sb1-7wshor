import React from 'react';
import { Hash } from 'lucide-react';

interface ChannelListProps {
  activeChannel: string;
  setActiveChannel: (channel: string) => void;
}

const channels = ['general', 'random', 'announcements', 'help'];

const ChannelList: React.FC<ChannelListProps> = ({ activeChannel, setActiveChannel }) => {
  return (
    <div className="h-full bg-gray-800 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li
            key={channel}
            className={`flex items-center mb-2 p-2 rounded cursor-pointer ${
              activeChannel === channel ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveChannel(channel)}
          >
            <Hash size={18} className="mr-2" />
            {channel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;