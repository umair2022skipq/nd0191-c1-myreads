import React, { useState, useEffect } from "react";
import Book from "../Book/Book";
import "../../App.css";
import { search, getAll } from "../../BooksAPI";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

const SearchBooks = () => {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [shelvedBooks, setShelvedBooks] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await getAll();
      setShelvedBooks(response);
    })();
  }, []);

  const changeHandler = debounce(async (event) => {
    setInput(event.target.value);

    if (event.target.value !== "") {
      const response = await search(event.target.value);

      if (response.error === undefined) {
        setError("");
        setBooks(response);
      } else {
        setError(response.error);
      }
    } else {
      setError("");
    }
  }, 1000);

  const filteredbooks = books
    .filter((book) => Boolean(book.authors))
    .filter((book) => Boolean(book.imageLinks));

  const shelvedBooksIds = shelvedBooks.map((book) => book.id);

  const updatedBooks = filteredbooks.map((book) => {
    if (shelvedBooksIds.includes(book.id)) {
      const currentShelf = shelvedBooks.find(
        (shelvedBook) => shelvedBook.id === book.id
      ).shelf;
      return {
        ...book,
        shelf: currentShelf,
      };
    }
    return book;
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={changeHandler}
          />
        </div>
      </div>

      {input && error && (
        <p style={{ marginTop: "70px", textAlign: "center" }}>
          Could not find books
        </p>
      )}

      {input && !error && (
        <div className="search-books-results">
          <ol className="books-grid">
            {updatedBooks.map((book) => {
              return (
                <Book
                  key={book.id}
                  id={book.id}
                  shelf={book.shelf ? book.shelf : "none"}
                  title={book.title}
                  author={book.authors.reduce(
                    (acc, value) => acc + ", " + value
                  )}
                  thumbnail={book.imageLinks.thumbnail}
                />
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
