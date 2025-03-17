import { useState } from 'react';
import { summarizeText } from '../services/groqApi.js';

export default function NewsCard({ article, darkMode }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetSummary = async () => {
    setLoading(true);
    const result = await summarizeText(article.content || article.description);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-200 ${
      darkMode 
        ? 'bg-gray-800 shadow-lg shadow-gray-900/50' 
        : 'bg-white shadow-lg shadow-gray-200/50'
    }`}>
      {article.urlToImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {article.title}
        </h3>
        <p className={`mb-4 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {article.description}
        </p>
        
        {!summary && (
          <button
            onClick={handleGetSummary}
            disabled={loading}
            className={`relative px-4 py-2 rounded-md transition-all duration-200 ${
              loading 
                ? 'cursor-not-allowed opacity-70' 
                : 'hover:scale-105 hover:shadow-lg'
            } bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Generating Summary...
              </div>
            ) : (
              'Get AI Summary'
            )}
          </button>
        )}
        
        {summary && (
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
            <h4 className={`font-semibold text-lg mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              AI Summary:
            </h4>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              {summary}
            </p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center text-sm">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
}