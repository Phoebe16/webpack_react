import React, { Component } from 'react';
import config from './config.json';
import style from './test.less';

const guangzhou = require('../../image/test/guangzhou.jpg');
const current = require('../../image/test/current.png');

class Test extends Component {
    render() {
        return (
            <div className={style.root}>
                {config.greetText}
                <div className={style.danger}>哈哈哈</div>
                <div>
                    <img src={guangzhou} className={style.guangzhou} />
                </div>
                <div>
                    <img src={current} className={style.current} />
                </div>
            </div>
        )
    }
}

export default Test;
