import React, { useContext} from "react";
import { useLoaderData, useParams } from "react-router";
import { bookContext } from "../../Components/BookContext/BookProvider";


const BookDetails = () => {
  const {bookId:bookParamsId} = useParams();
  const books = useLoaderData();

  const expectedBook = books.find((book) => book.bookId == bookParamsId);

  const {handleStoredBook} = useContext(bookContext);

  const {bookId,bookName,author,image,review,totalPages,rating,category,tags,publisher,yearOfPublishing} = expectedBook;
  return (
    <div className="grid grid-cols-2 bg-base-100 shadow-sm max-w-300 mx-auto my-10 rounded-xl">
      <figure className="w-full flex items-center justify-center bg-gray-100 rounded-xl">
        <img
          src={image} className="h-100"
          alt={bookName}
        />
      </figure>
      <div className="card-body space-y-3 ">
        <h2 className="card-title font-bold">{bookName}</h2>
        <h2 className="font-bold">By: {author}</h2>
        <p className="py-2 border-y font-bold border-gray-300  ">{category}</p>
        <p>Review: {review}</p>
        <div className="flex items-center gap-2">
            <h2 className="font-bold">Tag:</h2>
                 {tags.map((tag,index) => (
                  <div key={index} className="badge text-green-500 bg-green-100 font-semibold">#{tag}</div>
                ))}
               </div>
        <div className="border-t space-y-3 border-gray-300">
            <div className="flex justify-between items-center gap-20">
                <span className="text-[#131313]">Number of Pages: <span className="font-bold text-[#131313]">{totalPages}</span></span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[#131313]">Publisher: <span className="font-bold text-[#131313]">{publisher}</span></span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[#131313]">Year of Publishing: <span className="font-bold text-[#131313]">{yearOfPublishing}</span></span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-[#131313]">Rating: <span className="font-bold text-[#131313]">{rating}</span></span>
            </div>
            <div className="flex items-center justify-center gap-2">

          <button className="btn" onClick={()=>handleStoredBook(expectedBook)}>Mark As Read</button>
          <button className="btn btn-primary">Add to Wishlist</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
