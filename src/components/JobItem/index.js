import {Link} from 'react-router-dom'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobCard} = props
  const {
    id,
    title,
    logoUrl,
    empType,
    jobDescription,
    location,
    rating,
    packagePerAnnum,
  } = jobCard

  return (
    <Link to={`/jobs/${id}`} className="link-items">
      <li className="job-card-item">
        <div className="top-card-container">
          <img src={logoUrl} alt={id} className="company-logo" />
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
          <h1 className="job-title">Description</h1>
          <p className="m-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
