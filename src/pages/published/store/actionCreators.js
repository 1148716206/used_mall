import axios from '../../../utils/request';

export const getPublishedGoods = data => {
    return dispatch => {
        return axios.post('/api/published/getPublishedGoods', data);
    };
};

export const deletePublishedGoods = data => {
    return dispatch => {
        return axios.post('/api/published/deletePublishedGoods', data);
    };
};

export const updatePublishedGoods = data => {
    return dispatch => {
        return axios.post('/api/published/updatePublishedGoods', data);
    };
};


