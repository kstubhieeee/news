import { useState, useEffect } from 'react';
import { getNewsByCategory } from '../services/newsApi';
import NewsCard from './NewsCard';

export default function NewsList({ category, searchQuery, darkMode }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getNewsByCategory(category);
        setArticles(data);
      } catch (err) {
        setError('Failed to fetch news articles. Please try again later.');
      }
      setLoading(false);
    };

    fetchNews();
  }, [category]);

  const filteredArticles = articles.filter(article =>
    article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>{error}</p>
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <div className={`text-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>No articles found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredArticles.map((article, index) => (
        <NewsCard 
          key={`${article.title}-${index}`} 
          article={article} 
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}