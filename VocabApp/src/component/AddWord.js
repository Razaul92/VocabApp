import React, { useState } from "react";
import classes from "./AddWords.module.css";
import Modal from "../component/UI/Modal";

const AddToDictionary = (props) => {
  const [enteredWord, setEnteredWord] = useState("");
  const [word, setWord] = useState("");
  const [error, setError] = useState();

  const clickHandler = () => {
    setWord(enteredWord);
  };

  const apiCall = async () => {
    console.log("Starting...");
    let app_id = "f9f53f02";
    let app_key = "acfe3225e521d46fd250e678f4022c51";

    if (word) {
      // for fetching Data from API
      const result = await fetch(
        `https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}`,
        {
          headers: {
            app_id,
            app_key,
          },
        }
      );
      const data = await result.json();
      console.log(data);

      if (data.error) {
        setError(data.error);
        return;
      }

      let myData = data.results[0].lexicalEntries[0].entries[0].senses[0];

      if (data) {
        console.log(myData);

        let definitions = myData.definitions ? myData.definitions[0] : "None"; // to Upload Data on Backend, Insome Word there is no information of examples sybonyms etc. for this, this expression
        let example = myData.examples ? myData.examples[0].text : "None";
        let synonyms = myData.synonyms ? myData.synonyms[0].text : "None";
        let shortDefinitions = myData.shortDefinitions
          ? myData.shortDefinitions[0]
          : "None";

        const uploaded = {
          definitions: definitions,
          word: data.word,
          noun: data.results[0].lexicalEntries[0].lexicalCategory.text,
          example: example,
          shortDefinitions: shortDefinitions,
          synonyms: synonyms,
        };
        props.addToDb(uploaded);
        props.onClose();
      }
    }
  };
  apiCall();

  return (
    <Modal onCloseM={props.onClose}>
      <div className={classes.addWord}>
        <h1>Add To Dictionary</h1>
        <div className={classes.summary}>
          <p>{error}</p>
          <label>New Word</label>
          <input
            type="text"
            placeholder="Add New Word"
            onChange={(e) => setEnteredWord(e.target.value)}
            value={enteredWord}
          />
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={clickHandler}>ADD</button>
        <button onClick={props.onClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default AddToDictionary;
