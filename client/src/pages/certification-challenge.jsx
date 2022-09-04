import CorrectTick from '../assets/img/check-mark.png'
import IncorrectTick from '../assets/img/close.png'

import { useDispatch, useSelector } from 'react-redux'
import StateWrapper from '../components/wrappers/state.wrapper'
import LoadingWrapper from '../components/wrappers/loading.wrapper'
import Title from '../components/pages/challenge/title'
import Description from '../components/pages/challenge/description'
import Answer from '../components/common/answer'
import { commonStateEnum, isInitialState } from '../constants/state.enum'
import SubmitButton from '../components/common/submit.button'
import { useState } from 'react'
import {
  checkIsAnswerCorrect,
  getCertificationData,
  setIsCertificateAnswerCorrect,
} from '../store/certification/actions'
import { useHistory } from 'react-router'
import { certificationPage } from '../config/routes'

const CertificationChallenge = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    certification: { certificationData, isAnswerCorrect },
  } = useSelector((state) => state)

  const [selectedAnswer, setSelectedAnswer] = useState(0)

  const onRadioChange = (id) => {
    setSelectedAnswer(id)
  }

  const getCurrentQuestionId = () =>
    certificationData?.progress?.rightAnswers +
    certificationData?.progress?.wrongAnswers

  const getCurrentQuestion = () =>
    certificationData?.questions[getCurrentQuestionId()?.toString()]

  const isChallengeOver = () =>
    getCurrentQuestionId() + 1 >= certificationData?.progress?.totalAnswers

  const goToNextQuestion = () => {
    dispatch(getCertificationData())
    if (isChallengeOver()) {
      history.push(certificationPage.path)
      return
    }
    dispatch(setIsCertificateAnswerCorrect(commonStateEnum.INITIAL_STATE))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    isInitialState(isAnswerCorrect)
      ? dispatch(checkIsAnswerCorrect(getCurrentQuestionId(), selectedAnswer))
      : goToNextQuestion()
  }

  return (
    <StateWrapper state={getCurrentQuestion()}>
      <LoadingWrapper>
        <form
          className="container-lg d-flex justify-content-center flex-column text-center"
          onSubmit={handleOnSubmit}
        >
          <Title />
          <Description description={getCurrentQuestion()?.question} />
          {getCurrentQuestion()?.answers.map((answer, idx) => (
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
                Answer
                {isAnswerCorrect ? 'Correct' : 'Incorrect.'}
              </span>
            </div>
          ) : null}

          <SubmitButton
            buttonTitle={
              isInitialState(isAnswerCorrect)
                ? 'Check Answer'
                : isChallengeOver()
                ? 'Finish Certification'
                : 'Next Question'
            }
            className={'align-self-center submit-button'}
            style={{ marginTop: '35px' }}
          />
        </form>
      </LoadingWrapper>
    </StateWrapper>
  )
}

export default CertificationChallenge
