import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS
  } from '../actions/Home'
  
  import { REQUESTING, SUCCESS, ERROR } from '../../constants/constant'
  
  const INIT_STATE = {
    users: []
  }
  
  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_USER_REQUEST: {
        return {
          ...state,
          status: REQUESTING,
          type: GET_USER_REQUEST,
          users: action.payload
        }
      }
  
      case GET_USER_SUCCESS: {
        return {
          ...state,
          status: SUCCESS,
          type: GET_USER_SUCCESS,
          users: action.payload
        }
      }
  
      case GET_USER_FAILURE: {
        return {
          ...state,
          status: ERROR,
          type: GET_USER_FAILURE,
          users: null
        }
      }
  
      default:
        return state
    }
  }
  
  export default reducer