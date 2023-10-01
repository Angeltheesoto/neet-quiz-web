import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MyContext from "./context/MyContext";

// Pages
import Home from "./pages/home/Home";
import Saved from "./pages/Saved/Saved";
import Settings from "./pages/settings/Settings";

function App() {
  const [fetchLsData, setFetchLsData] = useState(false);
  const [theme, setTheme] = useState(true);

  const toggleTheme = (isLight) => {
    setTheme(isLight);
  };

  // !Retrieves saved quizzes and theme from LS
  const initializeLocalStorage = async () => {
    try {
      const localBookmark = await localStorage.getItem("bookmarkedItems");
      if (!localBookmark) {
        localStorage.setItem("bookmarkedItems", JSON.stringify({}));
        console.log("LocalStorage initialized.");
      } else {
        console.log("LocalStorage already initialized.");
        // null;
      }

      const localTheme = await localStorage.getItem("theme");
      if (!localTheme) {
        localStorage.setItem("theme", JSON.stringify(theme));
      } else {
        const parsedTheme = JSON.parse(localTheme);
        setTheme(parsedTheme);
      }
    } catch (error) {
      console.log("Error initializing LocalStorage:", error);
    }
  };

  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return (
    <MyContext.Provider value={{ theme, toggleTheme }}>
      <div className="App">
        {
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    initializeLocalStorage={initializeLocalStorage}
                    fetchLsData={fetchLsData}
                    setFetchLsData={setFetchLsData}
                  />
                }
              />
              <Route
                path="/saved"
                element={
                  <Saved initializeLocalStorage={initializeLocalStorage} />
                }
              />
              <Route
                path="/settings"
                element={
                  <Settings
                    initializeLocalStorage={initializeLocalStorage}
                    fetchLsData={fetchLsData}
                    setFetchLsData={setFetchLsData}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        }
      </div>
    </MyContext.Provider>
  );
}

export default App;
