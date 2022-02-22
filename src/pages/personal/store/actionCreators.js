import axios from '../../../utils/request'

export const getUserData = data => {

  return dispatch => {
    return axios.post('/api/personal/getUserInfo', data)
  }
}

export const setUserGender = data => {
  console.log('actionCreators',data)
  return dispatch => {
    return axios.post('/api/personal/setUserGender', data)
  }
}


