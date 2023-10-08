import "./genreItem.css";
import { useTheme } from "../../context/ThemeContext";

const GenreItem = ({ item, index, handleGenreSelect, genre }) => {
  const { theme } = useTheme();
  // console.log(`GenreItem: ${item} ${index} ${genre} ${handleGenreSelect}`);

  return (
    <>
      <div
        onClick={() => handleGenreSelect(item)}
        className="genreitem-container"
        data-theme={theme ? null : "dark"}
        data-hover-theme={theme ? "light" : "dark"}
      >
        <div>
          <p>{item}</p>
        </div>
      </div>
    </>
  );
};

export default GenreItem;
