import React from 'react';
import style from './style/decorator.less';

export default class Decorator extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={style.decorator}>
                js装饰器
            </div>
        )
    }
}