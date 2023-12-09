import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {searchInput: '', password: '', errorMsg: ''}

  apiLoginFailure = msg => {
    this.setState({errorMsg: msg})
  }

  apiLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmit = async event => {
    event.preventDefault()
    const {searchInput, password} = this.state
    const userDetails = {user_id: searchInput, pin: password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/ebank/login', options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.apiLoginSuccess(data.jwt_token)
    } else {
      this.apiLoginFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUserId = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput, password, errorMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-bg">
        <div className="login-img-form-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />
          <form className="loginin-form" onSubmit={this.onSubmit}>
            <h1>Welcome Back!</h1>
            <div className="loginin-input-cont">
              <label htmlFor="user-input-id" className="login-label">
                User Id
              </label>
              <input
                type="text"
                id="user-input-id"
                value={searchInput}
                className="login-input"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="loginin-input-cont">
              <label htmlFor="user-pin-id" className="login-label">
                PIN
              </label>
              <input
                type="password"
                value={password}
                id="user-pin-id"
                className="login-input"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {errorMsg.length !== 0 && (
              <p className="login-error-msg">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
