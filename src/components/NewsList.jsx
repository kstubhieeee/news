import { useState, useEffect } from 'react';
import { getNewsByCategory } from '../services/newsApi';
import NewsCard from './NewsCard';

export default function NewsList({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const data = await getNewsByCategory(category);
      setArticles(data);
      setLoading(false);
    };

    fetchNews();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={`${article.title}-${index}`} article={article} />
      ))}
    </div>
  );
}