import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from '../containers/App';
import Subpage from '../components/subpage';

export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    // 前面有exact参数，说明只有特定路径 / 路径才能匹配到
                    <Route exact path="/" component={App} />
                    <Route path="/subpage" component={Subpage} />
                </Switch>
            </BrowserRouter>
        )
    }
}