import React from "react";
import QuestionItem from './QuestionItem';

function QuestionList({ questions, removeQuestionFromList, updateQuestionInList }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((key) => (
        <QuestionItem key={key.id} question={key} removeQuestionFromList={removeQuestionFromList} updateQuestionInList={updateQuestionInList} />
      ))}</ul>
    </section>
  );
}

export default QuestionList;
