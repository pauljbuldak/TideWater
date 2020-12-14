import React, { Component } from 'react';
import Login from './components/GoogleLogin';
import Logout from './components/GoogleLogout';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Timer from './components/Timer';
import axios from 'axios';
import logo from './svg/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: '',
      minutes: 10,
      timerPaused: false
    };
  }

  componentDidMount() {
    /*
      URLs: https://www.lewis.education/quiz-data-01
            https://www.lewis.education/quiz-data-02
   */ 
   
   this.sendGetRequest('https://www.lewis.education/quiz-data-01');

    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  sendGetRequest = async (url) => {
    var config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };
    try {
      const res = await axios.get(url, config);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  handleAnswerSelected = (event) => {
    this.setState({
      answer: event.currentTarget.value
    });
  }

  handleNextQuestion = () => {
    console.log("button click answer: " + this.state.answer);
    this.setUserAnswer(this.state.answer);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 200);
    } else {
      this.setState({ timerPaused: true });
      setTimeout(() => this.setResults(this.getResults()), 200);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      console.log("result: " + result);
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  renderTimer() {
    return <Timer minutes={this.state.minutes} timerPaused={this.state.timerPaused}/>;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="login-container">
            <div className="login">
              <Login />
            </div>
            <div className="logout">
              <Logout />
            </div>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TideWater Quiz</h2>
          {this.renderTimer()}
        </div>
        <div>
          {this.state.result ? this.renderResult() : this.renderQuiz()}
          <button className={this.state.result ? "hiddenNextButton" : "nextButton"}
            onClick={this.handleNextQuestion}>
            {this.state.questionId < quizQuestions.length ? 'Next' : 'Submit'}
          </button>
        </div>
      </div>
    );
  }
}

export default App;