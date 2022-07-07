import "../App.css";
import { useState, useEffect, useContext } from "react";
import { getAll } from "../BooksAPI";
import BookShelf from "./BookShelf/BookShelf";
import { Link } from "react-router-dom";
import { ShelfContext } from "./ContextProvider";

const Main = () => {
  const [books, setBooks] = useState([]);
  // const [changeShelf, setChangeShelf] = useState("");

  // const updateShelfHandler = (value) => setChangeShelf(value);

  const { changeShelf } = useContext(ShelfContext);

  useEffect(() => {
    (async function () {
      const response = await getAll();
      const data = response;
      setBooks(data);
    })();
  }, [changeShelf]);

  return (
    <>
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          shelf="Currently Reading"
          books={books.filter((book) => book.shelf === "currentlyReading")}
          // updateShelf={updateShelfHandler}
        />

        <BookShelf
          shelf="Want To Read"
          books={books.filter((book) => book.shelf === "wantToRead")}
          // updateShelf={updateShelfHandler}
        />

        <BookShelf
          shelf="Read"
          books={books.filter((book) => book.shelf === "read")}
          // updateShelf={updateShelfHandler}
        />

        <div className="open-search">
          <Link to="/search">
            <a>Add a book</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Main;
