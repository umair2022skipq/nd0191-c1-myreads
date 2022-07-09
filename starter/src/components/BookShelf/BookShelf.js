import React from "react";
import Book from "../Book/Book";
import PropTypes from "prop-types";

const BookShelf = (props) => {
  const { shelf, books } = props;

  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book
                key={book.id}
                id={book.id}
                shelf={book.shelf}
                title={book.title}
                author={book.authors.reduce((acc, value) => acc + ", " + value)}
                thumbnail={book.imageLinks.thumbnail}
              />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default BookShelf;

BookShelf.proptype = {
  shelf: PropTypes.string,
  books: PropTypes.arrayOf(Object),
};
