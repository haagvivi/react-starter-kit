import { getName, getFirstName } from 'helpers/helpers'
import { Map } from 'immutable'

const FETCHING_NAME = 'FETCHING_NAME'
const FETCHING_NAME_FAILURE = 'FETCHING_NAME_FAILURE'
const FETCHING_NAME_SUCCESS = 'FETCHING_NAME_SUCCESS'

const fetchingName = () => ({
  type: FETCHING_NAME,
})

const fetchingNameFailure = () => ({
  type: FETCHING_NAME_FAILURE,
  error: 'Error fetching name.',
})

const fetchingNameSuccess = (name) => ({
  type: FETCHING_NAME_SUCCESS,
  name,
})

export const fetchAndHandleName = () => {
  return (dispatch) => {
    dispatch(fetchingName())
    return getName().then(
      user => dispatch(fetchingNameSuccess(user.name)),
      error => dispatch(fetchingNameFailure(error))
    )
  }
}

export const setName = () => {
  return (dispatch, getState) => {
    dispatch(fetchingName())
    return getFirstName().then(
      user => dispatch(fetchingNameSuccess(user.name)),
      error => dispatch(fetchingNameFailure(error))
    )
  }
}

const initialNameState = Map({
  name: 'Default',
  isFetching: false,
  error: '',
})

const name = (state = initialNameState, action) => {
  switch (action.type) {
    case FETCHING_NAME :
      return state.merge({
        isFetching: true
      })
    case FETCHING_NAME_FAILURE :
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case FETCHING_NAME_SUCCESS :
      return state.merge({
        isFetching: false,
        name: action.name
      })
    default :
      return state
  }
}

export default name
