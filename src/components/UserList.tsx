import React from 'react';
import { Crown } from 'lucide-react';

interface User {
  id: number;
  name: string;
  status: 'online' | 'idle' | 'offline';
  avatar: string;
  isVip: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', status: 'online', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces', isVip: true },
  { id: 2, name: 'Bob', status: 'idle', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=faces', isVip: false },
  { id: 3, name: 'Charlie', status: 'offline', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces', isVip: true },
  { id: 4, name: 'David', status: 'online', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=faces', isVip: false },
];

const UserList: React.FC = () => {
  return (
    <div className="w-60 bg-gray-800 p-4 border-l border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-indigo-300">Online - {users.length}</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center mb-4">
            <div className="relative mr-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                  user.status === 'online'
                    ? 'bg-green-500'
                    : user.status === 'idle'
                    ? 'bg-yellow-500'
                    : 'bg-gray-500'
                }`}
              ></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-gray-200">{user.name}</span>
                {user.isVip && (
                  <Crown size={16} className="ml-1 text-yellow-400" />
                )}
              </div>
              <span className="text-xs text-gray-400">{user.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;