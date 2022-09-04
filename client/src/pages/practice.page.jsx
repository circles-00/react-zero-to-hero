import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfoCard from '../components/common/info-card'
import Title from '../components/pages/practice/title'
import { isInitialState } from '../constants/state.enum'
import { fetchAllChallenges } from '../store/practice/actions'

const PracticePage = () => {
  const dispatch = useDispatch()

  const {
    practice: { challenges },
  } = useSelector((state) => state)

  useEffect(() => {
    isInitialState(challenges) && dispatch(fetchAllChallenges())
  }, [dispatch, challenges])

  return (
    <section className="container-lg d-flex justify-content-center flex-column text-center">
      <Title />
      {!isInitialState(challenges) &&
        challenges.map((challenge, idx) => (
          <Fragment key={idx}>
            <InfoCard
              idx={idx}
              title={challenge.title}
              shortDescription={challenge.shortDescription}
              difficulty={challenge.difficulty}
              isDone={challenge.isDone}
              showSeparator={false}
              useSeparatorLogic={false}
              initBtnText={'Solve Challenge'}
              doneBtnText={'Solved'}
              btnFontSize={'14px'}
              isPractice={true}
            />
          </Fragment>
        ))}
    </section>
  )
}

export default PracticePage
