import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { isTrueState } from '../constants/state.enum'
import { learnPage } from '../config/routes'
import { useHistory } from 'react-router'

const useAuthRedirect = () => {
  const history = useHistory()

  const {
    auth: { isAuthenticated },
  } = useSelector((state) => state)

  useEffect(() => {
    if (isTrueState(isAuthenticated)) {
      history.push(learnPage.path)
    }
  }, [isAuthenticated, history])

  return { isAuthenticated }
}

export default useAuthRedirect
