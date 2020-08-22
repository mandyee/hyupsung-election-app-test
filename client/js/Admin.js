import React from 'react'
import Modal from 'react-awesome-modal'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import AdminList from '../json/AdminList'
import ShowElectionList from './contents/ShowElectionList'
import AddElection from './contents/AddElection'
import AddCandidate from './contents/AddCandidate'
import NavVoter from './contents/NavVoter'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLogin: null,
      addCandidateOn: false,
      addElectionOn: false,
    }
  }

  handleUsername = e => { // username 입력 필드 관리
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = e => { // password 입력 필드 관리
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = e => { // 로그인 버튼 클릭 이벤트
    e.preventDefault()

    const user = AdminList.find(  // username과 password가 유효한 값인지 검사
      (user) => user.username === this.state.username
      && user.password === this.state.password
    )

    if (user === undefined) { // 유효하지 않은 user일 때
      alert('username 혹은 password가 올바르지 않습니다.')
    }
    else {  // 유효한 user일 때
      window.localStorage.setItem('isLogin', true)
      this.setState({ isLogin: true })
    }
  }

  logout = e => { // 로그아웃 버튼 클릭 이벤트
    e.preventDefault()

    window.localStorage.removeItem('isLogin')
    this.setState({ username: '', password: '', isLogin: null })
  }

  openAddElection = e => { // 선거 등록 버튼 클릭 이벤트
    e.preventDefault()

    this.setState({
      addElectionOn: true,
    })
  }

  closeAddElection = e => { // 선거 등록 창 닫기 클릭 이벤트
    e.preventDefault()

    this.setState({
      addElectionOn: false,
    })
  }

  openAddCandidate = e => { // 후보자 등록 버튼 클릭 이벤트
    e.preventDefault()

    this.setState({
      addCandidateOn: true,
    })
  }

  closeAddCandidate = e => { // 후보자 등록 창 닫기 클릭 이벤트
    e.preventDefault()

    this.setState({
      addCandidateOn: false,
    })
  }

  render() {
    return (
      <div>
        { !window.localStorage.getItem('isLogin') ?
          // 로그인 되지 않았을 때
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
                      <p class="mb-5">협성대학교 선거관리위원회 홈페이지입니다.</p>
                      <form onSubmit={this.handleSubmit}>
                        <div>
                          <span>Username</span>
                          <div class="input-group input-group-newsletter">
                            <input
                              class="form-control"
                              placeholder='Username 입력...'
                              value={this.state.username}
                              onChange={this.handleUsername}
                            />
                          </div>
                        </div>
                        <div>
                          <span>Password</span>
                          <div class="input-group input-group-newsletter">
                            <input
                              class="form-control"
                              placeholder='Password 입력...'
                              value={this.state.password}
                              onChange={this.handlePassword}
                              type='password'
                            />
                          </div>
                        </div> <br/>
                        <div class="input-group input-group-newsletter">
                          <button class="btn btn-secondary" type='submit'>
                            Login
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
          // 선관위 로그인 완료했을 때
          <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                <a class="navbar-brand" style={{color:"white"}}>Hyupsung Election App</a>
                <Link to='/adminmanual' class="btn btn-dark">
                   Manual
                </Link>
              </div>
            </nav>

            <div class="container">
              <div class="row">

                <div class="col-md-8">
                  <ShowElectionList
                    notStartedElections={this.props.notStartedElections}
                    startedElections={this.props.startedElections}
                    endedElections={this.props.endedElections}

                    startElection={this.props.startElection}
                    endElection={this.props.endElection}

                    selectElection={this.props.selectElection}
                    selectedElection={this.props.selectedElection}
                    selectedElectionName={this.props.selectedElectionName}
                    selectedElectionCollege={this.props.selectedElectionCollege}
                    selectedElectionDept={this.props.selectedElectionDept}
                    selectedCandidates={this.props.selectedCandidates}
                    deselect={this.props.deselect}
                  />
                </div>

                <div class="col-md-4">

                  <div class="card my-4">
                    <h5 class="card-header">Admin Info</h5>
                    <div class="card-body">
                      <strong>선관위</strong>님, 안녕하세요! <br/> <hr/>
                      <span class="input-group-btn">
                        <button class='btn btn-secondary' onClick={this.logout}>
                          Logout
                        </button>
                      </span>
                    </div>
                  </div>

                  <div class="card my-4">
                    <button class="btn btn-dark btn-detail" type="button"
                    onClick={this.openAddElection}>
                      선거 등록
                    </button>
                  </div>

                  <div class="card my-4">
                    <button class="btn btn-dark btn-detail" type="button"
                    onClick={this.openAddCandidate}>
                      후보자 등록
                    </button>
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

                {/* 선거 등록 모달*/}
                <Modal visible={this.state.addElectionOn}
                width="500" height="350" effect="fadeInDown"
                onClickAway={this.closeAddElection}>
                  <div class="container text-center" style={{padding:"20px"}}>
                    <AddElection
                      addElection={this.props.addElection}
                      changing={this.props.changing}
                    />
                    <input value="닫기" class="btn btn-dark btn-detail"
                    type='button' onClick={this.closeAddElection}/>
                  </div>
                </Modal>

                {/* 후보자 등록 모달*/}
                <Modal visible={this.state.addCandidateOn}
                width="400" height="660" effect="fadeInDown"
                onClickAway={this.closeAddCandidate}>
                  <div class="container text-center" style={{padding:"20px"}}>
                    <AddCandidate
                      notStartedElections={this.props.notStartedElections}
                      addCandidate={this.props.addCandidate}
                      changing={this.props.changing}
                    />
                    <input value="닫기" class="btn btn-dark btn-detail"
                    type='button' onClick={this.closeAddCandidate}/>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Admin
