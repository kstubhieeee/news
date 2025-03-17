import { Bars3Icon, UserCircleIcon, BellIcon, BookmarkIcon, CogIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Navbar({ darkMode, setDarkMode, setSidebarOpen }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-200 ${
      darkMode 
        ? 'bg-zinc-950 border-b border-zinc-800' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-md ${
                darkMode 
                  ? 'text-zinc-400 hover:bg-zinc-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <div className="flex items-center ml-20">
              <span className="text-2xl mr-2">📰</span>
              <h1 className={`text-xl font-bold ${
                darkMode ? 'text-zinc-100' : 'text-gray-900'
              }`}>
                AI News Hub
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2">
              <BellIcon className={`h-6 w-6 ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Bookmarks */}
            <button className="p-2">
              <BookmarkIcon className={`h-6 w-6 ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
            </button>

            {/* Settings */}
            <button className="p-2">
              <CogIcon className={`h-6 w-6 ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                darkMode 
                  ? 'hover:bg-zinc-800 text-zinc-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2"
              >
                <UserCircleIcon className={`h-6 w-6 ${darkMode ? 'text-zinc-400' : 'text-gray-600'}`} />
              </button>

              {showProfileMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                  darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'
                }`}>
                  <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'}`}>Your Profile</a>
                  <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'}`}>Settings</a>
                  <a href="#" className={`block px-4 py-2 text-sm ${darkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-gray-700 hover:bg-gray-100'}`}>Sign out</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}