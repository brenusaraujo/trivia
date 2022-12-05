import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
    initialPageButton = () => {
      const { history } = this.props;
      history.push('/');
    }

    render() {
      return (
        <form>
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            data-testid="btn-go-home"
            type="submit"
            onClick={ this.initialPageButton }
          >
            Pagina inicial
          </button>
        </form>
      );
    }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
