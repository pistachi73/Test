import { useState, useContext } from "react";
import axios from "axios";

// Components
import { ArticleContext } from "../Context/ArticleContext";

// Icons
import { BsSearch } from "react-icons/bs";

// SCSS
import "./../Styles/articleSearch.scss";

// Interfaces
import { Article } from "../Interfaces/article.interface";

export const ArticleSearch = () => {
  const { setArticles, setCurrentPage } = useContext(ArticleContext);
  const [query, setQuery] = useState<string>("");

  const searchArticles = async () => {
    const response = await axios.get<{ articles: Article[] | undefined }>(`/v1/news?q=${query}`);
    const { articles } = response.data;
    setArticles(articles as Article[]);
    setCurrentPage(1);
  };

  const _handleKeyDown = async (e: any) => {
    if (e.key === "Enter") {
      await searchArticles();
    }
  };

  return (
    <div className='article-search'>
      <div className='article-search_input'>
        <BsSearch size={20}></BsSearch>
        <input
          name='query'
          placeholder='Search article...'
          type='text'
          value={query}
          onKeyDown={(e) => _handleKeyDown(e)}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
    </div>
  );
};
