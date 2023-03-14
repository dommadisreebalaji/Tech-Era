import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import CoursesItem from '../CoursesItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    courseList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchCoursesData()
  }

  fetchCoursesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const filterData = data.courses.map(eachList => ({
        id: eachList.id,
        name: eachList.name,
        logoUrl: eachList.logo_url,
      }))
      this.setState({
        courseList: filterData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.fetchCoursesData()
  }

  renderCourseDetails = () => {
    const {courseList} = this.state
    return (
      <div className="home-container">
        <h1 className="home-heading">Courses</h1>
        <ul className="courses-list-container">
          {courseList.map(eachItem => (
            <CoursesItem key={eachItem.id} eachItem={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderPendingState = () => (
    <div className="pending-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderFailureState = () => (
    <div className="pending-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We Cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetails()
      case apiStatusConstants.failure:
        return this.renderFailureState()
      case apiStatusConstants.inProgress:
        return this.renderPendingState()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="home-page-container">
        <Header />
        {this.renderSwitch()}
      </div>
    )
  }
}

export default Home
