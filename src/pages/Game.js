import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getTriviaApi from '../services/triviaAPI';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      index: 0,
    };
  }

  componentDidMount() {
    this.questionsExecute();
  }

  questionsExecute = async () => {
    const { history } = this.props;
    const result = await getTriviaApi(localStorage.getItem('token'));
    const error = 3;
    if (result.response_code === error) history.push('/');
    else this.setState({ questions: result.results });
  }

  handleNext = () => {
    const { history } = this.props;
    const { index } = this.state;
    const endOfArray = 3;
    this.setState((prevState) => {
      if (index > endOfArray) history.push('/feedback');
      return { index: prevState.index + 1 };
    });
  }

  render() {
    const { questions, index } = this.state;
    const endOfArray = 4;
    return (
      <section>
        <Header />
        {(questions
          .length !== 0 && index <= endOfArray) ? <Questions
            question={ questions[index] }
            handleNext={ this.handleNext }
          />
          : <p data-testid="loading">Carregando</p>}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
