import React from 'react'

import CollegeList from '../../json/CollegeList'
import DeptList from '../../json/DeptList'
import VoterList from '../../json/VoterList'

class ShowTurnout extends React.Component {
  render() {
    var collegeDept = []  // "선거 대상 : 단과대명 학과명"을 저장하는 리스트
    var collegeDeptDiv    // collegeDept를 출력하는 html을 저장하는 변수
    if(String(this.props.selectedElection) != '') {
      collegeDept.push("선거 대상 :")
      _.each(CollegeList, (value, index) => { // 단과대명을 배열에 저장
        if(this.props.selectedElectionCollege == value.collegeId) {
          collegeDept.push(value.collegeName)
        }
      });
      _.each(DeptList, (value, index) => { // 학과명을 배열에 저장
        if(this.props.selectedElectionDept == value.deptId) {
          collegeDept.push(value.deptName)
        }
      });
      if (this.props.selectedElectionCollege == 0) {  // 전체
        collegeDept.push("전체")
      }
      collegeDeptDiv = (
        <div class="panel-body">
          <hr/> <strong> {collegeDept[0]} </strong> {collegeDept[1]} {collegeDept[2]}
        </div>
      )
    }

    var checkSelected;
    if(String(this.props.selectedElection) != '') {
      checkSelected = (
        <div class="panel-heading" style={{background:"#343a40", color:"#fff"}}>
          {this.props.selectedElectionName}
        </div>
      )
    } else {
      checkSelected = (
        <div class="panel-heading" style={{background:"#343a40", color:"#fff"}}>
          선거를 선택하세요.
        </div>
      )
    }

    var totalStudents = 0;  // 해당 선거의 전체 유권자 수
    var votedStudents = 0;  // 선거에 참여한 유권자 수
    var turnout = 0;        // 투표율

    if (this.props.selectedElectionCollege == 0) {  // 전체 대상 선거의 유권자 수
      totalStudents = VoterList.length;
    } else {
      if(this.props.selectedElectionDept == 0) { // 단과대 대상 선거의 유권자 수
        var dept = [];
        _.each(DeptList, (value, index) => {
          if(this.props.selectedElectionCollege == value.collegeId) {
            dept.push(value.deptId)
          }
        });
        for(var i=0; i<dept.length; i++) {
          _.each(VoterList, (value, index) => {
            if(dept[i] == value.deptId) {
              totalStudents ++;
            }
          });
        }
      }
      else {  // 학과 대상 선거의 유권자 수
        _.each(VoterList, (value, index) => {
          if(this.props.selectedElectionDept == value.deptId) {
            totalStudents ++;
          }
        });
      }
    }

    // 해당 선거에 참여한 유권자 수
    this.props.selectedCandidates.map((candidate) => {
      votedStudents += candidate.voteCount
    })

    turnout = (votedStudents/totalStudents) * 100;
    turnout = turnout.toFixed(1); // 결과를 소수점 한 자리까지 표시

    var resultForm;
    if(String(this.props.selectedElection) != '') { // 선거를 선택했을 때
      resultForm = (                                // 결과 보이기
        <table class='table'>
          <thead>
          <tr>
            <th>전체 유권자 수</th>
            <th>투표한 유권자 수</th>
            <th>투표율</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalStudents}</td>
              <td>{votedStudents}</td>
              <th>{turnout} %</th>
            </tr>
          </tbody>
        </table>
      )
    }
    else {                                          // 선거를 선택하지 않았으면
      resultForm = ( <div> </div> )                 // 결과 숨기기
    }

    return (
      <div class="panel panel-default">
        {checkSelected}
        <div class="panel-body">
          { resultForm }
        </div>
        { collegeDeptDiv }
      </div>
    )
  }
}

export default ShowTurnout
