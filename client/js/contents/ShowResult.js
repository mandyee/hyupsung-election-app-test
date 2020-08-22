import React from 'react'

import CollegeList from '../../json/CollegeList'
import DeptList from '../../json/DeptList'

class ShowResult extends React.Component {
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

    var resultForm;
    if(String(this.props.selectedElection) != '') { // 선거를 선택했을 때
      resultForm = (                                // 결과 보이기
        <tr>
          <th>#</th>
          <th>정 입후보자</th>
          <th>부 입후보자</th>
          <th>득표수</th>
          <th>득표 비율</th>
        </tr>
      )
    }
    else {                                          // 선거를 선택하지 않았으면
      resultForm = ( <div> </div> )                 // 결과 숨기기
    }

    var votedStudents = 0;  // 해당 선거에 참여한 유권자 수
    var rate = 0; // 득표 비율
    this.props.selectedCandidates.map((candidate) => {
      votedStudents += candidate.voteCount
    })

    return (
      <div class="panel panel-default">
        {checkSelected}
        <div class="panel-body">
          <table class='table'>
            <thead>
              {resultForm}
            </thead>
            <tbody>
              {this.props.selectedCandidates.map((candidate) => {
                rate = (candidate.voteCount / votedStudents) * 100
                rate = rate.toFixed(1); // 결과를 소수점 한 자리까지 표시
                var width = rate*2.5    // 그래프 크기
                return(
                  <tr>
                    <th>{candidate.symbolNumber}</th>
                    <td>{candidate.presidentName}</td>
                    <td>{candidate.vpresidentName}</td>
                    <td>{candidate.voteCount}</td>
                    <td> <img src = "../../img/chart.png"
                      width={width} height="25"/> &nbsp; <strong> {rate} % </strong>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        { collegeDeptDiv }
      </div>
    )
  }
}

export default ShowResult
