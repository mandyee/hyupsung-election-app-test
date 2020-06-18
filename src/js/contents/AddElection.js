import React from 'react'

class AddElection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      electionName: '',
    }
  }

  handleField = e => { // 선거 정보 입력 필드 관리
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => { // 선거 등록 버튼 클릭 이벤트
    e.preventDefault()

    this.props.addElection(this.state.electionName)

    this.setState({ // 상태 초기화
      electionName: ''
    })
  }

  render() {
    return (
      <div >
        <h3> 선거 등록하기 </h3>
        <hr/>
        { this.props.changing ?
          <div> Loading... </div>
          :
          <form onSubmit={this.handleSubmit}>
            <div class='form-group'>
              <div class="input-group input-group-newsletter">
                <span> 선거 이름 </span> &nbsp;
                <input
                  class="form-control"
                  value={this.state.electionName}
                  onChange={this.handleField}
                  name="electionName"
                />
                <div class="input-group-append">
                  <button type='submit' class='btn btn-secondary'>Add</button>
                </div>
              </div>
              <hr/>
            </div>
          </form>
        }
      </div>
    )
  }
}

export default AddElection
