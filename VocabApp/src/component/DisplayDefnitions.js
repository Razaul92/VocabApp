import React, { useState, useEffect } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";
import classes from "./DisplayDefnitions.module.css";
import ShortDefinitions from "./ShortDefinitions";
import Definition from "./DetailsDefnition";
import SearchWord from "./SearchWord";

const DisplayDefnitions = (props) => {
  const [wordList, setWordList] = useState([]);
  const [httpError, setHttpError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [isData, setIsData] = useState();
  // const [searchWord, setSearchWord] = useState();
  const [filteredData, setFilteredData] = useState(wordList);

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(
        "https://vocabapp-de44a-default-rtdb.firebaseio.com/SearchedWords.json"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong!!");
      }

      const responseData = await response.json();
      console.log("yourData", responseData);

      const loadedData = [];

      for (const key in responseData) {
        loadedData.push({
          id: key,
          word: responseData[key].word,
          definitions: responseData[key].definitions,
          example: responseData[key].example,
          noun: responseData[key].noun,
          shortDefinitions: responseData[key].shortDefinitions,
          synonyms: responseData[key].synonyms,
          synonyms1: responseData[key].synonyms1,
        });
      }

      setWordList(loadedData);
      setIsLoading(false);
    };
    fetchWords().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [props]);

  if (isLoading) {
    return (
      <section>
        <div className="centered">
          <LoadingSpinner />
        </div>
        <p className={classes.listLoading}>Loading....</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.listError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const closeHandler = () => {
    setIsShown(false);
  };

  const clickHandler = (
    id,
    word,
    shortDefinitions,
    definitions,
    example,
    noun,
    synonyms,
    synonyms1
  ) => {
    setIsData({
      id,
      word,
      shortDefinitions,
      definitions,
      example,
      noun,
      synonyms,
      synonyms1,
    });
    setIsShown(true);
  };

  console.log("myData1", wordList);
  const searchHandler = (searchWord) => {
    const listofWords1 = wordList.filter((value) => {
      return value.word.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData(wordList);
    } else {
      setFilteredData(listofWords1);
    }
  };

  // console.log("filter", filteredData);

  // console.log("RazaulM", wordList);

  return (
    <div>
      <SearchWord serach={searchHandler} />
      <h3>List Of Words</h3>
      <section className={classes.list}>
        <ul>
          {filteredData.map((list, key) => {
            return (
              <div>
                <ShortDefinitions
                  key={list.id}
                  id={list.id}
                  word={list.word}
                  shortDefinitions={list.shortDefinitions}
                  definitionsHandler={() => {
                    clickHandler(
                      list.id,
                      list.word,
                      list.shortDefinitions,
                      list.definitions,
                      list.example,
                      list.noun,
                      list.synonyms,
                      list.synonyms1
                    );
                  }}
                />
              </div>
            );
          })}
        </ul>
      </section>
      {isShown && (
        <Definition
          key={isData.id}
          id={isData.id}
          word={isData.word}
          noun={isData.noun}
          shortDefinitions={isData.shortDefinitions}
          definitions={isData.definitions}
          synonyms={isData.synonyms}
          synonyms1={isData.synonyms1}
          example={isData.example}
          closeDefn={closeHandler}
        />
      )}
    </div>
  );
};

export default DisplayDefnitions;

