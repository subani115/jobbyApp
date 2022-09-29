import './index.css'

const EmpTypeFilter = props => {
  const {empTypeItem, filteredEmpType} = props

  const onTickCheckBox = e => {
    filteredEmpType(e.target.id)
  }

  return (
    <li className="filter-item">
      <div className="filter-item-container">
        <input
          type="checkbox"
          value={empTypeItem.label}
          onClick={onTickCheckBox}
          id={empTypeItem.employmentTypeId}
        />
        <label className="label">{empTypeItem.label}</label>
      </div>
    </li>
  )
}

export default EmpTypeFilter
