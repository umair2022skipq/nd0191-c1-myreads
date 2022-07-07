import React, { useState } from "react";
import Book from "../Book/Book";
import "../../App.css";
import { search } from "../../BooksAPI";
import { Link } from "react-router-dom";

const SearchBooks = () => {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const changeHandler = async (event) => {
    setInput(event.target.value);

    try {
      const response = await search(event.target.value);

      if (!response.error) {
        setBooks(response);
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
      {input && (
        <div className="search-books-results">
          <ol className="books-grid">
            {books
              .filter((book) => book.authors !== undefined)
              .map((book) => {
                return (
                  <Book
                    key={book.id}
                    id={book.id}
                    shelf="none"
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
