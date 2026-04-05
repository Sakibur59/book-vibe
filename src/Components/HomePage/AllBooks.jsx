import React, { use } from "react";
import BookCard from "../ui/BookCard";

const booksPromise = fetch("/booksData.json").then((res) => res.json());
const AllBooks = () => {
  const books = use(booksPromise);
  return (
    <div className="max-w-300 mx-auto my-12">
      <h2 className="font-bold text-xl text-center">Books</h2>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 mt-10">
        {books.map((book,index) => {
          return <BookCard key={index} book={book}></BookCard>
        })}
      </div>
    </div>
  );
};

export default AllBooks;
