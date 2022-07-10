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
  fetchLessonsApi: {
    path: '/api/lessons',
    method: 'get',
  },
}
