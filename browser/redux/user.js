import axios from 'axios';
const initialState = {
    id: "",
		name: '',
		email: '',
		photo: '',
		phone: '',
		loggedIn: false,
		isAdmin: false,
}
/* -----------------    ACTIONS     ------------------ */

const LOGIN      = 'LOGIN_USER'
const LOGOUT     = 'LOGOUT_USER'



/* ------------   ACTION CREATORS     ------------------ */

const login = (user) => {
	console.log("user from action creator: ", user);
  return {
	  type: LOGIN,
	  user: user
	}
}
const logout = () => {
	return {
		type: LOGOUT
	}
}

/* ------------       REDUCER     ------------------ */

export default function reducer (user = initialState, action) {

	switch (action.type) {

    case LOGIN:
       return Object.assign({}, action.user, {loggedIn: true});
    case LOGOUT:
      return Object.assign({}, initialState);
    default:
      return user;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const signupUser = (email, password) => dispatch => {
  axios.post('/api/users/signup', {
      email,
      password
    })
    .then(user => {
      dispatch(login(user.data));

    })
    .catch(err => console.error('Signup unsuccessful: Email already taken!', err))
}

export const loginUser = (email, password) => dispatch => {
  axios.post('/api/users/login', {
      email,
      password
    })
    .then((user) => {
    	console.log("usr from dispatcher", user);
      dispatch(login(user.data))
    })
    .catch(err => console.error('Login unsuccessful: Invalid Username or Password', err))
}

export const logoutUser = () => dispatch => {
  axios.put('/api/users/logout')
    .then(() => {
      dispatch(logout())

    })
    .catch(err => console.error('logout unsuccessful', err))
}
