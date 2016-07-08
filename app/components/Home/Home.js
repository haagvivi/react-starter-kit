import React, { PropTypes } from 'react'
import { homeText, container } from './styles.css'

Home.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default function Home ({name, handleClick, error, isFetching}) {
  return (
    <div className={container}>
      <h1 className={homeText}>{'Hello World!'}</h1>
      <p>{`Hello ${name}`}</p>
      <button onClick={handleClick}>
        {isFetching === true
        ? 'Loading'
        : 'Change Name'}
      </button>
      {error ? <p>{error}</p> : null}
    </div>
  )
}
