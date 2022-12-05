import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTokenTrivia from '../services';
import { emailAction, usernameAction } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.configPagePush = this.configPagePush.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  configPagePush = () => {
    const { history } = this.props;
    history.push('/configuracao');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const token = await fetchTokenTrivia();
    localStorage.setItem('token', token);
    const { history, emailDispatch, usernameDispatch } = this.props;
    const { email, userName } = this.state;
    history.push('/game');
    emailDispatch(email);
    usernameDispatch(userName);
  }

  render() {
    const { userName, email } = this.state;
    return (
      <form action="">
        <input
          type="text"
          name="userName"
          id="userName"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ userName }
        />
        <input
          type="email"
          name="email"
          id="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
        />
        <button
          disabled={ !((userName.length > 0 && email.length > 0)) }
          data-testid="btn-play"
          type="button"
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.configPagePush }
        >
          Configurações
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (payload) => dispatch(emailAction(payload)),
  usernameDispatch: (payload) => dispatch(usernameAction(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  emailDispatch: PropTypes.func.isRequired,
  usernameDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
