import GoogleLogo from '../../../assets/img/google-logo-small.png'
import FacebookLogo from '../../../assets/img/facebook-logo-small.png'
import GithubLogo from '../../../assets/img/github-logo-small.png'
import { useGoogleLogin } from '@react-oauth/google'
import { thirdPartyLogin } from '../../../store/auth/actions'
import { useDispatch } from 'react-redux'
import LoginGithub from 'react-login-github'
import { ThirdPartyLoginEnum } from '../../../constants/third.party.login.enum'

const { REACT_APP_GITHUB_CLIENT_ID: githubClientId } = process.env

/**
 * @ component
 * Handles third-party login
 * @returns {JSX.Element}
 */

const ThirdPartyLogin = () => {
  const dispatch = useDispatch()

  const onGoogleLogin = useGoogleLogin({
    onSuccess: ({ code }) =>
      dispatch(thirdPartyLogin(code, ThirdPartyLoginEnum.GOOGLE)),
    onError: (response) => console.error(response),
    flow: 'auth-code',
  })

  const onGithubLogin = ({ code }) => {
    dispatch(thirdPartyLogin(code, ThirdPartyLoginEnum.GITHUB))
  }

  const onFacebookLogin = () => {
    window.FB.login(
      ({ authResponse: { accessToken }, status }) => {
        if (status === 'connected') {
          dispatch(thirdPartyLogin(accessToken, ThirdPartyLoginEnum.FACEBOOK))
        }
      },
      { scope: 'public_profile,email' },
    )
  }

  return (
    <div className="d-flex flex-row justify-content-around mt-4">
      <img
        className="custom-href"
        onClick={() => onGoogleLogin()}
        src={GoogleLogo}
        alt="google-logo"
      />
      <img
        onClick={() => onFacebookLogin()}
        className="custom-href"
        src={FacebookLogo}
        style={{ mixBlendMode: 'color-dodge' }}
        alt="facebook-logo"
      />

      <LoginGithub
        scope="user,user:email"
        className="github-button"
        buttonText=""
        children={
          <img className="custom-href" src={GithubLogo} alt="github-logo" />
        }
        clientId={githubClientId}
        onSuccess={(response) => onGithubLogin(response)}
      />
    </div>
  )
}

export default ThirdPartyLogin
