import './index.css'

const SkillItems = props => {
  const {skill} = props
  const {name, imgUrl} = skill

  return (
    <li className="skill-item">
      <img src={imgUrl} className="company-logo" alt={name} />
      <p className="m-text">{name}</p>
    </li>
  )
}

export default SkillItems
