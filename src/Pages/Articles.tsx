import { useContext, useEffect } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

// Hooks
import { useArticlePageSize } from "../Hooks/useArticlePageSize";

// Components
import { ArticleHeader } from "../Components/ArticleHeader";
import { ArticlePagination } from "../Components/ArticlePagination";
import { ArticleSearch } from "../Components/ArticleSearch";
import { ArticleContent } from "../Components/ArticleContent";
import { ArticleContext } from "../Context/ArticleContext";

// Interfaces
import { Article } from "../Interfaces/article.interface";

export const Articles = () => {
  const { articles, setArticles, readArticles, currentPage } = useContext(ArticleContext);
  const articlesPageSize = useArticlePageSize();

  useEffect(() => {
    const getAllNews = async () => {
      const response = await axios.get<{ articles: Article[] }>("/v1/news");
      const { articles } = response.data;
      setArticles(articles);
    };
    getAllNews();
  }, [setArticles]);

  return (
    <div className='articles'>
      <div>
        <ArticleSearch />
        <p>{articles?.length ? articles.length : 0} articles found</p>
        <div className='articles_headers'>
          <AnimatePresence>
            {articles
              ?.slice(articlesPageSize * (currentPage - 1), articlesPageSize * currentPage)
              .map((article) => (
                <ArticleHeader
                  key={article.title.toString()}
                  article={article}
                  articleRead={readArticles.includes(article.title)}
                  articleIndex={articles
                    .map(({ title }) => {
                      return title;
                    })
                    .indexOf(article.title)}
                ></ArticleHeader>
              ))}
          </AnimatePresence>
        </div>
        {articles && articles?.length !== 0 && <ArticlePagination />}
      </div>
      <ArticleContent />
    </div>
  );
};
