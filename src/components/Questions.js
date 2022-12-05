import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scoreAction, assertionAction } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
      disabled: false,
      answers: [],
      next: false,
    };
  }

  componentDidMount() {
    this.timer();
    this.randomAswers();
  }

  timer = () => {
    const oneSec = 1000;
    setInterval(() => this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }), this.clearTimer), oneSec);
  }

  clearTimer = () => {
    const { timer } = this.state;
    if (timer === 0) {
      this.setState({ disabled: true });
    }
  }

  randomAswers = () => {
    const { question } = this.props;
    const half = 0.5;
    const answers = [question.correct_answer, ...question.incorrect_answers]
      .sort(() => Math.random() - half);
    this.setState({ answers });
  }

  handleScore = (difficulty, { target }) => {
    const { scoreDispatch, assertionDispatch } = this.props;
    const timer = Number(document.getElementById('timer').innerHTML);
    const summary = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const CONSTANT = 10;
    const equation = CONSTANT + (timer * summary[difficulty]);
    if (target.className === 'correct') {
      scoreDispatch(equation);
      assertionDispatch();
    }
    this.setState({
      next: true,
    });
  }

  handleAnswers = () => {
    this.randomAswers();
    this.setState({
      next: false,
      timer: 30,
    });
  }

  render() {
    const { question, handleNext } = this.props;
    const { timer, disabled, answers, next } = this.state;
    return (
      <div>
        <h2
          id="timer"
          data-testid="timer"
        >
          {timer}
        </h2>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <p>{question.correct_answer}</p>
        <div data-testid="answer-options">
          {answers.map((a, i) => {
            let datatestid = '';
            if (a === question.correct_answer) {
              datatestid = 'correct-answer';
            } else {
              datatestid = `wrong-answer-${i}`;
            }
            const handleClick = () => (
              answers.forEach((element, idx) => {
                const button = document.getElementById(idx);
                if (element === question.correct_answer) {
                  button.className = 'correct';
                } else {
                  button.className = 'incorrect';
                }
              }));
            return (
              <button
                key={ a }
                id={ i }
                type="button"
                data-testid={ datatestid }
                disabled={ disabled }
                onClick={ (event) => {
                  handleClick();
                  this.handleScore(question.difficulty, event);
                } }
              >
                {a}
              </button>
            );
          })}
        </div>
        {
          (next) && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ async () => {
                await handleNext();
                this.handleAnswers();
              } }
            >
              Next
            </button>
          )
        }
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (payload) => dispatch(scoreAction(payload)),
  assertionDispatch: (payload) => dispatch(assertionAction(payload)),
});

Questions.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
  scoreDispatch: PropTypes.func.isRequired,
  assertionDispatch: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Questions);
