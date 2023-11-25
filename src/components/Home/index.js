import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

const apiUrl = 'https://apis.ccbp.in/ipl'
class Home extends Component {
  state = {isLoading: true, teamsData: []}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const fetchedData = data.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageUrl: team.team_image_url,
    }))
    this.setState({isLoading: false, teamsData: fetchedData})
  }

  renderTeamList = () => {
    const {teamsData} = this.state

    return (
      <ul className="team-list-items">
        {teamsData.map(eachItem => (
          <TeamCard key={eachItem.id} teamDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              className="ipl logo"
              alt="ipl logo"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamList()}
        </div>
      </div>
    )
  }
}
export default Home
