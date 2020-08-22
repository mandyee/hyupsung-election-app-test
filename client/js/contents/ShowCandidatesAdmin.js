import React from 'react'
import Modal from 'react-awesome-modal'
import CollegeList from '../../json/CollegeList'
import DeptList from '../../json/DeptList'

class ShowCandidatesAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pledgesOn: false,
      symbolNumber: '',
      pledges: '',
    }
  }

  openPledges = e => { // 공약 보기 버튼 클릭 이벤트
    e.preventDefault()

    this.setState({
      pledgesOn: true,
      symbolNumber: e.target.getAttribute('symbolNumber'),
      pledges: e.target.getAttribute('pledges')
    })
  }

  closePledges = e => { // 공약 창에서 닫기 클릭 이벤트
    e.preventDefault()

    this.setState({
      pledgesOn: false,
      symbolNumber: '',
      pledges: ''
    })
  }

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

    return (
      <div>
        <h1 class="my-4"> 후보자 정보 <small>Candidates Info</small> </h1>
        <div class="panel panel-default">
          { checkSelected }
          <div id="candidatesRow" class="row panel-body">
            {this.props.selectedCandidates.map((candidate) => {
              return(
                <div>
                  <div id="candidateTemplate">
                    <div class="panel panel-default panel-candidate"
                    style={{margin:"10px", width:"220px"}}>
                      <div class="panel-heading">
                        <h3 class="panel-title">기호 {candidate.symbolNumber}번</h3>
                      </div>
                      <div class="panel-body">
                        <strong> 정 입후보자 </strong> <br/>
                        <strong> 이름 </strong>: {candidate.presidentName} <br/>
                        <strong> 학과 </strong>: {candidate.presidentDept} <br/>
                        <hr/>
                        <strong> 부 입후보자 </strong> <br/>
                        <strong> 이름 </strong>: {candidate.vpresidentName} <br/>
                        <strong> 학과 </strong>: {candidate.vpresidentDept} <br/>
                        <hr/>
                        <button class="btn btn-dark btn-detail" type="button"
                        onClick={this.openPledges} symbolNumber={candidate.symbolNumber}
                        pledges={candidate.pledges}>
                          공약 보기
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 후보자 공약 보기 모달 */}
                  <Modal visible={this.state.pledgesOn}
                  width="400" height="300" effect="fadeInDown"
                  onClickAway={this.closePledges}>
                    <div class="container" style={{padding:"20px"}}>
                      <h3 class="text-center"> 기호 {this.state.symbolNumber}번 </h3>
                      <hr/>
                      {/* new line을 화면에 정상적으로 출력하기 위함 */}
                      {this.state.pledges.split("\n").map(function(item, idx) {
                        return (
                          <span key={idx}>
                            {item} <br/>
                          </span>
                        )
                      })}
                      <hr/>
                      <div class='text-center'>
                        <input value="닫기" class="btn btn-dark btn-detail"
                        type='button' onClick={this.closePledges}/>
                      </div>
                    </div>
                  </Modal>
                </div>
              )
            })}
          </div>
          { collegeDeptDiv }
        </div>
      </div>
    )
  }
}

export default ShowCandidatesAdmin
