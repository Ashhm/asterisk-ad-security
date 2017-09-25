import AppDispather from '../Dispatcher/AppDispatcher';

import * as Api from '../api/api';
import Constants from '../etc/AppConstans';


const MenuActions = {
    async getConfigurationSetting(name) {
        AppDispather.dispatch({
            type: Constants.CONFIGURATION_REQUEST
        });

        try {
            const configuration = await Api.getConfiguration(name);
            AppDispather.dispatch({
                type: Constants.CONFIGURATION_RECEIVED,
                configuration
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