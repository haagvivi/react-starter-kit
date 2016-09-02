import { waitingTime } from 'config/constants'

export function getFirstName () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      name: 'Vivien'
    }), 200)
  })
}

export function getName () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      name: 'Julien'
    }), waitingTime)
  })
}

export function checkAuth (nextState, replace) {
  console.warn('No need to be Auth')
}
