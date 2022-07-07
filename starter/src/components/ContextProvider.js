import React, { useState } from "react";

export const ShelfContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  const [changeShelf, setChangeShelf] = useState("");

  return (
    <ShelfContext.Provider value={{ changeShelf, setChangeShelf }}>
      {children}
    </ShelfContext.Provider>
  );
};

export default ContextProvider;
