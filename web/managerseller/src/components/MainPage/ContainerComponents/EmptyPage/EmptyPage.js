import classes from './EmptyPage.module.css';

const EmptyPage = () => {
  return (
    <div className={classes.emptyPage_wrap}>
      <div className={classes.emptyPage}>
        <div className={classes.emptyPage_text}>EmptyPage</div>
        <div className={classes.emptyPage_component_wrap}></div>
      </div>
    </div>
  );
};

export default EmptyPage;
