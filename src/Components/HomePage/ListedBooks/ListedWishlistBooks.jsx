import React, { useContext } from 'react';
import { bookContext } from '../../BookContext/BookProvider';
import BookCard from '../../ui/BookCard';

const ListedWishlistBooks = () => {
   const { wishlist} = useContext(bookContext);
 if(wishlist.length === 0) {
        return <div className="h-[50vh] flex justify-center items-center bg-gray-100">
            <h2 className="font-bold text-3xl">No Wish List Data Found</h2>
        </div>
    }
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {wishlist.map((book, index) => (
        <BookCard key={index} book={book}></BookCard>
      ))}
      </div>
    </div>
  );
};

export default ListedWishlistBooks;