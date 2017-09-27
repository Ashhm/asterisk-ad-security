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
                type: Constants.CONFIGURATION_FAIL
            })
        }
    },

    async saveConfiguration(name) {
        AppDispather.dispatch({
            type: Constants.CONFIGURATION_REQUEST
        });

        /*try {
            const configuration = Api.getConfig(name);
            AppDispather.dispatch({
                type: Constants.CONFIGURATION_RECEIVED,
                configuration
            })
        } catch (err) {
            AppDispather.dispatch({
                type: Constants.CONFIGURATION_FAIL
            })
        }*/
    },


};

export default MenuActions;