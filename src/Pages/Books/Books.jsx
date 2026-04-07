import React, { useContext, useState } from "react";
import { bookContext } from "../../Components/BookContext/BookProvider";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ListedReadBooks from "../../Components/HomePage/ListedBooks/ListedReadBooks";
import ListedWishlistBooks from "../../Components/HomePage/ListedBooks/ListedWishlistBooks";

const Books = () => {
  // const {readList} = useContext(bookContext);
  // console.log(readList);
  const [sortingType,setSortingType] = useState('')

  return (
    <div className="max-w-300 mx-auto my-5">
      <div className="flex justify-center items-center py-4">
        <div className="dropdown dropdown-start">
          <div tabIndex={0} role="button" className="btn m-1">
            Click : {sortingType}
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li onClick={()=>setSortingType('Pages')}>
              <a>Pages</a>
            </li>
            <li onClick={()=>setSortingType('Rating')}>
              <a>Rating</a>
            </li>
          </ul>
        </div>
      </div>

      <Tabs>
        <TabList>
          <Tab>Read List</Tab>
          <Tab>Wishlist</Tab>
        </TabList>

        <TabPanel>
          <ListedReadBooks sortingType={sortingType}></ListedReadBooks>
        </TabPanel>
        <TabPanel>
          <ListedWishlistBooks sortingType={sortingType}></ListedWishlistBooks>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Books;
