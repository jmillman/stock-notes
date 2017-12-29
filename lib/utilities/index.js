export const formatHomeScore = (score) => {
  return score > 0 ? '+' + score : score;
};

export const getTicket = (betType, date, home, away, homeScore, side) => {
  return [betType, date, home, away, homeScore, side].join('_');
};
