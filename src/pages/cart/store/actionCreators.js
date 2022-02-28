import axios from '../../../utils/request';

export const getCartInfo = data => {
    return dispatch => {
        return axios.post('/api/cart/getCartInfo', data);
    };
};

