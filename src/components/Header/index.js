import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="navbar-container">
      <nav className="nav-bar">
        <Link className="link-items" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
        </Link>
        <ul className="list-items">
          <Link to="/" className="link-items">
            <li className="desktop-ver list-item">Home</li>
          </Link>
          <Link to="/" className="link-items">
            <AiFillHome className="mobile-ver h-icon" size="22px" />
          </Link>
          <Link to="/jobs" className="link-items">
            <li className="desktop-ver list-item">Jobs</li>
            <BsBriefcaseFill className="mobile-ver h-icon" size="20px" />
          </Link>
          <button className="logout-icon" onClick={onLogout} type="button">
            <FiLogOut className="mobile-ver h-icon" size="20px" />
          </button>
        </ul>
        <button
          type="button"
          className="logout-btn btn desktop-ver"
          onClick={onLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  )
}

export default withRouter(Header)
