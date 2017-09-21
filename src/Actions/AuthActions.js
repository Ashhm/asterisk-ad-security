import AppDispather from '../Dispatcher/AppDispatcher';

import * as Api from '../api/api';
import Constants from '../etc/AppConstans';


//Below, part of signin/signup implementation, using async/await
// and dispatching main events from server response.
const AuthActions = {
    async signin(data) {
        AppDispather.dispatch({
            type: Constants.AUTHENTICATION_REQUEST
        });
        try {
            const {body} = await Api.signin(data);
            AppDispather.dispatch({
                type: Constants.AUTHENTICATION_SUCCESS,
                user: body
            });
        } catch (err) {
            AppDispather.dispatch({
                type: Constants.AUTHENTICATION_FAIL,
                error: err
            });
        }

    }
};

export default AuthActions;