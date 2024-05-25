import React, { useState } from 'react';
import questionsData from './questions.json';
import './QuestionBank.css';

const QuestionBank = () => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [newSetName, setNewSetName] = useState("");

    const handleOptionChange = (questionIndex, option) => {
        setSelectedOptions({ ...selectedOptions, [questionIndex]: option });
    };

    const handleQuestionSelect = (index) => {
        setSelectedQuestions((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    const handleSaveNewSet = () => {
        if (newSetName.trim() === "") {
            alert("Please enter a name for the new set of questions.");
            return;
        }

        const newSet = selectedQuestions.map((index) =>
            questionsData['Chemical Kinetics']['Single Correct Answer Type'][index]
        );

        const newSetData = {
            'Single Correct Answer Type': newSet
        };

        fetch('http://localhost:3001/save-question-set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ setName: newSetName, questions: newSetData })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error saving question set:', error);
            });
    };

    return (
        <div className="question-bank">
            <h1>Chemical Kinetics - Question Bank</h1>
            <h2>Single Correct Answer Type</h2>
            {questionsData['Chemical Kinetics']['Single Correct Answer Type'].map(
                (questionData, index) => (
                    <div className="question" key={index}>
                        <input
                            type="checkbox"
                            checked={selectedQuestions.includes(index)}
                            onChange={() => handleQuestionSelect(index)}
                        />
                        <p>{questionData.question}</p>
                        <div className="options">
                            {Object.keys(questionData.options).map((option, idx) => (
                                <label key={idx}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={selectedOptions[`question-${index}`] === option}
                                        onChange={() =>
                                            handleOptionChange(`question-${index}`, option)
                                        }
                                    />
                                    {questionData.options[option]}
                                </label>
                            ))}
                        </div>
                    </div>
                )
            )}
            <div className="new-set">
                <input
                    type="text"
                    placeholder="Enter name for new set"
                    value={newSetName}
                    onChange={(e) => setNewSetName(e.target.value)}
                />
                <button onClick={handleSaveNewSet}>Save New Set</button>
            </div>
        </div>
    );
};

export default QuestionBank;
