import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import InfoCard from '../components/common/info-card'
import Title from '../components/pages/learn/title'
import { singleLessonPage } from '../config/routes'
import { isInitialState } from '../constants/state.enum'
import { fetchLessons } from '../store/lessons/actions'

const LearnPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    lessons: { lessons },
  } = useSelector((state) => state)

  useEffect(() => {
    isInitialState(lessons) && dispatch(fetchLessons())
  }, [lessons, dispatch])

  const showSeparator = (idx, lesson) =>
    (idx - 1 >= 0 && !lesson.isDone && lessons[idx - 1].isDone) ||
    (idx === 0 && !lesson.isDone)

  const onButtonClickCb = (idx) =>
    history.push(singleLessonPage.path.replace(':id', idx + 1))

  return (
    <section className="container-lg d-flex justify-content-center flex-column text-center">
      <Title />
      {!isInitialState(lessons) &&
        lessons.map((lesson, idx) => (
          <Fragment key={idx}>
            <InfoCard
              idx={idx}
              title={lesson.title}
              shortDescription={lesson.shortDescription}
              difficulty={lesson.difficulty}
              isDone={lesson.isDone}
              showSeparator={showSeparator(idx, lesson)}
              useSeparatorLogic={true}
              onButtonClick={onButtonClickCb}
            />
            {showSeparator(idx, lesson) && idx !== lessons.length - 1 ? (
              <div
                className="d-flex flex-row justify-content-between"
                style={{
                  width: '87.5%',
                  marginLeft: '45px',
                  marginTop: '4rem',
                }}
              >
                <hr className="separator" />
                <span style={{ fontSize: '24px' }}>
                  In order to unlock the next lessons, you must first finish the
                  previous one!
                </span>
                <hr className="separator" />
              </div>
            ) : null}
          </Fragment>
        ))}
    </section>
  )
}

export default LearnPage
