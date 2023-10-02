import React, { useContext, useState } from "react";
// import { lightTheme, darkTheme } from "../styles/globalStyles";
import "./settingItem.css";
import MyContext from "../../context/MyContext";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

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
    <div className="settingitem-container">
      <div onClick={handleClick}>
        <div className="settingitem-inner-container">
          <h5
          // style={[styles.title, theme ? lightTheme.text : darkTheme.text]}
          >
            {title}
          </h5>
          {/* <AntDesign
            name={show ? "caretup" : "caretdown"}
            size={24}
            color={theme ? "black" : "white"}
          /> */}
          {show ? (
            <CaretUpFill color="black" size={50} />
          ) : (
            <CaretDownFill color="black" size={50} />
          )}
        </div>
      </div>
      {show ? (
        <div className="settingitem-children-container">{children}</div>
      ) : null}
    </div>
  );
};

export default SettingItem;
