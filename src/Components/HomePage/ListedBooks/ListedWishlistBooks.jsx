import React, { useContext } from 'react';
import { bookContext } from '../../BookContext/BookProvider';
import BookCard from '../../ui/BookCard';

const ListedWishlistBooks = () => {
   const { wishlist} = useContext(bookContext);
 
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