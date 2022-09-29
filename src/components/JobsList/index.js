import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiSearch} from 'react-icons/bi'

import Header from '../Header'
import UserProfile from '../UserProfile'
import JobItem from '../JobItem'
import EmpTypeFilter from '../EmpTypeFilter'
import SalaryFilter from '../SalaryFilter'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const fetchingStages = {
  initial: 'INITIAL',
  loading: 'LOADING',
  fetchCompleted: 'COMPLETED',
  fetchFailed: 'FAILED',
  noResult: 'NORESULT',
}

class JobsList extends Component {
  state = {
    jobsList: [],
    fetchStatus: fetchingStages.initial,
    onSearch: '',
    onSearchJobList: [],
    empFilter: '',
    salaryFilter: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  onFetchingFail = () => {
    this.setState({fetchStatus: fetchingStages.fetchFailed})
  }

  onFetchingDone = newJobsList => {
    this.setState({
      jobsList: newJobsList,
      fetchStatus: fetchingStages.fetchCompleted,
      onSearchJobList: newJobsList,
    })
  }

  getJobsList = async () => {
    const {onSearch, salaryFilter, empFilter} = this.state
    console.log(empFilter)
    this.setState({fetchStatus: fetchingStages.loading})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empFilter}&minimum_package=${salaryFilter}&search=${onSearch}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const newJobsList = data.jobs.map(each => ({
      id: each.id,
      title: each.title,
      logoUrl: each.company_logo_url,
      empType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      packagePerAnnum: each.package_per_annum,
    }))

    if (response.ok) {
      this.onFetchingDone(newJobsList)
    } else {
      this.onFetchingFail()
    }
  }

  renderJobCardsView = () => {
    const {onSearchJobList} = this.state
    return onSearchJobList.map(each => <JobItem key={each.id} jobCard={each} />)
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobList = () => {
    this.getJobsList()
  }

  renderFailedView = () => (
    <div className="failed-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failed-view-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="m-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="btn" onClick={this.retryJobList}>
        Retry
      </button>
    </div>
  )

  renderNoResult = () => (
    <div className="no-result-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs"
      />
      <h1 className="job-title">No Jobs Found</h1>
      <p className="m-text">We could not find any jobs. try other filters</p>
    </div>
  )

  callingRenderDetails = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case fetchingStages.loading:
        return this.renderLoadingView()
      case fetchingStages.fetchCompleted:
        return this.renderJobCardsView()
      case fetchingStages.fetchFailed:
        return this.renderFailedView()
      case fetchingStages.noResult:
        return this.renderNoResult()
      default:
        return null
    }
  }

  onSearchChange = e => {
    this.setState({onSearch: e.target.value})
  }

  setNoResult = () => {
    this.setState({fetchStatus: fetchingStages.noResult})
  }

  onSearchClick = () => {
    this.setState({fetchStatus: fetchingStages.loading})
    const {jobsList, onSearch} = this.state
    const newJobList = jobsList.filter(each =>
      each.title.toLowerCase().includes(onSearch.toLowerCase()),
    )
    if (newJobList.length === 0) {
      this.setNoResult()
    } else {
      this.setState({
        onSearchJobList: newJobList,
        fetchStatus: fetchingStages.fetchCompleted,
      })
    }
  }

  filteredEmpType = async id => {
    const {empFilter} = this.state
    if (empFilter === '') {
      await this.setState({empFilter: id})
      this.getJobsList()
    } else {
      await this.setState(prev => ({empFilter: `${prev.empFilter},${id}`}))
      this.getJobsList()
    }
  }

  salaryRangeFilter = async id => {
    await this.setState({salaryFilter: id})
    this.getJobsList()
  }

  render() {
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-main-container">
          <div className="jobs-items-container">
            <div className="profile-container">
              <UserProfile />
              <hr />
              <ul className="filter-container">
                {employmentTypesList.map(each => (
                  <EmpTypeFilter
                    key={each.employmentTypeId}
                    empTypeItem={each}
                    filteredEmpType={this.filteredEmpType}
                  />
                ))}
              </ul>
              <hr />
              <ul className="filter-container">
                {salaryRangesList.map(each => (
                  <SalaryFilter
                    key={each.salaryRangeId}
                    salaryRange={each}
                    salaryRangeFilter={this.salaryRangeFilter}
                  />
                ))}
              </ul>
              <hr />
            </div>
            <ul className="job-cards-list">
              <div className="search-bar-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="search"
                  onChange={this.onSearchChange}
                />
                <button
                  className="search-btn"
                  type="button"
                  onClick={this.onSearchClick}
                >
                  <BiSearch className="search-icon icon" />
                </button>
              </div>
              {this.callingRenderDetails()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default JobsList
