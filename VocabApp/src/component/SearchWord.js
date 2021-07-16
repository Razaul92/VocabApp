import React, { useState } from "react";
import classes from "./SearchWord.module.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const SearchWord = (props) => {
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    props.serach(wordEntered);
    // const newFilter = props.data.filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });

    //   if (searchWord === "") {
    //     setFilteredData([]);
    //   } else {
    //     setFilteredData(newFilter);
    //   }
  };

  const clearInput = () => {
    setWordEntered("");
  };

  return (
    <div className={classes.search}>
      <input
        type="text"
        placeholder="Vocab"
        value={wordEntered}
        onChange={handleFilter}
      />

      {wordEntered.length === 0 ? (
        <SearchIcon className={classes.searchIcon} />
      ) : (
        <CloseIcon onClick={clearInput} className={classes.searchIcon} />
      )}
    </div>
  );
};

export default SearchWord;
