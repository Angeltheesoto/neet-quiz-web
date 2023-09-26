import React, { useContext, useState } from "react";
// import { lightTheme, darkTheme } from "../styles/globalStyles";
import "./settingItem.css";
import MyContext from "../../context/MyContext";

// !Add a toggle arrow up/down to display content for the settings.

const SettingItem = ({ title, children, isLast }) => {
  const [show, setShow] = useState(false);
  const { theme } = useContext(MyContext);
  // const containerStyle = isLast
  //   ? [styles.container, styles.lastItemContainer]
  //   : styles.container;
  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      <div onClick={handleClick}>
        <div>
          <p
          // style={[styles.title, theme ? lightTheme.text : darkTheme.text]}
          >
            {title}
          </p>
          {/* <AntDesign
            name={show ? "caretup" : "caretdown"}
            size={24}
            color={theme ? "black" : "white"}
          /> */}
          <img src="#" alt="drp dwn img" />
        </div>
      </div>
      {show ? <div>{children}</div> : null}
    </div>
  );
};

export default SettingItem;
