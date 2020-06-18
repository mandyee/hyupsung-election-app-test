import React from 'react'
import Modal from 'react-awesome-modal'

import ShowCandidatesAdmin from './ShowCandidatesAdmin'

class ShowElectionList extends React.Component {
  render() {
    var notStartedElections = [];
    _.each(this.props.notStartedElections, (value, index) => {
      notStartedElections.push(
        <tr>
          <td className="tdCenter">{this.props.notStartedElections[index].electionId}</td>
          <td width='300px'>{this.props.notStartedElections[index].electionName}</td>
          <td>
            <button type='button' class='btn btn-dark'
            onClick={this.props.selectElection}
            electionId={this.props.notStartedElections[index].electionId}>
              선거 열어보기
            </button>
          </td>
          <td>
            <button type='button' class='btn btn-secondary'
            onClick={e =>
              this.props.startElection(this.props.notStartedElections[index].electionId)
            }>
              선거 시작
            </button>
          </td>
        </tr>
      )
    });

    var startedElections = [];
    _.each(this.props.startedElections, (value, index) => {
      startedElections.push(
        <tr>
          <td className="tdCenter">{this.props.startedElections[index].electionId}</td>
          <td width='300px'>{this.props.startedElections[index].electionName}</td>
          <td>
            <button type='button' class='btn btn-dark'
            onClick={this.props.selectElection}
            electionId={this.props.startedElections[index].electionId}>
              선거 열어보기
            </button>
          </td>
          <td>
            <button type='button' class='btn btn-secondary'
            onClick={e =>
              this.props.endElection(this.props.startedElections[index].electionId)
            }>
              선거 종료
            </button>
          </td>
        </tr>
      )
    });

    var endedElections = [];
    _.each(this.props.endedElections, (value, index) => {
      endedElections.push(
        <tr>
          <td className="tdCenter">{this.props.endedElections[index].electionId}</td>
          <td width='300px'>{this.props.endedElections[index].electionName}</td>
          <td>
            <button type='button' class='btn btn-dark'
            onClick={this.props.selectElection}
            electionId={this.props.endedElections[index].electionId}>
              선거 열어보기
            </button>
          </td>
          <td>
            <button type='button' class='btn btn-secondary' disabled={true}>
              종료됨
            </button>
          </td>
        </tr>
      )
    });

    return (
      <div>
        <ShowCandidatesAdmin
          selectedElection={this.props.selectedElection}
          selectedCandidates={this.props.selectedCandidates}
        /> <hr/><br/>

        <h1 class="my-4"> 시작 전 선거 <small>Not Started Elections</small> </h1>
        <table class='table'>
          <thead>
            <tr>
              <th>election ID</th>
              <th>선거 이름</th>
              <th> </th>  {/* 선거 열어보기 */}
              <th> </th>  {/* 선거 시작 */}
            </tr>
          </thead>
          <tbody>
            {notStartedElections}
          </tbody>
        </table> <hr/> <br/>

        <h1 class="my-4"> 진행중인 선거 <small>Started Elections</small> </h1>
        <table class='table'>
          <thead>
            <tr>
              <th>election ID</th>
              <th>선거 이름</th>
              <th> </th>  {/* 선거 열어보기 */}
              <th> </th>  {/* 선거 종료 */}
            </tr>
          </thead>
          <tbody>
            {startedElections}
          </tbody>
        </table> <hr/> <br/>

        <h1 class="my-4"> 종료된 선거 <small>Ended Elections</small> </h1>
        <table class='table'>
          <thead>
            <tr>
              <th>election ID</th>
              <th>선거 이름</th>
              <th> </th>  {/* 선거 열어보기 */}
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {endedElections}
          </tbody>
        </table> <hr/> <br/>
      </div>
    )
  }
}

export default ShowElectionList
