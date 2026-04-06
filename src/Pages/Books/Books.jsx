import React, { useContext } from 'react';
import { bookContext } from '../../Components/BookContext/BookProvider';

const Books = () => {

    const {storedBooks} = useContext(bookContext);
    console.log(storedBooks);

    return (
        <div>
            books
        </div>
    );
};

export default Books;