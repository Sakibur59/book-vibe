import React, { useContext } from "react";
import { bookContext } from "../../BookContext/BookProvider";
import BookCard from "../../ui/BookCard";

const ListedReadBooks = () => {
  const { readList } = useContext(bookContext);
    if(readList.length === 0) {
        return <div className="h-[50vh] flex justify-center items-center bg-gray-100">
            <h2 className="font-bold text-3xl">No Read List Data Found</h2>
        </div>
    }


  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        {readList.map((book, index) => (
        <BookCard key={index} book={book}></BookCard>
      ))}
      </div>
    </div>
  );
};

export default ListedReadBooks;
