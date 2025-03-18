export default function Footer({ darkMode }) {
  return (
    <footer className={`py-8 transition-colors duration-200 ${
      darkMode 
        ? 'bg-zinc-800 border-t border-zinc-700' 
        : 'bg-white border-t border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              About AI News Hub
            </h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Stay informed with AI-powered news summaries and comprehensive coverage across various categories.
            </p>
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Links
            </h3>
            <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Categories</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Bookmarks</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className={`${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}>
                Twitter
              </a>
              <a href="#" className={`${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}>
                LinkedIn
              </a>
              <a href="#" className={`${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}>
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-8 text-center ${
          darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'
        }`}>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            © {new Date().getFullYear()} AI News Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}