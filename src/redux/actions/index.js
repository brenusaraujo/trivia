export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const USERNAME_LOGIN = 'USERNAME_LOGIN';
export const SCORE_REGISTER = 'SCORE_REGISTER';
export const ASSERTION_REGISTER = 'ASSERTION_REGISTER';

export const emailAction = (payload) => ({ type: EMAIL_LOGIN, payload });

export const usernameAction = (payload) => ({ type: USERNAME_LOGIN, payload });

export const scoreAction = (payload) => ({ type: SCORE_REGISTER, payload });

export const assertionAction = (payload) => ({ type: ASSERTION_REGISTER, payload });
