import { connect } from 'react-redux';
import actions from '../actions/counter';
import actions2 from '../actions/infoMember';
import React, { Component } from 'react';
import Test from '../mytest/test';
import { axiosGet } from '../util/axios';
import fetch from '../util/fetch';
import UploadPic from '../components/upload';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.reduce = this.reduce.bind(this);
        this.changeInfo = this.changeInfo.bind(this);
    }

    componentDidMount() {
        // console.log(this.props.infoMember);  // {}
        // axiosGet('/data/cityinfo/101010100.html', res => {
        //     console.log(res)
        // })
        // fetch.get('/data/cityinfo/101010100.html').then(data => {
        //     console.log('fetch data', res);
        // })
        const data = fetch.get('/data/cityinfo/101010100.html');
        console.log('data', data)
    }

    add() {
        this.props.dispatch(actions.increment());
        this.props.dispatch(actions2.setInfoMember({
            id: '28377383',
            script: 'Try my best'
        }));
    }

    reduce() {
        this.props.dispatch(actions.decrement());
    }

    changeInfo() {
        this.props.dispatch(actions2.changeInfo('Come on'));
    }

    render() {
        return (
            <div>
                <UploadPic />
                <p>
                    Click: {this.props.counter} times
                    {'   '}
                    <button onClick={this.add}>+</button>
                    {'   '}
                    <button onClick={this.reduce}>-</button>
                    {'   '}
                </p>
                <p onClick={this.changeInfo}>this.props.infoMember:
                {this.props.infoMember.id}--{this.props.infoMember.script}</p>
                <Test />
            </div>
        )
    }
}

//将state.counter绑定到props的counter
// const mapStateToProps = (state) => {
//     return {
//         counter: state.counter
//     }
// };

//将action的所有方法绑定到props上
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         increment: (...args) => dispatch(actions.increment(...args)),
//         decrement: (...args) => dispatch(actions.decrement(...args))
//     }
// };

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
// export default connect(mapStateToProps, mapDispatchToProps)(Counter)
export default connect(state => (state))(Counter);
