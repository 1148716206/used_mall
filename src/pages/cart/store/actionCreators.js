import axios from '../../../utils/request';

export const getCartInfo = data => {
    return dispatch => {
        return axios.post('/api/cart/getCartInfo', data);
    };
};

export const deleteCartInfo = data => {
    return dispatch => {
        return axios.post('/api/cart/deleteCartInfo', data);
    };
};

export const updateCartNumber = data => {
    return dispatch => {
        return axios.post('/api/cart/updateCartNumber', data);
    };
};

export const addOrder = data => {
    return dispatch => {
        return axios.post('/api/order/addOrder', data);
    };
};


