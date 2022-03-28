import axios from '../../../utils/request'

export const getGoodsInfo = data => {
  return dispatch => {
    return axios.get('/api/getGoodsInfo')
  }
}

export const searchGoods = data => {
  return dispatch => {
    return axios.post('/api/searchGoods',data)
  }
}