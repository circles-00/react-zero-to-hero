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
}
