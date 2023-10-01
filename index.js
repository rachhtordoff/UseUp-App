/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React from 'react';
import App from './App';
import Authentication from './modules/Authentication/Authentication.js/';

const Root = () => {
    return (
        <Authentication>
            <App />
        </Authentication>
    );
}

AppRegistry.registerComponent(appName, () => Root);

