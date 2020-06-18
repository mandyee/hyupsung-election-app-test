import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import Admin from './Admin'
import Voter from './Voter'
import Turnout from './Turnout'
import Result from './Result'
import BlockInfo from './BlockInfo'


class Routes extends React.Component {
  render() {
    return (
      <div className='Router'>
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/admin'
            render={ () =>
              <Admin
                addElection={this.props.addElection}
                addCandidate={this.props.addCandidate}
                changing={this.props.changing}

                notStartedElections={this.props.notStartedElections}
                startedElections={this.props.startedElections}
                endedElections={this.props.endedElections}

                startElection={this.props.startElection}
                endElection={this.props.endElection}

                selectElection={this.props.selectElection}
                selectedElection={this.props.selectedElection}
                selectedCandidates={this.props.selectedCandidates}
                deselect={this.props.deselect}

                block_ids={this.props.block_ids}
                block_hashes={this.props.block_hashes}
                block_ts={this.props.block_ts}
                curr_block={this.props.curr_block}
              />
            }
          />
          <Route path='/voter'
            render={ () =>
              <Voter
                account={this.props.account}

                startedElections={this.props.startedElections}
                selectElection={this.props.selectElection}
                selectedElection={this.props.selectedElection}
                selectedCandidates={this.props.selectedCandidates}
                deselect={this.props.deselect}

                candidates={this.props.candidates}
                hasVoted={this.props.hasVoted}
                castVote={this.props.castVote}
              />
            }
          />
          <Route exact path='/turnout'
            component={Turnout}
          />
          <Route exact path='/result'
            render={ () =>
              <Result
                endedElections={this.props.endedElections}
                selectElection={this.props.selectElection}
                selectedElection={this.props.selectedElection}
                selectedCandidates={this.props.selectedCandidates}
              />
            }
          />
          <Route exact path='/blockinfo'
            render={ () =>
              <BlockInfo
                block_ids={this.props.block_ids}
                block_hashes={this.props.block_hashes}
                block_ts={this.props.block_ts}
                curr_block={this.props.curr_block}
              />
            }
          />
        </Router>
      </div>
    )
  }
}

export default Routes
