import React, { use } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";


const booksPromise = fetch("/booksData.json").then((res) => res.json());
const PagesToRead = () => {
  const books = use(booksPromise);

  return (
    <div>
      {books.map((book, index) => {
        return (
          <BarChart width={600} height={300}>
            <XAxis
              dataKey={book.totalPages}
              
              label={{
                position: "insideBottomRight",
                value: "XAxis title",
                offset: -10,
              }}
            />

             <YAxis label={{ position: 'insideTopLeft', value: 'YAxis title', angle: -90, dy: 60 }} />
      <Bar dataKey={book.totalPages} fill="#8884d8" />
          </BarChart>
        );
      })}
    </div>
  );
};

export default PagesToRead;
