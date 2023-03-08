import React from "react";

function QuestionItem({ question, removeQuestionFromList, updateQuestionInList }) {
  const { id, prompt, answers, correctIndex } = question;

  const deleteQuestion = async (e, id) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    });
    removeQuestionFromList(id);
  }

  const handleSelection = async (selectedIndex) => {
    let updatedQ = await fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: selectedIndex })
    });
    updatedQ = await updatedQ.json();
    updateQuestionInList(updatedQ);
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e) => handleSelection(e.currentTarget.selectedIndex)}>{options}</select>
      </label>
      <button onClick={(e) => deleteQuestion(e, id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
