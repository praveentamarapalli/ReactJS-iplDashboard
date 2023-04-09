// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    matchDetails: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchDetails()
  }

  getTeamMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const newData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    const {latestMatchDetails} = newData
    const newLatestMatchDetails = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }
    const {recentMatches} = newData
    const newRecentMatches = recentMatches.map(eachMatch => ({
      result: eachMatch.result,
      id: eachMatch.id,
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      matchStatus: eachMatch.match_status,
    }))

    newData.latestMatchDetails = newLatestMatchDetails
    newData.recentMatches = newRecentMatches
    this.setState({matchDetails: newData, isLoading: false})
  }

  render() {
    const {isLoading, matchDetails} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = matchDetails
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <>
        <div className={`bg-container ${id}`}>
          {isLoading && (
            // eslint-disable-next-line react/no-unknown-property
            <div testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          )}
          {!isLoading && (
            <>
              <img
                src={teamBannerUrl}
                className="banner-img"
                alt="team banner"
              />
              <h1 className="latest-name">Latest Matches</h1>
              <LatestMatch
                key={latestMatchDetails.id}
                latestDetails={latestMatchDetails}
              />
              <ul className="recent-list">
                {recentMatches.map(eachValue => (
                  <MatchCard key={eachValue.id} matchDetails={eachValue} />
                ))}
              </ul>
            </>
          )}
        </div>
      </>
    )
  }
}

export default TeamMatches
