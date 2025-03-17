import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Sidebar({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  isOpen, 
  setIsOpen,
  darkMode 
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${darkMode ? 'bg-gray-800' : 'bg-white'}
        border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}
      `}>
        <div className="h-16 flex items-center justify-between px-4 lg:hidden">
          <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Categories
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-md ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-2 rounded-lg mb-1 text-left flex items-center
                transition-all duration-200
                ${activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <span className="mr-3">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}