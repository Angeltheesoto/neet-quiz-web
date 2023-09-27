import React, { useContext } from "react";
import "./genreItem.css";
// import { lightTheme, darkTheme } from "../styles/globalStyles";
import MyContext from "../../context/MyContext";

const GenreItem = ({ item, index, handleGenreSelect, genre }) => {
  const { theme } = useContext(MyContext);

  // console.log(`GenreItem: ${item} ${index} ${genre} ${handleGenreSelect}`);

  return (
    <>
      <div
        onClick={() => handleGenreSelect(item)}
        className="genreitem-container"
        // style={[
        //   styles.genreContainer,
        //   theme ? lightTheme.background : darkTheme.background,
        // ]}
      >
        <div
        // style={
        //   genre === item
        //     ? theme
        //       ? styles.genreItemActive
        //       : darkTheme.genreItemActive
        //     : theme
        //     ? styles.genreItem
        //     : darkTheme.genreItem
        // }
        >
          <p
          // style={
          //   genre === item
          //     ? styles.genreTextActive
          //     : theme
          //     ? styles.genreText
          //     : darkTheme.genreText
          // }
          >
            {item}
          </p>
        </div>
      </div>
    </>
  );
};

export default GenreItem;
