import React, { useState } from "react";
import "./settingItem.css";
import { useTheme } from "../../context/ThemeContext";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

// !Add a toggle arrow up/down to display content for the settings.

const SettingItem = ({ title, children, isLast }) => {
  const [show, setShow] = useState(false);
  const { theme, setTheme, toggleTheme } = useTheme();

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="settingitem-container" data-theme={theme ? null : "dark"}>
      <div onClick={handleClick}>
        <div className="settingitem-inner-container">
          <h5>{title}</h5>
          {show ? (
            <CaretUpFill color={!theme ? "white" : "black"} size={50} />
          ) : (
            <CaretDownFill color={!theme ? "white" : "black"} size={50} />
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
