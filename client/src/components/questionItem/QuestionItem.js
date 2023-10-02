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
        <h1
        //  style={[styles.titleText, theme ? lightTheme.text : darkTheme.text]}
        >
          {question}
        </h1>
        <p
          // style={
          //   [
          //      theme ? lightTheme.text : darkTheme.text,
          //   ]
          // }
          className="questionitem-counter"
        >
          {idCount + 1} / {lengthOfQuiz}
        </p>
        <div>
          {options?.map((option, index) => (
            <div
              key={index}
              className="questionitem-choice-container"
              style={{
                backgroundColor: currentQuiz[questionNum].isReveal
                  ? index == correctAnswer
                    ? "limegreen"
                    : "tomato"
                  : null,
              }}
              onClick={() => handleCheck(index)}
            >
              <h2 key={index}>{option}</h2>
            </div>
          ))}
        </div>
        {currentQuiz[questionNum]?.isReveal ? (
          <p
            // style={[styles.answerText, theme ? null : darkTheme.text]}
            className="questionitem-wrongright"
          >
            {currentQuiz[questionNum]?.isCorrect ? "Correct!" : "Wrong!"}
          </p>
        ) : null}
        <div className="questionitem-fwdbck-container">
          <div
            onClick={handleGoBack}
            // style={
            //   [
            //     styles.buttonStyle,
            //     theme ? null : darkTheme.buttonContainer,
            //   ]
            // }
          >
            <h4
              // style={theme ? null : darkTheme.text}
              style={{ marginRight: "10px" }}
            >
              {idCount == 0 ? "Exit Quiz" : "Back"}
            </h4>
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
            <h4
            // style={theme ? null : darkTheme.text}
            >
              {idCount == lengthOfQuiz - 1 ? "Finish" : "Next"}
            </h4>
          </div>
        </div>
      </>
    );
  };

  // !Displays quiz total
  const renderQuizEnd = () => {
    return (
      <div className="questionitem-quizend-container">
        <h1
        // style={[styles.titleText, theme ? null : darkTheme.text]}
        >
          You Finished!
        </h1>
        <h2
        // style={[styles.titleText, theme ? null : darkTheme.text]}
        >{`Total: ${totalCorrect} / ${lengthOfQuiz}`}</h2>
        <div
          className="questionitem-percent-contaienr"
          style={{
            borderColor: totalCorrect > lengthOfQuiz / 2 ? "green" : "red",
          }}
        >
          <h1
          // style={[styles.percentageText, theme ? null : darkTheme.text]}
          >
            {`${((totalCorrect / lengthOfQuiz) * 100).toFixed(0)}%`}
          </h1>
        </div>
        <div className="questionitem-endquiz-btn-container">
          <h4
            onClick={() => handleGenreSelect(genre)}
            // style={[
            //   styles.buttonStyle,
            //   theme ? null : darkTheme.buttonContainer,
            // ]}
            style={{ marginRight: "10px" }}
          >
            Exit
          </h4>
          <h4
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
          </h4>
        </div>
      </div>
    );
  };

  return (
    <div
    // style={[
    //   styles.container,
    //   theme ? lightTheme.background : darkTheme.background,
    // ]}
    >
      <h3
      // style={[styles.quizName, theme ? null : darkTheme.buttonContainer]}
      >
        {quizName}
      </h3>
      {isEnd ? renderQuizEnd() : renderQuiz()}
    </div>
  );
};

export default QuestionItem;
