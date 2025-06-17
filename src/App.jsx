import { flashcardList } from "./data.js";
import { useState } from "react"; 
import './App.css';

export default function Display() {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  let flashcard = flashcardList[currentFlashcard];

  if (!flashcard) {
    return <div>No flashcard found at this position.</div>;
  }

  function handlePreviousClick() {
    setCurrentFlashcard(prev => Math.max(prev - 1, 0));
    setShowAnswer(false);
  }

  function handleNextClick() {
    setCurrentFlashcard(prev => Math.min(prev + 1, flashcardList.length - 1));
    setShowAnswer(false);
  }

  function handleToggleClick() {
    setShowAnswer(prev => !prev);
  }

  return (
    <div className="Flashcards">
      <h1><b>General Knowledge Flashcards</b></h1>
      <h4><b>These general knowledge flashcards feature simple, beginner-friendly questions and answers to help reinforce basic facts across a variety of subjects.</b></h4>
      <h4><b>Number of Flashcards: {flashcardList.length}</b></h4>

      <button className="FlashCardQuestion" onClick={handleToggleClick}>
        {showAnswer ? flashcard.answer : flashcard.question}
      </button>

      <div className="FlashcardBtn">
        <button className="Previous" onClick={handlePreviousClick}><b>Previous</b></button>
        <button className="Next" onClick={handleNextClick}><b>Next</b></button>
      </div>
    </div>
  );
}
