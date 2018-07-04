import React, { Component } from 'react';
import config from './config.json';

class Test extends Component {
    render() {
        return (
            <div>{config.greetText}</div>
        )
    }
}

export default Test;
