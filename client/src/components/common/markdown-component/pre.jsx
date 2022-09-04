import CodeCopyBtn from './cody-copy-btn'

const Pre = ({ children }) => (
  <pre className="blog-pre">
    <CodeCopyBtn>{children}</CodeCopyBtn>
    {children}
  </pre>
)

export default Pre
