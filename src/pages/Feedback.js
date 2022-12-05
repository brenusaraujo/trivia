import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.returnFeedback = this.returnFeedback.bind(this);
  }

  playAgainBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  rankingPageBtn = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  returnFeedback() {
    const { score, assertions } = this.props;
    const THREE = 3;
    const caseWin = (

      <h1 data-testid="feedback-text">Well Done!</h1>

    );
    const caseLose = (

      <h1 data-testid="feedback-text">Could be better...</h1>

    );
    return (
      <div>
        <Header />
        <div>{ assertions >= THREE ? caseWin : caseLose }</div>
        <span>
          Você acertou
          <p data-testid="feedback-total-question">{ assertions }</p>
          questões.
        </span>
        <span>
          Com um total de
          <p data-testid="feedback-total-score">{ score }</p>
          pontos.
        </span>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgainBtn }
        >

          Play again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.rankingPageBtn }
        >
          Ranking
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Feedback</h1>
        {this.returnFeedback()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
