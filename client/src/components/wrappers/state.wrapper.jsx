import Loader from '../common/loader'

const StateWrapper = ({ state, children }) => {
  return Object.values(state).length > 0 ? (
    <>{children}</>
  ) : (
    <Loader show={true} />
  )
}

export default StateWrapper
