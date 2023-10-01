import React, { useState, useEffect, useContext } from "react";
import MyContext from "../../context/MyContext";

const ListItem = ({ title, genre }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { theme } = useContext(MyContext);

  // Function to toggle the bookmark status
  const toggleBookmark = () => {
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
  };

  // Function to initialize the bookmarked status
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
    <div className="listitem-container">
      <p>{title}</p>
      <div onClick={toggleBookmark} className="title-bookmark-container">
        {isBookmarked ? <p>Bookmarked</p> : <p>Not Bookmarked</p>}
      </div>
    </div>
  );
};

export default ListItem;
