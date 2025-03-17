import { useState } from 'react';
import { summarizeText } from '../services/groqApi.js';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { ShareIcon, HandThumbUpIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function NewsCard({ article, darkMode }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const handleGetSummary = async () => {
    setLoading(true);
    const result = await summarizeText(article.content || article.description);
    setSummary(result);
    setLoading(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(article.url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-200 transform hover:scale-[1.02] ${
      darkMode 
        ? 'bg-zinc-900 border border-zinc-800' 
        : 'bg-white shadow-lg'
    }`}>
      {article.urlToImage && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              {isBookmarked ? (
                <BookmarkSolid className="h-5 w-5 text-green-500" />
              ) : (
                <BookmarkOutline className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 ${
          darkMode ? 'text-zinc-100' : 'text-gray-900'
        }`}>
          {article.title}
        </h3>
        
        <p className={`mb-4 ${
          darkMode ? 'text-zinc-400' : 'text-gray-600'
        }`}>
          {article.description}
        </p>
        
        {!summary && (
          <button
            onClick={handleGetSummary}
            disabled={loading}
            className={`
              px-4 py-2 rounded-md
              transition-all duration-200
              ${loading 
                ? 'cursor-not-allowed opacity-70' 
                : 'hover:bg-green-600'
              }
              bg-green-500 text-white
            `}
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
          <div className={`mt-4 p-4 rounded-lg ${
            darkMode ? 'bg-zinc-800' : 'bg-gray-50'
          }`}>
            <h4 className={`font-semibold text-lg mb-2 ${
              darkMode ? 'text-zinc-100' : 'text-gray-900'
            }`}>
              AI Summary:
            </h4>
            <p className={darkMode ? 'text-zinc-300' : 'text-gray-700'}>
              {summary}
            </p>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <button 
              onClick={() => setLikes(likes + 1)}
              className={`flex items-center space-x-1 ${
                darkMode ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              <HandThumbUpIcon className="h-5 w-5" />
              <span>{likes}</span>
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center space-x-1 ${
                darkMode ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span>Comments</span>
            </button>
            <button 
              onClick={handleShare}
              className={`flex items-center space-x-1 ${
                darkMode ? 'text-zinc-400 hover:text-zinc-300' : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              <ShareIcon className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
          
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-600 transition-colors font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
}