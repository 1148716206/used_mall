import axios from '../../../utils/request'

export const getGoodsInfo = data => {
  return dispatch => {
    return axios.get('/api/getGoodsInfo')
  }
}