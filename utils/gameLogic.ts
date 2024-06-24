export const calculateScore = (
  isCorrect: boolean,
  conversationCount: number
): number => {
  let score = isCorrect ? 1000 : 0;
  score -= conversationCount * 20;
  return Math.max(score, 0);
};
