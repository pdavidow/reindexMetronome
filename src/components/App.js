// https://github.com/reindexio/reindex-examples/blob/master/todomvc-single-user/src/components/App.js

import React, {Component} from 'react';
import Relay from 'react-relay';

import Reindex from '../Reindex';
import MetronomeApp from './MetronomeApp';
import AppRoute from '../routes/AppRoute';

export default class App extends Component {
    render() {
        return (
            <Relay.RootContainer
                Component={MetronomeApp}
                route={new AppRoute}
                forceFetch={true} />
        );
    }
}