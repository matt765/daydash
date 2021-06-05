import React from "react";
import Planner from './Planner';
import '../css/style.sass'
import Welcome from './Welcome'
import Weather from './Weather'
import reset from '../images/refresh.png'
import github from '../images/gh.png'

function App(props) {
  return (
    <div className="container">
      <img
        src={reset}
        id="reset"
        alt=""
        onClick={() => {
          if (window.confirm("Press OK if you want to reset dashboard. All data will be lost")) {
            localStorage.clear()
            window.location.reload(true)
          }
        }}
      />
      <a href="https://github.com/matt765/react-daily-dashboard-app" target="_blank" rel="noopener noreferrer" >
        <img
          src={github}
          id="github"
          alt=""
        /></a>
      <div className="dashboard">
        <div className="info">
          <Welcome name={props.name} city={props.city} />
          <Weather city={props.city} />
        </div>
        <Planner />
      </div>
    </div>
  )
}

export default App;
