import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css'
import Room from './Component/Room'
import Home from './Component/Home'

const App = () => (
  <Router>
    <div>
      {/* <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/room">Room</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul> */}
      <Route exact path="/" component={Home}/>
      <Route path="/room" component={Room}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/error" component={ErrorPage}/>
    </div>
  </Router>
)

const ErrorPage = () => (
  <div>
    <p>发生了一点小错误, 请返回首页</p>
    <Link to={'/'}>返回首页</Link>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default App

// export default App;
