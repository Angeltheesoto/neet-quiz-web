import React, { useEffect, useState } from "react";
import "./listItem.css";
import { useTheme } from "../../context/ThemeContext";
import { Bookmark, BookmarkFill } from "react-bootstrap-icons";

const ListItem = ({ title, genre }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { theme } = useTheme();

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

  const iconSize = window.innerWidth < 900 ? 30 : 40;

  return (
    <>
      <div className="listitem-container">
        <p>{title}</p>
      </div>
      <div onClick={toggleBookmark} className="title-bookmark-container">
        {isBookmarked ? (
          <BookmarkFill color={!theme ? "white" : "black"} size={iconSize} />
        ) : (
          <Bookmark color={!theme ? "white" : "black"} size={iconSize} />
        )}
      </div>
    </>
  );
};

export default ListItem;
