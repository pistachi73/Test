// Components
import { ArticleProvider } from "./Context/ArticleContext";
import { Articles } from "./Pages/Articles";

// SCSS
import "./Styles/articles.scss";

function App() {
  return (
    <ArticleProvider>
      <Articles></Articles>
    </ArticleProvider>
  );
}

export default App;
