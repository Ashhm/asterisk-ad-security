import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstans';
import {EventEmitter} from 'events';

//Initialize startup state
const CHANGE_EVENT = 'change';

//default state initialization
const state = {
  auth: {
    _loggedIn: false,
    _user: null,
    _authFormLogin: '',
    _authFormPassword: ''
  },
  setting: {},
  userList: [],
  _isError: false,
  _isLoading: false,

};


const Store = Object.assign({}, EventEmitter.prototype, {
  getState() {
    return state;
  },

  eventEmitter() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function (action) {
  console.log(action.type);
  switch (action.type) {
    case Constants.AUTHENTICATION_REQUEST: {
      state._isLoading = true;
      Store.eventEmitter();
      break;
    }
    case Constants.AUTHENTICATION_SUCCESS: {
      state._isLoading = false;
      state.auth._loggedIn = true;
      state.auth._user = action.user;
      Store.eventEmitter();
      break;
    }
    case Constants.AUTHENTICATION_FAIL: {
      state._isLoading = false;
      state.auth._loggedIn = false;
      state.auth._user = null;
      state._isError = true;
      Store.eventEmitter();
      break;
    }
    case Constants.AUTHENTICATION_CLEAR: {
      state._isLoading = false;
      state.auth._loggedIn = false;
      state.auth._user = null;
      Store.eventEmitter();
      break;
    }
    case Constants.CONFIGURATION_REQUEST: {
      state._isLoading = true;
      Store.eventEmitter();
      break;
    }
    case Constants.CONFIGURATION_RECEIVED: {
      state._isLoading = false;
      state._isError = false;
      state.setting = action.configuration;
      Store.eventEmitter();
      break;
    }
    case Constants.CONFIGURATION_SAVED: {
      state._isLoading = false;
      state._isError = false;
      state.setting = action.configuration;
      Store.eventEmitter();
      break;
    }
    case Constants.CONFIGURATION_FAIL: {
      state._isLoading = false;
      state.setting = {};
      state._isError = true;
      Store.eventEmitter();
      break;
    }
    case Constants.USERS_RECEIVED: {
      state._isLoading = false;
      state._isError = false;
      state.userList = action.userList;
      Store.eventEmitter();
      break;
    }
    case Constants.USERS_FAIL: {
      state._isLoading = false;
      state.userList = [];
      state._isError = true;
      Store.eventEmitter();
      break;
    }
    default: {
      console.info('Nothing happend');
    }
  }
});

export default Store;