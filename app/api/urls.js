
const URLS = {
  auth: {
    signInUrl: '/anon/signup-signin',
    verifyCodeUrl: '/user/signin/verify',
    checkUserNameUrl: '/user/handle-check',
    updateUserNameUrl: '/user/profile/update',
    updateUserNotificationTokenUrl: userId => `/user/update-token/user/${userId}`,
    oAuthUrl: 'oauth/skv1/token', //https://dev-api.iempowernow.com/oauth/skv1/token

  },

  game: {
    gameDetailForGuestUserUrl: '/anon/game/next-game/details',
    gameDetailForLoggedUserUrl: '/game/next-game/details',
 
    // Game Questions
    winnersUrl: (gameId, userId) => `/game/${gameId}/user/${userId}/winners`,
    liveUserCountUrl: (gameId, userId) => `/game/${gameId}/user/${userId}/live-user-count`,
    getGameQuestionUrl: (gameId, userId) => `/game/${gameId}/user/${userId}/next-question`,
    getGameSponsorUrl: (gameId, userId) => `/game/${gameId}/user/${userId}/sponsor`,
    getGameQuestionDetailsExplanationUrl: (gameId, userId) => `/game/${gameId}/user/${userId}/next-question-details`,
    submitUserAnswerUrl: (gameId, userId, questionId) => `/user-response/submit-answer/game/${gameId}/user/${userId}/q/${questionId}`,
  },
  // https://dev-api.iempowernow.com/skv1/game/5c113d10ad10440c1c755ed8/user/5c03b1d4f7ef705a372ecbbd/next-question-details

  leaderBoard: {
    leaderBoardThisWeekUrl: '/anon/game/this-week/leader-board',
    leaderBoardAllTimeUrl: 'anon/game/all-time/leader-board',
  },

  profile: {
    profileUrl: (userId) => `/user/${userId}/profile`,
    categoriesUrl: (userId) => `/trivia/user/${userId}/trivia-categories`,
    submitCategoriesUrl: (userId) => `/trivia/user/${userId}/submit-trivia-question`,
    liveUserCountUrl: (gameId, userId) => `/game/${gameId}/user/${userId}/live-user-count`,
  }

};

export default URLS;
