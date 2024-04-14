import { HttpError } from 'wasp/server'

export const getUserAnswers = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.AnsweredQuestion.findMany({
    where: {
      userId: arg.userId
    },
    include: {
      question: true
    }
  });
}

export const getMarkdown = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) };
  const { markdownId } = arg;
  const markdown = await context.entities.Markdown.findUnique({
    where: { id: markdownId },
    include: { questions: { include: { AnsweredQuestion: true } } }
  });
  if (!markdown) { throw new HttpError(404, `No markdown with id ${markdownId}`) };
  return markdown;
}