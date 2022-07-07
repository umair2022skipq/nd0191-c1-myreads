import "../App.css";
import { useState, useEffect } from "react";
import { getAll } from "../BooksAPI";
import SearchBooks from "./SearchComponent/SearchBooks";
import BookShelf from "./BookShelf/BookShelf";

const Main = () => {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [changeShelf, setChangeShelf] = useState("");

  const updateShelfHandler = (value) => setChangeShelf(value);

  useEffect(() => {
    (async function () {
      const response = await getAll();
      const data = response;
      setBooks(data);
    })();
  }, [changeShelf]);

  const pageHandler = () => setShowSearchpage((prevState) => !prevState);

  return (
    <>
      {showSearchPage ? (
        <SearchBooks onClick={pageHandler} />
      ) : (
        <>
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf
              shelf="Currently Reading"
              books={books.filter((book) => book.shelf === "currentlyReading")}
              updateShelf={updateShelfHandler}
            />

            <BookShelf
              shelf="Want To Read"
              books={books.filter((book) => book.shelf === "wantToRead")}
              updateShelf={updateShelfHandler}
            />

            <BookShelf
              shelf="Read"
              books={books.filter((book) => book.shelf === "read")}
              updateShelf={updateShelfHandler}
            />

            <div className="open-search">
              <a onClick={() => setShowSearchpage(!showSearchPage)}>
                Add a book
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Main;
