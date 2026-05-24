const userRequests = {};

const LIMIT = 5;
const TIME_WINDOW = 24 * 60 * 60 * 1000; // 1 day

const checkRateLimit = (userId) => {
  const now = Date.now();

  if (!userRequests[userId]) {
    userRequests[userId] = {
      count: 1,
      startTime: now,
    };
    return true;
  }

  const userData = userRequests[userId];

  if (now - userData.startTime > TIME_WINDOW) {
    userRequests[userId] = {
      count: 1,
      startTime: now,
    };
    return true;
  }

  if (userData.count >= LIMIT) {
    return false;
  }

  userData.count++;
  return true;
};

module.exports = { checkRateLimit };