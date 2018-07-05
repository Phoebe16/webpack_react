import React, { Component } from 'react';
import config from './config.json';
import style from './test.css';

class Test extends Component {
    render() {
        return (
            <div className={style.root}>{config.greetText}</div>
        )
    }
}

export default Test;
