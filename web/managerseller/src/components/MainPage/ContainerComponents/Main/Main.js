import classes from "./Main.module.css";
import React from "react";
import nangnang from "../../../../asset/images/nangnang.png";
const Main = () => {
  // const { user } = useContext(UserContext);

  return (
    <div className={classes.main_wrap}>
      <div className={classes.main}>
        {/* <div className={classes.main_text}>Main</div> */}
        <div className={classes.main_component_wrap}>
          <div className={classes.main_image_wrap}>
            <img
              className={classes.main_image}
              src={nangnang}
              alt="낭낭 메인 페이지 이미지"
            />
            {/* <p>환영합니다! User: {user ? JSON.stringify(user) : "No user"}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
