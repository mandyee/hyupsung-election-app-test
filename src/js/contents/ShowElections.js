import React from 'react'
import Modal from 'react-awesome-modal'

import ShowCandidates from './ShowCandidates'

class ShowElections extends React.Component {
  render() {
    var tableRows = [];
    _.each(this.props.startedElections, (value, index) => {
      tableRows.push(
        <tr>
          <td className="tdCenter">{this.props.startedElections[index].electionId}</td>
          <td>{this.props.startedElections[index].electionName}</td>
          <td>
            <button type='button' class='btn btn-dark'
            onClick={this.props.selectElection}
            electionId={this.props.startedElections[index].electionId}>
              선거 열어보기
            </button>
          </td>
        </tr>
      )
    });

    return (
      <div>
        <ShowCandidates
          selectedElection={this.props.selectedElection}
          selectedCandidates={this.props.selectedCandidates}
          hasVoted={this.props.hasVoted}
          castVote={this.props.castVote}
        /> <hr/><br/>

        <h1 class="my-4"> 진행중인 선거 <small>Started Elections</small> </h1>
        <table class='table'>
          <thead>
            <tr>
              <th>election ID</th>
              <th>선거 이름</th>
              <th>선거 열어보기</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table> <hr/>
      </div>
    )
  }
}

export default ShowElections
