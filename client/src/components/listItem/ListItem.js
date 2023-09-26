import React, { useEffect, useState, useContext } from "react";
import "./listItem.css";
// import { darkTheme } from "../styles/globalStyles";
import MyContext from "../../context/MyContext";

const ListItem = ({ title, genre }) => {
  const [isSaved, setIsSaved] = useState(null);
  const [savedQuiz, setSavedQuiz] = useState(null);
  const { theme } = useContext(MyContext);

  // !Saves quiz to localStorage
  const saveItem = async (genre, title) => {
    try {
      const existingData = await localStorage.getItem("bookmarkedItems");
      const data = existingData ? JSON.parse(existingData) : {};

      if (data[genre]) {
        data[genre].push(title);
      } else {
        data[genre] = [title];
      }

      await localStorage.setItem("bookmarkedItems", JSON.stringify(data));
      // console.log("Title added to genre:", genre, "Title: ", title);
    } catch (err) {
      console.log("could not save item", err);
    }
  };

  // !Removes quiz from localStorage
  const removeItem = async (genre, titleToRemove) => {
    try {
      const existingData = await localStorage.getItem("bookmarkedItems");
      const data = existingData ? JSON.parse(existingData) : {};

      if (data[genre]) {
        data[genre] = data[genre].filter((title) => title !== titleToRemove);
        await localStorage.setItem("bookmarkedItems", JSON.stringify(data));
        // console.log(
        //   "Title removed from genre:",
        //   genre,
        //   "Title: ",
        //   titleToRemove
        // );
      } else {
        console.log("Genre not found:", genre);
      }
    } catch (err) {
      console.log("Could not remove item:", err);
    }
  };

  // !Saves localStorage data into savedQuiz state
  const saveLocalStorageItem = async (itemName) => {
    try {
      const itemValue = await localStorage.getItem(itemName);
      if (itemValue !== null) {
        setSavedQuiz((prev) => (prev = JSON.parse(itemValue)));
        // console.log(`setSavedQuiz "${itemName}":`, JSON.parse(itemValue));
      } else {
        console.log(`"${itemName}" does not exist in localStorage.`);
      }
    } catch (error) {
      console.log(`Error viewing "${itemName}":`, error);
    }
  };

  // !Handles actions for adding and removing quizzes from localstorage
  const handleSave = async () => {
    if (isSaved) {
      removeItem(genre, title);
      // console.log("removed", title, genre);
    } else {
      saveItem(genre, title);
      // console.log("added", title, genre);
    }
    saveLocalStorageItem("bookmarkedItems");
  };

  const handleQuizIsSaved = () => {
    if (savedQuiz && savedQuiz[genre] && savedQuiz[genre].includes(title)) {
      setIsSaved((prevIsSaved) => (prevIsSaved = true));
    } else {
      setIsSaved((prevIsSaved) => (prevIsSaved = false));
    }
  };

  // !Deletes localStorage
  const clearLocalStorageItem = async (itemName) => {
    try {
      await localStorage.removeItem(itemName);
      console.log(`Removed item ${itemName}`);
    } catch (err) {
      console.log(err);
    }
  };
  // clearLocalStorageItem("bookmarkedItems");

  useEffect(() => {
    saveLocalStorageItem("bookmarkedItems");
    handleQuizIsSaved();
  }, [savedQuiz]);
  // *console.log("savedQuiz:", savedQuiz);

  // !!!WORK ON RENDERING INSTANTLY!!!

  return (
    <div
      className="listitem-container"
      // style={[styles.container, theme ? null : { backgroundColor: "gray" }]}
    >
      <p
      // style={[styles.title, theme ? null : darkTheme.text]}
      >
        {title}
      </p>
      <div onClick={handleSave} className="title-bookmark-container">
        {savedQuiz && savedQuiz[genre] && savedQuiz[genre].includes(title) ? (
          // <Ionicons
          //   name="md-bookmark"
          //   size={26}
          //   color={theme ? "black" : "white"}
          // />
          <p>Bookmarked</p>
        ) : (
          // <Ionicons
          //   name="md-bookmark-outline"
          //   size={26}
          //   color={theme ? "black" : "white"}
          // />
          <p>Not Bookmarked</p>
        )}
      </div>
    </div>
  );
};

export default ListItem;
