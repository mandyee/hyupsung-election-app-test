import React from 'react'

class AddCandidate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      presidentName: '',
      presidentDept: '',
      vpresidentName: '',
      vpresidentDept: '',
      pledges: '',
    }
  }

  handleField = e => { // 후보자 정보 입력 필드 관리
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => { // 후보자 등록 버튼 클릭 이벤트
    e.preventDefault()

    this.props.addCandidate(this.electionId.value,
      this.state.presidentName, this.state.presidentDept,
      this.state.vpresidentName, this.state.vpresidentDept, this.state.pledges)

    this.setState({ // 상태 초기화
      presidentName: '',
      presidentDept: '',
      vpresidentName: '',
      vpresidentDept: '',
      pledges: '',
    })
  }

  render() {
    return (
      <div>
        <h3> 후보자 등록하기 </h3>
        <hr/>
        { this.props.changing ?
          <div> Loading... </div>
          :
          <form onSubmit={this.handleSubmit}>
            <div class='form-group'>
              <div>

                <span> 선거를 선택하세요. </span>
                <div class="input-group input-group-newsletter">
                  <select class='form-control' ref={(input) => this.electionId = input}
                  onChange={this.handleField} name="electionId">
                    {this.props.notStartedElections.map((election) => {
                      return <option value={election.electionId}> {election.electionName} </option>
                    })}
                  </select>
                </div> <br/>

                <div class="input-group input-group-newsletter">
                  <span> 정 입후보자 이름 </span> &nbsp;
                  <input
                    class="form-control"
                    value={this.state.presidentName}
                    onChange={this.handleField}
                    name="presidentName"
                  />
                </div>
                <div class="input-group input-group-newsletter">
                  <span> 정 입후보자 학과 </span> &nbsp;
                  <input
                    class="form-control"
                    value={this.state.presidentDept}
                    onChange={this.handleField}
                    name="presidentDept"
                  />
                </div> <br/>

                <div class="input-group input-group-newsletter">
                  <span> 부 입후보자 이름 </span> &nbsp;
                  <input
                    class="form-control"
                    value={this.state.vpresidentName}
                    onChange={this.handleField}
                    name="vpresidentName"
                  />
                </div>
                <div class="input-group input-group-newsletter">
                  <span> 부 입후보자 학과 </span> &nbsp;
                  <input
                    class="form-control"
                    value={this.state.vpresidentDept}
                    onChange={this.handleField}
                    name="vpresidentDept"
                  />
                </div> <br/>

                <span> 공약 </span>
                <div class="input-group input-group-newsletter">
                  <textarea
                    class="form-control"
                    style={{resize:"none"}}
                    rows="4"
                    value={this.state.pledges}
                    onChange={this.handleField}
                    name="pledges">
                  </textarea>
                </div>

              </div> <br/>
              <button type='submit' class='btn btn-secondary'>Add</button>
              <hr />
            </div>
          </form>
        }
      </div>
    )
  }
}

export default AddCandidate
