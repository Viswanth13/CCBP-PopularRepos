import Loader from 'react-loader-spinner'
import {Component} from 'react'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    reposList: [],
    isLoading: false,
    isSuccess: true,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeId} = this.state
    this.setState({
      isLoading: true,
    })
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()

      const fetchedDataCase = fetchedData.popular_repos.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))
      this.setState({isLoading: false, reposList: fetchedDataCase})
    } else {
      this.setState({isSuccess: false})
    }
  }

  updateLang = id => {
    this.setState({activeId: id}, this.getRepos)
  }

  renderReposList = () => {
    const {reposList} = this.state

    return (
      <ul className="list-container">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} eachRepo={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </>
  )

  renderLoader = () => (
    <>
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </>
  )

  render() {
    const {isSuccess, isLoading} = this.state
    return (
      <>
        <h1>Popular</h1>
        <div>
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              key={eachLang.id}
              eachLang={eachLang}
              updateLang={this.updateLang}
            />
          ))}
        </div>

        {isSuccess && isLoading ? this.renderLoader() : this.renderReposList()}

        {!isSuccess && this.renderFailureView()}
      </>
    )
  }
}

export default GithubPopularRepos
