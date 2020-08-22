import React from 'react'

import ShowVoterManual from './contents/ShowVoterManual'

class VoterManual extends React.Component {
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
              <h1 class="my-4"> 유권자 매뉴얼 <small>Voter's Manual</small> </h1>
              <br/>
              <ShowVoterManual
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VoterManual
