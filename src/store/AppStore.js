import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstans';
import {EventEmitter} from 'events';

//Initialize startup state
const CHANGE_EVENT = 'change';

//default state initialization
const state = {
    auth: {
        _authentication: false,
        _user: null,
        _authFormLogin: '',
        _authFormPassword: ''
    },
    _isError: false,
    _isLoading: false,
    _setting: []
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
    switch (action.type) {
        case Constants.AUTHENTICATION_REQUEST: {
            state._isLoading = true;
            Store.eventEmitter();
            break;
        }
        case Constants.AUTHENTICATION_SUCCESS: {
            state._isLoading = false;
            state._authentication = true;
            state._user.push(action.user);
            Store.eventEmitter();
            break;
        }
        case Constants.AUTHENTICATION_FAIL: {
            state._isLoading = false;
            state._authentication = false;
            state._user = [];
            state._isError = true;
            Store.eventEmitter();
            break;
        }
        case Constants.AUTHENTICATION_CLEAR: {
            state._isLoading = false;
            state._authentication = false;
            state._user = [];
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
            state._setting.push(action.configuration);
            Store.eventEmitter();
            break;
        }
        case Constants.CONFIGURATION_FAIL: {
            state._isLoading = false;
            state._setting = [];
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