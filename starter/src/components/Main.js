import "../App.css";
import { useState, useEffect, useContext } from "react";
import { getAll } from "../BooksAPI";
import BookShelf from "./BookShelf/BookShelf";
import { Link } from "react-router-dom";
import { ShelfContext } from "./ContextProvider";

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

const Main = () => {
  const [books, setBooks] = useState([]);
  const { changeShelf } = useContext(ShelfContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const response = await getAll();
      const data = response;
      setBooks(data);
      setIsLoading(false);
    })();
  }, [changeShelf]);

  return (
    <>
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {!isLoading ? (
        <div className="list-books-content">
          <BookShelf
            shelf="Currently Reading"
            books={books.filter((book) => book.shelf === "currentlyReading")}
          />
          <BookShelf
            shelf="Want To Read"
            books={books.filter((book) => book.shelf === "wantToRead")}
          />
          <BookShelf
            shelf="Read"
            books={books.filter((book) => book.shelf === "read")}
          />
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Main;
