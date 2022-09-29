import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {jobItem} = props
  const {title, logoUrl, empType, jobDescription, location, rating} = jobItem

  return (
    <li className="s-job-card-item">
      <div className="top-card-container">
        <img
          src={logoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="company-name-container">
          <h1 className="job-title">{title}</h1>
          <p className="rating">
            <BsFillStarFill className="star icon" /> {rating}
          </p>
        </div>
      </div>
      <div className="btm-container">
        <h1 className="job-title">Description</h1>
        <p className="m-text">{jobDescription}</p>
      </div>
      <div className="middle-card-container">
        <div className="s-location-container">
          <div className="s-icons-container">
            <MdLocationOn className="icon location" />
            <p className="m-text">{location}</p>
          </div>
          <div className="s-icons-container">
            <BsBriefcaseFill className="icon location" />
            <p className="m-text">{empType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
