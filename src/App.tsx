import React, { useState } from 'react';
import { MessageSquare, Users, Settings, LogOut } from 'lucide-react';
import ChannelList from './components/ChannelList';
import MessageArea from './components/MessageArea';
import UserList from './components/UserList';
import ResizablePanel from './components/ResizablePanel';

const App: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [channelListWidth, setChannelListWidth] = useState(240);
  const [messageAreaWidth, setMessageAreaWidth] = useState(window.innerWidth - 240 - 240 - 64); // 64px for the sidebar

  const handleChannelResize = (newWidth: number) => {
    setChannelListWidth(newWidth);
    setMessageAreaWidth(window.innerWidth - newWidth - 240 - 64);
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4">
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
          <MessageSquare size={24} />
        </div>
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <Users size={24} />
        </div>
        <div className="mt-auto">
          <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Settings size={24} />
          </button>
          <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <LogOut size={24} />
          </button>
        </div>
      </div>

      {/* Channel List */}
      <ResizablePanel
        width={channelListWidth}
        minWidth={200}
        maxWidth={400}
        onResize={handleChannelResize}
      >
        <ChannelList activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
      </ResizablePanel>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{ width: `${messageAreaWidth}px` }}>
        <div className="bg-gray-700 p-4">
          <h2 className="text-xl font-semibold">#{activeChannel}</h2>
        </div>
        <MessageArea channel={activeChannel} />
      </div>

      {/* User List */}
      <UserList />
    </div>
  );
};

export default App;