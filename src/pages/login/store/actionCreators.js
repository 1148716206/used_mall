import * as actionTypes from './actionTypes';
import axios from '../../../utils/request';

export const loginAc = data => {
    return dispatch => {
        return axios.post('/api/login', data);
    };
};

export const syncInfoAc = data => {
    console.log('login data',data)
    return {
        type: actionTypes.SYNC_STATE_INFO,
        payload: data
    };
};

export const logout = data => {
    return dispatch => {
        localStorage.removeItem('@#@TOKEN');
        console.log('out');
        dispatch(syncInfoAc({}));
    };
};