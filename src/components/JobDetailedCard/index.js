import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SkillItems from '../SkillItems'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const fetchStages = {
  initial: 'INITIAL',
  loading: 'LOADING',
  fetchCompleted: 'COMPLETED',
  fetchFailed: 'FAILED',
}

class JobDetailedCard extends Component {
  state = {
    jobCard: {},
    skills: [],
    lifeDescription: {},
    similarJobsList: [],
    fetchStatus: fetchStages.initial,
  }

  componentDidMount() {
    this.getJobCardDetails()
  }

  getJobCardDetails = async () => {
    this.setState({fetchStatus: fetchStages.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const jobDetails = data.job_details
    const newSimilarJobsList = data.similar_jobs.map(each => ({
      id: each.id,
      title: each.title,
      logoUrl: each.company_logo_url,
      empType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
    }))

    const lifeAtCompany = jobDetails.life_at_company
    const newDesc = {
      description: lifeAtCompany.description,
      imgUrlLife: lifeAtCompany.image_url,
    }
    const newJobsList = {
      id: jobDetails.id,
      title: jobDetails.title,
      logoUrl: jobDetails.company_logo_url,
      companyWebsite: jobDetails.company_website_url,
      empType: jobDetails.employment_type,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      rating: jobDetails.rating,
      packagePerAnnum: jobDetails.package_per_annum,
    }
    const newSkillsList = jobDetails.skills.map(each => ({
      name: each.name,
      imgUrl: each.image_url,
    }))
    if (response.ok) {
      this.setState({
        jobCard: newJobsList,
        skills: newSkillsList,
        lifeDescription: newDesc,
        similarJobsList: newSimilarJobsList,
        fetchStatus: fetchStages.fetchCompleted,
      })
    } else {
      this.setState({fetchStatus: fetchStages.fetchFailed})
    }
  }

  retryFetchingJobCard = () => {
    this.getJobCardDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobCardView = () => {
    const {jobCard, skills, lifeDescription, similarJobsList} = this.state
    console.log(similarJobsList)
    const {
      title,
      logoUrl,
      companyWebsite,
      empType,
      jobDescription,
      location,
      rating,
      packagePerAnnum,
    } = jobCard

    return (
      <div>
        <Header />
        <div className="job-detailed-card-container">
          <div className="job-card">
            <div className="top-card-container">
              <img
                src={logoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="company-name-container">
                <h1 className="job-title">{title}</h1>
                <p className="rating">
                  <BsFillStarFill className="star icon" /> {rating}
                </p>
              </div>
            </div>
            <div className="middle-card-container">
              <div className="location-container">
                <div className="m-icons-container">
                  <MdLocationOn className="icon location" />
                  <p className="m-text">{location}</p>
                </div>
                <div className="m-icons-container">
                  <BsBriefcaseFill className="icon location" />
                  <p className="m-text">{empType}</p>
                </div>
              </div>
              <p className="salary">{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="btm-container">
              <div className="link-container">
                <h1 className="job-title">Description</h1>
                <a href={companyWebsite} className="link-items href">
                  Visit <FiExternalLink className="icon" />
                </a>
              </div>
              <p className="m-text">{jobDescription}</p>
            </div>
            <h1 className="job-title">Skills</h1>
            <ul className="skills-container">
              {skills.map(each => (
                <SkillItems key={each.name} skill={each} />
              ))}
            </ul>
            <h1 className="job-title">Life at Company</h1>
            <div className="company-amenities-container">
              <p className="m-text">{lifeDescription.description}</p>
              <img
                src={lifeDescription.imgUrlLife}
                alt="life at company"
                className="img"
              />
            </div>
          </div>
          <div className="similar-jobs-container">
            <h1 className="job-title header">Similar Jobs</h1>
            <ul className="similar-jobs-list">
              {similarJobsList.map(each => (
                <SimilarJobItem key={each.id} jobItem={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failed-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failed-view-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="m-text">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="btn" onClick={this.retryFetchingJobCard}>
        Retry
      </button>
    </div>
  )

  render() {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case fetchStages.loading:
        return this.renderLoadingView()
      case fetchStages.fetchCompleted:
        return this.renderJobCardView()
      case fetchStages.fetchFailed:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default JobDetailedCard
