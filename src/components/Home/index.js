import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <div className="homepage-container">
        <Header />
        <div className="content-container">
          <div className="content">
            <h1 className="header">Find The Job That Fits Your Life</h1>
            <p className="description">
              Millions of people are searching for jobs, salary information,
              company reviews.Find the job that fits your abilities and
              potential
            </p>
            <Link to="/jobs" className="link-items">
              <button
                type="button"
                className="btn jobs-btn"
                onClick={this.onFindJobs}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
