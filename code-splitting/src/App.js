import { useState, lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import BrowserContext from "./BrowserContext";
import Html from "./Html";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = ({ assets, isBrowser }) => {
  const theme = useState("pink");
  return (
    <Html assets={assets} title={"Testing"}>
      <BrowserContext.Provider value={isBrowser}>
        <ThemeContext.Provider value={theme}>
          <div>
            <Suspense fallback={<h1>loading route …</h1>}>
              <header>
                <Link to="/">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
          </div>
        </ThemeContext.Provider>
      </BrowserContext.Provider>
    </Html>
  );
};

export default App;
