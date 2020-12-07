import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            minutes : props.minutes,
            seconds : 0,
            timerPaused: props.timerPaused
        };
    }

    tick() {
        if(this.state.seconds >= 0) {
            this.setState(state => ({
                seconds : state.seconds - 1
            }));
        } 

        if(this.state.seconds < 0) {
            this.setState(state => ({
                minutes: state.minutes - 1,
                seconds: 59
            }));
        }

        if(this.state.minutes === 0 && this.state.seconds === 0) {
            alert('Time is up! Submit your quiz.')
            this.componentWillUnmount();
        }

        if(this.state.timerPaused === true) {
            this.componentWillUnmount();
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        if (this.interval) { clearInterval(this.interval); }
    }

    render () {
        return (
            <div className="timer">
                <h3>
                    Time Left: {this.state.minutes} {this.state.minutes === 1 ? 'minute' : 'minutes'} {this.state.seconds} {this.state.seconds === 1 ? 'second' : 'seconds'}
                </h3>
                <h3>
                    {this.state.minutes < 10 && (this.state.minutes >= 5  && this.state.seconds >= 0) ? 'You have less than 10 minutes left on this quiz.' : ''}
                    {this.state.minutes < 5 && (this.state.minutes >= 1  && this.state.seconds >= 0) ? 'You have less than 5 minutes left on this quiz.' : ''}
                    {this.state.minutes < 1 && this.state.seconds > 0 ? 'You have less than 1 minute left. Make sure to submit your quiz.' : ''}
                </h3>
            </div>
        )
    }  
}

Timer.propType = {
    minutes: PropTypes.number.isRequired,
    timerPaused: PropTypes.bool.isRequired
};

export default Timer;

