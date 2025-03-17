import { Bars3Icon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Navbar({ darkMode, setDarkMode, setSidebarOpen }) {
  return (
    <nav className={`fixed w-full z-50 transition-colors duration-200 ${
      darkMode 
        ? 'bg-gray-800 border-b border-gray-700' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-md ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <div className="flex items-center ml-20">
              <span className="text-2xl mr-2">📰</span>
              <h1 className={`text-xl font-bold  ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                AI News Hub
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}