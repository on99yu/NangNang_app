import classes from "./Item.module.css";
import courseimage from "../../../../images/online_course_image_for_programming_language.png";

const Item = (props) => {
  const price = `${props.price}  원`;

  return (
    <li>
      <div className={classes.component1}>
        <input type="CheckBox" />
        <img
          src={courseimage}
          alt="courseimage 경로를 못찾았습니다."
          width="100"
          height="100"
        />
        <div className={classes.description}>
          <div className={classes.name}>{props.description}</div>
          <div>{props.author}</div>
          <div>{props.limitation}</div>
        </div>
        <div className={classes.price1}>{price}</div>
      </div>
    </li>
  );
};

export default Item;
