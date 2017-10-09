import AppDispather from '../dispatcher/AppDispatcher';
import * as Api from '../utils/AppAPI';
import Constants from '../constants/AppConstans';


const MenuActions = {
  async getConfigurationSetting() {
    AppDispather.dispatch({
      type: Constants.CONFIGURATION_REQUEST
    });

    try {
      const {body} = await Api.getConfiguration();
      AppDispather.dispatch({
        type: Constants.CONFIGURATION_RECEIVED,
        configuration: body
      })
    } catch (err) {
      AppDispather.dispatch({
        type: Constants.CONFIGURATION_FAIL,
        error: err
      })
    }
  },

  async saveConfigurationSetting(data) {
    AppDispather.dispatch({
      type: Constants.CONFIGURATION_REQUEST
    });

    try {
      const {body} = await Api.saveConfiguration(data);
      AppDispather.dispatch({
        type: Constants.CONFIGURATION_SAVED,
        configuration: body
      })
    } catch (err) {
      console.log(err);
      AppDispather.dispatch({
        type: Constants.CONFIGURATION_FAIL,
        error: err
      })
    }
  },

  async getUserList() {
    try {
      const {body} = await Api.getLdapUsers();
      AppDispather.dispatch({
        type: Constants.USERS_RECEIVED,
        userList: body
      })
    } catch (err) {
      AppDispather.dispatch({
        type: Constants.USERS_FAIL,
        error: err
      })
    }
  }
};

export default MenuActions;