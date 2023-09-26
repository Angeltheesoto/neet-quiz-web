import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
// import { lightTheme, darkTheme } from "../styles/globalStyles";

// components
import SettingItem from "../../components/settingItem/SettingItem";

const Settings = ({ fetchLsData, setFetchLsData, initializeLocalStorage }) => {
  const [isLight, setIsLight] = useState(true);
  const { theme, toggleTheme } = useContext(MyContext);
  const [bookmarkedItems, setBookmarkedItems] = useState(null);
  const [delSavedMessage, setDelSavedMessage] = useState(null);
  const [showDelSavedMessage, setShowDelSavedMessage] = useState(true);

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      try {
        const localBookmark = await localStorage.getItem("bookmarkedItems");
        setBookmarkedItems(localBookmark);
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

  const themeContent = () => {
    return (
      <div>
        <div onClick={onPressRadioButton} disabled={isLight}>
          <div>
            {/* <Ionicons
              name={isLight ? "radio-button-on" : "radio-button-off"}
              size={24}
              color="gray"
            /> */}
            <img src="#" alt="Temp image" />
            {/* <Text style={isLight ? lightTheme.text : darkTheme.text}> */}
            <p>Light</p>
            {/* </Text> */}
          </div>
        </div>
        <div onClick={onPressRadioButton} disabled={!isLight}>
          <div>
            {/* <Ionicons
              name={isLight ? "radio-button-off" : "radio-button-on"}
              size={24}
              color="gray"
            /> */}
            <img src="#" alt="Temp image" />
            {/* <Text style={isLight ? lightTheme.text : darkTheme.text}> */}
            <p>Dark</p>
            {/* </Text> */}
          </div>
        </div>
      </div>
    );
  };

  // !add savedQuiz and setSavedQuiz to context and change it here so it updates in saved tab.
  const clearData = () => {
    return (
      <>
        <div>
          {/* <Text style={isLight ? lightTheme.text : darkTheme.text}> */}
          <p>Clicking this button will remove all saved quizzes.</p>
          {/* </Text> */}
        </div>
        <div
          // style={styles.clearButton}
          onClick={() => {
            clearLocalStorageItem("bookmarkedItems");
          }}
        >
          {/* <Text style={styles.clearText}> */}
          <p>Delete all saved quizzes</p>
          {/* </Text> */}
        </div>
        {showDelSavedMessage && (
          // <Text
          //   style={[
          //     styles.messagePrompt,
          //     isLight ? lightTheme.text : darkTheme.text,
          //   ]}
          // >
          <p>{delSavedMessage}</p>
          // </Text>
        )}
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
        {/* <Text style={isLight ? lightTheme.text : darkTheme.text}> */}
        <p>
          NEETQuiz is a quiz app meticulously crafted by developers to empower
          software engineers and developers in honing their skills and
          knowledge. Geared towards improving your technical interview skills,
          this app serves as an indispensable tool for aspirants seeking success
          in the ever-evolving world of software development.
        </p>
        {/* </Text> */}
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
      {/* <View style={isLight ? lightTheme.container : darkTheme.container}> */}
      <div>
        <SettingItem title={"Theme"} children={themeContent()} />
        <SettingItem title={"About"} children={aboutContent()} />
        <SettingItem
          title={"Delete Bookmarks"}
          children={clearData()}
          isLast={true}
        />
      </div>
      {/* </View> */}
    </div>
  );
};

export default Settings;
