import { motion } from 'framer-motion';
import type { NewsArticle } from '../../types';
import { Card } from '../ui/Card'; 

type NewsCardProps = {
  article: NewsArticle;
};

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
        <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover rounded-t-3xl" />
        <div className="p-6 flex-grow flex flex-col">
          <p className="text-pink-600 font-semibold text-sm uppercase font-heading">{article.category}</p>
          <h3 className="mt-2 text-xl font-bold font-heading text-dark-text line-clamp-2">{article.title}</h3>
          <p className="mt-2 text-medium-gray text-base flex-grow line-clamp-3">{article.excerpt}</p>
          <p className="text-sm text-gray-500 mt-4">{article.date}</p>
          <a href="#" className="mt-4 text-purple-800 font-bold hover:underline self-start">
            Ler mais &rarr;
          </a>
        </div>
      </Card>
    </motion.div>
  );
};

export default NewsCard;