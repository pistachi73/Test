import { AnimatePresence, motion } from "framer-motion";

// Hooks
import { useContext } from "react";

// Components
import { ArticleContext } from "../Context/ArticleContext";

// SCSS
import "./../Styles/articleContent.scss";

export const ArticleContent = () => {
  const { currentArticle } = useContext(ArticleContext);

  const publishedAt: string | undefined =
    currentArticle && new Date(currentArticle?.publishedAt).toLocaleDateString();

  const titleVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.25 },
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  if (!currentArticle) {
    return (
      <div>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={titleVariants}
            className='article-content article-content_no-article'
          >
            <h1>No article selected</h1>
            <h3>Please select the article you want to read</h3>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={currentArticle.title}
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={titleVariants}
          className='article-content'
        >
          <div className='article-content_title'>
            <img alt={`Content_${currentArticle.title}`} src={currentArticle.urlToImage}></img>
            <div>
              <p>
                Published at:{" "}
                <time dateTime={publishedAt}>
                  <b>{publishedAt}</b>
                </time>
              </p>
              <h2>{currentArticle.title}</h2>
            </div>
          </div>
          <p
            className='article-content_text'
            dangerouslySetInnerHTML={{ __html: currentArticle.content as string }}
          ></p>
          <div className='article-content_footer'>
            <p>
              Author: <b>{currentArticle.author || "unknown"}</b>
            </p>
            <p>
              Source: <b>{currentArticle.source.name || "unknown"}</b>
            </p>
            <a href={currentArticle.url}>Read full article</a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
