import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepo

  return (
    <li className="list-item">
      <img src={avatarUrl} alt={name} className="repository-image" />
      <h1 className="item-heading">{name}</h1>
      <div className="star-fork-issue-box">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-fork-issues-image"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="star-fork-issue-box">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-fork-issues-image"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="star-fork-issue-box">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-fork-issues-image"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
