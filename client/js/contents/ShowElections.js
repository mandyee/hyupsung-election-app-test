import React from 'react'
import Modal from 'react-awesome-modal'

import ShowCandidates from './ShowCandidates'

class ShowElections extends React.Component {
  render() {
    var tableRows = [];
    _.each(this.props.startedElections, (value, index) => {
      // 로그인 한 유권자가 투표 가능한 선거에 대해서만 버튼 생성
      if( this.props.startedElections[index].collegeId == 0 ||  // 전체 대상 선거
          (window.localStorage.getItem('collegeId')
            == this.props.startedElections[index].collegeId &&
          this.props.startedElections[index].deptId == 0) ||  // 단과대 대상 선거
          window.localStorage.getItem('deptId')
            == this.props.startedElections[index].deptId // 학과 대상 선거
      ) {
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
      }
    });

    return (
      <div>
        <ShowCandidates
          selectedElection={this.props.selectedElection}
          selectedElectionName={this.props.selectedElectionName}
          selectedElectionCollege={this.props.selectedElectionCollege}
          selectedElectionDept={this.props.selectedElectionDept}
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
