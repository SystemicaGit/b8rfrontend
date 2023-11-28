import React, { useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import searchImg from "./Assets/Search.png";

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
    <div style={{display:"flex"}}>

      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{width:"350px",textAlign:"center"}}
      />
      {/* <BsSearchHeart className="BsSearchHeart" onClick={handleSearch} /> */}
      <img src={searchImg} onClick={handleSearch} style={{ float:"top",marginLeft:"-100px",marginTop:"5px"}} height={30} />

      {/* <IoSearch className="AiOutlineInfoCircle" onClick={handleSearch} /> */}
      {/* <FontAwesomeIcon icon="fa-brands fa-searchengin" /> */}
    </div>
  );
}

export default SearchBar;
