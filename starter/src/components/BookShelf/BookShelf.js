import React from "react";
import Book from "../Book/Book";

const BookShelf = (props) => {
  const { shelf, books, updateShelf } = props;

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
                changeShelf={updateShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default BookShelf;
