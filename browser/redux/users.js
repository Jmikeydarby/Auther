import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_USERS'
const CREATE     = 'CREATE_USER'
const REMOVE     = 'REMOVE_USER'
const UPDATE     = 'UPDATE_USER'
const LOGIN = 'LOGIN_USER'


/* ------------   ACTION CREATORS     ------------------ */

const init  = users => ({ type: INITIALIZE, users })
const create = user  => ({ type: CREATE, user })
const remove = id    => ({ type: REMOVE, id })
const update = user  => ({ type: UPDATE, user })
const login = (email, password) => {
  type: LOGIN,
  email,
  password
}


/* ------------       REDUCER     ------------------ */

export default function reducer (users = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.users

    case CREATE:
      return [action.user, ...users]

    case REMOVE:
      return users
        .filter(user => user.id !== action.id)


    case UPDATE:
      return users
        .map(user => (
          action.user.id === user.id ? action.user : user))

    // case LOGIN:
    //   return
    default:
      return users;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
       .then(res => dispatch(init(res.data)));
}

//optimistic
export const removeUser = id => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccessful`, err))
}

export const addUser = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccessful`, err))
}

export const updateUser = user => dispatch => {
    axios.put(`/api/users/${id}`, user)
         .then(res => dispatch(update(res.data)))
         .catch(err => console.error(`Creating user: ${user} unsuccessful`, err))
}

export const loginUser = (email, password) => dispatch => {
  axios.post('/api/users/login', {
      email,
      password
    })
    .then(() => {
      console.log('Login successful!');
    })
    .catch(err => console.error('Login unsuccessful: Invalid Username or Password'))
}

export const signupUser = (email, password) => dispatch => {
  axios.post('/api/users/signup', {
      email,
      password
    })
    .then(() => {
      console.log( `User created successfully!`);

    })
    .catch(err => console.error('Signup unsuccessful: Email already taken!'))
}
