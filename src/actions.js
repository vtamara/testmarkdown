import { HttpError } from 'wasp/server'

export const submitAnswer = async ({ questionId, userAnswer }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const question = await context.entities.Question.findUnique({
    where: { id: questionId }
  });

  const isCorrect = question.answer === userAnswer;

  return context.entities.AnsweredQuestion.create({
    data: {
      answer: userAnswer,
      isCorrect,
      questionId,
      userId: context.user.id
    }
  });
}

export const createQuestion = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Question.create({
    data: {
      content: args.content,
      answer: args.answer,
      markdownId: args.markdownId,
      userId: context.user.id
    }
  });
}