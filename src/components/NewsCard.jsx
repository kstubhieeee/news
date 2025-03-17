import { useState } from 'react';
import { summarizeText } from '../services/groqApi.js';

export default function NewsCard({ article }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetSummary = async () => {
    setLoading(true);
    const result = await summarizeText(article.content || article.description);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.description}</p>
        
        {!summary && (
          <button
            onClick={handleGetSummary}
            disabled={loading}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            {loading ? 'Generating Summary...' : 'Get AI Summary'}
          </button>
        )}
        
        {summary && (
          <div className="mt-4">
            <h4 className="font-semibold text-lg mb-2">AI Summary:</h4>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
}