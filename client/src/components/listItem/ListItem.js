import React, { useEffect, useState, useContext } from "react";
import "./listItem.css";
// import { darkTheme } from "../styles/globalStyles";
import MyContext from "../../context/MyContext";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

const ListItem = ({ title, genre }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { theme } = useContext(MyContext);

  // !Function to toggle the bookmark status
  const toggleBookmark = (event) => {
    const existingData =
      JSON.parse(localStorage.getItem("bookmarkedItems")) || {};
    const genreItems = existingData[genre] || [];

    if (isBookmarked) {
      // Remove the item from bookmarks
      existingData[genre] = genreItems.filter((item) => item !== title);
    } else {
      // Add the item to bookmarks
      existingData[genre] = [...genreItems, title];
    }

    localStorage.setItem("bookmarkedItems", JSON.stringify(existingData));
    setIsBookmarked(!isBookmarked); // Update the bookmarked state
    event.stopPropagation(); // This prevents the toggleBookmark from triggering the parent onClick.
  };

  // !Function to initialize the bookmarked status
  const initializeBookmarkStatus = () => {
    const existingData =
      JSON.parse(localStorage.getItem("bookmarkedItems")) || {};
    const genreItems = existingData[genre] || [];
    setIsBookmarked(genreItems.includes(title));
  };

  useEffect(() => {
    initializeBookmarkStatus(); // Initialize bookmarked status on component mount
  }, [genre, title]);

  return (
    <>
      <div className="listitem-container">
        <p>{title}</p>
      </div>
      <div onClick={toggleBookmark} className="title-bookmark-container">
        {isBookmarked ? (
          <BookmarkFill color="black" size={40} />
        ) : (
          <Bookmark color="black" size={40} />
        )}
      </div>
    </>
  );
};

export default ListItem;
