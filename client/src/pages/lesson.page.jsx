import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Loader from '../components/common/loader'
import LessonContent from '../components/pages/lesson/content'
import '../components/pages/lesson/style.css'
import Title from '../components/pages/lesson/title'
import UpcomingLessons from '../components/pages/lesson/upcoming-lessons'

const LessonPage = () => {
  const [lesson, setLesson] = useState({})
  const { id } = useParams()

  const {
    lessons: { lessons },
  } = useSelector((state) => state)

  useEffect(() => {
    if (id && lessons.length > 0) {
      setLesson(lessons[id - 1])
    }
  }, [lessons, id])

  return Object.values(lesson).length > 0 ? (
    <div className="container-lg d-flex justify-content-center flex-column text-center lesson-page-container">
      <Title idx={id} title={lesson?.title} difficulty={lesson?.difficulty} />
      <div className="d-flex container-lg justify-content-between">
        <LessonContent description={lesson?.description} />
        <UpcomingLessons id={id} lessons={lessons} lesson={lesson} />
      </div>
    </div>
  ) : (
    <Loader show={true} />
  )
}

export default LessonPage
