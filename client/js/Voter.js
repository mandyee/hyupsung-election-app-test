import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import VoterList from '../json/VoterList'
import DeptList from '../json/DeptList'
import CollegeList from '../json/CollegeList'
import VoteForm from './contents/VoteForm'
import ShowElections from './contents/ShowElections'
import NavVoter from './contents/NavVoter'

class Voter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentId: '',
      authcode: '',
      isVoter: null,
    }
  }

  handleStudentId = e => { // 학번 입력 필드 관리
    this.setState({
      studentId: e.target.value
    })
  }

  handleAuthcode = e => { // 인증 코드 입력 필드 관리
    this.setState({
      authcode: e.target.value
    })
  }

  handleSubmit = e => { // 투표소 입장 버튼 클릭 이벤트
    e.preventDefault()

    const user = VoterList.find(  // 학번 및 인증코드가 유효한 값인지 검사
      (user) => user.studentId == this.state.studentId
      && user.authcode == this.state.authcode
    )

    if (user === undefined) { // json에 등록되지 않은 user일 때
      alert('학번 혹은 password가 올바르지 않습니다.')
    }
    else {  // 유효한 user일 때
      window.location.reload(false);  // 페이지 새로고침

      // user의 학과명 추출
      const dept = DeptList.find(
        (dept) => dept.deptId === user.deptId
      )

      // user의 단과대명 추출
      const college = CollegeList.find(
        (college) => college.collegeId === dept.collegeId
      )

      window.localStorage.setItem('isVoter', true)
      window.localStorage.setItem('studentId', this.state.studentId)
      window.localStorage.setItem('collegeId', college.collegeId)
      window.localStorage.setItem('deptId', dept.deptId)
      window.localStorage.setItem('collegeName', college.collegeName)
      window.localStorage.setItem('deptName', dept.deptName)
      this.setState({ isVoter: true })
    }
  }

  exit = e => { // 투표소 퇴장 버튼 클릭 이벤트
    e.preventDefault()

    window.localStorage.removeItem('isVoter')
    window.localStorage.removeItem('studentId')
    window.localStorage.removeItem('collegeId')
    window.localStorage.removeItem('deptId')
    window.localStorage.removeItem('collegeName')
    window.localStorage.removeItem('deptName')

    window.localStorage.removeItem('isVoting')
    window.localStorage.removeItem('votingElection')

    this.setState({
      studentId: '',
      authcode: '',
      isVoter: null
    })
    this.props.deselect()
  }

  render() {
    return (
      <div>
        { !window.localStorage.getItem('isVoter') ?
          // 유권자 인증을 하지 않았을 때
          <div>
            <div class="overlay">
              <img src="img/vote-by-mail-concern.png" width="100%" height="100%"></img>
            </div>
            <div class="overlay">
            </div>
            <div class="masthead">
              <div class='masthead-bg'></div>
              <div class="container h-100">
                <div class="row h-100">
                  <div class="col-12 my-auto">
                    <div class="masthead-content text-white py-5 py-md-0">
                      <h1 class="mb-3">Welcome!</h1>
                      <p class="mb-5">협성대학교 학생회 선거 시스템입니다. 인증코드를 입력한 후, 원하는 후보자에게
                      <strong> 투표</strong>하세요!</p>
                      <form onSubmit={this.handleSubmit}>
                        <div>
                          <span>Student ID</span>
                          <div class="input-group input-group-newsletter">
                            <input class="form-control"
                            placeholder='학번 입력...'
                            value={this.state.studentId}
                            onChange={this.handleStudentId}
                            type="text" name="studentId" />
                          </div>
                        </div>
                        <div>
                          <span>Password</span>
                          <div class="input-group input-group-newsletter">
                            <input class="form-control"
                            placeholder='Password 입력...'
                            value={this.state.authcode}
                            onChange={this.handleAuthcode}
                            type="password" name="authcode" />
                          </div>
                        </div> <br/>
                        <div class="input-group input-group-newsletter">
                          <button class="btn btn-secondary" type='submit'>
                            투표소 입장하기
                          </button>
                        </div>
                      </form>
                      <hr/> <NavVoter />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          // 유권자 인증 완료했을 때
          <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                <a class="navbar-brand" style={{color:"white"}}>Hyupsung Election App</a>
                <Link to='/votermanual' class="btn btn-dark">
                   Manual
                </Link>
              </div>
            </nav>

            <div class="container">
              <div class="row">

                <div class="col-md-8">
                  <ShowElections
                    startedElections={this.props.startedElections}
                    selectElection={this.props.selectElection}
                    selectedElection={this.props.selectedElection}
                    selectedElectionName={this.props.selectedElectionName}
                    selectedElectionCollege={this.props.selectedElectionCollege}
                    selectedElectionDept={this.props.selectedElectionDept}
                    selectedCandidates={this.props.selectedCandidates}

                    candidates={this.props.candidates}
                    hasVoted={this.props.hasVoted}
                    castVote={this.props.castVote}
                  />
                </div>

                <div class="col-md-4">

                  <div class="card my-4">
                    <h5 class="card-header">Voter Info</h5>
                    <div class="card-body">
                      <strong>유권자</strong>님, 안녕하세요! <br/> <hr/>
                      학번 : {window.localStorage.getItem('studentId')} <br/>
                      단과대학 : {window.localStorage.getItem('collegeName')} <br/>
                      학과 : {window.localStorage.getItem('deptName')} <br/> <hr/>
                      <span class="input-group-btn">
                        <button class='btn btn-secondary' onClick={this.exit}>
                          투표소 퇴장하기
                        </button>
                      </span>
                    </div>
                  </div>

                  <div class="card my-4">
                    <Link to='/turnout' class="btn btn-custom">
                      투표율 보기
                    </Link>
                  </div>

                  <div class="card my-4">
                    <Link to='/result' class="btn btn-custom" onClick={this.props.deselect}>
                       투표 결과 보기
                    </Link>
                  </div>

                  <div class="card my-4">
                    <Link to='/blockinfo' class="btn btn-custom">
                       Block Info
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Voter
