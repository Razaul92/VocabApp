import classes from "./DisplayDefnitions.module.css";

const ShortDefinitions = (props) => {
  return (
    <li className={classes.short} id={props.id}>
      <div className={classes.shortDef} onClick={props.definitionsHandler}>
        <p>{props.word}</p>
        <label>Defnition:</label>
        <p>{props.shortDefinitions}</p>
      </div>
    </li>
  );
};

export default ShortDefinitions;
