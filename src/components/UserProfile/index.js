import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const fetchStages = {
  initial: 'INITIAL',
  loading: 'LOADING',
  fetchCompleted: 'COMPLETED',
  fetchFailed: 'FAILED',
}

class UserProfile extends Component {
  state = {
    name: '',
    shortBio: '',
    profileUrl: '',
    fetchStatus: fetchStages.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  setProfileDetails = (name, shortBio, profileUrl) => {
    this.setState({
      name,
      shortBio,
      profileUrl,
      fetchStatus: fetchStages.fetchCompleted,
    })
  }

  onFetchFail = () => {
    this.setState({fetchStatus: fetchStages.fetchFailed})
  }

  getProfileDetails = async () => {
    this.setState({fetchStatus: fetchStages.loading})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setProfileDetails(
        data.profile_details.name,
        data.profile_details.short_bio,
        data.profile_details.profile_image_url,
      )
    } else {
      this.onFetchFail()
    }
  }

  retryFetching = () => {
    this.getProfileDetails()
  }

  renderUserProfile = () => {
    const {name, shortBio, profileUrl} = this.state
    return (
      <div className="user-profile">
        <img src={profileUrl} alt="profile" className="profile-img" />
        <p className="profile-name">{name}</p>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderRetryButton = () => (
    <button type="button" className="btn" onClick={this.retryFetching}>
      Retry
    </button>
  )

  render() {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case fetchStages.loading:
        return this.renderLoadingView()
      case fetchStages.fetchCompleted:
        return this.renderUserProfile()
      case fetchStages.fetchFailed:
        return this.renderRetryButton()
      default:
        return null
    }
  }
}

export default UserProfile
