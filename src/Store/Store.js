import AppDispatcher from '../Dispatcher/AppDispatcher';
import AuthActions from '../Actions/AuthActions';
import Constants from '../etc/AppConstans';
import {EventEmitter} from 'events';

//Initialize startup state
const CHANGE_EVENT = 'change';

let _authentication = false;
let _user = null;
let _isError = false;
let _isLoading = false;


const Store = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    authenticated() {
        return _authentication;
    },

    getUser() {
        return _user;
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

AppDispatcher.register(function(action) {
    switch (action.type) {
        case Constants.AUTHENTICATION_REQUEST: {
            _isLoading = true;
            Store.eventEmitter();
            break;
        }
        case Constants.AUTHENTICATION_SUCCESS: {
            _isLoading = false;
            _authentication = true;
            _user = action.user;
            Store.eventEmitter();
            break;
        }
        case Constants.AUTHENTICATION_FAIL: {
            _isLoading = false;
            _authentication = false;
            _user = null;
            _isError = true;
            Store.eventEmitter();
            break;
        }
        default: {
            console.info('Nothing happend');
        }
        }
    });

export default Store;