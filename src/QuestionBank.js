import React, { useState } from 'react';
import questionsData from './questions.json';
import './QuestionBank.css'; // Import CSS for styling

const QuestionBank = () => {
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleOptionChange = (question, option) => {
        setSelectedOptions({ ...selectedOptions, [question]: option });
    };

    return (
        <div className="question-bank">
            <h1>Chemical Kinetics - Question Bank</h1>
            {questionsData['Chemical Kinetics']['Single Correct Answer Type'].map(
                (questionData, index) => (
                    <div className="question" key={index}>
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
        </div>
    );
};

export default QuestionBank;
