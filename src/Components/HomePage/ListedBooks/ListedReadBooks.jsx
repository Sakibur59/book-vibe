import React, { useContext, useEffect, useState } from "react";
import { bookContext } from "../../BookContext/BookProvider";
import BookCard from "../../ui/BookCard";

const ListedReadBooks = ({sortingType}) => {
  const { readList } = useContext(bookContext);

  const [filterReadList,setFilterReadList]=useState(readList);

  useEffect(()=> {
    if(sortingType){
      if(sortingType === 'Pages'){
        const sortData = [...readList].sort((a,b)=> a.totalPages - b.totalPages);
        setFilterReadList(sortData);
      } else if(sortingType === 'Rating') {
        const sortData = [...readList].sort((a,b)=> a.rating - b.rating);
        setFilterReadList(sortData);
      }
    }
  })


    if(filterReadList.length === 0) {
        return <div className="h-[50vh] flex justify-center items-center bg-gray-100">
            <h2 className="font-bold text-3xl">No Read List Data Found</h2>
        </div>
    }


  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        {filterReadList.map((book, index) => (
        <BookCard key={index} book={book}></BookCard>
      ))}
      </div>
    </div>
  );
};

export default ListedReadBooks;
