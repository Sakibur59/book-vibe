import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const bookContext = createContext();

const BookProvider = ({ children }) => {
  const [storedBooks, setStoredBooks] = useState([]);

  const [wishlist ,setWishlist] = useState([])

  const handleStoredBook = (currentBook) => {
    const isExistBook = storedBooks.find(
      (book) => book.bookId === currentBook.bookId,
    );

    if (isExistBook) {
      toast.error("The book is already Mark as read");
    } else {
      setStoredBooks([...storedBooks, currentBook]);
      toast.success(`${currentBook.bookName} is added to Make as read`);
    }
  };
  const handleWishlist = (currentBook) => {
    const isExistInReadList = storedBooks.find(
      (book) => book.bookId === currentBook.bookId,
    );

    if (isExistInReadList) {
      toast.error("The book is already in read list");
      return;
    }

    const isExistInWishlist = wishlist.find(
      (book) => book.bookId === currentBook.bookId,
    );

    if (isExistInWishlist) {
      toast.error("The book is already in Wishlist");
    } else {
      setWishlist([...wishlist, currentBook]);
      toast.success(`${currentBook.bookName} is added to Wishlist`);
    }
  };

  const data = {
    setStoredBooks,
    storedBooks,
    handleStoredBook,
    wishlist,
    setWishlist,
    handleWishlist
  };
  return <bookContext.Provider value={data}>{children}</bookContext.Provider>;
};

export default BookProvider;
