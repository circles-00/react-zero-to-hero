import HomePage from '../pages/home.page';
import LoginPage from '../pages/login.page';
import LearnPage from '../pages/learn.page';
import RegisterPage from '../pages/register.page'

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

export const registerPage = {
  path: '/register',
  exact: true,
  element: <RegisterPage />,
  component: RegisterPage
};

export const pagePaths = {
  publicRoutes: [
    homePage,
    loginPage,
    registerPage
  ],
  privateRoutes: [
    learnPage
  ]
};
