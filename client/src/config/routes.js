import CertificationPage from '../pages/certification.page'
import CommunityPage from '../pages/community.page'
import HomePage from '../pages/home.page'
import LearnPage from '../pages/learn.page'
import LessonPage from '../pages/lesson.page'
import LoginPage from '../pages/login.page'
import PracticePage from '../pages/practice.page'
import RegisterPage from '../pages/register.page'
import ResetPasswordPage from '../pages/reset-password-page'
import ChallengePage from '../pages/challenge.page'
import CertificationChallenge from '../pages/certification-challenge'

export const homePage = {
  path: '/',
  exact: true,
  element: <HomePage />,
  component: HomePage,
  title: 'Home',
  ignoreNav: true,
}

export const loginPage = {
  path: '/login',
  exact: true,
  element: <LoginPage />,
  component: LoginPage,
  title: 'Log In',
  ignoreNav: false,
}

export const learnPage = {
  path: '/learn',
  exact: true,
  element: <LearnPage />,
  component: LearnPage,
  title: 'Learn',
  ignoreNav: false,
}

export const communityPage = {
  path: '/community',
  exact: true,
  element: <CommunityPage />,
  component: CommunityPage,
  title: 'Community',
  ignoreNav: false,
}

export const registerPage = {
  path: '/register',
  exact: true,
  element: <RegisterPage />,
  component: RegisterPage,
  title: 'Register',
  ignoreNav: false,
}

export const resetPasswordPage = {
  path: '/reset-password/',
  exact: true,
  element: <ResetPasswordPage />,
  component: ResetPasswordPage,
  title: 'Reset Password',
  ignoreNav: true,
}

export const resetPasswordRedirectPage = {
  path: '/reset-password/:token',
  exact: true,
  element: <ResetPasswordPage />,
  component: ResetPasswordPage,
  title: 'Reset Password',
  ignoreNav: true,
}

export const singleLessonPage = {
  path: '/lesson/:id',
  exact: true,
  element: <LessonPage />,
  component: LessonPage,
  title: 'Lesson Page',
  ignoreNav: true,
}

export const certificationPage = {
  path: '/certification',
  exact: true,
  element: <CertificationPage />,
  component: CertificationPage,
  title: 'Certification',
  ignoreNav: false,
}

export const practicePage = {
  path: '/practice',
  exact: true,
  element: <PracticePage />,
  component: PracticePage,
  title: 'Practice',
  ignoreNav: false,
}

export const challengePage = {
  path: '/challenge/:id',
  exact: true,
  element: <ChallengePage />,
  component: ChallengePage,
  title: 'Challenge',
  ignoreNav: true,
}

export const certificationChallengePage = {
  path: '/certification-challenge',
  exact: true,
  element: <CertificationChallenge />,
  component: CertificationChallenge,
  title: 'Certification Challenge',
  ignoreNav: true,
}

export const pagePaths = {
  publicRoutes: [
    homePage,
    loginPage,
    registerPage,
    resetPasswordPage,
    resetPasswordRedirectPage,
  ],
  privateRoutes: [
    learnPage,
    singleLessonPage,
    practicePage,
    certificationPage,
    communityPage,
    challengePage,
    certificationChallengePage,
  ],
}
