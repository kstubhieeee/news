import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import NewsList from './components/NewsList';
import SearchBar from './components/SearchBar';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import './App.css';

const categories = [
  { id: 'general', name: 'Top Headlines', icon: '📰' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'health', name: 'Health', icon: '🏥' },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      darkMode ? 'dark bg-zinc-950' : 'bg-gray-50'
    }`}>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex flex-1">
        <Sidebar 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          darkMode={darkMode}
        />
        
        <main className="flex-1 transition-all duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              darkMode={darkMode}
            />
            
            <div className="mt-8">
              <h2 className={`text-2xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {categories.find(cat => cat.id === activeCategory)?.icon} {' '}
                {categories.find(cat => cat.id === activeCategory)?.name} News
              </h2>
              
              <NewsList 
                category={activeCategory} 
                searchQuery={searchQuery}
                darkMode={darkMode} 
              />
            </div>
          </div>
        </main>
      </div>
      
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;