import { flashcardList } from "./data.js";
import { useState } from "react";
import "./App.css";

export default function Display() {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const flashcard = flashcardList[currentFlashcard];

  function resetCard() {
    setShowAnswer(false);
    setUserGuess("");
    setFeedback("");
  }

  function changeCard(newIndex) {
    setIsTransitioning(true); // start hiding
    resetCard();

    // Small delay to let state update before showing new card
    setTimeout(() => {
      setCurrentFlashcard(newIndex);
      setIsTransitioning(false); // show new card
    }, 100); // 100ms delay
  }

  function handleNextClick() {
    if (currentFlashcard < flashcardList.length - 1) {
      changeCard(currentFlashcard + 1);
    }
  }

  function handlePreviousClick() {
    if (currentFlashcard > 0) {
      changeCard(currentFlashcard - 1);
    }
  }

  function handleSubmit() {
    if (userGuess.trim().toLowerCase() === flashcard.answer.toLowerCase()) {
      setFeedback("correct");
      setShowAnswer(true);
    } else {
      setFeedback("incorrect");
    }
  }

  return (
    <div className="Flashcards">
      <h1><b>General Knowledge Flashcards</b></h1>
      <h4><b>Number of Flashcards: {flashcardList.length}</b></h4>

      <div className="FlashcardContainer">
        {!isTransitioning && (
          <div className={`FlashcardInner ${showAnswer ? "show-back" : ""}`}>
            <div className="FlashcardFront">
              {flashcard.question}
            </div>
            <div className={`FlashcardBack ${feedback}`}>
              {flashcard.answer}
            </div>
          </div>
        )}
      </div>

      <div className="InputSection">
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter your guess"
        />
        <button className="Submit" onClick={handleSubmit}>Submit</button>
        {feedback === "correct" && <p className="Feedback correct">Correct!</p>}
        {feedback === "incorrect" && <p className="Feedback incorrect">Incorrect. Try again!</p>}
      </div>

      <div className="FlashcardBtn">
        <button
          className="Previous"
          onClick={handlePreviousClick}
          disabled={currentFlashcard === 0}
        >
          <b>Previous</b>
        </button>
        <button
          className="Next"
          onClick={handleNextClick}
          disabled={currentFlashcard === flashcardList.length - 1}
        >
          <b>Next</b>
        </button>
      </div>
    </div>
  );
}
