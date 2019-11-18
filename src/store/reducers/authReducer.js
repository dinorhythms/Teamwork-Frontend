import { LOGIN } from '../types/authTypes';

// Initial State
const initialState = {
  loggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        loggedIn: action.trueFalse,
      }
    }
    default: {
      return state;
    }
  }
};

export default authReducer;