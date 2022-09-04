import Markdown from '../../common/markdown-component/markdown'
import React from 'react'

const LessonContent = ({ description }) => {
  return (
    <div className="lesson-page-content text-start">
      <Markdown markdownText={description} />
    </div>
  )
}

export default LessonContent
