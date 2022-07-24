import React from 'react'
import { useHistory } from 'react-router'
import { learnPage } from '../../../config/routes'
import { useDispatch } from 'react-redux'
import { markLessonAsDone } from '../../../store/lessons/actions'

const UpcomingLessons = ({ id, lessons, lesson }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLessonDoneHandler = () => {
    history.push(learnPage.path)
    dispatch(markLessonAsDone(lesson?.id))
  }

  return (
    <div className="d-flex flex-column upcoming-lessons-wrapper">
      <div className="text-start upcoming-lessons">
        <h1>Upcoming lessons:</h1>
        {lessons.slice(id).length > 0 ? (
          lessons.slice(id).map((lesson, idx) => {
            return (
              <h3 key={idx}>
                Lesson {+id + idx + 1}: {lesson?.title}
              </h3>
            )
          })
        ) : (
          <h3>No upcoming lessons</h3>
        )}
      </div>
      <button
        disabled={lesson?.isDone}
        onClick={onLessonDoneHandler}
        style={{
          color: '#7000B1',
          backgroundColor: lesson?.isDone ? 'gray' : '#00FFD5',
          cursor: lesson?.isDone ? 'not-allowed' : 'pointer',
        }}
      >
        {lesson?.isDone ? 'Lesson already done' : 'Mark lesson as done'}
        <i
          style={{ marginLeft: '5px' }}
          className="fa fa-check"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

export default UpcomingLessons
