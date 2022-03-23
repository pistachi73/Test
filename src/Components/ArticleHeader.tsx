import { motion } from "framer-motion";

// Hooks
import { useContext } from "react";

// Components
import { ArticleContext } from "../Context/ArticleContext";

// Icons
import { AiOutlineCheck } from "react-icons/ai";

// Utils
import { scrollToTop } from "../Utils/scrollToTop";

// Interfaces
import { Article } from "../Interfaces/article.interface";

// SCSS
import "./../Styles/articleHeader.scss";

export const ArticleHeader: React.FunctionComponent<{
  article: Article;
  articleRead: boolean;
  articleIndex: number;
}> = ({ article, articleIndex, articleRead }) => {
  const { articles, updateReadArticles, setCurrentArticle } = useContext(ArticleContext);

  const articleHeaderVariants = {
    hidden: {
      opacity: 0,
    },
    visible: (index: number) => ({
      opacity: 1,
      transition: { delay: 0.1 * index },
    }),
  };
  return (
    <motion.button
      aria-label={`article${articleIndex}`}
      type='button'
      custom={articleIndex % 5}
      initial='hidden'
      animate='visible'
      variants={articleHeaderVariants}
      className='article-header'
      onClick={() => {
        scrollToTop();
        updateReadArticles(article.title);
        setCurrentArticle(articles[articleIndex]);
      }}
    >
      <img alt={`Header_${article.title}`} src={article.urlToImage}></img>

      <div className='article-header_text'>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <div className='article-header_read'>
          <div className='article-header_read_icon'>
            {articleRead && <AiOutlineCheck role={`header${articleIndex}_read`} size={20} />}
          </div>
          <small>{articleRead ? "Articulo leido" : "Articulo no leido"} </small>
        </div>
      </div>
    </motion.button>
  );
};
