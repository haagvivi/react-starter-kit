import { waitingTime } from 'config/constants'

export const getFirstName = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      name: 'Vivien'
    }), 200)
  })

export const getName = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      name: 'Julien'
    }), waitingTime)
  })

export const checkAuth = (nextState, replace) => {
  console.warn('No need to be Auth')
}
