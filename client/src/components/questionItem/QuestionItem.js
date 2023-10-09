import React, { useState } from "react";
import "./questionItem.css";
import { useTheme } from "../../context/ThemeContext";

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

  const { theme } = useTheme();

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
        <h1>{question}</h1>
        <p className="questionitem-counter" data-theme={theme ? null : "dark"}>
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
              data-theme={theme ? null : "dark"}
              data-hover-theme={theme ? null : "dark"}
            >
              <h2 key={index}>{option}</h2>
            </div>
          ))}
        </div>
        {currentQuiz[questionNum]?.isReveal ? (
          <p className="questionitem-wrongright">
            {currentQuiz[questionNum]?.isCorrect ? "Correct!" : "Wrong!"}
          </p>
        ) : null}
        <div className="questionitem-fwdbck-container">
          <div onClick={handleGoBack} style={{ marginRight: "10px" }}>
            <h4
              data-theme={theme ? null : "dark"}
              data-hover-theme={theme ? null : "dark"}
            >
              {idCount == 0 ? "Exit Quiz" : "Back"}
            </h4>
          </div>
          <div onClick={handleNext}>
            <h4
              data-theme={theme ? null : "dark"}
              data-hover-theme={theme ? null : "dark"}
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
        <h1>You Finished!</h1>
        <h2>{`Total: ${totalCorrect} / ${lengthOfQuiz}`}</h2>
        <div
          className="questionitem-percent-contaienr"
          style={{
            borderColor: totalCorrect > lengthOfQuiz / 2 ? "green" : "red",
          }}
        >
          <h1>{`${((totalCorrect / lengthOfQuiz) * 100).toFixed(0)}%`}</h1>
        </div>
        <div className="questionitem-endquiz-btn-container">
          <h4
            onClick={() => handleGenreSelect(genre)}
            style={{ marginRight: "10px" }}
            data-theme={theme ? null : "dark"}
            data-hover-theme={theme ? null : "dark"}
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
            data-theme={theme ? null : "dark"}
            data-hover-theme={theme ? null : "dark"}
          >
            Retake
          </h4>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h3 data-theme={theme ? null : "dark"}>{quizName}</h3>
      {isEnd ? renderQuizEnd() : renderQuiz()}
    </div>
  );
};

export default QuestionItem;
