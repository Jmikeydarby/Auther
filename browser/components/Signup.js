import React from 'react';
import { connect } from'react-redux';
import { browserHistory } from 'react-router';
import { signupUser } from '../redux/user';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
            <form onSubmit={this.props.onSignupSubmit}>
                <div className="form-group">
                  <label>email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      required
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary">{message}</button>
            </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a target="_self"
               href="/auth/google"
               className="btn btn-social btn-google">
            <i className="fa fa-google"></i>
            <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' })
const mapDispatch = (dispatch) => {
    return {
      onSignupSubmit: (event) => {
        let email = event.target.email.value;
        let password = event.target.password.value;
        event.preventDefault();
        dispatch(signupUser(email, password));
        browserHistory.push('/');
      }
    }
}

export default connect(mapState, mapDispatch)(Signup);
