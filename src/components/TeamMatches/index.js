// Write your code here
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {isLoading: true, matchesData: {}}

  componentDidMount() {
    this.getMatchData()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getMatchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/ipl/${id}`
    const response = await fetch(apiUrl)
    console.log(response)
    const fetchedData = await response.json()
    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    this.setState({matchesData: updatedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard key={recentMatch.id} matchDetails={recentMatch} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {matchesData} = this.state
    const {teamBannerUrl, latestMatch} = matchesData
    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatch={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="Rings" color="#ffffff" height={80} width={80} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'MI':
        return 'mi'
      case 'DC':
        return 'dc'
      case 'RC':
        return 'rr'
      case 'SH':
        return 'srh'
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoadingView() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
