import React, { Fragment } from 'react'
import Backdrop from './backdrop'
import './loader.css'

function Loader({ show }) {
  return (
    <Fragment>
      <Backdrop show={show} />
      <div
        className="loader-container"
        style={{
          display: show ? 'fixed' : 'hidden',
          opacity: show ? '1' : '0',
        }}
      >
        <span className="react-logo">
          <span className="nucleo"></span>
        </span>
      </div>
    </Fragment>
  )
}

export default Loader
