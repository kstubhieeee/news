import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ searchQuery, setSearchQuery, darkMode }) {
  return (
    <div className={`relative mt-16 lg:mt-0 ${
      darkMode ? 'text-gray-300' : 'text-gray-600'
    }`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search news articles..."
        className={`
          block w-full mt-16 pl-10 pr-3 py-2 rounded-lg
          border ${darkMode ? 'border-gray-700' : 'border-gray-300'}
          ${darkMode 
            ? 'bg-gray-800 text-white placeholder-gray-400' 
            : 'bg-white text-gray-900 placeholder-gray-500'
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors duration-200
        `}
      />
    </div>
  );
}