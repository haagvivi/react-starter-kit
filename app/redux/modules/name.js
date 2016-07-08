import { getName, getFirstName } from 'helpers/helpers'
import { Map } from 'immutable'

const FETCHING_NAME = 'FETCHING_NAME'
const FETCHING_NAME_FAILURE = 'FETCHING_NAME_FAILURE'
const FETCHING_NAME_SUCCESS = 'FETCHING_NAME_SUCCESS'

function fetchingName () {
  return {
    type: FETCHING_NAME
  }
}

function fetchingNameFailure () {
  return {
    type: FETCHING_NAME_FAILURE,
    error: 'Error fetching name.'
  }
}

function fetchingNameSuccess (name) {
  return {
    type: FETCHING_NAME_SUCCESS,
    name
  }
}

export function fetchAndHandleName () {
  return function (dispatch) {
    dispatch(fetchingName())
    getName()
      .then((user) => {
        dispatch(fetchingNameSuccess(user.name))
      })
      .catch((error) => {
        console.error(error)
        dispatch(fetchingNameFailure(error))
      })
  }
}

export function setName () {
  return function (dispatch, getState) {
    dispatch(fetchingName())
    getFirstName()
      .then((user) => dispatch(fetchingNameSuccess(user.name)))
      .catch((error) => dispatch(fetchingNameFailure(error)))
  }
}

const initialUserState = Map({
  name: 'Default',
  isFetching: false,
  error: ''
})

export default function home (state = initialUserState, action) {
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
