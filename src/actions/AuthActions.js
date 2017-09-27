import AppDispather from '../dispatcher/AppDispatcher';
import * as Api from '../utils/AppAPI';
import Constants from '../constants/AppConstans';


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

  },

  async signout() {
    AppDispather.dispatch({
      type: Constants.AUTHENTICATION_REQUEST
    });
    try {
      await Api.signout();
      AppDispather.dispatch({
        type: Constants.AUTHENTICATION_CLEAR,
        user: null
      })
    } catch (err) {
      AppDispather.dispatch({
        type: Constants.AUTHENTICATION_FAIL,
        error: err
      })
    }
  }

};

export default AuthActions;