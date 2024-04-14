import React, { useState } from 'react';
import { useQuery, useAction, getMarkdown, getUserAnswers } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { data: markdowns, isLoading, error } = useQuery(getMarkdown);
  const submitAnswerFn = useAction(submitAnswer);
  const [userAnswer, setUserAnswer] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAnswerSubmit = (markdownId) => {
    submitAnswerFn({ markdownId, answer: userAnswer });
    setUserAnswer('');
  };

  return (
    <div className='p-4'>
      {markdowns.map((markdown) => (
        <div key={markdown.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <a href={`/markdown/${markdown.id}`}>{markdown.content}</a>
          <input
            type='text'
            placeholder='Your answer'
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className='border rounded p-1'
          />
          <button
            onClick={() => handleAnswerSubmit(markdown.id)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2'
          >
            Submit Answer
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;