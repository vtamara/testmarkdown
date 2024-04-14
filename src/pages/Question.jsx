import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useAction, submitAnswer, getMarkdown } from 'wasp/client/operations';

const QuestionPage = () => {
  const { questionId } = useParams();
  const [userAnswer, setUserAnswer] = useState('');

  const { data: question, isLoading, error } = useQuery(getMarkdown, { markdownId: questionId });
  const submitAnswerFn = useAction(submitAnswer);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleSubmitAnswer = () => {
    submitAnswerFn({ questionId, userAnswer });
    setUserAnswer('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>{question.content}</h1>
      <input
        type='text'
        placeholder='Your answer'
        className='px-2 py-1 border rounded my-4'
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button
        onClick={handleSubmitAnswer}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Submit
      </button>
    </div>
  );
}

export default QuestionPage;