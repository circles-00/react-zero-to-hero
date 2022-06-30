import GoogleLogo from '../../../assets/img/google-logo-small.png';
import FacebookLogo from '../../../assets/img/facebook-logo-small.png';
import GithubLogo from '../../../assets/img/github-logo-small.png';

/**
 * @ component
 * Handles third-party login
 * @returns {JSX.Element}
 */

const ThirdPartyLogin = () => {
  return (
    <div className='d-flex flex-row justify-content-around mt-4'>
      <img src={GoogleLogo} alt='google-logo' />
      <img src={FacebookLogo} style={{mixBlendMode: 'color-dodge'}} alt='facebook-logo' />
      <img src={GithubLogo} alt='github-logo' />
    </div>
  )
}

export default ThirdPartyLogin
