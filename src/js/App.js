import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Election from '../../build/contracts/Election.json'
import Routes from './Routes'

import 'bootstrap/dist/css/bootstrap.css'

import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',

      elections: [],
      notStartedElections: [],
      startedElections: [],
      endedElections: [],
      selectedElection: '',

      candidates: [],
      selectedCandidates: [],

      hasVoted: false,
      loading: true,
      changing: false,

      block_ids: [],
      block_hashes: [],
      block_ts: [], // block의 timestamp
      curr_block: 100,  // block 정보 최대 100개 보여줄 것
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.election = TruffleContract(Election)
    this.election.setProvider(this.web3Provider)

    this.castVote = this.castVote.bind(this)
    this.watchEvents = this.watchEvents.bind(this)

    this.web3.eth.getBlockNumber((err, rtn) => {
      if(err) return console.log(err);
      this.state.curr_block = rtn;
    })
  }

  getBlocks(curr_block_no) {
    const block_ids = this.state.block_ids.slice();
    const block_hashes = this.state.block_hashes.slice();
    const block_ts = this.state.block_ts.slice();
    var max_blocks = curr_block_no;

    // unix timestamp 형식을 yyyy-mm-dd 형식으로 바꾸기 위한 변수들
    var date, formattedTime;
    var year, month, day, hours, minutes, seconds;

    for (var i = max_blocks; i >= 0; i--) {
      this.web3.eth.getBlock(i, false, function(err, block) {
        date = new Date(block.timestamp * 1000)

        year = date.getFullYear()
        month = date.getMonth() + 1
        day = date.getDate()
        hours = date.getHours()
        minutes = date.getMinutes()
        seconds = date.getSeconds()

        // 날짜 형식에서 한 자리수일 경우 앞에 0을 채워줌
        if(month < 10) month = "0" + month
        if(day < 10) day = "0" + day
        if(hours < 10) hours = "0" + hours
        if(minutes < 10) minutes = "0" + minutes
        if(seconds < 10) seconds = "0" + seconds

        formattedTime = year + '.' + month + '.' + day
          + ' ' + hours + ':' + minutes + ':' + seconds

        block_ids.push(block.number)
        block_hashes.push(block.hash)
        block_ts.push(formattedTime)
      })
    }
    this.setState({
      block_ids: block_ids,
      block_hashes: block_hashes,
      block_ts: block_ts
    })
  }

  componentDidMount() {
    this.getBlocks(this.state.curr_block);

    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.election.deployed().then((electionInstance) => {
        this.electionInstance = electionInstance
        this.watchEvents()

        // 모든 선거 저장
        this.electionInstance.getElectionCount().then((electionCount) => {
          for (var i = 0; i<Number(electionCount); i++) {
            this.electionInstance.electionList(i).then((election) => {
              const elections = [...this.state.elections]
              elections.push({
                electionId: Number(election[0]),
                electionName: String(election[1]),
                isStarted: String(election[2])
              })
              this.setState({ elections: elections })
            })
          }
        })

        // 시작 전 선거 저장
        this.electionInstance.getElectionCount().then((electionCount) => {
          for (var i = 0; i<Number(electionCount); i++) {
            this.electionInstance.electionList(i).then((election) => {
              const elections = [...this.state.notStartedElections]
              if(String(election[2]) == '0') {
                elections.push({
                  electionId: Number(election[0]),
                  electionName: String(election[1]),
                  isStarted: String(election[2])
                })
              }
              this.setState({ notStartedElections: elections })
            })
          }
        })

        // 시작된 선거 저장
        this.electionInstance.getElectionCount().then((electionCount) => {
          for (var i = 0; i<Number(electionCount); i++) {
            this.electionInstance.electionList(i).then((election) => {
              const elections = [...this.state.startedElections]
              if(String(election[2]) == '1') {
                elections.push({
                  electionId: Number(election[0]),
                  electionName: String(election[1]),
                  isStarted: String(election[2])
                })
              }
              this.setState({ startedElections: elections })
            })
          }
        })

        // 끝난 선거 저장
        this.electionInstance.getElectionCount().then((electionCount) => {
          for (var i = 0; i<Number(electionCount); i++) {
            this.electionInstance.electionList(i).then((election) => {
              const elections = [...this.state.endedElections]
              if(String(election[2]) == '2') {
                elections.push({
                  electionId: Number(election[0]),
                  electionName: String(election[1]),
                  isStarted: String(election[2])
                })
              }
              this.setState({ endedElections: elections })
            })
          }
        })

        // 모든 후보자 저장
        this.electionInstance.getCandidateCount().then((candidateCount) => {
          for (var i = 0; i < Number(candidateCount); i++) {
            this.electionInstance.candidateList(i).then((candidate) => {
              const candidates = [...this.state.candidates]
              candidates.push({
                candidateId: Number(candidate[0]),
                electionId: Number(candidate[1]),
                symbolNumber: Number(candidate[2]),
                voteCount: Number(candidate[3]),
                presidentName: String(candidate[4]),
                presidentDept: String(candidate[5]),
                vpresidentName: String(candidate[6]),
                vpresidentDept: String(candidate[7]),
                pledges: String(candidate[8])
              })
              this.setState({ candidates: candidates })
            })
          }
        })

        // this.electionInstance.checkVoted(window.localStorage.getItem('studentId'), 0).then((hasVoted) => {
          this.setState({ /*hasVoted,*/ loading: false })
        // })
      })
    })
  }

  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ changing: false })
    })
  }

  checkVoted(studentId, electionId) {
    this.electionInstance.checkVoted(studentId, electionId).then((result) => {
      if(result) this.setState({ hasVoted: true })
      else this.setState({ hasVoted: false })
    })
  }

  castVote(studentId, candidateId) {
    this.setState({ changing: true })
    this.electionInstance.vote(studentId, candidateId, { from: this.state.account })
    .then((result) =>
      this.setState({ hasVoted: true })
    )
  }

  selectElection = e => {
    e.preventDefault()

    this.setState({ selectedCandidates: [] })
    this.electionInstance.getCandidateCount().then((candidateCount) => {
      for (var i = 0; i < Number(candidateCount); i++) {
        this.electionInstance.candidateList(i).then((candidate) => {
          const candidates = [...this.state.selectedCandidates]
          if(Number(candidate[1])==Number(this.state.selectedElection)){
            candidates.push({
              candidateId: Number(candidate[0]),
              electionId: Number(candidate[1]),
              symbolNumber: Number(candidate[2]),
              voteCount: Number(candidate[3]),
              presidentName: String(candidate[4]),
              presidentDept: String(candidate[5]),
              vpresidentName: String(candidate[6]),
              vpresidentDept: String(candidate[7]),
              pledges: String(candidate[8])
            })
          }

          // 유권자가 선택한 선거에 대해 참여한 적이 있는지 확인
          this.checkVoted(window.localStorage.getItem('studentId'),
          this.state.selectedElection)

          this.setState({ selectedCandidates: candidates })

          // 자동으로 페이지 맨 위로 scroll up
          window.scrollTo({top: 0, behavior: 'smooth'})
        })
      }
    })

    this.setState({
      selectedElection: e.target.getAttribute('electionId')
    })
  }

  deselect = e => {
    this.setState({
      hasVoted: false,
      selectedElection: '',
      selectedCandidates: []
    })
  }

  startElection = (electionId) => {
    this.setState({ changing: true }) // 트랜잭션 승인 중...
    this.electionInstance.startElection(electionId,
      { from: this.state.account }).then((result) => {
        window.location.reload(false);  // 페이지 새로고침
      }
    )
  }

  endElection = (electionId) => {
    this.setState({ changing: true }) // 트랜잭션 승인 중...
    this.electionInstance.endElection(electionId,
      { from: this.state.account }).then((result) => {
        window.location.reload(false);  // 페이지 새로고침
      }
    )
  }

  addElection = (electionName) => {
    this.setState({ changing: true }) // 트랜잭션 승인 중...
    this.electionInstance.addElection(electionName,
      { from: this.state.account }).then((result) => {
        window.location.reload(false);  // 페이지 새로고침
      }
    )
  }

  addCandidate = (electionId, presidentName, presidentDept,
    vpresidentName, vpresidentDept, pledges) => {
    this.setState({ changing: true }) // 트랜잭션 승인 중... (Loading)
    this.electionInstance.addCandidate(electionId, presidentName, presidentDept,
      vpresidentName, vpresidentDept, pledges,
      { from: this.state.account }).then((result) => {
        window.location.reload(false);  // 페이지 새로고침
      }
    )
  }

  render() {
    return (
      <div>
        <div>
          { this.state.loading || this.state.changing ?
            <p class='text-center'>Loading...</p>
            :
            <Routes
              account={this.state.account}

              notStartedElections={this.state.notStartedElections}
              startedElections={this.state.startedElections}
              endedElections={this.state.endedElections}

              startElection={this.startElection}
              endElection={this.endElection}

              selectElection={this.selectElection}
              selectedElection={this.state.selectedElection}
              selectedCandidates={this.state.selectedCandidates}
              deselect={this.deselect}

              candidates={this.state.candidates}
              hasVoted={this.state.hasVoted}
              castVote={this.castVote}

              addElection={this.addElection}
              addCandidate={this.addCandidate}
              changing={this.state.changing}

              block_ids={this.state.block_ids}
              block_hashes={this.state.block_hashes}
              block_ts={this.state.block_ts}
              curr_block={this.state.curr_block}
            />
          }
        </div>

        {/*
          개발 테스트용 코드
          <br/>
          <p>Your account: {this.state.account}</p>
        */}
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
