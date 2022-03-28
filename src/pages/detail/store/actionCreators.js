import axios from '../../../utils/request'


export const getGoodsDetail = data => {
  return dispatch => {
    return axios.post('/api/detail/getGoodsDetail', data)
  }
}

export const getGoodsMessage = data => {
    return dispatch => {
      return axios.post('/api/detail/getGoodsMessage', data)
    }
  }

  export const addCart = data => {
    return dispatch => {
        return axios.post('/api/cart/addCart', data);
    };
};

export const addMessage = data => {
  return dispatch => {
      return axios.post('/api/detail/addMessage', data);
  };
};



