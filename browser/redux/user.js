import axios from 'axios';
const initialState = {
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
    default:
      return user;
  }
}

/* ------------       DISPATCHERS     ------------------ */

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

export const signupUser = (email, password) => dispatch => {
  axios.post('/api/users/signup', {
      email,
      password
    })
    .then(() => {
      console.log( `User created successfully!`);

    })
    .catch(err => console.error('Signup unsuccessful: Email already taken!', err))
}

export const logoutUser = () => dispatch => {
  axios.put('/api/users/logout')
    .then(() => {
      console.log( `User logged out successfully!`);

    })
    .catch(err => console.error('logout unsuccessful', err))
}
