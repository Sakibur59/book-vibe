import React from 'react';
import { FaRegStar } from "react-icons/fa";
const BookCard = ({book}) => {
    return (
            <div className="card bg-base-100 shadow-sm">
              <figure>
                <img src={book.image} alt={book.bookName} className="rounded-xl h-62.5" />
              </figure>
              <div className="card-body">
               <div className="flex items-center gap-2">
                 {book.tags.map((tag,index) => (
                  <div key={index} className="badge text-green-500 bg-green-100 font-semibold">{tag}</div>
                ))}
               </div>

                <h2 className="card-title font-bold text-xl">
                  {book.bookName}
                </h2>
                <p className="font-semibold text-lg">By: {book.author}</p>
                <div className="card-actions justify-between border-t border-dashed pt-4 border-gray-300 ">
                  <div className="font-semibold">{book.category}</div>
                  <div className="font-semibold flex items-center gap-1">{book.rating}<FaRegStar /></div>
                </div>
              </div>
            </div>
          );
};

export default BookCard;