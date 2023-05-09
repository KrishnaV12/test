import { getData } from "../../util/api";
import { REQUESTING, SUCCESS, ERROR } from "../../constants/constant";

export const GET_USER_REQUEST = "GET_USER_REQUEST"
export const GET_USER_SUCCESS = "GET_USER_SUCCESS"
export const GET_USER_FAILURE = "GET_USER_FAILURE"


export function getUsersRequest() {
    return {
        type: GET_USER_REQUEST,
        status: REQUESTING
    }
}

export function getUsersSuccess(payload) {
    return {
        type: GET_USER_SUCCESS,
        status: SUCCESS,
        payload
    }
}

export function getUsersFailure(error) {
    return {
        type: GET_USER_FAILURE,
        status: ERROR,
        payload: {error}
    }
}

export const getUsers = () => {
    return async (dispatch) => {
      dispatch(getUsersRequest());
      try {
        const url = `users?page=1`;
        const result = await getData(url);
        const res = await result.data;
        console.log("API CHECK1", res);
        if (res.error) {
          throw new Error(res.message);
        }
        if (res.data.length > 0) {
          return dispatch(getUsersSuccess(res.data));
        } else {
          return dispatch(getUsersFailure(res.message));
        }
      } catch (e) {
        return dispatch(getUsersFailure(e.message));
      }
    };
  };