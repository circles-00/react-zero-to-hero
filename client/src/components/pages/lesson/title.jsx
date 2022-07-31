import Difficulty from '../../common/difficulty'

const LessonTitle = ({ idx, title, difficulty }) => (
  <div>
    <p style={{ fontSize: '54px' }}>
      Lesson {idx}: {title}
    </p>
    <Difficulty
      difficulty={difficulty}
      style={{ justifyContent: 'center', marginTop: '-35px' }}
    />
  </div>
)

export default LessonTitle
