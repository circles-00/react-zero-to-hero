import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Pre from './pre'
import ReactMarkdown from 'react-markdown'
import { a11yDark } from 'react-syntax-highlighter/src/styles/prism'

const Markdown = ({ markdownText }) => {
  return (
    <ReactMarkdown
      className="post-markdown"
      linkTarget="_blank"
      children={markdownText}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        pre: Pre,
        code({ inline, className = 'blog-code', children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={a11yDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    />
  )
}

export default Markdown
