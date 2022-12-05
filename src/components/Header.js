import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const hash = md5(gravatarEmail).toString();

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
          alt="avatar do usuário"
        />
        <span
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
        >
          { score }
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
