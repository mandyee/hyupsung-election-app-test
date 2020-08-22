import React from 'react'

class VoteForm extends React.Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.castVote(window.localStorage.getItem('studentId'), this.candidateId.value)
      }}>
        <div class="card mb-4">
          <div class="card-body">
            <div class='form-group'>
              <h4 class="card-title">후보자를 선택하세요.</h4>
              <select ref={(input) => this.candidateId = input} class='form-control'>
                {this.props.selectedCandidates.map((candidate) => {
                  return <option value={candidate.candidateId}>
                  기호 {candidate.symbolNumber}번 :
                  {candidate.presidentName}, {candidate.vpresidentName}
                  </option>
                })}
              </select>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button type='submit' class='btn btn-secondary'>Vote</button>
          </div>
        </div>
      </form>
    )
  }
}

export default VoteForm
