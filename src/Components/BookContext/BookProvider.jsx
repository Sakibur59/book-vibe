import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const bookContext = createContext();

const BookProvider = ({ children }) => {
  const [storedBooks, setStoredBooks] = useState([]);

  const handleStoredBook = (currentBook) => {
    const isExistBook = storedBooks.find(
      (book) => book.bookId === currentBook.bookId,
    );

    if (isExistBook) {
      toast.error("The book is already Exist");
    } else {
      setStoredBooks([...storedBooks, currentBook]);
      toast.success(`${currentBook.bookName} is added to list`);
    }
  };

  const data = {
    setStoredBooks,
    storedBooks,
    handleStoredBook,
  };
  return <bookContext.Provider value={data}>{children}</bookContext.Provider>;
};

export default BookProvider;
