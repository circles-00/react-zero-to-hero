import HomePage from '../pages/home.page';
import LoginPage from '../pages/login.page';
import LearnPage from '../pages/learn.page';
import RegisterPage from '../pages/register.page'
import CommunityPage from '../pages/community.page'

export const homePage = {
  path: '/',
  exact: true,
  element: <HomePage />,
  component: HomePage,
  title: 'Home',
  ignoreNav: true
};

export const loginPage = {
  path: '/login',
  exact: true,
  element: <LoginPage />,
  component: LoginPage,
  title: 'Log In',
  ignoreNav: false
};

export const learnPage = {
  path: '/learn',
  exact: true,
  element: <LearnPage />,
  component: LearnPage,
  title: 'Learn',
  ignoreNav: false
};

export const communityPage = {
  path: '/community',
  exact: true,
  element: <CommunityPage />,
  component: CommunityPage,
  title: 'Community',
  ignoreNav: false
};

export const registerPage = {
  path: '/register',
  exact: true,
  element: <RegisterPage />,
  component: RegisterPage,
  title: 'Register',
  ignoreNav: false
};

export const pagePaths = {
  publicRoutes: [
    homePage,
    loginPage,
    registerPage
  ],
  privateRoutes: [
    learnPage,
    communityPage
  ]
};
