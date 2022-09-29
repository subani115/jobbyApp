const SalaryFilter = props => {
  const {salaryRange, salaryRangeFilter} = props

  const onTickCheckBox = e => {
    salaryRangeFilter(e.target.id)
  }

  return (
    <li className="filter-item">
      <div className="filter-item-container">
        <input
          type="checkbox"
          value={salaryRange.label}
          onClick={onTickCheckBox}
          id={salaryRange.salaryRangeId}
        />
        <label className="label">{salaryRange.label}</label>
      </div>
    </li>
  )
}

export default SalaryFilter
