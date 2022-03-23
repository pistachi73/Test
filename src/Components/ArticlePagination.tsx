import { motion } from "framer-motion";

// Hooks
import { useArticlePageSize } from "../Hooks/useArticlePageSize";
import { useContext, useEffect } from "react";

// Components
import { ArticleContext } from "../Context/ArticleContext";

// Utils
import { scrollToTop } from "../Utils/scrollToTop";

// Icons
import {
  BsChevronDoubleLeft,
  BsChevronLeft,
  BsChevronDoubleRight,
  BsChevronRight,
} from "react-icons/bs";

// SCSS
import "./../Styles/articlePagination.scss";

export const ArticlePagination = () => {
  const { currentPage, articles, setCurrentPage } = useContext(ArticleContext);
  const articlesPageSize = useArticlePageSize();

  const TOTAL_PAGES: number = Math.ceil((articles.length as number) / articlesPageSize);
  let overLimit: number = 0;
  let lowerLimit: number = 0;
  let overLimitModified: boolean = false;

  useEffect(() => {
    setCurrentPage(1);
  }, [articlesPageSize, setCurrentPage]);

  const setNavigationPage = async (pageNumber: number) => {
    if (pageNumber === 0 || pageNumber === TOTAL_PAGES + 1) return;
    scrollToTop();
    setCurrentPage(pageNumber);
  };

  return (
    <motion.div className='article-pagination'>
      <BsChevronDoubleLeft
        size={20}
        className='article-pagination_icon-left'
        onClick={() => setNavigationPage(1)}
      ></BsChevronDoubleLeft>
      <BsChevronLeft
        className='article-pagination_icon-left'
        size={20}
        onClick={() => setNavigationPage(currentPage - 1)}
      ></BsChevronLeft>
      {[...Array(5)].map((_: any, index: number) => {
        if (currentPage - 2 + index <= 0 && lowerLimit !== -2) {
          lowerLimit = currentPage - 3 + index;
        }
        if (currentPage + 2 - index > TOTAL_PAGES && lowerLimit === 0 && !overLimitModified) {
          overLimitModified = true;
          overLimit = currentPage - TOTAL_PAGES - index + 2;
          if (TOTAL_PAGES === 4) overLimit -= 1;
          if (TOTAL_PAGES === 3) overLimit -= 2;
        }

        if (index + 1 > TOTAL_PAGES) return null;
        const pageNumber = currentPage - 2 + index - lowerLimit - overLimit;
        return (
          <p
            key={`pageNavigation_${pageNumber}`}
            className={currentPage === pageNumber ? "active" : ""}
            onClick={() => setNavigationPage(pageNumber)}
          >
            {currentPage - 2 + index - lowerLimit - overLimit}
          </p>
        );
      })}
      <BsChevronRight
        className='article-pagination_icon-right'
        size={20}
        onClick={() => setNavigationPage(currentPage + 1)}
      ></BsChevronRight>
      <BsChevronDoubleRight
        className='article-pagination_icon-right'
        size={20}
        onClick={() => setNavigationPage(TOTAL_PAGES)}
      ></BsChevronDoubleRight>
    </motion.div>
  );
};
