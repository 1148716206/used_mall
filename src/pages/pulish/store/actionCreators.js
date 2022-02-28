import axios from '../../../utils/request'

export const pulishGoods = data => {
  return dispatch => {
    return axios.post('/api/pulish/pulishGoods',data)
  }
}