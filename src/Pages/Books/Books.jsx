import React, { useContext } from 'react';
import { bookContext } from '../../Components/BookContext/BookProvider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Books = () => {

    const {storedBooks,wishlist} = useContext(bookContext);
    console.log(storedBooks);

    return (
        <div className='max-w-300 mx-auto'>
             <Tabs>
    <TabList>
      <Tab>Read List</Tab>
      <Tab>Wishlist</Tab>
    </TabList>

    <TabPanel>
      <h2>Read List {storedBooks.length}</h2>
    </TabPanel>
    <TabPanel>
      <h2>Wishlist</h2>
    </TabPanel>
  </Tabs>
        </div>
    );
};

export default Books;