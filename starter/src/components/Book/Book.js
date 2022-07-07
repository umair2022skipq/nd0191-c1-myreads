import React, { useState } from "react";
import { update } from "../../BooksAPI";

const Book = (props) => {
  const { id, shelf, thumbnail, title, author, changeShelf } = props;

  const [selected, setSelected] = useState(shelf);

  const changeHandler = async (event) => {
    setSelected(event.target.value);
    await update({ id: id }, event.target.value);
    changeShelf(event.target.value);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={selected} onChange={changeHandler}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    </li>
  );
};

export default Book;
