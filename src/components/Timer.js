import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*
import AlertMUITemplate from 'react-alert-template-mui';
import { useAlert } from 'react-alert';

const TimerAlert = () => {
    const alert = useAlert();
    return (
        alert.show('Please submit your quiz', {
            title: 'Time is up!'
        })
    );
}
*/

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            minutes : props.minutes,
            seconds : 0
        };
    }

    tick() {
        if(this.state.seconds >= 0) {
            this.setState(state => ({
                seconds : state.seconds - 1
            }));
        } 

        if (this.state.seconds < 0) {
            this.setState(state => ({
                minutes: state.minutes - 1,
                seconds: 59
            }));
        }

        if(this.state.minutes === 0 && this.state.seconds === 0) {
            /* Add in the alert for the timer here */
            this.componentWillUnmount()
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        return (
            <div className="timer">
                Time Left: {this.state.minutes} {this.state.minutes === 1 ? 'minute' : 'minutes'} {this.state.seconds} {this.state.seconds === 1 ? 'second' : 'seconds'}
            </div>
        )
    }  
}

Timer.propType = {
    minutes: PropTypes.number.isRequired
};

export default Timer;

