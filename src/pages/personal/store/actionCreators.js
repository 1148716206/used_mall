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


