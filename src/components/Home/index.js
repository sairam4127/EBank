import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Home = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="home-mainbg">
      <div className="home-header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="home-header-img"
        />
        <button type="button" className="home-nav-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      <h1>Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="home-img"
      />
    </div>
  )
}
export default Home
