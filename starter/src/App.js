import "./App.css";
import Main from "./components/Main";
import SearchBooks from "./components/SearchComponent/SearchBooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextProvider from "./components/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/search" element={<SearchBooks />}></Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
