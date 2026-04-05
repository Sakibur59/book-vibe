import React from "react";
import bannerImg from '../../assets/banner.png'

const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-[70vh] rounded-2xl my-8 max-w-300 mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse justify-between gap-50">
        <img
          src={bannerImg}
          
        />
        <div>
          <h1 className="text-5xl font-bold w-131.5 mb-8">Books to freshen up your bookshelf</h1>
          <button className="btn btn-success">View The List</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
