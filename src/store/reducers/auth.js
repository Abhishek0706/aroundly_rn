import {DIDTRYAUTOLOGIN, LOGIN, LOGOUT} from '../actions/auth';

const initialState = {
  name: null,
  email: null,
  dob: null,
  didTryAutoLogin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        name: action.payload.name,
        email: action.payload.email,
        dob: action.payload.dob,
        didTryAutoLogin: state.didTryAutoLogin,
      };
    case LOGOUT:
      return initialState;
    case DIDTRYAUTOLOGIN:
      return {
        name: state.name,
        email: state.email,
        dob: state.dob,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};

export default authReducer;
