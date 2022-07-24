import Difficulty from '../learn/difficulty'
import React from 'react'

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
