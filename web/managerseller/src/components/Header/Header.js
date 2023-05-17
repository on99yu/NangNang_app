import classes from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={classes.header}>
      <Link to={"/"}>
        <div className={classes.header_component}>Header</div>
      </Link>
    </div>
  );
};

export default Header;
