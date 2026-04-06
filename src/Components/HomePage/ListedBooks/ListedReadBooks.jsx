import React, { useContext } from "react";
import { bookContext } from "../../BookContext/BookProvider";
import BookCard from "../../ui/BookCard";

const ListedReadBooks = () => {
  const { storedBooks } = useContext(bookContext);

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        {storedBooks.map((book, index) => (
        <BookCard key={index} book={book}></BookCard>
      ))}
      </div>
    </div>
  );
};

export default ListedReadBooks;
