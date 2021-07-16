import classes from "./DisplayDefnitions.module.css";
import CloseIcon from "@material-ui/icons/Close";

const Definitions = (props) => {
  return (
    <div className={classes.defn}>
      <CloseIcon onClick={props.closeDefn} className={classes.closeDefn} />
      <div className={classes.shortDef}>
        <p>{props.word}</p>
        <p>{props.noun}</p>
        <label>Defnition:</label>
        <p>{props.shortDefinitions}</p>
        <p>{props.definitions}</p>
        <label>Synonyms:</label>
        <p>{props.synonyms}</p>
        <p>{props.synonyms1}</p>
        <label>Example:</label>
        <p>{props.example}</p>
      </div>
    </div>
  );
};

export default Definitions;
