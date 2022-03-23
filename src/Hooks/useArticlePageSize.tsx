import { useLayoutEffect, useState } from "react";
export const useArticlePageSize = (): number => {
  const [articlePageSize, setArticlePageSize] = useState<number>(5);

  useLayoutEffect(() => {
    function updatePageSize() {
      if (window.innerWidth < 600) {
        setArticlePageSize(1);
      } else if (window.innerWidth >= 600 && window.innerWidth < 1040) {
        setArticlePageSize(2);
      } else if (window.innerWidth >= 1040 && window.innerWidth < 1550) {
        setArticlePageSize(3);
      } else {
        setArticlePageSize(5);
      }
    }

    window.addEventListener("resize", updatePageSize);
    updatePageSize();

    return () => window.removeEventListener("resize", updatePageSize);
  }, []);
  return articlePageSize;
};
