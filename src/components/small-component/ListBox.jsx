import React from "react";

const ListBox = ({ data }) => {
  console.log("enterrrrrrrrrrrrrrrrrr")
  return (
    <div className=" absolute p-2 bg-white/60 backdrop-blur-2xl rounded-lg shadow-md mt-1">
      {data.map((item, index) => (
        <div key={index} className="p-2 text-black ">
          {item}
        </div>
      ))}
    </div>
  );
};

export default ListBox;
