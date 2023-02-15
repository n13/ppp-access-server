import { Amplify } from 'aws-amplify';
import assert from 'assert';
import EventEmitter from 'events';
import AuthApi  from './service/AuthApi.js';
import ProfileApi  from './service/ProfileApi.js';
import Util from './util/Util.js';
// import config from './config.json' assert { type: "json" };

import { readFile } from 'fs/promises';

const config = JSON.parse(await readFile(new URL('./config.json', import.meta.url)));


class PPP {

    /**
     * Configures the PPP client
     * @param {string} environment to be used test or prod
     * @param {string} [originAppId] required for standalone apps, the appId of the app using the PPP client
     */
    static configure(environment, originAppId) {
        this._config = config[environment];
        this.originAppId = originAppId;
        if (!this._config) {
            throw Error(`No configuration found for specified environment: ${environment}`);
        }
        Amplify.configure(this._config.AWS);
    }

    static getConfig(property) {
        assert(this._config, "PPP configure method should be called first");
        return Util.getPath(this._config, property);
    }

    static setActiveUser(activeUser) {
        this.activeUser = activeUser;
        this.events.emit('activeUserChanged', activeUser);
    }

    /**
     * @returns {AuthApi}
     */
    static authApi() {
        if (!this._authApi) {
            this._authApi = new AuthApi(this.activeUser);
            this._authApi.init();
            this._authApi.on('signOut', () => PPP.setActiveUser(null));
        }
        return this._authApi;
    }


    /**
     * @returns {ProfileApi}
     */
    static profileApi() {
        if (!this._profileApi) {
            this._profileApi = new ProfileApi(this.activeUser);
            this._profileApi.init();
        }
        return this._profileApi;
    }
}
PPP._config = null;
PPP.activeUser = null;
PPP.events = new EventEmitter();

export default PPP;