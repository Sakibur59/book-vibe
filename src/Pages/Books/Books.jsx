import React, { useContext } from 'react';
import { bookContext } from '../../Components/BookContext/BookProvider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ListedReadBooks from '../../Components/HomePage/ListedBooks/ListedReadBooks';
import ListedWishlistBooks from '../../Components/HomePage/ListedBooks/ListedWishlistBooks';

const Books = () => {

    // const {readList} = useContext(bookContext);
    // console.log(readList);

    return (
        <div className='max-w-300 mx-auto my-5'>
             <Tabs>
    <TabList>
      <Tab>Read List</Tab>
      <Tab>Wishlist</Tab>
    </TabList>

    <TabPanel>
      <ListedReadBooks></ListedReadBooks>
    </TabPanel>
    <TabPanel>
      <ListedWishlistBooks></ListedWishlistBooks>
    </TabPanel>
  </Tabs>
        </div>
    );
};

export default Books;