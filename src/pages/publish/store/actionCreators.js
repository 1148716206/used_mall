import axios from '../../../utils/request'

export const publishGoods = data => {

  return dispatch => {
    return axios.post('/api/publish/publishGoods',data)
  }
}
export const publishGoodsImg = data => {
  return dispatch => {
    return axios.post('/api/publish/publishGoodsImg',data,{responseType: 'arraybuffer'})
  }
}