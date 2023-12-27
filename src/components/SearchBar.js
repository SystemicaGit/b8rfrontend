import React, { useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import searchImg from "./Assets/Search.png";
import { FaSearch } from "react-icons/fa";

// import "./SearchBar.css";

function SearchBar(props) {
  const { placeholder, onSearch } = props;
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // Call the provided onSearch function with the search value
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div className="px-[1rem]">
      <div
        className="flex justify-center items-center px-[1rem]
      rounded-[0.5rem] "
        style={{
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          // onKeyPress={handleKeyPress}
          style={{
            outline: "none",
            marginBottom: "0",
            boxShadow: "none",
          }}
        />
        <button className="flex justify-center items-center">
          <FaSearch className="text-[1.5rem]" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
