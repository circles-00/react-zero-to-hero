import Loader from '../common/loader'
import { useSelector } from 'react-redux'
import { isTrueState } from '../../constants/state.enum'

const LoadingWrapper = ({ children }) => {
  const {
    feedback: { isComponentLoading },
  } = useSelector((state) => state)

  return isTrueState(isComponentLoading) ? (
    <Loader show={true} />
  ) : (
    <>{children}</>
  )
}

export default LoadingWrapper
