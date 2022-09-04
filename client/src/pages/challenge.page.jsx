import Title from '../components/pages/challenge/title'
import Description from '../components/pages/challenge/description'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import StateWrapper from '../components/wrappers/state.wrapper'
import Answer from '../components/common/answer'
import { useEffect, useState } from 'react'
import SubmitButton from '../components/common/submit.button'
import {
  checkAnswer,
  fetchAllChallenges,
  setIsAnswerCorrect,
} from '../store/practice/actions'
import LoadingWrapper from '../components/wrappers/loading.wrapper'
import { commonStateEnum, isInitialState } from '../constants/state.enum'
import { practicePage } from '../config/routes'
import CorrectTick from '../assets/img/check-mark.png'
import IncorrectTick from '../assets/img/close.png'

const ChallengePage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    practice: { challenges, isAnswerCorrect },
  } = useSelector((state) => state)

  const [selectedAnswer, setSelectedAnswer] = useState(0)

  const onRadioChange = (id) => {
    setSelectedAnswer(id)
  }

  useEffect(() => {
    return () => {
      dispatch(setIsAnswerCorrect(commonStateEnum.INITIAL_STATE))
    }
  }, [dispatch])

  const onHandleSuccessfulAnswer = () => {
    history.push(practicePage.path)
    dispatch(fetchAllChallenges())
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    isInitialState(isAnswerCorrect)
      ? dispatch(checkAnswer(challenges[+id - 1]?.id, selectedAnswer))
      : onHandleSuccessfulAnswer()
  }

  return (
    <StateWrapper state={challenges[(+id - 1)?.toString()]}>
      <LoadingWrapper>
        <form
          onSubmit={onHandleSubmit}
          className="container-lg d-flex justify-content-center flex-column text-center"
        >
          <Title />
          <Description
            description={challenges[(+id - 1)?.toString()]?.description}
          />
          {challenges[+id - 1]?.answers.map((answer, idx) => (
            <Answer
              key={idx}
              id={idx}
              onRadioChange={onRadioChange}
              description={answer}
              isAnswerSelected={selectedAnswer === idx}
            />
          ))}

          {!isInitialState(isAnswerCorrect) ? (
            <div className="align-self-center" style={{ marginTop: '25px' }}>
              <img
                width="32px"
                height="32px"
                alt="check-answer"
                src={isAnswerCorrect ? CorrectTick : IncorrectTick}
              />
              <span style={{ marginLeft: '15px', lineHeight: '2.5' }}>
                Answer{' '}
                {isAnswerCorrect ? 'Correct' : 'Incorrect. Try again later.'}
              </span>
            </div>
          ) : null}

          <SubmitButton
            buttonTitle={
              isInitialState(isAnswerCorrect) ? 'Submit' : 'Go back to practice'
            }
            className={'align-self-center submit-button'}
            style={{ marginTop: '35px' }}
          />
        </form>
      </LoadingWrapper>
    </StateWrapper>
  )
}

export default ChallengePage
