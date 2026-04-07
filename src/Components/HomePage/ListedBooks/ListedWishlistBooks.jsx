import React, { useContext, useEffect, useState } from 'react';
import { bookContext } from '../../BookContext/BookProvider';
import BookCard from '../../ui/BookCard';

const ListedWishlistBooks = ({sortingType}) => {
   const { wishlist} = useContext(bookContext);


    const [filterWishList,setFilterWishList]=useState(wishlist);
  
    useEffect(()=> {
      if(sortingType){
        if(sortingType === 'Pages'){
          const sortData = [...wishlist].sort((a,b)=> a.totalPages - b.totalPages);
          setFilterWishList(sortData);
        } else if(sortingType === 'Rating') {
          const sortData = [...wishlist].sort((a,b)=> a.rating - b.rating);
          setFilterWishList(sortData);
        }
      }
    },[sortingType,wishlist])

 if(filterWishList.length === 0) {
        return <div className="h-[50vh] flex justify-center items-center bg-gray-100">
            <h2 className="font-bold text-3xl">No Wish List Data Found</h2>
        </div>
    }
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {filterWishList.map((book, index) => (
        <BookCard key={index} book={book}></BookCard>
      ))}
      </div>
    </div>
  );
};

export default ListedWishlistBooks;