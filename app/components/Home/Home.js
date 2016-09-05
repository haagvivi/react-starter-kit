import React, { PropTypes } from 'react'

Home.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default function Home ({name, handleClick, error, isFetching}) {
  return (
    <div className='centeredContainer'>
      <h1>{'Hello World!'}</h1>
      <p>{`Hello ${name}`}</p>
      <button onClick={handleClick}>
        {isFetching === true
        ? 'Loading'
        : 'Change Name'}
      </button>
      <img src='img/image.png' width="500px" />
      {error ? <p>{error}</p> : null}
    </div>
  )
}
