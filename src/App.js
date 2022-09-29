import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import JobsList from './components/JobsList'
import LoginForm from './components/LoginForm'
import JobDetailedCard from './components/JobDetailedCard'

import './App.css'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsList} />
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetailedCard} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
