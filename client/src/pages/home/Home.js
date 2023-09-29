import React, { useState, useEffect } from "react";
import "./home.css";
import data from "../../utils/data";
// import MyContext from "../../context/MyContext";
// !COME BACK!
// import { darkTheme, lightTheme } from "../styles/globalStyles";
import "../../css/lightTheme.css";
import "../../css/darkTheme.css";

// components
import ListItem from "../../components/listItem/ListItem";
import GenreItem from "../../components/genreItem/GenreItem";
import QuestionItem from "../../components/questionItem/QuestionItem";
import { useLocation } from "react-router-dom";

const Home = ({ fetchLsData, setFetchLsData }) => {
  const [genre, setGenre] = useState("javascript");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuizQuestions, setSelectedQuizQuestions] = useState(null);
  // const [testQuizQuestions, setTestQuizQuestions] = useState(null);

  const [idCount, setIdCount] = useState(0);
  const [quizLength, setQuizLength] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [savedQuiz, setSavedQuiz] = useState(null);

  // !COME BACK!
  const location = useLocation();
  const currentRouteName = location.pathname;
  // console.log(currentRouteName);

  // const { theme } = useContext(MyContext);

  // !Resets everything when you choose a new genre
  const handleGenreSelect = (gen) => {
    setGenre(gen);
    setSelectedQuiz(null);
    setSelectedQuizQuestions(null);
    setIdCount(0);
    setIsEnd(false);
  };

  // !Resets idCount and isEnd for retake
  const handleRetakeQuiz = (gen, quizName) => {
    setIdCount(0);
    setIsEnd(false);
    handleQuizQuestions();
  };

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };
  // *console.log("Selected quiz: ", selectedQuiz);

  // !Reorders the quizzes so they are not in order everytime
  const reorderQuestions = (questions) => {
    // Convert the object keys into an array of questions
    const questionsArray = Object.values(questions);
    // console.log("---Not shuffled", questionsArray);
    // shuffle the array using a function
    const shuffledQuestions = shuffleArray(questionsArray);
    // console.log("---Shuffled array: ", shuffledQuestions);
    return shuffledQuestions;
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleQuizQuestions = () => {
    if (selectedQuiz) {
      // ? This returns the array in order
      // setSelectedQuizQuestions(data.quizes[genre][selectedQuiz]?.questions);
      // ? This returns the array shuffled
      const quizQuestions = data.quizes[genre][selectedQuiz]?.questions;
      const reorderedQ = reorderQuestions(quizQuestions);
      setSelectedQuizQuestions(reorderedQ);
      // setTestQuizQuestions(reorderedQ);
    }
  };
  // *console.log("Selected questions: ", selectedQuizQuestions);

  // !Gets local storage data to display saved quizes.
  const fetchLocalStorageData = async () => {
    const data = await localStorage.getItem("bookmarkedItems");
    if (data) {
      setSavedQuiz(JSON.parse(data));
    } else {
      setSavedQuiz({});
    }
  };
  // *console.log(savedQuiz);
  // console.log(fetchLsData);

  // !Displays all title comp. if genre is chosen.
  const renderQuizList = () => {
    if (genre) {
      const quizTitles = data.quizes[genre];
      const quizKeys = Object.keys(quizTitles);
      // console.log(quizKeys?.map((item) => item));
      const savedQuizTitles = () => {
        if (savedQuiz && savedQuiz[genre]) {
          if (savedQuiz[genre].length === 0) {
            return undefined;
          } else {
            return savedQuiz[genre];
          }
        } else {
          return undefined;
        }
      };
      if (currentRouteName === "/") {
        return quizKeys?.map((item) => (
          <div
            onClick={() => handleQuizSelect(item)}
            className="home-quizlist-container"
          >
            <ListItem title={item} genre={genre} />
          </div>
        ));
      } else if (currentRouteName === "/saved") {
        if (savedQuizTitles() === undefined) {
          return (
            <p
            // !ADD STYLES
            // style={[
            //   styles.savedQuizText,
            //   theme ? null : darkTheme.background,
            // ]}
            >
              No saved quizzes
            </p>
          );
        } else {
          return savedQuizTitles().map((item) => (
            <div
              onClick={() => handleQuizSelect(item)}
              className="home-quizlist-container"
            >
              <ListItem title={item} genre={genre} />
            </div>
          ));
        }
      } else {
        return null;
      }
    }
    return null;
  };
  // *console.log(savedQuiz[genre].length == 0);

  // !Displays our chosen quiz and passes all props.
  const renderQuizQuestions = () => {
    const quizQuestions = data.quizes[genre][selectedQuiz].questions;
    const question = selectedQuizQuestions[idCount].question;
    const options = selectedQuizQuestions[idCount].options;
    const correctAnswer = selectedQuizQuestions[idCount].correctAnswer;
    const lengthOfQuiz = selectedQuizQuestions.length;
    if (selectedQuizQuestions && idCount >= 0 && idCount <= lengthOfQuiz) {
      if (quizQuestions) {
        return (
          <QuestionItem
            question={question}
            options={options}
            correctAnswer={correctAnswer}
            handleGoBack={handleGoBack}
            handleNext={handleNext}
            questionNum={idCount}
            lengthOfQuiz={lengthOfQuiz}
            quizName={selectedQuiz}
            isEnd={isEnd}
            idCount={idCount}
            handleGenreSelect={handleGenreSelect}
            genre={genre}
            handleRetakeQuiz={handleRetakeQuiz}
          />
        );
      }
    }
  };
  // *console.log(idCount, quizLength);

  // !Goes to previous question. For [renderQuizQuestions].
  const handleGoBack = () => {
    if (idCount === 0) {
      // handleGenreSelect();
      setSelectedQuizQuestions((prev) => (prev = null));
      // console.log("Home Page");
    } else {
      setIdCount((prev) => (prev > 0 ? (prev -= 1) : prev));
    }
  };

  // !Goes to next question. For [renderQuizQuestions].
  const handleNext = () => {
    if (idCount < quizLength - 1) {
      setIdCount((prev) => (prev += 1));
    } else {
      // console.log("You reached the end of the quiz.");
      setIsEnd(!isEnd);
    }
  };

  useEffect(() => {
    const updateQuizQuestions = async () => {
      handleQuizQuestions();

      // !Sets the quizLength onClick for here.
      const hasQuizQuestions = data.quizes[genre][selectedQuiz]?.questions;

      if (hasQuizQuestions) {
        setQuizLength(data.quizes[genre][selectedQuiz].questions.length);
      } else {
        setQuizLength(0);
      }
    };

    if (selectedQuiz) {
      updateQuizQuestions();
    }
  }, [selectedQuiz]);
  // });

  // !Fetch local storage data
  useEffect(() => {
    fetchLocalStorageData();
  }, [savedQuiz, fetchLsData]);
  // console.log(savedQuiz);

  // !TESTS________________>
  // useEffect(() => {
  //   console.log(`Genre changed: ${genre}`);
  // }, [genre]);

  // useEffect(() => {
  //   console.log(`Quiz changed: ${selectedQuiz}`);
  // }, [selectedQuiz]);

  // useEffect(() => {
  //   console.log(`Quiz Questions changed: ${selectedQuizQuestions}`);
  // }, [selectedQuizQuestions]);
  // !TESTS________________>

  return (
    <>
      <div className="home-genre-container">
        {Object.keys(data.quizes).map((genre, index) => (
          <GenreItem
            item={genre}
            index={index}
            handleGenreSelect={handleGenreSelect}
            genre={genre}
          />
        ))}
      </div>
      <div className="home-quizname-container">
        {selectedQuizQuestions ? renderQuizQuestions() : renderQuizList()}
      </div>
    </>
  );
};

export default Home;
