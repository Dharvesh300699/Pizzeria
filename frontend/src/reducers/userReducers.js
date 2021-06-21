import * as actionTypes from "../actions/actionTypes";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case actionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case actionTypes.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return { loading: true };
    case actionTypes.USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case actionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_PROFILE_REQUEST:
      return { loading: true };
    case actionTypes.USER_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case actionTypes.USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, updatedProfile: action.payload };
    case actionTypes.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case actionTypes.USER_LIST_REQUEST:
      return { loading: true };
    case actionTypes.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case actionTypes.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case actionTypes.ADMIN_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.ADMIN_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
