import {
  CHANGE_USER_DATA,
  CHANGE_STORE_DATA,
  CHANGE_STORE_USER_SELECT_DATA,
  CHANGE_STORE_SCREEN,
} from '../Actions/type';
const initialState = {
  userData: null,
  storeData: [],
  storeUserSelectionValue: null,
  storeScreen: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_USER_DATA:
      return {
        ...state,
        userData: payload,
      };
    case CHANGE_STORE_DATA:
      return {
        ...state,
        storeData: payload,
      };
    case CHANGE_STORE_USER_SELECT_DATA:
      return {
        ...state,
        storeUserSelectionValue: payload,
      };
    case CHANGE_STORE_SCREEN:
      return {
        ...state,
        storeScreen: payload,
      };
    default:
      return state;
  }
};
