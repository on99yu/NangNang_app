import classes from "./GroupItemSelect.module.css";

const GroupItemSelect = () => {
  return (
    <div className={classes.group_select}>
      <input type="checkbox" />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <h3>전체 선택</h3>
    </div>
  );
};

export default GroupItemSelect;
