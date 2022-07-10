import GoogleLogo from '../../../assets/img/google-logo-small.png'
import FacebookLogo from '../../../assets/img/facebook-logo-small.png'
import GithubLogo from '../../../assets/img/github-logo-small.png'
import { useGoogleLogin } from '@react-oauth/google'
import { loginWithGoogle } from '../../../store/auth/actions'
import { useDispatch } from 'react-redux'

/**
 * @ component
 * Handles third-party login
 * @returns {JSX.Element}
 */

const ThirdPartyLogin = () => {

  const dispatch = useDispatch()

  const onGoogleLogin = useGoogleLogin({
    onSuccess: ({ code }) => dispatch(loginWithGoogle(code)),
    onError: response => console.error(response),
    flow: 'auth-code',
  })

  return (
    <div className='d-flex flex-row justify-content-around mt-4'>
      <img className='custom-href' onClick={() => onGoogleLogin()} src={GoogleLogo} alt='google-logo' />
      <img className='custom-href' src={FacebookLogo} style={{ mixBlendMode: 'color-dodge' }} alt='facebook-logo' />
      <img className='custom-href' src={GithubLogo} alt='github-logo' />
    </div>
  )
}

export default ThirdPartyLogin
