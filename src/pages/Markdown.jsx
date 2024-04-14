import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getUserAnswers, getMarkdown, submitAnswer } from 'wasp/client/operations';

const MarkdownPage = () => {
  const { markdownId } = useParams();

  const { data: markdownData, isLoading: isLoadingMarkdown, error: markdownError } = useQuery(getMarkdown, { markdownId });
  const { data: userAnswers, isLoading: isLoadingAnswers, error: answersError } = useQuery(getUserAnswers);

  const answerQuestion = useAction(submitAnswer);

  const handleAnswerQuestion = (questionId, userAnswer) => {
    answerQuestion({ questionId, userAnswer });
  };

  if (isLoadingMarkdown || isLoadingAnswers) return 'Loading...';
  if (markdownError || answersError) return 'Error: ' + (markdownError || answersError);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>{markdownData.content}</h1>
      {markdownData.questions.map((question) => (
        <div key={question.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{question.content}</div>
          <button
            onClick={() => handleAnswerQuestion(question.id, question.answer)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Answer
          </button>
        </div>
      ))}
    </div>
  );
}

export default MarkdownPage;