import React, { useContext, useEffect, useState } from "react";
// import { darkTheme, lightTheme } from "../styles/globalStyles";
import "./questionItem.css";
import MyContext from "../../context/MyContext";

const QuestionItem = ({
  question,
  options,
  correctAnswer,
  handleGoBack,
  handleNext,
  questionNum,
  lengthOfQuiz,
  quizName,
  isEnd,
  idCount,
  handleGenreSelect,
  genre,
  handleRetakeQuiz,
}) => {
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(() => {
    const initialState = {
      selectedOption: null,
      isCorrect: null,
      isReveal: false,
    };

    return Array.from({ length: lengthOfQuiz }, () => ({ ...initialState }));
  });
  // *console.log(currentQuiz);

  const { theme } = useContext(MyContext);

  // !Keeps track of quiz progress.
  const handleCheck = (index) => {
    if (index != null) {
      setCurrentQuiz((prevState) => {
        return {
          ...prevState,
          [questionNum]: {
            selectedOption: index,
            isCorrect: index == correctAnswer,
            isReveal: true,
          },
        };
      });
      setTotalCorrect((prev) => (index == correctAnswer ? prev + 1 : prev));
    }
  };

  const renderQuiz = () => {
    return (
      <>
        <p
        //  style={[styles.titleText, theme ? lightTheme.text : darkTheme.text]}
        >
          {question}
        </p>
        <p
          style={
            [
              //  theme ? lightTheme.text : darkTheme.text,
            ]
          }
        >
          {idCount + 1} / {lengthOfQuiz}
        </p>
        <div>
          {options?.map((option, index) => (
            <div
              key={index}
              style={
                [
                  //  styles.questionItem,
                  //  currentQuiz[questionNum].isReveal
                  //    ? index == correctAnswer
                  //      ? styles.correct
                  //      : styles.incorrect
                  //    : null,
                ]
              }
              onClick={() => handleCheck(index)}
            >
              <p key={index}>{option}</p>
            </div>
          ))}
        </div>
        {currentQuiz[questionNum]?.isReveal ? (
          <p
          // style={[styles.answerText, theme ? null : darkTheme.text]}
          >
            {currentQuiz[questionNum]?.isCorrect ? "Correct!" : "Wrong!"}
          </p>
        ) : null}
        <div>
          <div
            onClick={handleGoBack}
            // onClick={handleGenreSelect(genre)}
            style={
              [
                // styles.buttonStyle,
                // theme ? null : darkTheme.buttonContainer,
              ]
            }
          >
            <p
            // style={theme ? null : darkTheme.text}
            >
              {idCount == 0 ? "Exit Quiz" : "Back"}
            </p>
          </div>
          <div
            onClick={handleNext}
            style={
              [
                // styles.buttonStyle,
                // theme ? null : darkTheme.buttonContainer,
              ]
            }
          >
            <p
            // style={theme ? null : darkTheme.text}
            >
              {idCount == lengthOfQuiz - 1 ? "Finish" : "Next"}
            </p>
          </div>
        </div>
      </>
    );
  };

  // !Displays quiz total
  const renderQuizEnd = () => {
    return (
      <div>
        <p
        // style={[styles.titleText, theme ? null : darkTheme.text]}
        >
          You Finished!
        </p>
        <p
        // style={[styles.titleText, theme ? null : darkTheme.text]}
        >{`Total: ${totalCorrect} / ${lengthOfQuiz}`}</p>
        <div
        // style={[
        //   styles.percentageContainer,
        //   totalCorrect > lengthOfQuiz / 2
        //     ? { borderColor: "green" }
        //     : { borderColor: "red" },
        // ]}
        >
          <p
          // style={[styles.percentageText, theme ? null : darkTheme.text]}
          >
            {`${((totalCorrect / lengthOfQuiz) * 100).toFixed(0)}%`}
          </p>
        </div>
        <div>
          <p
            onClick={() => handleGenreSelect(genre)}
            // style={[
            //   styles.buttonStyle,
            //   theme ? null : darkTheme.buttonContainer,
            // ]}
          >
            Exit
          </p>
          <p
            onClick={() => {
              const initialState = {
                selectedOption: null,
                isCorrect: null,
                isReveal: false,
              };
              handleRetakeQuiz();
              setCurrentQuiz(
                Array.from({ length: lengthOfQuiz }, () => ({
                  ...initialState,
                }))
              );
              setTotalCorrect(0);
            }}
            // style={[
            //   styles.buttonStyle,
            //   theme ? null : darkTheme.buttonContainer,
            // ]}
          >
            Retake
          </p>
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   console.log(handleGoBack);
  // }, []);

  return (
    <div
    // style={[
    //   styles.container,
    //   theme ? lightTheme.background : darkTheme.background,
    // ]}
    >
      <p
      // style={[styles.quizName, theme ? null : darkTheme.buttonContainer]}
      >
        {/* <FontAwesome5
          name="question-circle"
          size={25}
          color={theme ? "black" : "white"}
        /> */}
        Circle here
        {quizName}
      </p>
      {isEnd ? renderQuizEnd() : renderQuiz()}
    </div>
  );
};

export default QuestionItem;
