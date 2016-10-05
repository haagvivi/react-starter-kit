import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

const Home = ({name, handleClick, error, isFetching}) => {
  return (
    <div className='centeredContainer'>
      <Helmet
        title='Hello World'
        meta={[
          {'name': 'description', 'content': 'Hello World Description.'},
        ]}
      />
      <h1>{'Hello World!'}</h1>
      <p>{`Hello ${name}`}</p>
      <button onClick={handleClick}>
        {isFetching === true
        ? 'Loading'
        : 'Change Name'}
      </button>
      <img src='img/image.png' width='500px' />
      {error ? <p>{error}</p> : null}
    </div>
  )
}

Home.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default Home
