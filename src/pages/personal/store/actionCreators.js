import axios from '../../../utils/request'
import * as actionTypes from './actionTypes';

export const syncInfoAc = data => {
  return {
      type: actionTypes.SYNC_STATE_INFO,
      payload: data
  };
};

export const getUserData = data => {

  return dispatch => {
    return axios.post('/api/personal/getUserInfo', data)
  }
}
export const getAvatar = data => {
  console.log(data)

  return dispatch => {
    return axios.post('/api/personal/getAvatar', data,{responseType: 'arraybuffer'})
  }
}

export const setUserGender = data => {
  return dispatch => {
    return axios.post('/api/personal/setUserGender', data)
  }
}
export const setNickName = data => {

  return dispatch => {
    return axios.post('/api/personal/setNickName', data)
  }
}

export const setUserEmail = data => {

  return dispatch => {
    return axios.post('/api/personal/setUserEmail', data)
  }
}

export const setUserAddress = data => {

  return dispatch => {
    return axios.post('/api/personal/setUserAddress', data)
  }
}
export const setUserPhone = data => {

  return dispatch => {
    return axios.post('/api/personal/setUserPhone', data)
  }
}
export const setUserAvatar = data => {

  return dispatch => {
    return axios.post('/api/personal/setUserAvatar', data,{ headers: { 'content-type': 'multipart/form-data' } })
  }
}



