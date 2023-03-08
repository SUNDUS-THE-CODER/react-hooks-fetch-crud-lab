import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const removeQuestionFromList = (id) => {
    const arr = questions;
    arr.splice(arr.findIndex(key => key.id === id), 1);
    setQuestions(arr);
  };
  const addQuestionToList = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };
  const updateQuestionInList = (updatedQ) => {
    const arr = questions;
    arr.splice(arr.findIndex(key => key.id === updatedQ.id), 1, updatedQ);
    setQuestions(arr);
  } 
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let fetchedQuestions = await fetch('http://localhost:4000/questions', {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        });
        fetchedQuestions = await fetchedQuestions.json();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchQuestions();
    return () => null;
  }, []);
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" 
        ? <QuestionForm questions={questions} addQuestionToList={addQuestionToList} /> 
        : <QuestionList 
            questions={questions} 
            addQuestionToList={addQuestionToList}
            removeQuestionFromList={removeQuestionFromList}
            updateQuestionInList={updateQuestionInList}
          />}
    </main>
  );
}

export default App;
