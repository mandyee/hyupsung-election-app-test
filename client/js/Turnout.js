import React from 'react'

import ShowTurnout from './contents/ShowTurnout'

class Turnout extends React.Component {
  render() {
    var endedElections = [];
    _.each(this.props.endedElections, (value, index) => {
      endedElections.push(
        <tr>
          <td className="tdCenter">{this.props.endedElections[index].electionId}</td>
          <td>{this.props.endedElections[index].electionName}</td>
          <td>
            <button type='button' class='btn btn-dark'
            onClick={this.props.selectElection}
            electionId={this.props.endedElections[index].electionId}>
              선거 열어보기
            </button>
          </td>
        </tr>
      )
    });

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
              <ShowTurnout
                selectedElection={this.props.selectedElection}
                selectedElectionName={this.props.selectedElectionName}
                selectedElectionCollege={this.props.selectedElectionCollege}
                selectedElectionDept={this.props.selectedElectionDept}
                selectedCandidates={this.props.selectedCandidates}
              />
              <br/>

              <h1 class="my-4"> 종료된 선거 <small>Ended Elections</small> </h1>
              <table class='table'>
                <thead>
                  <tr>
                    <th>election ID</th>
                    <th>선거 이름</th>
                    <th> </th>  {/* 선거 열어보기 */}
                  </tr>
                </thead>
                <tbody>
                  {endedElections}
                </tbody>
              </table> <hr/> <br/>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Turnout
