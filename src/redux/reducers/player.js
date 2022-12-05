import { ASSERTION_REGISTER,
  EMAIL_LOGIN,
  SCORE_REGISTER,
  USERNAME_LOGIN,
} from '../actions';

const INITAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_LOGIN:
    return { ...state, gravatarEmail: action.payload };
  case USERNAME_LOGIN:
    return { ...state, name: action.payload };
  case SCORE_REGISTER:
    return { ...state, score: state.score + action.payload };
  case ASSERTION_REGISTER:
    return { ...state, assertions: state.assertions + 1 };
  default:
    return state;
  }
};

export default player;
