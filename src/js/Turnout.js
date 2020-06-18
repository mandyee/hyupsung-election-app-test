import React from 'react'

import App from './App'
import ShowTurnout from './contents/ShowTurnout'

class Turnout extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container">
            <a class="navbar-brand" style={{color:"white"}}>Hyupsung Election App</a>
          </div>
        </nav>

        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <h1 class="my-4"> 투표율 <small>Voter turnout</small> </h1>
              <br/>
              <ShowTurnout />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Turnout
