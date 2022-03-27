import axios from '../../../utils/request'


export const getGoodsDetail = data => {
console.log(data);
  return dispatch => {
    return axios.post('/api/detail/getGoodsDetail', data)
  }
}

export const getGoodsMessage = data => {
  console.log(data);
    return dispatch => {
      return axios.post('/api/detail/getGoodsMessage', data)
    }
  }

  export const addCart = data => {
    return dispatch => {
        return axios.post('/api/cart/addCart', data);
    };
};


