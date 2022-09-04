export const apiPaths = {
  getUserInfoApi: {
    path: '/api/auth/profile',
    method: 'get',
  },
  loginApi: {
    path: '/api/auth/login',
    method: 'post',
  },
  thirdPartyLoginApi: {
    path: '/api/auth/third-party',
    method: 'post',
  },
  registerApi: {
    path: '/api/auth/register',
    method: 'post',
  },
  resetPasswordApi: {
    path: '/api/auth/reset-password',
    method: 'post',
  },
  resetPasswordConfirmApi: {
    path: '/api/auth/reset-password-confirm',
    method: 'post',
  },
  fetchLessonsApi: {
    path: '/api/lessons',
    method: 'get',
  },
  markLessonAsDone: {
    path: '/api/lessons',
    method: 'put',
  },
  challengesApi: {
    path: '/api/practice',
    method: 'get',
  },
  checkAnswerPracticeApi: {
    path: '/api/practice/checkAnswer',
    method: 'post',
  },
  getCertificationDataApi: {
    path: '/api/certification',
    method: 'get',
  },
  beginCertificationApi: {
    path: '/api/certification/beginCertification',
    method: 'post',
  },
  certCheckAnswerApi: {
    path: '/api/certification/checkAnswer',
    method: 'post',
  },
}
