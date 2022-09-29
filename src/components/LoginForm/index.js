import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    error: '',
  }

  onLoginFailed = errorMsg => {
    this.setState({error: errorMsg})
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 10})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailed(data.error_msg)
    }
  }

  onUsernameChange = e => {
    this.setState({username: e.target.value})
  }

  onPasswordChange = e => {
    this.setState({password: e.target.value})
  }

  render() {
    const {username, password, error} = this.state
    let errMsg
    if (error !== '') {
      errMsg = `*${error}`
    } else {
      errMsg = ''
    }

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <div className="inputs-container">
            <div className="user-input-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                id="username"
                className="user-input"
                type="text"
                placeholder="username"
                onChange={this.onUsernameChange}
                value={username}
              />
            </div>
            <div className="user-input-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                id="password"
                className="user-input"
                type="password"
                placeholder="password"
                onChange={this.onPasswordChange}
                value={password}
              />
            </div>
            <button type="submit" className="login-btn btn">
              Login
            </button>
            <p className="error">{errMsg}</p>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
