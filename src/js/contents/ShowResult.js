import React from 'react'

class ShowResult extends React.Component {
  render() {
    var checkSelected;
    if(String(this.props.selectedElection) != '') {
      checkSelected = (
        <tr>
          <th>#</th>
          <th>정 입후보자</th>
          <th>부 입후보자</th>
          <th>득표수</th>
        </tr>
      )
    } else {
      checkSelected = (
        <div>
          선거를 선택하세요.
        </div>
      )
    }

    return (
      <div>
        <table class='table'>
          <thead>
            {checkSelected}
          </thead>
          <tbody>
            {this.props.selectedCandidates.map((candidate) => {
              return(
                <tr>
                  <th>{candidate.symbolNumber}</th>
                  <td>{candidate.presidentName}</td>
                  <td>{candidate.vpresidentName}</td>
                  <td>{candidate.voteCount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ShowResult
