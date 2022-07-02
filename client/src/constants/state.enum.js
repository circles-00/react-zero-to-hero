const commonStateEnum = {
  INITIAL_STATE: 0,
  TRUE: 1,
  FALSE: 2,
  SUCCESS: 3,
  FAILURE: 4,
}

const isInitialState = (variableToCheck) => (
  variableToCheck === commonStateEnum.INITIAL_STATE
)

const isTrueState = (variableToCheck) => (
  variableToCheck === commonStateEnum.TRUE && variableToCheck !== commonStateEnum.INITIAL_STATE
)

const isFalseState = (variableToCheck) => (
  variableToCheck === commonStateEnum.FALSE && variableToCheck !== commonStateEnum.INITIAL_STATE
)


export { commonStateEnum, isInitialState, isTrueState, isFalseState }
