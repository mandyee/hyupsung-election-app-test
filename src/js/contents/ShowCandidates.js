import React from 'react'
import Modal from 'react-awesome-modal'

import VoteForm from './VoteForm'

class ShowCandidates extends React.Component {
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
    var voteForm;
    if(String(this.props.selectedElection) != '') {
      voteForm = (
        <div>
        <hr/>
          <VoteForm
            selectedCandidates={this.props.selectedCandidates}
            castVote={this.props.castVote}
          />
        </div>
      )
    } else {
      voteForm = (
        <div>
          선거를 선택하세요.
        </div>
      )
    }

    return (
      <div>
        <h1 class="my-4"> 투표하기 <small>Vote</small> </h1>
        <div id="candidatesRow" class="row">
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

        { !this.props.hasVoted ?
          // 투표를 하지 않은 유권자일 때
          voteForm
          :
          // 이미 투표한 유권자일 때
          <div> <hr/> 이미 투표하셨습니다. </div>
        }

      </div>
    )
  }
}

export default ShowCandidates
