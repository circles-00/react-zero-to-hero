import HomePage from '../pages/home.page';
import LoginPage from '../pages/login.page';
import LearnPage from '../pages/learn.page';

export const homePage = {
  path: '/',
  exact: true,
  element: <HomePage />,
  component: HomePage
};

export const loginPage = {
  path: '/login',
  exact: true,
  element: <LoginPage />,
  component: LoginPage
};

export const learnPage = {
  path: '/learn',
  exact: true,
  element: <LearnPage />,
  component: LearnPage
};

export const pagePaths = {
  publicRoutes: [
    homePage,
    loginPage
  ],
  privateRoutes: [
    learnPage
  ]
};
