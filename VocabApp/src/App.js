import { useState } from "react";
import "./App.css";
// import SearchWord from "./component/SearchWord";
import AddToDictionary from "./component/AddWord";
import AddIcon from "@material-ui/icons/Add";
import DisplayDefnitions from "./component/DisplayDefnitions";

const App = () => {
  const [isShown, setIsShown] = useState(false);

  const closeHandler = () => {
    setIsShown(false);
  };

  const addToDbHandler = async (wordUpload) => {
    console.log(wordUpload);
    await fetch(
      "https://vocabapp-de44a-default-rtdb.firebaseio.com/SearchedWords.json",
      {
        method: "POST",
        body: JSON.stringify(wordUpload),
      }
    );
  };

  return (
    <div className="appClass">
      {/* <SearchWord /> */}
      {isShown && (
        <AddToDictionary onClose={closeHandler} addToDb={addToDbHandler} />
      )}
      <DisplayDefnitions />
      <AddIcon className="addIcon" onClick={() => setIsShown(true)} />
    </div>
  );
};

export default App;

//
