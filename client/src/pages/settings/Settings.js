import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./settings.css";

// components
import SettingItem from "../../components/settingItem/SettingItem";
import { Lightbulb, LightbulbFill } from "react-bootstrap-icons";

const Settings = ({ fetchLsData, setFetchLsData, initializeLocalStorage }) => {
  const [isLight, setIsLight] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [bookmarkedItems, setBookmarkedItems] = useState(null);
  const [delSavedMessage, setDelSavedMessage] = useState(null);
  const [showDelSavedMessage, setShowDelSavedMessage] = useState(true);

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      try {
        const localBookmark = await localStorage.getItem("bookmarkedItems");
        setBookmarkedItems(localBookmark);
        setIsLight(theme);
      } catch (error) {
        console.log("Error fetching bookmarked items:", error);
      }
    };

    fetchBookmarkedItems();
  }, []);

  const onPressRadioButton = () => {
    setIsLight((prev) => !prev);
    toggleTheme(!isLight);
  };
  // console.log(` Settings: ${isLight}`);
  // console.log(` Settings: ${theme}`);

  const themeContent = () => {
    return (
      <div>
        <div
          className="settings-ld-mode"
          onClick={!isLight ? onPressRadioButton : null}
        >
          {isLight ? (
            <LightbulbFill color={!theme ? "white" : "black"} size={30} />
          ) : (
            <Lightbulb color={!theme ? "white" : "black"} size={30} />
          )}
          <h6>Light</h6>
        </div>
        <div
          className="settings-ld-mode"
          onClick={!isLight ? null : onPressRadioButton}
        >
          {isLight ? (
            <Lightbulb color={!theme ? "white" : "black"} size={30} />
          ) : (
            <LightbulbFill color={!theme ? "white" : "black"} size={30} />
          )}
          <h6>Dark</h6>
        </div>
      </div>
    );
  };

  // !add savedQuiz and setSavedQuiz to context and change it here so it updates in saved tab.
  const clearData = () => {
    return (
      <>
        <div>
          <span className="warning">
            The button below will remove all saved quizzes.
          </span>
        </div>
        <div
          className="settings-delete-ls"
          onClick={() => {
            clearLocalStorageItem("bookmarkedItems");
          }}
        >
          Delete all saved quizzes
        </div>
        {showDelSavedMessage && <p>{delSavedMessage}</p>}
      </>
    );
  };

  // !Deletes localStorage
  const clearLocalStorageItem = async (itemName) => {
    try {
      const localBookmark = await localStorage.getItem("bookmarkedItems");
      if (localBookmark !== null) {
        await localStorage.removeItem(itemName);
        initializeLocalStorage();
        setFetchLsData(!fetchLsData);
        setDelSavedMessage("Deleted bookmarks successfully.");
        setShowDelSavedMessage(true);
        setTimeout(() => {
          setShowDelSavedMessage(false);
        }, 5000);
      } else {
        // console.log('There is no "bookmarkedItems".');
        setDelSavedMessage("There are no saved bookmarks.");
      }
      // console.log(`Removed item ${itemName} data.`);
    } catch (err) {
      // console.log(`Could not delete ${itemName}:${err}`);
      setDelSavedMessage("Sorry, could not delete bookmarks.");
    }
  };
  // clearLocalStorageItem("bookmarkedItems");

  const aboutContent = () => {
    return (
      <div>
        <h6>
          NEETQuiz is a quiz app meticulously crafted by developers to empower
          software engineers and developers in honing their skills and
          knowledge. Geared towards improving your technical interview skills,
          this app serves as an indispensable tool for aspirants seeking success
          in the ever-evolving world of software development.
        </h6>
      </div>
    );
  };

  useEffect(() => {
    const setLocalTheme = async (value) => {
      try {
        await localStorage.setItem("theme", value.toString());
        // const theme = await AsyncStorage.getItem("theme");
        // console.log("Local theme set successfully!", theme);
      } catch (err) {
        console.log("Error setting local theme: ", err);
      }
    };
    if (theme === false) {
      setLocalTheme(false);
      setIsLight(false);
    } else {
      setLocalTheme(isLight);
    }
  }, [isLight]);
  // *console.log("context message: ", theme, isLight);

  return (
    <div>
      <div>
        <SettingItem title={"Theme"} children={themeContent()} />
        <SettingItem title={"About"} children={aboutContent()} />
        <SettingItem
          title={"Delete Bookmarks"}
          children={clearData()}
          isLast={true}
        />
      </div>
    </div>
  );
};

export default Settings;
