import {
  CHANGE_BTN_LOADER,
  CHANGE_LOADER,
  CHANGE_Language_LOADER,
  CHANGE_STORE_MODAL,
} from '../Actions/type';

const initialState = {
  btnLoader: false,
  dataLoader: false,
  listLanguage: [{en: 'English', fn: 'Franch'}],
  storeModalVisible: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_LOADER:
      return {
        ...state,
        dataLoader: payload,
      };
    case CHANGE_BTN_LOADER:
      return {
        ...state,
        btnLoader: payload,
      };
    case CHANGE_Language_LOADER:
      return {
        ...state,
        listLanguage: payload,
      };
    case CHANGE_STORE_MODAL:
      return {
        ...state,
        storeModalVisible: payload,
      };
    default:
      return state;
  }
};
