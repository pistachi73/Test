import { useState, createContext } from "react";
import { Article } from "../Interfaces/article.interface";

interface ArticleContextInterface {
  currentArticle: Article | undefined;
  articles: Article[];
  readArticles: string[];
  currentPage: number;
  setCurrentArticle: (article: Article) => void;
  setArticles: (articles: Article[]) => void;
  setReadArticles: (titles: string[]) => void;
  setCurrentPage: (page: number) => void;
  updateReadArticles: (title: string) => void;
}

export const ArticleContext = createContext({} as ArticleContextInterface);

export const ArticleProvider: React.FunctionComponent<{ children: any }> = ({ children }) => {
  const [currentArticle, setCurrentArticle] = useState<Article>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const updateReadArticles = (title: string) => {
    const readArticlesCopy = [...readArticles];
    readArticlesCopy.push(title);
    setReadArticles(readArticlesCopy);
  };

  const value: ArticleContextInterface = {
    currentArticle,
    articles,
    readArticles,
    currentPage,
    setCurrentArticle,
    setArticles,
    setReadArticles,
    setCurrentPage,
    updateReadArticles,
  };

  return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>;
};
